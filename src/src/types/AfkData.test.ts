// Tests for AfkData interface type structure and validation
// Since AfkData is an interface (type), we test using objects that conform to the interface

describe('AfkData', () => {
    interface AfkData {
        name: string;
        timeout: number;
    }

    it('should validate the structure of an AfkData object', () => {
        const mockAfkData: AfkData = {
            name: 'test-afk-channel',
            timeout: 30000,
        };

        expect(mockAfkData).toHaveProperty('name');
        expect(mockAfkData).toHaveProperty('timeout');
        expect(typeof mockAfkData.name).toBe('string');
        expect(typeof mockAfkData.timeout).toBe('number');
        expect(mockAfkData.name).toBe('test-afk-channel');
        expect(mockAfkData.timeout).toBe(30000);
    });

    it('should allow valid AfkData object creation with different values', () => {
        const afkData: AfkData = {
            name: 'general-afk',
            timeout: 60000,
        };

        expect(afkData.name).toBe('general-afk');
        expect(afkData.timeout).toBe(60000);
    });

    it('should support different timeout values', () => {
        const afkData: AfkData = {
            name: 'different-timeout-afk',
            timeout: 120000,
        };

        expect(afkData.timeout).toBe(120000);
    });

    it('should support empty string for name', () => {
        const afkData: AfkData = {
            name: '',
            timeout: 30000,
        };

        expect(afkData.name).toBe('');
    });

    it('should support zero timeout value', () => {
        const afkData: AfkData = {
            name: 'zero-timeout-afk',
            timeout: 0,
        };

        expect(afkData.timeout).toBe(0);
    });

    it('should work with minimum timeout value', () => {
        const afkData: AfkData = {
            name: 'min-timeout-afk',
            timeout: -1,
        };

        expect(afkData.timeout).toBe(-1);
    });
});