import { DefaultMessageNotificationLevel, ExplicitContentFilterLevel, Snowflake, VerificationLevel } from 'discord.js-selfbot-v13';
import { AfkData, BanData, ChannelsData, EmojiData, RoleData, WidgetData } from './';

export interface BackupData {
    name: string;
    iconURL?: string;
    iconBase64?: string;
    verificationLevel: VerificationLevel;
    explicitContentFilter: ExplicitContentFilterLevel;
    defaultMessageNotifications: DefaultMessageNotificationLevel | number;
    afk?: AfkData;
    widget: WidgetData;
    splashURL?: string;
    splashBase64?: string;
    bannerURL?: string;
    bannerBase64?: string;
    channels: ChannelsData;
    roles: RoleData[];
    bans: BanData[];
    emojis: EmojiData[];
    createdTimestamp: number;
    guildID: string;
    id: Snowflake;
}
