import { TextChannelData, BaseChannelData, ChannelPermissionsData, MessageData, ThreadChannelData } from './';

describe('TextChannelData Interface', () => {
    describe('Type Definition Tests', () => {
        it('should have the correct properties', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const mockMessage: MessageData = {
                username: 'test-user',
                content: 'test message',
                pinned: false
            };

            const mockThread: ThreadChannelData = {
                type: 'GUILD_PUBLIC_THREAD',
                name: 'test-thread',
                archived: false,
                autoArchiveDuration: 60,
                locked: false,
                rateLimitPerUser: 0,
                messages: []
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [mockMessage],
                threads: [mockThread]
            };

            expect(textChannelData).toHaveProperty('type');
            expect(textChannelData).toHaveProperty('name');
            expect(textChannelData).toHaveProperty('permissions');
            expect(textChannelData).toHaveProperty('nsfw');
            expect(textChannelData).toHaveProperty('isNews');
            expect(textChannelData).toHaveProperty('messages');
            expect(textChannelData).toHaveProperty('threads');
        });

        it('should extend BaseChannelData correctly', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            // Check BaseChannelData properties
            expect(textChannelData).toHaveProperty('type');
            expect(textChannelData).toHaveProperty('name');
            expect(textChannelData).toHaveProperty('permissions');

            // Check TextChannelData specific properties
            expect(textChannelData).toHaveProperty('nsfw');
            expect(textChannelData).toHaveProperty('isNews');
            expect(textChannelData).toHaveProperty('messages');
            expect(textChannelData).toHaveProperty('threads');
        });

        it('should enforce all required properties as correct types', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const mockMessage: MessageData = {
                username: 'test-user',
                content: 'test message'
            };

            const mockThread: ThreadChannelData = {
                type: 'GUILD_PUBLIC_THREAD',
                name: 'test-thread',
                archived: false,
                autoArchiveDuration: 60,
                locked: false,
                rateLimitPerUser: 0,
                messages: []
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: true,
                isNews: false,
                messages: [mockMessage],
                threads: [mockThread]
            };

            expect(typeof textChannelData.type).toBe('string');
            expect(typeof textChannelData.name).toBe('string');
            expect(Array.isArray(textChannelData.permissions)).toBe(true);
            expect(typeof textChannelData.nsfw).toBe('boolean');
            expect(typeof textChannelData.isNews).toBe('boolean');
            expect(Array.isArray(textChannelData.messages)).toBe(true);
            expect(Array.isArray(textChannelData.threads)).toBe(true);
        });
    });

    describe('Property Tests', () => {
        it('should have nsfw property as a boolean', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: true,
                isNews: false,
                messages: [],
                threads: []
            };

            expect(textChannelData.nsfw).toBe(true);
            expect(typeof textChannelData.nsfw).toBe('boolean');
        });

        it('should have parent property as optional string', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelDataWithoutParent: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            // parent property should not exist in this case
            expect(textChannelDataWithoutParent).not.toHaveProperty('parent');

            const textChannelDataWithParent: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                parent: '123456789',
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            expect(textChannelDataWithParent.parent).toBe('123456789');
            expect(typeof textChannelDataWithParent.parent).toBe('string');
        });

        it('should have topic property as optional string', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelDataWithoutTopic: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            expect(textChannelDataWithoutTopic).not.toHaveProperty('topic');

            const textChannelDataWithTopic: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                topic: 'This is a channel topic',
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            expect(textChannelDataWithTopic.topic).toBe('This is a channel topic');
            expect(typeof textChannelDataWithTopic.topic).toBe('string');
        });

        it('should have rateLimitPerUser property as optional number', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelDataWithoutRateLimit: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            expect(textChannelDataWithoutRateLimit).not.toHaveProperty('rateLimitPerUser');

            const textChannelDataWithRateLimit: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                rateLimitPerUser: 5,
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            expect(textChannelDataWithRateLimit.rateLimitPerUser).toBe(5);
            expect(typeof textChannelDataWithRateLimit.rateLimitPerUser).toBe('number');
        });

        it('should have isNews property as a boolean', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: true,
                messages: [],
                threads: []
            };

            expect(textChannelData.isNews).toBe(true);
            expect(typeof textChannelData.isNews).toBe('boolean');
        });

        it('should have messages property as MessageData array', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const mockMessage: MessageData = {
                username: 'test-user',
                content: 'test message'
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [mockMessage],
                threads: []
            };

            expect(Array.isArray(textChannelData.messages)).toBe(true);
            expect(textChannelData.messages).toHaveLength(1);
            expect(textChannelData.messages[0]).toHaveProperty('username');
            expect(textChannelData.messages[0].username).toBe('test-user');
        });

        it('should have threads property as ThreadChannelData array', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const mockThread: ThreadChannelData = {
                type: 'GUILD_PUBLIC_THREAD',
                name: 'test-thread',
                archived: false,
                autoArchiveDuration: 60,
                locked: false,
                rateLimitPerUser: 0,
                messages: []
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [],
                threads: [mockThread]
            };

            expect(Array.isArray(textChannelData.threads)).toBe(true);
            expect(textChannelData.threads).toHaveLength(1);
            expect(textChannelData.threads[0]).toHaveProperty('name');
            expect(textChannelData.threads[0].name).toBe('test-thread');
        });
    });

    describe('Optional Properties Tests', () => {
        it('should work without optional properties', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            // The interface should work even without optional props
            expect(textChannelData).toBeDefined();
            expect(textChannelData.name).toBe('test-channel');
            expect(textChannelData.nsfw).toBe(false);
            expect(textChannelData.isNews).toBe(false);
        });

        it('should support all optional properties together', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const mockMessage: MessageData = {
                username: 'test-user',
                content: 'test message'
            };

            const mockThread: ThreadChannelData = {
                type: 'GUILD_PUBLIC_THREAD',
                name: 'test-thread',
                archived: false,
                autoArchiveDuration: 60,
                locked: false,
                rateLimitPerUser: 0,
                messages: []
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                parent: '1234567890',
                topic: 'This is a test topic',
                rateLimitPerUser: 10,
                permissions: [mockPermissions],
                nsfw: true,
                isNews: true,
                messages: [mockMessage],
                threads: [mockThread]
            };

            expect(textChannelData.parent).toBe('1234567890');
            expect(textChannelData.topic).toBe('This is a test topic');
            expect(textChannelData.rateLimitPerUser).toBe(10);
            expect(textChannelData.nsfw).toBe(true);
            expect(textChannelData.isNews).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should support empty messages array', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            expect(textChannelData.messages).toEqual([]);
            expect(textChannelData.messages).toHaveLength(0);
        });

        it('should support empty threads array', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: [],
                threads: []
            };

            expect(textChannelData.threads).toEqual([]);
            expect(textChannelData.threads).toHaveLength(0);
        });

        it('should handle multiple messages and threads', () => {
            const mockPermissions: ChannelPermissionsData = {
                roleName: 'test-role',
                allow: 'VIEW_CHANNEL',
                deny: 'SEND_MESSAGES'
            };

            const mockMessages: MessageData[] = [
                {
                    username: 'user1',
                    content: 'message 1'
                },
                {
                    username: 'user2',
                    content: 'message 2'
                }
            ];

            const mockThreads: ThreadChannelData[] = [
                {
                    type: 'GUILD_PUBLIC_THREAD',
                    name: 'thread1',
                    archived: false,
                    autoArchiveDuration: 60,
                    locked: false,
                    rateLimitPerUser: 0,
                    messages: []
                },
                {
                    type: 'GUILD_PRIVATE_THREAD',
                    name: 'thread2',
                    archived: false,
                    autoArchiveDuration: 1440,
                    locked: false,
                    rateLimitPerUser: 5,
                    messages: []
                }
            ];

            const textChannelData: TextChannelData = {
                type: 'GUILD_TEXT',
                name: 'test-channel',
                permissions: [mockPermissions],
                nsfw: false,
                isNews: false,
                messages: mockMessages,
                threads: mockThreads
            };

            expect(textChannelData.messages).toHaveLength(2);
            expect(textChannelData.threads).toHaveLength(2);
            expect(textChannelData.messages[0].username).toBe('user1');
            expect(textChannelData.threads[1].name).toBe('thread2');
        });
    });
});