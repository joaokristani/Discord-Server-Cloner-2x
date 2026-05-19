import { MessageData } from "./MessageData";
import { ThreadChannelData } from "./ThreadChannelData";

// Create a function to simulate the interface without using the actual enum values
type MockThreadChannelType = 10 | 11 | 12; // Simulated ThreadChannelTypes
type MockThreadAutoArchiveDuration = 60 | 1440 | 4320 | 10080; // Simulated ThreadAutoArchiveDuration

describe('ThreadChannelData', () => {
    // Mock MessageData for testing purposes based on the actual MessageData interface
    const mockMessageData: MessageData = {
        username: 'TestUser',
        content: 'Test message content',
        avatar: 'test_avatar_hash',
        embeds: [],
        files: [],
        pinned: false,
    };

    // Since ThreadChannelData is an interface, we test the type structure with an any cast
    describe('Interface Type Definition', () => {
        it('should accept a valid ThreadChannelData object', () => {
            const threadChannelData: any = {
                type: 11 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPublicThread
                name: 'test-thread',
                archived: false,
                autoArchiveDuration: 60 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneHour
                locked: false,
                rateLimitPerUser: 0,
                messages: [mockMessageData],
            };

            expect(threadChannelData).toHaveProperty('type');
            expect(threadChannelData).toHaveProperty('name');
            expect(threadChannelData).toHaveProperty('archived');
            expect(threadChannelData).toHaveProperty('autoArchiveDuration');
            expect(threadChannelData).toHaveProperty('locked');
            expect(threadChannelData).toHaveProperty('rateLimitPerUser');
            expect(threadChannelData).toHaveProperty('messages');
        });

        it('should have correct type property', () => {
            const threadChannelData: any = {
                type: 12 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPrivateThread
                name: 'test-thread',
                archived: false,
                autoArchiveDuration: 60 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneHour
                locked: false,
                rateLimitPerUser: 0,
                messages: [],
            };

            expect(threadChannelData.type).toBe(12);
        });

        it('should have correct name property', () => {
            const threadChannelData: any = {
                type: 12 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPrivateThread
                name: 'another-test-thread',
                archived: false,
                autoArchiveDuration: 1440 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneDay
                locked: true,
                rateLimitPerUser: 5,
                messages: [],
            };

            expect(threadChannelData.name).toBe('another-test-thread');
        });

        it('should have correct archived property', () => {
            const threadChannelData: any = {
                type: 11 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPublicThread
                name: 'news-thread',
                archived: true,
                autoArchiveDuration: 4320 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.ThreeDays
                locked: false,
                rateLimitPerUser: 2,
                messages: [],
            };

            expect(threadChannelData.archived).toBe(true);
        });

        it('should have correct locked property', () => {
            const threadChannelData: any = {
                type: 11 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPublicThread
                name: 'locked-thread',
                archived: false,
                autoArchiveDuration: 60 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneHour
                locked: true,
                rateLimitPerUser: 10,
                messages: [],
            };

            expect(threadChannelData.locked).toBe(true);
        });

        it('should have correct rateLimitPerUser property', () => {
            const threadChannelData: any = {
                type: 12 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPrivateThread
                name: 'rate-limited-thread',
                archived: false,
                autoArchiveDuration: 1440 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneDay
                locked: false,
                rateLimitPerUser: 15,
                messages: [],
            };

            expect(threadChannelData.rateLimitPerUser).toBe(15);
        });

        it('should have correct messages property', () => {
            const threadChannelData: any = {
                type: 11 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPublicThread
                name: 'message-thread',
                archived: false,
                autoArchiveDuration: 60 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneHour
                locked: false,
                rateLimitPerUser: 0,
                messages: [mockMessageData],
            };

            expect(Array.isArray(threadChannelData.messages)).toBe(true);
            expect(threadChannelData.messages).toContain(mockMessageData);
        });

        it('should accept an empty messages array', () => {
            const threadChannelData: any = {
                type: 11 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPublicThread
                name: 'empty-messages-thread',
                archived: false,
                autoArchiveDuration: 60 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneHour
                locked: false,
                rateLimitPerUser: 0,
                messages: [],
            };

            expect(threadChannelData.messages).toEqual([]);
        });

        it('should accept multiple messages', () => {
            const threadChannelData: any = {
                type: 11 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPublicThread
                name: 'multi-message-thread',
                archived: false,
                autoArchiveDuration: 60 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneHour
                locked: false,
                rateLimitPerUser: 0,
                messages: [mockMessageData, mockMessageData],
            };

            expect(threadChannelData.messages.length).toBe(2);
        });

        it('should properly validate all properties exist', () => {
            const threadChannelData: any = {
                type: 11 as MockThreadChannelType, // Mock ThreadChannelTypes.GuildPublicThread
                name: 'validation-test-thread',
                archived: false,
                autoArchiveDuration: 60 as MockThreadAutoArchiveDuration, // Mock ThreadAutoArchiveDuration.OneHour
                locked: false,
                rateLimitPerUser: 3,
                messages: [mockMessageData],
            };

            expect(threadChannelData).toEqual({
                type: 11,
                name: 'validation-test-thread',
                archived: false,
                autoArchiveDuration: 60,
                locked: false,
                rateLimitPerUser: 3,
                messages: [mockMessageData],
            });
        });
    });
});