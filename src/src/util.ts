import type {
    CategoryData,
    ChannelPermissionsData,
    CreateOptions,
    LoadOptions,
    MessageData,
    TextChannelData,
    ThreadChannelData,
    VoiceChannelData
} from './types';
import type {
    CategoryChannel,
    ChannelLogsQueryOptions,
    Collection,
    Guild,
    GuildChannelCreateOptions,
    Message,
    OverwriteData,
    Snowflake,
    TextChannel,
    VoiceChannel,
    NewsChannel,
    PremiumTier,
    ThreadChannel
} from 'discord.js-selfbot-v13';
import nodeFetch from 'node-fetch';
import { configOptions2, t } from '../utils/func'
const MaxBitratePerTier: Record<PremiumTier, number> = {
    NONE: 64000,
    TIER_1: 128000,
    TIER_2: 256000,
    TIER_3: 384000
};
import gradient from 'gradient-string';
/**
 * Gets the permissions for a channel
 */
export function fetchChannelPermissions(channel: TextChannel | VoiceChannel | CategoryChannel | NewsChannel) {
    const permissions: ChannelPermissionsData[] = [];

    try {
        /* Debug: Fetching channel permissions */
        if (configOptions2.Debug) {
            console.log('[Debug] Fetching channel permissions...');
        }

        channel.permissionOverwrites.cache
            .filter((p) => p.type === 'role')
            .forEach((perm) => {
                const role = channel.guild.roles.cache.get(perm.id);
                if (role) {
                    permissions.push({
                        roleName: role.name,
                        allow: perm.allow.bitfield.toString(),
                        deny: perm.deny.bitfield.toString()
                    });

                    /* Debug: Permission fetched successfully for role */
                    if (configOptions2.Debug) {
                        console.log(`[Debug] Permission fetched successfully for role ${role.name}:`, permissions[permissions.length - 1]);
                    }
                }
            });

        /* Debug: Channel permissions fetched successfully */
        if (configOptions2.Debug) {
            console.log('[Debug] Channel permissions fetched successfully:', permissions);
        }
    } catch (error) {
        console.error(`Error fetching channel permissions for ${channel.name}:`, error);
    }

    return permissions;
}


/**
 * Fetches the voice channel data that is necessary for the backup
 */
export async function fetchVoiceChannelData(channel: VoiceChannel) {
    return new Promise<VoiceChannelData>(async (resolve) => {
        let channelData: VoiceChannelData; 

        try {
            /* Debug: Fetching voice channel data */
            if (configOptions2.Debug) {
                console.log('[Debug] Fetching voice channel data...');
            }

            channelData = {
                type: 'GUILD_VOICE',
                name: channel.name,
                bitrate: channel.bitrate,
                userLimit: channel.userLimit,
                parent: channel.parent ? channel.parent.name : null,
                permissions: fetchChannelPermissions(channel)
            };

            /* Debug: Voice channel data fetched successfully */
            if (configOptions2.Debug) {
                console.log('[Debug] Voice channel data fetched successfully:', channelData);
            }

            resolve(channelData);
        } catch (error) {
            console.error(`Error fetching voice channel data for ${channel.name}:`, error);
            resolve(channelData);
        }
    });
}


export async function fetchChannelMessages (channel: TextChannel | NewsChannel | ThreadChannel, options: CreateOptions): Promise<MessageData[]> {
    let messages: MessageData[] = [];
    const messageCount: number = isNaN(options.maxMessagesPerChannel) ? 10 : options.maxMessagesPerChannel;
    const fetchOptions: ChannelLogsQueryOptions = { limit: 100 };
    let lastMessageId: Snowflake;
    let fetchComplete: boolean = false;
    while (!fetchComplete) {
        if (lastMessageId) {
            fetchOptions.before = lastMessageId;
        }
        const fetched: Collection<Snowflake, Message> = await channel.messages.fetch(fetchOptions);
        if (fetched.size === 0) {
            break;
        }
        lastMessageId = fetched.last().id;
        await Promise.all(fetched.map(async (msg) => {
            if (!msg.author || messages.length >= messageCount) {
                fetchComplete = true;
                return;
            }
            const files = await Promise.all(msg.attachments.map(async (a) => {
                let attach = a.url
                if (a.url && ['png', 'jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi'].includes(a.url)) {
                    if (options.saveImages && options.saveImages === 'base64') {
                        attach = (await (nodeFetch(a.url).then((res) => res.buffer()))).toString('base64')
                    }
                }
                return {
                    name: a.name,
                    attachment: attach
                };
            }))
            messages.push({
                username: msg.author.username,
                avatar: msg.author.displayAvatarURL(),
                content: msg.cleanContent,
                embeds: msg.embeds,
                files,
                pinned: msg.pinned
            });
        }));
        return messages;
    }
} 

/**
 * Fetches the text channel data that is necessary for the backup
 */
