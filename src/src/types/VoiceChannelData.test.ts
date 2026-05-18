import { VoiceChannelData } from './VoiceChannelData';
import { BaseChannelData } from './BaseChannelData';
import { ChannelPermissionsData } from './ChannelPermissionData';

describe('VoiceChannelData', () => {
    // Test type definition compliance
    it('should be compatible with the expected structure', () => {
        const mockPermissions: ChannelPermissionsData = {
            roleName: 'test-role',
            allow: 'VIEW_CHANNEL',
            deny: 'SEND_MESSAGES'
        };

        const mockVoiceChannelData: VoiceChannelData = {
            type: 'GUILD_VOICE' as const,
            name: 'test-voice-channel',
            parent: 'category-id',
            permissions: [mockPermissions],
            bitrate: 64000,
            userLimit: 10
        };

        // Check if all required properties exist
        expect(mockVoiceChannelData.type).toBeDefined();
        expect(mockVoiceChannelData.name).toBeDefined();
        expect(mockVoiceChannelData.permissions).toBeDefined();
        expect(mockVoiceChannelData.bitrate).toBeDefined();
        expect(mockVoiceChannelData.userLimit).toBeDefined();

        // Check if values are correct
        expect(mockVoiceChannelData.type).toBe('GUILD_VOICE');
        expect(mockVoiceChannelData.name).toBe('test-voice-channel');
        expect(mockVoiceChannelData.parent).toBe('category-id');
        expect(mockVoiceChannelData.permissions).toEqual([mockPermissions]);
        expect(mockVoiceChannelData.bitrate).toBe(64000);
        expect(mockVoiceChannelData.userLimit).toBe(10);
    });

    it('should properly extend BaseChannelData interface', () => {
        const mockVoiceChannelData: VoiceChannelData = {
            type: 'GUILD_VOICE' as const,
            name: 'test-voice-channel',
            parent: 'category-id',
            permissions: [{
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            }],
            bitrate: 64000,
            userLimit: 10
        };

        // Check BaseChannelData properties exist
        expect(typeof mockVoiceChannelData.type).toBe('string');
        expect(typeof mockVoiceChannelData.name).toBe('string');
        expect(Array.isArray(mockVoiceChannelData.permissions)).toBe(true);
        expect(mockVoiceChannelData.parent).toBe('category-id');

        // Verify it has BaseChannelData structure
        const baseChannelData: BaseChannelData = {
            type: mockVoiceChannelData.type,
            name: mockVoiceChannelData.name,
            parent: mockVoiceChannelData.parent,
            permissions: mockVoiceChannelData.permissions
        };
        expect(baseChannelData).toBeDefined();
    });

    it('should include bitrate property with correct type', () => {
        const mockVoiceChannelData: VoiceChannelData = {
            type: 'GUILD_VOICE' as const,
            name: 'test-voice-channel',
            parent: 'category-id',
            permissions: [],
            bitrate: 96000,
            userLimit: 5
        };

        expect(typeof mockVoiceChannelData.bitrate).toBe('number');
        expect(mockVoiceChannelData.bitrate).toBe(96000);
    });

    it('should include userLimit property with correct type', () => {
        const mockVoiceChannelData: VoiceChannelData = {
            type: 'GUILD_VOICE' as const,
            name: 'test-voice-channel',
            parent: 'category-id',
            permissions: [],
            bitrate: 128000,
            userLimit: 25
        };

        expect(typeof mockVoiceChannelData.userLimit).toBe('number');
        expect(mockVoiceChannelData.userLimit).toBe(25);
    });

    it('should allow parent property to be optional', () => {
        const mockVoiceChannelDataWithoutParent: VoiceChannelData = {
            type: 'GUILD_VOICE' as const,
            name: 'test-voice-channel',
            permissions: [],
            bitrate: 64000,
            userLimit: 0
            // parent is intentionally omitted
        };

        expect(mockVoiceChannelDataWithoutParent.parent).toBeUndefined();
        expect(typeof mockVoiceChannelDataWithoutParent.type).toBe('string');
        expect(typeof mockVoiceChannelDataWithoutParent.name).toBe('string');
        expect(Array.isArray(mockVoiceChannelDataWithoutParent.permissions)).toBe(true);
        expect(typeof mockVoiceChannelDataWithoutParent.bitrate).toBe('number');
        expect(typeof mockVoiceChannelDataWithoutParent.userLimit).toBe('number');
    });

    it('should handle different permission configurations', () => {
        const mockVoiceChannelData: VoiceChannelData = {
            type: 'GUILD_VOICE' as const,
            name: 'test-voice-channel',
            parent: 'parent-id',
            permissions: [
                {
                    roleName: 'admin',
                    allow: 'ADMINISTRATOR',
                    deny: 'VIEW_CHANNEL'
                },
                {
                    roleName: 'member',
                    allow: 'VIEW_CHANNEL,SEND_MESSAGES',
                    deny: ''
                }
            ],
            bitrate: 32000,
            userLimit: 50
        };

        expect(mockVoiceChannelData.permissions.length).toBe(2);
        expect(mockVoiceChannelData.permissions[0].roleName).toBe('admin');
        expect(mockVoiceChannelData.permissions[1].roleName).toBe('member');
    });

    it('should support different channel types', () => {
        const voiceChannelData: VoiceChannelData = {
            type: 'GUILD_STAGE_VOICE' as const, // This is a valid voice channel type
            name: 'stage-channel',
            permissions: [],
            bitrate: 64000,
            userLimit: 10
        };

        expect(voiceChannelData.type).toBe('GUILD_STAGE_VOICE');
        expect(typeof voiceChannelData.name).toBe('string');
        expect(Array.isArray(voiceChannelData.permissions)).toBe(true);
        expect(typeof voiceChannelData.bitrate).toBe('number');
        expect(typeof voiceChannelData.userLimit).toBe('number');
    });
});