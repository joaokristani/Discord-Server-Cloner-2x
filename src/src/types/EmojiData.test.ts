import { EmojiData } from './EmojiData';

describe('EmojiData Interface', () => {
    it('should define an interface with required name property', () => {
        const emojiData: EmojiData = {
            name: 'test_emoji'
        };

        expect(emojiData).toBeDefined();
        expect(emojiData.name).toBe('test_emoji');
    });

    it('should allow optional url property', () => {
        const emojiWithUrl: EmojiData = {
            name: 'test_with_url',
            url: 'https://example.com/test.png'
        };

        expect(emojiWithUrl).toBeDefined();
        expect(emojiWithUrl.name).toBe('test_with_url');
        expect(emojiWithUrl.url).toBe('https://example.com/test.png');
    });

    it('should allow optional base64 property', () => {
        const emojiWithBase64: EmojiData = {
            name: 'test_with_base64',
            base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        };

        expect(emojiWithBase64).toBeDefined();
        expect(emojiWithBase64.name).toBe('test_with_base64');
        expect(emojiWithBase64.base64).toBeDefined();
    });

    it('should allow both url and base64 properties', () => {
        const emojiWithBoth: EmojiData = {
            name: 'test_with_both',
            url: 'https://example.com/test.png',
            base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        };

        expect(emojiWithBoth).toBeDefined();
        expect(emojiWithBoth.name).toBe('test_with_both');
        expect(emojiWithBoth.url).toBe('https://example.com/test.png');
        expect(emojiWithBoth.base64).toBeDefined();
    });

    it('should not require url or base64 properties', () => {
        const emojiWithNameOnly: EmojiData = {
            name: 'test_name_only'
        };

        expect(emojiWithNameOnly).toBeDefined();
        expect(emojiWithNameOnly.name).toBe('test_name_only');
        expect(emojiWithNameOnly.url).toBeUndefined();
        expect(emojiWithNameOnly.base64).toBeUndefined();
    });
});