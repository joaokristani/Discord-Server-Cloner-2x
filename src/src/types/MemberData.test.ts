import { MemberData } from './MemberData';

describe('MemberData', () => {
    // Test that MemberData interface can be properly implemented
    it('should have the correct properties', () => {
        const mockMemberData: MemberData = {
            userId: '123456789',
            username: 'testuser',
            discriminator: '0001',
            avatarUrl: 'https://example.com/avatar.jpg',
            joinedTimestamp: 1640995200000, // Example timestamp
            roles: ['admin', 'moderator'],
            bot: false
        };

        expect(mockMemberData.userId).toBe('123456789');
        expect(mockMemberData.username).toBe('testuser');
        expect(mockMemberData.discriminator).toBe('0001');
        expect(mockMemberData.avatarUrl).toBe('https://example.com/avatar.jpg');
        expect(mockMemberData.joinedTimestamp).toBe(1640995200000);
        expect(mockMemberData.roles).toEqual(['admin', 'moderator']);
        expect(mockMemberData.bot).toBe(false);
    });

    it('should handle bot users correctly', () => {
        const botMemberData: MemberData = {
            userId: '987654321',
            username: 'botuser',
            discriminator: '0002',
            avatarUrl: 'https://example.com/bot-avatar.jpg',
            joinedTimestamp: 1640995200000,
            roles: ['bot'],
            bot: true
        };

        expect(botMemberData.bot).toBe(true);
        expect(botMemberData.username).toBe('botuser');
    });

    it('should handle members with no roles', () => {
        const memberWithNoRoles: MemberData = {
            userId: '555555555',
            username: 'norolesuser',
            discriminator: '0003',
            avatarUrl: 'https://example.com/avatar2.jpg',
            joinedTimestamp: 1640995200000,
            roles: [],
            bot: false
        };

        expect(memberWithNoRoles.roles).toEqual([]);
    });

    it('should handle different timestamp formats', () => {
        const memberDataWithPastTimestamp: MemberData = {
            userId: '111111111',
            username: 'pastuser',
            discriminator: '0004',
            avatarUrl: 'https://example.com/past-avatar.jpg',
            joinedTimestamp: 0, // Unix epoch
            roles: ['member'],
            bot: false
        };

        expect(memberDataWithPastTimestamp.joinedTimestamp).toBe(0);
        
        const memberDataWithFutureTimestamp: MemberData = {
            userId: '222222222',
            username: 'futureuser',
            discriminator: '0005',
            avatarUrl: 'https://example.com/future-avatar.jpg',
            joinedTimestamp: 2147483647000, // Far future timestamp
            roles: ['member'],
            bot: false
        };

        expect(memberDataWithFutureTimestamp.joinedTimestamp).toBe(2147483647000);
    });

    it('should validate required properties are present', () => {
        // Testing that all required properties are defined
        const memberData: MemberData = {
            userId: 'test',
            username: 'testuser',
            discriminator: '0000',
            avatarUrl: 'https://example.com/test.jpg',
            joinedTimestamp: Date.now(),
            roles: [],
            bot: false
        };

        expect(memberData).toHaveProperty('userId');
        expect(memberData).toHaveProperty('username');
        expect(memberData).toHaveProperty('discriminator');
        expect(memberData).toHaveProperty('avatarUrl');
        expect(memberData).toHaveProperty('joinedTimestamp');
        expect(memberData).toHaveProperty('roles');
        expect(memberData).toHaveProperty('bot');
    });
});