import { DefaultMessageNotificationLevel, ExplicitContentFilterLevel, Snowflake, VerificationLevel } from 'discord.js-selfbot-v13';
import { BackupData } from './BackupData';
import { AfkData } from './AfkData';
import { BanData } from './BanData';
import { ChannelsData } from './ChannelsData';
import { EmojiData } from './EmojiData';
import { RoleData } from './RoleData';
import { WidgetData } from './WidgetData';
import { CategoryData } from './CategoryData';
import { TextChannelData } from './TextChannelData';
import { VoiceChannelData } from './VoiceChannelData';
import { ChannelPermissionsData } from './ChannelPermissionData';
import { MessageData } from './MessageData';
import { ThreadChannelData } from './ThreadChannelData';

// Define the enum string values based on common usage in the codebase
type VerificationLevelString = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
type ExplicitContentFilterLevelString = 'DISABLED' | 'MEMBERS_WITHOUT_ROLES' | 'ALL_MEMBERS';
type DefaultMessageNotificationLevelString = 'ALL_MESSAGES' | 'ONLY_MENTIONS';

describe('BackupData Interface', () => {
    const mockWidgetData: WidgetData = {
        enabled: true,
        channel: 'channel-id'
    };

    const mockAfkData: AfkData = {
        name: 'AFK Channel',
        timeout: 300
    };

    const mockRoleData: RoleData = {
        name: 'Test Role',
        color: '#FF0000',
        hoist: false,
        permissions: '8',
        mentionable: false,
        position: 1,
        isEveryone: false
    };

    const mockBanData: BanData = {
        id: '1234567890' as Snowflake,
        reason: 'Test ban'
    };

    const mockEmojiData: EmojiData = {
        name: 'test_emoji',
        url: 'https://example.com/emoji.png'
    };

    const mockChannelPermissionsData: ChannelPermissionsData = {
        roleName: 'test-role',
        allow: '0',
        deny: '0'
    };

    const mockMessageData: MessageData = {
        username: 'test-user',
        content: 'Test message',
        pinned: false
    };

    const mockThreadChannelData: ThreadChannelData = {
        type: 'GUILD_NEWS_THREAD',
        name: 'thread-name',
        archived: false,
        autoArchiveDuration: 60,
        locked: false,
        rateLimitPerUser: 0,
        messages: [mockMessageData]
    };

    const mockCategoryData: CategoryData = {
        name: 'Test Category',
        permissions: [mockChannelPermissionsData],
        children: []
    };

    const mockTextChannelData: TextChannelData = {
        name: 'test-channel',
        type: 'GUILD_TEXT',
        permissions: [mockChannelPermissionsData],
        nsfw: false,
        isNews: false,
        messages: [mockMessageData],
        threads: [mockThreadChannelData]
    };

    const mockVoiceChannelData: VoiceChannelData = {
        name: 'test-voice-channel',
        type: 'GUILD_VOICE',
        permissions: [mockChannelPermissionsData],
        bitrate: 64000,
        userLimit: 10
    };

    const mockChannelsData: ChannelsData = {
        categories: [mockCategoryData],
        others: [mockTextChannelData, mockVoiceChannelData]
    };

    const mockBackupData: BackupData = {
        name: 'Test Guild',
        iconURL: 'https://example.com/icon.png',
        iconBase64: 'data:image/png;base64,test',
        verificationLevel: 'LOW' as VerificationLevel,
        explicitContentFilter: 'MEDIUM' as ExplicitContentFilterLevel,
        defaultMessageNotifications: 'ONLY_MENTIONS' as DefaultMessageNotificationLevel,
        afk: mockAfkData,
        widget: mockWidgetData,
        splashURL: 'https://example.com/splash.png',
        splashBase64: 'data:image/png;base64,splash',
        bannerURL: 'https://example.com/banner.png',
        bannerBase64: 'data:image/png;base64,banner',
        channels: mockChannelsData,
        roles: [mockRoleData],
        bans: [mockBanData],
        emojis: [mockEmojiData],
        createdTimestamp: Date.now(),
        guildID: 'guild-id',
        id: '1234567890' as Snowflake
    };

    test('should validate a complete BackupData object', () => {
        // Test that a properly constructed BackupData object matches the interface
        expect(typeof mockBackupData.name).toBe('string');
        expect(mockBackupData.iconURL).toBe('https://example.com/icon.png');
        expect(mockBackupData.iconBase64).toBe('data:image/png;base64,test');
        expect(mockBackupData.verificationLevel).toBe('LOW');
        expect(mockBackupData.explicitContentFilter).toBe('MEDIUM');
        expect(mockBackupData.defaultMessageNotifications).toBe('ONLY_MENTIONS');
        expect(mockBackupData.afk).toEqual(mockAfkData);
        expect(mockBackupData.widget).toEqual(mockWidgetData);
        expect(mockBackupData.splashURL).toBe('https://example.com/splash.png');
        expect(mockBackupData.splashBase64).toBe('data:image/png;base64,splash');
        expect(mockBackupData.bannerURL).toBe('https://example.com/banner.png');
        expect(mockBackupData.bannerBase64).toBe('data:image/png;base64,banner');
        expect(mockBackupData.channels).toEqual(mockChannelsData);
        expect(mockBackupData.roles).toEqual([mockRoleData]);
        expect(mockBackupData.bans).toEqual([mockBanData]);
        expect(mockBackupData.emojis).toEqual([mockEmojiData]);
        expect(typeof mockBackupData.createdTimestamp).toBe('number');
        expect(mockBackupData.guildID).toBe('guild-id');
        expect(mockBackupData.id).toBe('1234567890');
    });

    test('should validate required fields', () => {
        const minimalBackupData: BackupData = {
            name: 'Test Guild',
            verificationLevel: 'NONE' as VerificationLevel,
            explicitContentFilter: 'DISABLED' as ExplicitContentFilterLevel,
            defaultMessageNotifications: 'ALL_MESSAGES' as DefaultMessageNotificationLevel,
            widget: mockWidgetData,
            channels: mockChannelsData,
            roles: [],
            bans: [],
            emojis: [],
            createdTimestamp: Date.now(),
            guildID: 'guild-id',
            id: '1234567890' as Snowflake
        };

        // Required fields should be present
        expect(minimalBackupData.name).toBe('Test Guild');
        expect(minimalBackupData.verificationLevel).toBe('NONE');
        expect(minimalBackupData.explicitContentFilter).toBe('DISABLED');
        expect(minimalBackupData.defaultMessageNotifications).toBe('ALL_MESSAGES');
        expect(minimalBackupData.widget).toEqual(mockWidgetData);
        expect(minimalBackupData.channels).toEqual(mockChannelsData);
        expect(Array.isArray(minimalBackupData.roles)).toBe(true);
        expect(Array.isArray(minimalBackupData.bans)).toBe(true);
        expect(Array.isArray(minimalBackupData.emojis)).toBe(true);
        expect(typeof minimalBackupData.createdTimestamp).toBe('number');
        expect(minimalBackupData.guildID).toBe('guild-id');
        expect(minimalBackupData.id).toBe('1234567890');
    });

    test('should handle optional fields correctly', () => {
        const backupDataWithoutOptionals: BackupData = {
            name: 'Test Guild',
            verificationLevel: 'HIGH' as VerificationLevel,
            explicitContentFilter: 'ALL_MEMBERS' as ExplicitContentFilterLevel,
            defaultMessageNotifications: 1, // number instead of enum
            widget: mockWidgetData,
            channels: mockChannelsData,
            roles: [],
            bans: [],
            emojis: [],
            createdTimestamp: Date.now(),
            guildID: 'guild-id',
            id: '1234567890' as Snowflake
        };

        // Optional fields should be undefined when not present
        expect(backupDataWithoutOptionals.iconURL).toBeUndefined();
        expect(backupDataWithoutOptionals.iconBase64).toBeUndefined();
        expect(backupDataWithoutOptionals.afk).toBeUndefined();
        expect(backupDataWithoutOptionals.splashURL).toBeUndefined();
        expect(backupDataWithoutOptionals.splashBase64).toBeUndefined();
        expect(backupDataWithoutOptionals.bannerURL).toBeUndefined();
        expect(backupDataWithoutOptionals.bannerBase64).toBeUndefined();
        
        // Required fields should still be present
        expect(backupDataWithoutOptionals.name).toBe('Test Guild');
        expect(backupDataWithoutOptionals.verificationLevel).toBe('HIGH');
        expect(backupDataWithoutOptionals.explicitContentFilter).toBe('ALL_MEMBERS');
        expect(backupDataWithoutOptionals.defaultMessageNotifications).toBe(1); // number type is valid
    });

    test('should validate different verification levels', () => {
        const verificationLevels: VerificationLevel[] = [
            'NONE',
            'LOW',
            'MEDIUM',
            'HIGH',
            'VERY_HIGH'
        ];

        verificationLevels.forEach(level => {
            const testData: BackupData = {
                ...mockBackupData,
                verificationLevel: level
            };
            expect(testData.verificationLevel).toBe(level);
        });
    });

    test('should validate different explicit content filter levels', () => {
        const filterLevels: ExplicitContentFilterLevel[] = [
            'DISABLED',
            'MEMBERS_WITHOUT_ROLES',
            'ALL_MEMBERS'
        ];

        filterLevels.forEach(level => {
            const testData: BackupData = {
                ...mockBackupData,
                explicitContentFilter: level
            };
            expect(testData.explicitContentFilter).toBe(level);
        });
    });

    test('should validate different default message notification levels', () => {
        const notificationLevels: DefaultMessageNotificationLevel[] = [
            'ALL_MESSAGES',
            'ONLY_MENTIONS'
        ];

        notificationLevels.forEach(level => {
            const testData: BackupData = {
                ...mockBackupData,
                defaultMessageNotifications: level
            };
            expect(testData.defaultMessageNotifications).toBe(level);
        });

        // Also test with a number value
        const testDataWithNumber: BackupData = {
            ...mockBackupData,
            defaultMessageNotifications: 1
        };
        expect(testDataWithNumber.defaultMessageNotifications).toBe(1);
    });

    test('should validate timestamp is a number', () => {
        expect(typeof mockBackupData.createdTimestamp).toBe('number');
        expect(mockBackupData.createdTimestamp).toBeGreaterThanOrEqual(0);
    });

    test('should validate guild ID and Snowflake ID are strings', () => {
        expect(typeof mockBackupData.guildID).toBe('string');
        expect(typeof mockBackupData.id).toBe('string');
        expect(mockBackupData.guildID).not.toBe('');
        expect(mockBackupData.id).not.toBe('');
    });

    test('should validate arrays are properly typed', () => {
        expect(Array.isArray(mockBackupData.roles)).toBe(true);
        expect(Array.isArray(mockBackupData.bans)).toBe(true);
        expect(Array.isArray(mockBackupData.emojis)).toBe(true);
        
        // Test with empty arrays
        const emptyArraysData: BackupData = {
            ...mockBackupData,
            roles: [],
            bans: [],
            emojis: []
        };
        
        expect(emptyArraysData.roles).toEqual([]);
        expect(emptyArraysData.bans).toEqual([]);
        expect(emptyArraysData.emojis).toEqual([]);
    });
});