export async function fetchTextChannelData(channel: TextChannel | NewsChannel, options: CreateOptions) {
    return new Promise<TextChannelData>(async (resolve) => {
        const channelData: TextChannelData = {
            type: channel.type,
            name: channel.name,
            nsfw: channel.nsfw,
            rateLimitPerUser: channel.type === 'GUILD_TEXT' ? channel.rateLimitPerUser : undefined,
            parent: channel.parent ? channel.parent.name : null,
            topic: channel.topic,
            permissions: fetchChannelPermissions(channel),
            messages: [],
            isNews: channel.type === 'GUILD_NEWS',
            threads: []
        };

        // Debugging: Print channel data
        if (configOptions2.Debug) {
            console.log('[Debug] Fetching channel data...');
            console.log(channelData);
        }

        /* Fetch channel threads */
        if (channel.threads.cache.size > 0) {
            if (configOptions2.Debug) {
                console.log('[Debug] Fetching thread data...');
            }
            await Promise.all(channel.threads.cache.map(async (thread) => {
                const threadData: ThreadChannelData = {
                    type: thread.type,
                    name: thread.name,
                    archived: thread.archived,
                    autoArchiveDuration: thread.autoArchiveDuration,
                    locked: thread.locked,
                    rateLimitPerUser: thread.rateLimitPerUser,
                    messages: []
                };
                try {
                    threadData.messages = await fetchChannelMessages(thread, options);

                    // Debugging: Print thread data
                    if (configOptions2.Debug) {
                        console.log(`[Debug] Fetched ${threadData.messages.length} messages for thread ${thread.name}`);
                    }

                    channelData.threads.push(threadData);
                } catch (error) {
                    console.error(`Error fetching thread messages for ${thread.name}:`, error);
                    channelData.threads.push(threadData);
                }
            }));
        }

        /* Fetch channel messages */
        try {
            if (configOptions2.Debug) {
                console.log('[Debug] Fetching channel messages...');
            }
           
            if (configOptions2.Debug) {
                console.log(`[Debug] Fetched ${channelData.messages.length} messages for channel ${channel.name}`);
            }
            resolve(channelData);
        } catch (error) {
            console.error(`Error fetching channel messages for ${channel.name}:`, error);
            resolve(channelData);
        }
    });
}

/**
 * Creates a category for the guild
 */
export async function loadCategory(categoryData: CategoryData, guild: Guild) {
    return new Promise<CategoryChannel>((resolve) => {
        guild.channels.create(categoryData.name, {
            type: 'GUILD_CATEGORY'
        }).then(async (category) => {
            // When the category is created
            const finalPermissions: OverwriteData[] = [];
            categoryData.permissions.forEach((perm) => {
                const role = guild.roles.cache.find((r) => r.name === perm.roleName);
                if (role) {
                    finalPermissions.push({
                        id: role.id,
                        allow: BigInt(perm.allow),
                        deny: BigInt(perm.deny)
                    });
                }
            });
            await category.permissionOverwrites.set(finalPermissions);
            resolve(category); // Return the category
        });
    });
}

/**
 * Create a channel and returns it
 */
