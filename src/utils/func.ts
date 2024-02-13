import gradient from "gradient-string";
import backup from "../src/index";
import boxen from "boxen";
import { rl, translations } from "../index";
import chalk from "chalk"; 
import { Client } from "discord.js-selfbot-v13";
export function choiceinit(client: Client) {
  let clearall = () => {
    creatorname();
    menutext(client);
    choiceinit(client);
  };
  rl.question(
    gradient(["purple", "pink"])(t("optionPrompt")),
    async (choice: string) => {
      choice = choice.trim();
      switch (choice) {
        case "":
        case "back":
          clearall();
          break;
        case "1":
        case "2":
        case "3":
          creatorname();
          await client.guilds.fetch();
          const option = choice === "1" ? "Clonerop2choice" : choice === "2" ? "Clonerop1choice" : "Clonerop3choice";
          configop(client, option);
          break;
        case "6":
          creatorname();
          serverinfo(client);
          break;
        case "7":
          creatorname();
          console.log(
            gradient(["red", "purple"])(
              "Link: https://discord.gg/infinite-community-1014921352500756500"
            )
          );
          awaitenter(client);
          break;
        case "5":
          creatorname();
          infouser(client);
          break;
        case "8":
          creatorname();
          changelang(client);
          break;
        default:
          clearall();
      }
    }
  );
}

let langat: "pt" | "en" = "pt";

export function setlang(lang: "en" | "pt") {
  langat = lang;
}

export function t(key: string): string {
  return translations[langat][key] || key;
}
export function creatorname() {
  console.clear();
  console.log(
    gradient(["#ff4500", "#ffa500", "#ff6347"])(`
      ▄▄▄██▀▀▀▒█████   ▄▄▄       ▒█████   ██ ▄█▀ ██▀███   ██▓  ██████ ▄▄▄█████▓ ▄▄▄       ███▄    █  ██▓
      ▒██  ▒██▒  ██▒▒████▄    ▒██▒  ██▒ ██▄█▒ ▓██ ▒ ██▒▓██▒▒██    ▒ ▓  ██▒ ▓▒▒████▄     ██ ▀█   █ ▓██▒
      ░██  ▒██░  ██▒▒██  ▀█▄  ▒██░  ██▒▓███▄░ ▓██ ░▄█ ▒▒██▒░ ▓██▄   ▒ ▓██░ ▒░▒██  ▀█▄  ▓██  ▀█ ██▒▒██▒
   ▓██▄██▓ ▒██   ██░░██▄▄▄▄██ ▒██   ██░▓██ █▄ ▒██▀▀█▄  ░██░  ▒   ██▒░ ▓██▓ ░ ░██▄▄▄▄██ ▓██▒  ▐▌██▒░██░
    ▓███▒  ░ ████▓▒░ ▓█   ▓██▒░ ████▓▒░▒██▒ █▄░██▓ ▒██▒░██░▒██████▒▒  ▒██▒ ░  ▓█   ▓██▒▒██░   ▓██░░██░
    ▒▓▒▒░  ░ ▒░▒░▒░  ▒▒   ▓▒█░░ ▒░▒░▒░ ▒ ▒▒ ▓▒░ ▒▓ ░▒▓░░▓  ▒ ▒▓▒ ▒ ░  ▒ ░░    ▒▒   ▓▒█░░ ▒░   ▒ ▒ ░▓
    ▒ ░▒░    ░ ▒ ▒░   ▒   ▒▒ ░  ░ ▒ ▒░ ░ ░▒ ▒░  ░▒ ░ ▒░ ▒ ░░ ░▒  ░ ░    ░      ▒   ▒▒ ░░ ░░   ░ ▒░ ▒ ░
    ░ ░ ░  ░ ░   ▒    ░   ▒   ░ ░ ░   ░ ░░ ░    ░░   ░  ▒ ░░  ░  ░            ░   ▒      ░   ░ ░    ░ 
    `)
  );


}

export function menutext(client: Client) {
  creatorname();
  const goodbyegudog = langat !== "en" ? gradient(["#2180db", "#75a1cb", "#78a5d3"])(["[0] Nos despedimos do Gudog com carinho, Adeus gudog\n","[0] Em homenagem ao gudog, Descanse em paz\n","[0] Em memória do Gudog, um administrador que nos deixou. Adeus, amigo\n"][Math.floor(Math.random() * 3)]) : null;
  console.log((goodbyegudog ? goodbyegudog : '') + gradient(["#ff4500", "#ffa500", "#ff6347"])(t("menuText")));
  choiceinit(client);
}


