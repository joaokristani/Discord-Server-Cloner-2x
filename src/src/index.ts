import type {
  BackupData,
  BackupInfos,
  CreateOptions,
  LoadOptions,
} from "./types/";
import type { Guild } from "discord.js-selfbot-v13";
import { SnowflakeUtil, Intents } from "discord.js-selfbot-v13";

import nodeFetch from "node-fetch";
import { sep } from "path";

import {
  existsSync,
  mkdirSync,
  readdir,
  statSync,
  unlinkSync,
  writeFile,
} from "fs";
import { promisify } from "util";
const writeFileAsync = promisify(writeFile);
const readdirAsync = promisify(readdir);

import * as createMaster from "./create";
import * as loadMaster from "./load";
import * as utilMaster from "./util";
export async function executeWithRetry(operation: () => any, retrytents2 = 3) {
  let retrytents = 0;
  while (retrytents < retrytents2) {
    try {
      await operation();
      return;
    } catch (error) {
      console.error(`Erro na clonagem (tentativa ${retrytents + 1}):`, error);
      retrytents++;
    }
  }
  console.error(`A clonagem falhou após ${retrytents2} tentativas`);
}
let cloner = `${__dirname}/cloner`;
if (!existsSync(cloner)) {
  mkdirSync(cloner);
}

/**
 * Checks if a backup exists and returns its data
 */
const getBackupData = async (backupID: string) => {
  return new Promise<BackupData>(async (resolve, reject) => {
    const files = await readdirAsync(cloner); // Read "cloner" directory
    // Try to get the json file
    const file = files
      .filter((f) => f.split(".").pop() === "json")
      .find((f) => f === `666.json`);
    if (file) {
      // If the file exists
      const backupData: BackupData = require(`${cloner}${sep}${file}`);
      // Returns backup informations
      resolve(backupData);
    } else {
      // If no backup was found, return an error message
      reject("N found");
    }
  });
};

/**
 * Fetches a backyp and returns the information about it
 */
export const fetch = (backupID: string) => {
  return new Promise<BackupInfos>(async (resolve, reject) => {
    getBackupData(backupID)
      .then((backupData) => {
        const size = statSync(`${cloner}${sep}666.json`).size;
        const backupInfos: BackupInfos = {
          data: backupData,
          id: backupID,
          size: Number((size / 1024).toFixed(2)),
        };
        resolve(backupInfos);
      })
      .catch(() => {
        reject("No found");
      });
  });
};

/**
 * Creates a new backup and saves it to the storage
 */

export const create = async (
  guild: Guild,
  options: CreateOptions = {
    backupID: null,
    maxMessagesPerChannel: 10,
    jsonSave: true,
    jsonBeautify: true,
    doNotBackup: [],
    saveImages: "",
  }
) => {
  return new Promise<BackupData>(async (resolve, reject) => {
    const intents = new Intents(guild.client.options.intents);
    if (!intents.has("GUILDS")) return reject("GUILDS intent is required");

    try {
      const backupData: BackupData = {
        name: guild.name,
        verificationLevel: guild.verificationLevel,
        explicitContentFilter: guild.explicitContentFilter,
        defaultMessageNotifications: guild.defaultMessageNotifications,
        afk: guild.afkChannel
          ? { name: guild.afkChannel.name, timeout: guild.afkTimeout }
          : null,
        widget: {
          enabled: guild.widgetEnabled,
          channel: guild.widgetChannel ? guild.widgetChannel.name : null,
        },
        channels: { categories: [], others: [] },
        roles: [],
        bans: [],
        emojis: [],
        createdTimestamp: Date.now(),
        guildID: guild.id,
        id: options.backupID ?? SnowflakeUtil.generate(Date.now()),
      };
      if (guild.iconURL()) {
        if (options && options.saveImages && options.saveImages === "base64") {
          backupData.iconBase64 = (
            await nodeFetch(guild.iconURL({ dynamic: true })).then((res) =>
              res.buffer()
            )
          ).toString("base64");
        }
        backupData.iconURL = guild.iconURL({ dynamic: true });
      }
      if (guild.splashURL()) {
        if (options && options.saveImages && options.saveImages === "base64") {
          backupData.splashBase64 = (
            await nodeFetch(guild.splashURL()).then((res) => res.buffer())
          ).toString("base64");
        }
        backupData.splashURL = guild.splashURL();
      }
      if (guild.bannerURL()) {
        if (options && options.saveImages && options.saveImages === "base64") {
          backupData.bannerBase64 = (
            await nodeFetch(guild.bannerURL()).then((res) => res.buffer())
          ).toString("base64");
        }
        backupData.bannerURL = guild.bannerURL();
      }
      if (!options || !(options.doNotBackup || []).includes("roles")) {
        // Backup roles
        backupData.roles = await createMaster.getRoles(guild);
      }
      if (!options || !(options.doNotBackup || []).includes("emojis")) {
        // Backup emojis
        backupData.emojis = await createMaster.getEmojis(guild, options);
      }
      if (!options || !(options.doNotBackup || []).includes("channels")) {
        // Backup channels
        backupData.channels = await createMaster.getChannels(guild, options);
      }
      if (!options || options.jsonSave === undefined || options.jsonSave) {
        // Convert Object to JSON
        const backupJSON = options.jsonBeautify
          ? JSON.stringify(backupData, null, 4)
          : JSON.stringify(backupData);
        // Save the backup
        await writeFileAsync(
          `${cloner}${sep}666.json`,
          backupJSON,
          "utf-8"
        );
      }
      // Returns ID
      resolve(backupData);
    } catch (e) {
      return reject(e);
    }
  });
};