export async function loadChannel(
    channelData: TextChannelData | VoiceChannelData,
    guild: Guild,
    category?: CategoryChannel,
    options?: LoadOptions
) {
    return new Promise(async (resolve) => {
        if (channelData.name.startsWith("ticket-") && configOptions2.ignoreTickets) {
            console.log(channelData.name + t('ignoreticketmsg'));
            return null; 
        }
        const loadMessages = (channel: TextChannel | ThreadChannel, messages: MessageData[]): Promise<void> => {
            return new Promise((resolve) => {
                (channel as unknown as TextChannel)
                    .createWebhook('MessagesBackup', {
                        avatar: channel.client.user.displayAvatarURL()
                    })
                    .then(async (webhook) => {
                        messages = messages
                            .filter((m) => m.content.length > 0 || m.embeds.length > 0 || m.files.length > 0)
                            .reverse();
                        messages = messages.slice(messages.length - options.maxMessagesPerChannel);
                        for (const msg of messages) {
                            const sentMsg = await webhook
                                .send({
                                    content: msg.content,
                                    username: msg.username,
                                    avatarURL: msg.avatar,
                                    embeds: msg.embeds,
                                    files: msg.files,
                                    allowedMentions: options.allowedMentions
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                            if (msg.pinned && sentMsg) await (sentMsg as Message).pin();
                        }
                        resolve();
                    })
                    .catch(() => resolve());
            });
        }

        const createOptions: GuildChannelCreateOptions = {
            type: null,
            parent: category
        };
        if (channelData.type === 'GUILD_TEXT' || channelData.type === 'GUILD_NEWS') {
            createOptions.topic = (channelData as TextChannelData).topic;
            createOptions.nsfw = (channelData as TextChannelData).nsfw;
            createOptions.rateLimitPerUser = (channelData as TextChannelData).rateLimitPerUser;
            createOptions.type =
                (channelData as TextChannelData).isNews && guild.features.includes('NEWS') ? 'GUILD_NEWS' : 'GUILD_TEXT';
        } else if (channelData.type === 'GUILD_VOICE') {
            // Downgrade bitrate
            let bitrate = (channelData as VoiceChannelData).bitrate;
            const bitrates = Object.values(MaxBitratePerTier);
            while (bitrate > MaxBitratePerTier[guild.premiumTier]) {
                bitrate = bitrates[Object.keys(MaxBitratePerTier).indexOf(guild.premiumTier) - 1];
            }
            createOptions.bitrate = bitrate;

            if ((channelData as VoiceChannelData).userLimit <= 99) {
                createOptions.userLimit = (channelData as VoiceChannelData).userLimit;
            }
        
            createOptions.type = 'GUILD_VOICE';
        }
        guild.channels.create(channelData.name, createOptions).then(async (channel) => {
            /* Update channel permissions */
            const finalPermissions: OverwriteData[] = [];
            channelData.permissions.forEach((perm) => {
                const role = guild.roles.cache.find((r) => r.name === perm.roleName);
                if (role) {
                    finalPermissions.push({
                        id: role.id,
                        allow: BigInt(perm.allow),
                        deny: BigInt(perm.deny)
                    });
                }
            });
            await channel.permissionOverwrites.set(finalPermissions);
            if (channelData.type === 'GUILD_TEXT') {
                /* Load threads */
                if ((channelData as TextChannelData).threads.length > 0) { //&& guild.features.includes('THREADS_ENABLED')) {
                    await Promise.all((channelData as TextChannelData).threads.map(async (threadData) => {
                        return (channel as TextChannel).threads.create({
                            name: threadData.name,
                            autoArchiveDuration: threadData.autoArchiveDuration
                        }).then((thread) => {
                            return loadMessages(thread, threadData.messages);
                        });
                        
                    }));
                }
                if ((channelData as TextChannelData).messages.length > 0) {
                    await loadMessages(channel as TextChannel, (channelData as TextChannelData).messages).catch(() => {});
                }
                
                console.log(gradient(['#43a1ff', '#8a3ffc', '#3c0080'])(t('textchannelcreate') + channelData.name));
                return channel;
            } else {
                resolve(channel);
            }
        });
    });
}

/**
 * Delete all roles, all channels, all emojis, etc... of a guild
 */
export async function clearGuild(guild: Guild) {
    guild.roles.cache
        .filter((role) => !role.managed && role.editable && role.id !== guild.id)
        .forEach(async (role) => {
            try {
                await role.delete();
            } catch (error) {
                console.error(`Não foi possível excluir o cargo ${role.name}: ${error}`);
            }
        });
    
    guild.channels.cache.forEach(async (channel) => {
        try {
            await channel.delete();
        } catch (error) {
            console.error(`Não foi possível excluir o canal ${channel.name}: ${error}`);
        }
    });
    
    guild.emojis.cache.forEach(async (emoji) => {
        try {
            await emoji.delete();
        } catch (error) {
            console.error(`Não foi possível excluir o emoji ${emoji.name}: ${error}`);
        }
    });

    const webhooks = await guild.fetchWebhooks();
    webhooks.forEach(async (webhook) => {
        try {
            await webhook.delete();
        } catch (error) {
            console.error(`Não foi possível excluir o webhook ${webhook.name}: ${error}`);
        }
    });
    
    const bans = await guild.bans.fetch();
    bans.forEach(async (ban) => {
        try {
            await guild.members.unban(ban.user);
        } catch (error) {
            console.error(`Não foi possível desbanir o usuário ${ban.user.username}: ${error}`);
        }
    });
    
    const integrations = await guild.fetchIntegrations();
    integrations.forEach(async (integration) => {
        try {
            await integration.delete();
        } catch (error) {
            console.error(`Não foi possível excluir a integração ${integration.name}: ${error}`);
        }
    });

    guild.setAFKChannel(null);
    guild.setAFKTimeout(60 * 5);
    guild.setIcon(null);
    guild.setBanner(null).catch(() => {});
    guild.setSplash(null).catch(() => {});
    guild.setDefaultMessageNotifications('ONLY_MENTIONS');
    guild.setWidgetSettings({
        enabled: false,
        channel: null
    });
    if (!guild.features.includes('COMMUNITY')) {
        guild.setExplicitContentFilter('DISABLED');
        guild.setVerificationLevel('NONE');
    }
    guild.setSystemChannel(null);
    guild.setSystemChannelFlags(['SUPPRESS_GUILD_REMINDER_NOTIFICATIONS', 'SUPPRESS_JOIN_NOTIFICATIONS', 'SUPPRESS_PREMIUM_SUBSCRIPTIONS']);
    
    return;
}