export function infouser(client: Client) {
  creatorname();

  console.log(
    gradient(["#ff4500", "#ffa500", "#ff6347"])(
      t(`Nome da conta: ${client.user.username}\nNome global da conta: ${client.user.globalName
      }\nAvatar ${client.user.avatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      })}\nBanner: ${client.user.bannerURL({
        format: "png",
        dynamic: true,
      })}\nID: ${client.user.id}\nData de criação da conta: ${client.user.createdAt
      }\nGuildas: ${client.guilds.cache.size} \nNitro?: ${client.user.nitroType
      }\nEmail: ${client.user.emailAddress}\nCelular: ${client.user.phoneNumber
      }\nIdioma: ${client.settings.locale}\nTema: ${client.settings.theme}\nModo desenvolvedor: ${client.settings.developerMode}\nAfk Timeout: ${client.settings.afkTimeout}\nDM Scan Level: ${client.settings.DMScanLevel}\nModo compacto: ${client.settings.compactMode}\nPreview Link: ${client.settings.previewLink}`)
    )
  );
  awaitenter(client);
}

export async function Cloner(
  client: Client,
  configOptions: {
    maxMessagesPerChannel: number;
    jsonSave: boolean;
    jsonBeautify: boolean;
    doNotBackup: string[];
  },
  cloneOption: number,
  createNewServer?: boolean
) {
  let guildId1: string;
  let GUILD_ID: string = '';
  const starttime = process.hrtime();
  let errors = 0;
  let clonedall = 0;
  let clearall = () => {
    creatorname();
    menutext(client);
    choiceinit(client);
  };

  const proceedWithCloning = async () => {
    try {
      creatorname();
      await client.guilds.fetch();
      const guild = client.guilds.cache.get(guildId1);
      if (!guild) {
        console.error(gradient(["red", "darkred"])(
          t('idservererror')
        ));
        setTimeout(() => {
          clearall();
        }, 20000);
        return;
      }
      if (createNewServer) {
        /*if (client.guilds.cache.size > 100 || (client.user?.nitroType !== 'NONE' && client.guilds.cache.size <= 200)) {
          console.error(gradient(["red", "darkred"])(t('svrlimitt')));
          setTimeout(() => {
            clearall();
          }, 20000);
          return;
        }*/
        const newGuild = await client.guilds.create(
          'Infinite Community Cloner',
          {
            icon:
              'https://cdn.discordapp.com/attachments/1014927587954393098/1145100637281992784/infinite_logo.png',
          }
        );

        if (!newGuild) {
          console.error(gradient(["red", "darkred"])('Aconteceu um erro fatal na criação do servidor, o clonador será reiniciado em 10 segundos'));
          errors++;
          setTimeout(() => {
            clearall();
          }, 10000);
          return;
        }
        GUILD_ID = newGuild.id;
      }

      const cloner = await backup.create(guild, {
        maxMessagesPerChannel: configOptions.maxMessagesPerChannel,
        jsonSave: configOptions.jsonSave,
        jsonBeautify: configOptions.jsonBeautify,
        doNotBackup: configOptions.doNotBackup,
      });

      if (!cloner) {
        console.error(gradient(["red", "darkred"])('Aconteceu um erro fatal na clonagem e o clonador será reiniciado em 10 segundos'));
        errors++;
        setTimeout(() => {
          clearall();
        }, 10000);
        return;
      }

      const newGuild = client.guilds.cache.get(GUILD_ID);

      if (!newGuild) {
        console.error(gradient(["red", "darkred"])(t('invalidid')
        ));
        errors++;
        rl.close();
        return;
      }

      const startime2 = process.hrtime();
      console.log(gradient(["darkblue", "blue"])(t('initcloner')));
      let channelCount = 0;

      cloner.channels.categories.forEach((category: { children: any[] }) => {
        category.children.forEach(() => {
          channelCount += 1;
        });
      });

      cloner.channels.others.forEach(() => {
        channelCount += 1;
      });

      backup.load(cloner.id, newGuild);
      const tempss = channelCount * 1;
      const temp = tempss * 1000;

      setTimeout(async () => {
        const endtime2 = process.hrtime(startime2);
        const exetimess = endtime2[0] + endtime2[1] / 1e9;
        const Tempo2 = Tempoex(exetimess);

        console.log(gradient(["#FFEB3B", "#FFC107", "#FF9800", "#FF5722"])(t('msgfinalcloner') + Tempo2));
        console.log(gradient(["#FFEB3B", "#FFC107", "#FF9800", "#FF5722"])(t('configtime') + Tempo));
        console.log(gradient(["#FFEB3B", "#FFC107", "#FF9800", "#FF5722"])(t('channelnumber') + clonedall));
        console.log(gradient(["#FFEB3B", "#FFC107", "#FF9800", "#FF5722"])(t('errorcloning') + errors));

        if (cloneOption === 3) {
          const template = await newGuild.createTemplate(
            `${guild.name}`,
            `By Infinite community (https://discord.gg/infinite-community-1014921352500756500)`
          );
          console.log(gradient(["#FFEB3B", "#FFC107", "#FF9800", "#FF5722"])(`» Template Url: ${template.url}`));
        }

        awaitenter(client);
      }, temp);

      cloner.channels.categories.forEach((category: { children: any[] }) => {
        category.children.forEach(() => {
          clonedall++;
        });
      });

      cloner.channels.others.forEach(() => {
        clonedall++;
      });

      const endtime = process.hrtime(starttime);
      const exetimes = endtime[0] + endtime[1] / 1e9;
      const Tempo = Tempoex(exetimes);
    } catch (error) {
      console.error('Ocorreu um erro específico durante a clonagem: ', error);
      errors++;
      rl.close();
    }
    
  };

  rl.question(gradient(["#5bb409", "#6ed60e", "#e8fad8"])(t('ServerID')), async (guildId: string) => {
    guildId1 = guildId;

    if (!createNewServer) {
      rl.question(gradient(["#5bb409", "#6ed60e", "#e8fad8"])(t('ServerID2')), (destinationId: string) => {
        GUILD_ID = destinationId;
        proceedWithCloning();
      });
    } else {
      proceedWithCloning();
    }
  });
}
export async function serverinfo(client: Client) {
  async function fetchGuildData(guildId: string) {
    try {
      const guild = await client.guilds.fetch(guildId);
      const preview = await guild.fetchPreview();
      creatorname();
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Nome do servidor: ${preview.name}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Descrição do servidor: ${preview.description}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Número de Membros: ${preview.approximateMemberCount}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Número de Canais: ${preview.approximatePresenceCount}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Criado em: ${preview.createdAt}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `ID do servidor: ${preview.id}`
        )
      );

      if (preview.icon) {
        console.log(
          gradient(["#ff4500", "#ffa500", "#ff6347"])(
            `Ícone do servidor: ${preview.iconURL()}`
          )
        );
      }

      if (preview.splash) {
        console.log(
          gradient(["#ff4500", "#ffa500", "#ff6347"])(
            `Splash do servidor: ${preview.splashURL()}`
          )
        );
      }

      if (preview.discoverySplash) {
        console.log(
          gradient(["#ff4500", "#ffa500", "#ff6347"])(
            `Discovery Splash do servidor: ${preview.discoverySplashURL()}`
          )
        );
      }

      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Recursos do servidor: ${preview.features.join(", ")}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Emojis do servidor: ${preview.emojis.size}`
        )
      );
      console.log(
        gradient(["#ff4500", "#ffa500", "#ff6347"])(
          `Stickers do servidor: ${preview.stickers.size}`
        )
      );
    } catch (error) {
      console.error(
        gradient(["#ff4500", "#ffa500", "#ff6347"])("Aconteceu um erro:"),
        error
      );
    }
    awaitenter(client);
  }
  rl.question(
    gradient(["purple", "pink"])(t('ServerID')),
    (guildId: string) => {
      fetchGuildData(guildId);
    }
  );
}
export const configOptions2: any = {
  ignoreTickets: false,
  Debug: false,
};
export const configOptions: any = {
  maxMessagesPerChannel: 0,
  jsonSave: true,
  jsonBeautify: true,
  doNotBackup: ["bans", "emojis"],
};

export async function configop(client: Client, functionName: string) {
  creatorname();
  console.log(
    gradient(["purple", "pink"])(t('configcloner'))
  );

  let clearall = () => {
    console.clear();
    creatorname();
    menutext(client);
    choiceinit(client);
  };

  while (true) {
    const tableContent = `
    ${chalk.red("O:")} ${gradient(["purple", "pink"])(
      t("msgcloner")
    )}
    ${chalk.red("V:")} ${chalk.blue(configOptions.maxMessagesPerChannel)}
    ${chalk.red("O:")} ${gradient(["purple", "pink"])(t("savejsonconfig"))}
    ${chalk.red("V:")} ${configOptions.jsonSave ? chalk.green(t("yes")) : chalk.red(t("no"))
      }
    ${chalk.red("O:")} ${gradient(["purple", "pink"])(t('beautifuljson'))}
    ${chalk.red("V:")} ${configOptions.jsonBeautify ? chalk.green(t("yes")) : chalk.red(t("no"))
      }
    ${chalk.red("O:")} ${gradient(["purple", "pink"])(t('noclone'))}
    ${chalk.red("V:")} ${chalk.yellow(configOptions.doNotBackup.join(", "))}
    ${chalk.red("O:")} ${gradient(["purple", "pink"])(t('ignoretickets'))}
    ${chalk.red("V:")} ${configOptions2.ignoreTickets ? chalk.green(t("yes")) : chalk.red(t("no"))
      }
    ${chalk.red("O:")} ${gradient(["purple", "pink"])("Debug?")}
    ${chalk.red("V:")} ${configOptions2.Debug ? chalk.green(t("yes")) : chalk.red(t("no"))
      }
    `;
    const tableWithBorders = boxen(tableContent, {
      borderStyle: {
        topLeft: "╭",
        topRight: "╮",
        bottomLeft: "╰",
        bottomRight: "╯",
        horizontal: "─",
        vertical: "│",
        top: "─",
        right: "│",
        bottom: "─",
        left: "│",
      },
      padding: 2,
      margin: 2,
      borderColor: "red",
      backgroundColor: "#1A1A1A",
    });

    console.log(tableWithBorders);

    try {
      const choice = await espop(
        gradient(["purple", "pink"])(
          t('option234')
        )
      );

      if (choice === "1") {
        configOptions.maxMessagesPerChannel = parseInt(
          await espop(
            gradient(["purple", "pink"])(t('cloningmessage'))),10);
        configOptions.jsonSave = await yop(
          gradient(["purple", "pink"])(
            t("savejsoninput")
          )
        );
        configOptions.jsonBeautify = await yop(
          gradient(["purple", "pink"])(t("beautifuljson")
          )
        );
        configOptions.doNotBackup = (
          await espop(
            gradient(["purple", "pink"])(
              t("noclonerinput")
            )
          )
        )
          .split(",")
          .map((item) => item.trim());
        const ticketop = await yop(
          gradient(["purple", "pink"])(
            t("ignoreticketsinput")
          )
        );

        const Debugop = await yop(
          gradient(["purple", "pink"])(
            t("debugoption")
          )
        );

        if (Debugop) {
          configOptions2.Debug = true;
        }
        if (ticketop) {
          configOptions2.ignoreTickets = true;
        }
        switch (functionName) {
          case "Clonerop1choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 1, true);
            break;
          case "Clonerop2choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 2, false);
            break;
          case "Clonerop3choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 3, true);
            break;
          default:
            console.log(gradient(["red", "darkred"])(t("returnnull")));
            break;
        }
        break;
      } else if (choice === "2") {
        switch (functionName) {
          case "Clonerop1choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 1, true);
            break;
          case "Clonerop2choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 2, false);
            break;
          case "Clonerop3choice":
            console.clear();
            creatorname();
            await Cloner(client, configOptions, 3, true);
            break;
          default:
            console.log(gradient(["red", "darkred"])(t("returnnull")));
            break;
        }
      } else if (choice === "3") {
        clearall();
      } else {
        console.log(gradient(["red", "darkred"])(t('undefinedfunc')));
      }
    } catch (error) {
      console.error(
        gradient(["red", "darkred"])(
          t('error2'),
          error
        )
      );
      awaitenter(client);
    }
  }
}


async function yop(question: string): Promise<boolean> {
  const answer = await espop(question + gradient(["#FFEB3B", "#FFC107", "#FF9800", "#FF5722"])((t('yandn'))));
  return answer === "1";
}

function espop(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer.trim());
    });
  });
}

function Tempoex(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  } else {
    return `${minutesStr}:${secondsStr}`;
  }
}
function awaitenter(client: Client) {
  rl.question(
    gradient(["purple", "pink"])(t('awaitenter')),
    () => {
      menutext(client);
      choiceinit(client);
    }
  );
}
function changelang(client: Client) {
  if (langat === "pt") {
    setlang("en");
    langat = "en";
  } else {
    setlang("pt");
    langat = "pt";
  }
  creatorname();
  menutext(client);
  choiceinit(client);
}
