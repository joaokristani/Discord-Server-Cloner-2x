import { BaseChannelData } from './';

export interface VoiceChannelData extends BaseChannelData {
    bitrate: number;
    userLimit: number;
}
