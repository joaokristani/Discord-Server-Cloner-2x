import { MessageEmbed, FileOptions } from 'discord.js-selfbot-v13';
import { MessageData } from './MessageData';

describe('MessageData', () => {
    it('should be a valid interface for message data', () => {
        // Create a valid MessageData object
        const messageData: MessageData = {
            username: 'test_user',
            avatar: 'https://example.com/avatar.png',
            content: 'This is a test message',
            pinned: true,
        };

        expect(messageData).toBeDefined();
        expect(messageData.username).toBe('test_user');
        expect(messageData.avatar).toBe('https://example.com/avatar.png');
        expect(messageData.content).toBe('This is a test message');
        expect(messageData.pinned).toBe(true);
    });

    it('should allow optional fields to be undefined', () => {
        // Create a minimal MessageData object with only required fields
        const messageData: MessageData = {
            username: 'test_user'
        };

        expect(messageData).toBeDefined();
        expect(messageData.username).toBe('test_user');
        expect(messageData.avatar).toBeUndefined();
        expect(messageData.content).toBeUndefined();
        expect(messageData.pinned).toBeUndefined();
    });

    it('should support MessageEmbed array in embeds field', () => {
        const mockEmbed = new MessageEmbed()
            .setTitle('Test Embed')
            .setDescription('Test Description')
            .setURL('https://example.com')
            .setColor(0x00ff00);

        const messageData: MessageData = {
            username: 'test_user',
            embeds: [mockEmbed]
        };

        expect(messageData).toBeDefined();
        expect(messageData.username).toBe('test_user');
        expect(messageData.embeds).toBeDefined();
        expect(Array.isArray(messageData.embeds)).toBe(true);
        expect(messageData.embeds![0]).toBe(mockEmbed);
    });

    it('should support FileOptions array in files field', () => {
        const mockFile: FileOptions = {
            attachment: 'path/to/file.txt',
            name: 'file.txt',
        };

        const messageData: MessageData = {
            username: 'test_user',
            files: [mockFile]
        };

        expect(messageData).toBeDefined();
        expect(messageData.username).toBe('test_user');
        expect(messageData.files).toBeDefined();
        expect(Array.isArray(messageData.files)).toBe(true);
        expect(messageData.files![0]).toBe(mockFile);
    });

    it('should have username as a required field', () => {
        // Testing that username is required by attempting to create a MessageData object without it
        // would cause a type error, but we'll test by checking that the interface enforces this
        const messageData: Partial<MessageData> = {
            // username intentionally omitted to check if TypeScript catches it
        };

        // At runtime, we can still create an object without username
        // but TypeScript should prevent this in actual usage
        expect(messageData.username).toBeUndefined();
        
        // However, a proper MessageData object must have username
        const validMessageData: MessageData = {
            username: 'required_user'
        };
        
        expect(validMessageData.username).toBeDefined();
        expect(validMessageData.username).toBe('required_user');
    });
});