import type { Emoji, Guild, Role, VoiceChannel } from 'discord.js-selfbot-v13';
import gradient from 'gradient-string';
import type { BackupData, CategoryData, LoadOptions, TextChannelData, VoiceChannelData } from './types';
import { loadCategory, loadChannel } from './util';
import {t} from '../utils/func'
/**
 * Restores the guild configuration
 */
export const loadConfig = (guild: Guild, backupData: BackupData): Promise<Guild[]> => {
    const configPromises: Promise<Guild>[] = [];
    if (backupData.name) {
        configPromises.push(guild.setName(backupData.name));
    }
    if (backupData.iconBase64) {
        configPromises.push(guild.setIcon(Buffer.from(backupData.iconBase64, 'base64')));
    } else if (backupData.iconURL) {
        configPromises.push(guild.setIcon(backupData.iconURL));
    }
    if (backupData.splashBase64) {
        configPromises.push(guild.setSplash(Buffer.from(backupData.splashBase64, 'base64')));
    } else if (backupData.splashURL) {
        configPromises.push(guild.setSplash(backupData.splashURL));
    }
    if (backupData.bannerBase64) {
        configPromises.push(guild.setBanner(Buffer.from(backupData.bannerBase64, 'base64')));
    } else if (backupData.bannerURL) {
        configPromises.push(guild.setBanner(backupData.bannerURL));
    }
    if (backupData.verificationLevel) {
        configPromises.push(guild.setVerificationLevel(backupData.verificationLevel));
    }
    if (backupData.defaultMessageNotifications) {
        configPromises.push(guild.setDefaultMessageNotifications(backupData.defaultMessageNotifications));
    }
    const changeableExplicitLevel = guild.features.includes('COMMUNITY');
    if (backupData.explicitContentFilter && changeableExplicitLevel) {
        configPromises.push(guild.setExplicitContentFilter(backupData.explicitContentFilter));
    }
    return Promise.all(configPromises);
};

/**
 * Restore the guild roles
 */
export const loadRoles = async (guild: Guild, backupData: BackupData): Promise<Role[]> => {
    const rolePromises: Promise<Role>[] = [];
    
    backupData.roles.forEach((roleData) => {
        if (roleData.isEveryone) {
            const everyoneRole = guild.roles.cache.get(guild.id);
            
            if (everyoneRole) {
                rolePromises.push(
                    everyoneRole.edit({
                        name: roleData.name,
                        color: roleData.color,
                        permissions: BigInt(roleData.permissions),
                        mentionable: roleData.mentionable
                    }).then((editedRole) => {
                        return editedRole;
                    })
                );
            }
        } else {
            rolePromises.push(
                guild.roles.create({
                    name: roleData.name,
                    color: roleData.color,
                    hoist: roleData.hoist,
                    permissions: BigInt(roleData.permissions),
                    mentionable: roleData.mentionable
                }).then((createdRole) => {
                    console.log(gradient(['#ffcc00', '#0099cc', '#9933cc'])(t('rolecreate') + createdRole.name));
                    return createdRole;
                })
            );
        }
    });
    
    return Promise.all(rolePromises);
};


/**
 * Restore the guild channels
 */
export const loadChannels = async (guild: Guild, backupData: BackupData, options: LoadOptions): Promise<unknown[]> => {
    const loadChannelPromises: Promise<void | unknown>[] = [];
    backupData.channels.categories.forEach((categoryData: CategoryData) => {
        
        loadChannelPromises.push(
            new Promise(async (resolve) => {
                try {
                    const createdCategory = await loadCategory(categoryData, guild);
                    console.log(gradient(['#ff4500', '#ffa500', '#ff6347'])(t('categorycreate') + createdCategory.name));
                    await Promise.all(categoryData.children.map(async (channelData: TextChannelData | VoiceChannelData) => {
                        try {
                            await loadChannel(channelData, guild, createdCategory, options);
                            console.log(gradient(['#43a1ff', '#8a3ffc', '#3c0080'])(t('voicechannelcreate') + channelData.name));
                        } catch (error) {
                            console.error(`Error loading channel ${channelData.name}:`, error);
                        }
                    }));
                    resolve(true);
                } catch (error) {
                    console.error(`Error loading category ${categoryData.name}:`, error);
                    resolve(false);
                }
            })
        );
    });

    backupData.channels.others.forEach((channelData: TextChannelData | VoiceChannelData) => {
        loadChannelPromises.push(
            new Promise(async (resolve) => {
                try {
                    await loadChannel(channelData, guild, null, options);
                } catch (error) {
                    console.error(`Error loading other channel ${channelData.name}:`, error);
                }
                resolve(true);
            })
        );
    });

    return Promise.all(loadChannelPromises);
};

/**
 * Restore the afk configuration
 */
export const loadAFK = (guild: Guild, backupData: BackupData): Promise<Guild[]> => {
    const afkPromises: Promise<Guild>[] = [];
    if (backupData.afk) {
        afkPromises.push(guild.setAFKChannel(guild.channels.cache.find((ch) => ch.name === backupData.afk.name && ch.type === 'GUILD_VOICE') as VoiceChannel));
        afkPromises.push(guild.setAFKTimeout(backupData.afk.timeout));
    }
    return Promise.all(afkPromises);
};

/**
 * Restore guild emojis
 */
export const loadEmojis = (guild: Guild, backupData: BackupData): Promise<Emoji[]> => {
    const emojiPromises: Promise<Emoji>[] = [];
    backupData.emojis.forEach((emoji) => {
        if (emoji.url) {
            emojiPromises.push(guild.emojis.create(emoji.url, emoji.name));
            console.log(gradient(["#ff4500", "#ffa500", "#ff6347"])(t('emojicreate') + emoji.url + ', ' + emoji.name));
        } else if (emoji.base64) {
            emojiPromises.push(guild.emojis.create(Buffer.from(emoji.base64, 'base64'), emoji.name));
            console.log(gradient(["#ff4500", "#ffa500", "#ff6347"])(`Emoji criado com base64, Nome: ${emoji.name}`));
        }
    });
    return Promise.all(emojiPromises);
};
/**
 * Restore guild bans
 */
export const loadBans = (guild: Guild, backupData: BackupData): Promise<string[]> => {
    const banPromises: Promise<string>[] = [];
    backupData.bans.forEach((ban) => {
        banPromises.push(
            guild.members.ban(ban.id, {
                reason: ban.reason
            }) as Promise<string> 
        );
    });
    return Promise.all(banPromises);
};

/**
 * Restore embedChannel configuration
 */
export const loadEmbedChannel = (guild: Guild, backupData: BackupData): Promise<Guild[]> => {
    const embedChannelPromises: Promise<Guild>[] = [];
    if (backupData.widget.channel) {
        embedChannelPromises.push(
            guild.setWidgetSettings({
                enabled: backupData.widget.enabled,
                channel: guild.channels.cache.find((ch) => ch.name === backupData.widget.channel)
            })
        );
    } 
    return Promise.all(embedChannelPromises);
};
