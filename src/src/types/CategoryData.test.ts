import { CategoryData, ChannelPermissionsData, TextChannelData, VoiceChannelData } from './';

describe('CategoryData', () => {
    it('should be defined', () => {
        expect({} as CategoryData).toBeDefined();
    });

    it('should have the correct structure', () => {
        const mockPermissions: ChannelPermissionsData = {
            roleName: 'test-role',
            allow: 'VIEW_CHANNEL',
            deny: 'SEND_MESSAGES'
        };

        const mockTextChannel: TextChannelData = {
            type: 'GUILD_TEXT',
            name: 'test-channel',
            permissions: [mockPermissions],
            nsfw: false,
            isNews: false,
            messages: [],
            threads: []
        };

        const mockVoiceChannel: VoiceChannelData = {
            type: 'GUILD_VOICE',
            name: 'voice-channel',
            permissions: [mockPermissions],
            bitrate: 64000,
            userLimit: 0
        };

        const categoryData: CategoryData = {
            name: 'Test Category',
            permissions: [mockPermissions],
            children: [mockTextChannel, mockVoiceChannel]
        };

        expect(categoryData).toHaveProperty('name');
        expect(categoryData).toHaveProperty('permissions');
        expect(categoryData).toHaveProperty('children');
        
        expect(categoryData.name).toBe('Test Category');
        expect(categoryData.permissions).toEqual([mockPermissions]);
        expect(categoryData.children).toEqual([mockTextChannel, mockVoiceChannel]);
    });

    it('should allow an empty permissions array', () => {
        const categoryData: CategoryData = {
            name: 'Empty Permissions Category',
            permissions: [],
            children: []
        };

        expect(categoryData.permissions).toEqual([]);
    });

    it('should allow an empty children array', () => {
        const categoryData: CategoryData = {
            name: 'Empty Children Category',
            permissions: [],
            children: []
        };

        expect(categoryData.children).toEqual([]);
    });

    it('should support only text channels as children', () => {
        const mockPermissions: ChannelPermissionsData = {
            roleName: 'test-role',
            allow: 'VIEW_CHANNEL',
            deny: 'SEND_MESSAGES'
        };

        const mockTextChannel: TextChannelData = {
            type: 'GUILD_TEXT',
            name: 'test-channel',
            permissions: [mockPermissions],
            nsfw: false,
            isNews: false,
            messages: [],
            threads: []
        };

        const categoryData: CategoryData = {
            name: 'Text Only Category',
            permissions: [mockPermissions],
            children: [mockTextChannel]
        };

        expect(categoryData.children).toHaveLength(1);
        expect(categoryData.children[0]).toEqual(mockTextChannel);
    });

    it('should support only voice channels as children', () => {
        const mockPermissions: ChannelPermissionsData = {
            roleName: 'test-role',
            allow: 'VIEW_CHANNEL',
            deny: 'SEND_MESSAGES'
        };

        const mockVoiceChannel: VoiceChannelData = {
            type: 'GUILD_VOICE',
            name: 'voice-channel',
            permissions: [mockPermissions],
            bitrate: 64000,
            userLimit: 0
        };

        const categoryData: CategoryData = {
            name: 'Voice Only Category',
            permissions: [mockPermissions],
            children: [mockVoiceChannel]
        };

        expect(categoryData.children).toHaveLength(1);
        expect(categoryData.children[0]).toEqual(mockVoiceChannel);
    });

    it('should support mixed text and voice channels as children', () => {
        const mockPermissions: ChannelPermissionsData = {
            roleName: 'test-role',
            allow: 'VIEW_CHANNEL',
            deny: 'SEND_MESSAGES'
        };

        const mockTextChannel: TextChannelData = {
            type: 'GUILD_TEXT',
            name: 'test-channel',
            permissions: [mockPermissions],
            nsfw: false,
            isNews: false,
            messages: [],
            threads: []
        };

        const mockVoiceChannel: VoiceChannelData = {
            type: 'GUILD_VOICE',
            name: 'voice-channel',
            permissions: [mockPermissions],
            bitrate: 64000,
            userLimit: 0
        };

        const categoryData: CategoryData = {
            name: 'Mixed Category',
            permissions: [mockPermissions],
            children: [mockTextChannel, mockVoiceChannel]
        };

        expect(categoryData.children).toHaveLength(2);
        expect(categoryData.children[0]).toEqual(mockTextChannel);
        expect(categoryData.children[1]).toEqual(mockVoiceChannel);
    });
});