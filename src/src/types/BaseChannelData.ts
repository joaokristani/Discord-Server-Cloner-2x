import { TextBasedChannelTypes, VoiceBasedChannelTypes, ThreadChannelTypes } from 'discord.js-selfbot-v13';
import { ChannelPermissionsData } from './';

export interface BaseChannelData {
    type: TextBasedChannelTypes | VoiceBasedChannelTypes | ThreadChannelTypes;
    name: string;
    parent?: string;
    permissions: ChannelPermissionsData[];
}
