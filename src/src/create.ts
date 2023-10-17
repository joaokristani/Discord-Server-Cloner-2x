import type {
    BanData,
    CategoryData,
    ChannelsData,
    CreateOptions,
    EmojiData,
    RoleData,
    TextChannelData,
    VoiceChannelData
} from './types';
import type { CategoryChannel, Collection, Guild, GuildChannel, Snowflake, TextChannel, ThreadChannel, VoiceChannel } from 'discord.js-selfbot-v13';
import nodeFetch from 'node-fetch';
import { fetchChannelPermissions, fetchTextChannelData, fetchVoiceChannelData } from './util';

/**
 * Returns an array with the banned members of the guild
 * @param {Guild} guild The Discord guild
 * @returns {Promise<BanData[]>} The banned members
 */
export async function getBans(guild: Guild) {
    const bans: BanData[] = [];
    const cases = await guild.bans.fetch(); // Gets the list of the banned members
    cases.forEach((ban) => {
        bans.push({
            id: ban.user.id, // Banned member ID
            reason: ban.reason // Ban reason
        });
    });
    return bans;
}

/**
 * Returns an array with the roles of the guild
 * @param {Guild} guild The discord guild
 * @returns {Promise<RoleData[]>} The roles of the guild
 */
export async function getRoles(guild: Guild) {
    const roles: RoleData[] = [];
    guild.roles.cache
        .filter((role) => !role.managed)
        .sort((a, b) => b.position - a.position)
        .forEach((role) => {
            const roleData = {
                name: role.name,
                color: role.hexColor,
                hoist: role.hoist,
                permissions: role.permissions.bitfield.toString(),
                mentionable: role.mentionable,
                position: role.position,
                isEveryone: guild.id === role.id
            };
            roles.push(roleData);
        });
    return roles;
}

/**
 * Returns an array with the emojis of the guild
 * @param {Guild} guild The discord guild
 * @param {CreateOptions} options The backup options
 * @returns {Promise<EmojiData[]>} The emojis of the guild
 */
export async function getEmojis(guild: Guild, options: CreateOptions) {
    const emojis: EmojiData[] = [];
    guild.emojis.cache.forEach(async (emoji) => {
        const eData: EmojiData = {
            name: emoji.name
        };
        if (options.saveImages && options.saveImages === 'base64') {
            eData.base64 = (await nodeFetch(emoji.url).then((res) => res.buffer())).toString('base64');
        } else {
            eData.url = emoji.url;
        }
        emojis.push(eData);
    });
    return emojis;
}

/**
 * Returns an array with the channels of the guild
 * @param {Guild} guild The discord guild
 * @param {CreateOptions} options The backup options
 * @returns {ChannelData[]} The channels of the guild
 */
export async function getChannels(guild: Guild, options: CreateOptions) {
    return new Promise<ChannelsData>(async (resolve) => {
        const channels: ChannelsData = {
            categories: [],
            others: []
        };
        // Gets the list of the categories and sort them by position
        const categories = (guild.channels.cache
            .filter((ch) => ch.type === 'GUILD_CATEGORY') as Collection<Snowflake, CategoryChannel>)
            .sort((a, b) => a.position - b.position)
            .toJSON() as CategoryChannel[]; 
        for (const category of categories) {
            const categoryData: CategoryData = {
                name: category.name, // The name of the category
                permissions: fetchChannelPermissions(category), // The overwrite permissions of the category
                children: [] // The children channels of the category
            };
            // Gets the children channels of the category and sort them by position
            const children = category.children.sort((a, b) => a.position - b.position).toJSON();
            for (const child of children) {
                // For each child channel
                if (child.type === 'GUILD_TEXT'|| child.type === 'GUILD_NEWS') {
                    const channelData: TextChannelData = await fetchTextChannelData(child as TextChannel, options); // Gets the channel data
                    categoryData.children.push(channelData); // And then push the child in the categoryData
                } else {
                    const channelData: VoiceChannelData = await fetchVoiceChannelData(child as VoiceChannel); // Gets the channel data
                    categoryData.children.push(channelData); // And then push the child in the categoryData
                }
            }
            channels.categories.push(categoryData); // Update channels object
        }
        // Gets the list of the other channels (that are not in a category) and sort them by position
        const others = (guild.channels.cache
            .filter((ch) => {
                return !ch.parent && ch.type !== 'GUILD_CATEGORY'
                    && ch.type !== 'GUILD_STORE' // there is no way to restore store channels, ignore them
                    && ch.type !== 'GUILD_NEWS_THREAD' && ch.type !== 'GUILD_PRIVATE_THREAD' && ch.type !== 'GUILD_PUBLIC_THREAD' // threads will be saved with fetchTextChannelData
            }) as Collection<Snowflake, Exclude<GuildChannel, ThreadChannel>>)
            .sort((a, b) => a.position - b.position)
            .toJSON();
        for (const channel of others) {
            // For each channel
            if (channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_NEWS') {
                const channelData: TextChannelData = await fetchTextChannelData(channel as TextChannel, options); // Gets the channel data
                channels.others.push(channelData); // Update channels object
            } else {
                const channelData: VoiceChannelData = await fetchVoiceChannelData(channel as VoiceChannel); // Gets the channel data
                channels.others.push(channelData); // Update channels object
            }
        }
        resolve(channels); // Returns the list of the channels
    });
}
