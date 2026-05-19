import { BaseChannelData } from './';

describe('BaseChannelData', () => {
    it('should have the correct structure', () => {
        // Define a mock type that satisfies the interface requirements
        const mockChannelData: BaseChannelData = {
            type: 'GUILD_TEXT', // This is a valid TextBasedChannelTypes
            name: 'test-channel',
            parent: 'parent-category',
            permissions: [],
        };

        expect(mockChannelData).toHaveProperty('type');
        expect(mockChannelData).toHaveProperty('name');
        expect(mockChannelData).toHaveProperty('parent');
        expect(mockChannelData).toHaveProperty('permissions');

        expect(mockChannelData.type).toBe('GUILD_TEXT');
        expect(mockChannelData.name).toBe('test-channel');
        expect(mockChannelData.parent).toBe('parent-category');
        expect(mockChannelData.permissions).toBeInstanceOf(Array);
    });

    it('should allow parent to be optional', () => {
        const mockChannelData: BaseChannelData = {
            type: 'GUILD_TEXT',
            name: 'test-channel',
            permissions: [],
        };

        expect(mockChannelData).toHaveProperty('type');
        expect(mockChannelData).toHaveProperty('name');
        expect(mockChannelData).toHaveProperty('permissions');
        expect(mockChannelData.parent).toBeUndefined();
    });

    it('should accept different channel types', () => {
        const textChannelData: BaseChannelData = {
            type: 'GUILD_TEXT',
            name: 'text-channel',
            permissions: [],
        };

        const voiceChannelData: BaseChannelData = {
            type: 'GUILD_VOICE',
            name: 'voice-channel',
            permissions: [],
        };

        const threadChannelData: BaseChannelData = {
            type: 'GUILD_PUBLIC_THREAD',
            name: 'thread-channel',
            permissions: [],
        };

        expect(textChannelData.type).toBe('GUILD_TEXT');
        expect(voiceChannelData.type).toBe('GUILD_VOICE');
        expect(threadChannelData.type).toBe('GUILD_PUBLIC_THREAD');

        expect(textChannelData.name).toBe('text-channel');
        expect(voiceChannelData.name).toBe('voice-channel');
        expect(threadChannelData.name).toBe('thread-channel');
    });
});