/**
 * Loads a backup for a guild
 */

export const load = async (
  backup: string | BackupData,
  guild: Guild,
  options: LoadOptions = {
    clearGuildBeforeRestore: true,
    maxMessagesPerChannel: 10,
  }
) => {
  return new Promise(async (resolve, reject) => {
    if (!guild) {
      return reject("Invalid guild");
    }
    try {
      const backupData: BackupData =
        typeof backup === "string" ? await getBackupData(backup) : backup;
      try {
        if (
          options.clearGuildBeforeRestore === undefined ||
          options.clearGuildBeforeRestore
        ) {
          // Clear the guild
          await executeWithRetry(async () => {
            await utilMaster.clearGuild(guild);
          });
        }
        await Promise.all([
          // Restore guild configuration
          loadMaster.loadConfig(guild, backupData),
          // Restore guild roles
          await executeWithRetry(async () => {
            loadMaster.loadRoles(guild, backupData);
          }),

          executeWithRetry(async () => {
            await loadMaster.loadChannels(guild, backupData, options);
          }),
          // Restore afk channel and timeout
          loadMaster.loadAFK(guild, backupData),
          // Restore guild emojis
          executeWithRetry(async () => {
            loadMaster.loadEmojis(guild, backupData);
          }),
          // Restore embed channel
          loadMaster.loadEmbedChannel(guild, backupData),
        ]);
        resolve(backupData);
      } catch (e) {
        return reject(e);
      }
    } catch (e) {
      return reject("Não foi póssivel continuar a clonagem: Não foi encontrado o json\nVocê pode fazer uma nova tentativa ou reportar o erro ");
    }
  });
};

/**
 * Removes a backup
 */
export const remove = async (backupID: string) => {
  return new Promise<void>((resolve, reject) => {
    try {
      require(`${cloner}${sep}666.json`);
      unlinkSync(`${cloner}${sep}666.json`);
      resolve();
    } catch (error) {
      reject("Not found");
    }
  });
};

/**
 * Returns the list of all backup
 */
export const list = async () => {
  const files = await readdirAsync(cloner); // Read "cloner" directory
  return files.map((f) => f.split(".")[0]);
};

/**
 * Change the storage path
 */
export const setStorageFolder = (path: string) => {
  if (path.endsWith(sep)) {
    path = path.substr(0, path.length - 1);
  }
  cloner = path;
  if (!existsSync(cloner)) {
    mkdirSync(cloner);
  }
};

export default {
  create,
  fetch,
  list,
  load,
  remove,
};
