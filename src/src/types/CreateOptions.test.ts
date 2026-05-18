import { CreateOptions } from './CreateOptions';

describe('CreateOptions', () => {
    it('should be able to be used as a type', () => {
        // Just verify we can import and reference the type
        const options: CreateOptions = {};
        expect(options).toBeDefined();
    });

    it('should have optional backupID property', () => {
        const options: CreateOptions = {};
        expect(options).toBeDefined();
        
        const optionsWithBackupID: CreateOptions = { backupID: 'test-id' };
        expect(optionsWithBackupID.backupID).toBe('test-id');
    });

    it('should have optional maxMessagesPerChannel property', () => {
        const options: CreateOptions = {};
        expect(options.maxMessagesPerChannel).toBeUndefined();
        
        const optionsWithMaxMessages: CreateOptions = { maxMessagesPerChannel: 100 };
        expect(optionsWithMaxMessages.maxMessagesPerChannel).toBe(100);
    });

    it('should have optional jsonSave property', () => {
        const options: CreateOptions = {};
        expect(options.jsonSave).toBeUndefined();
        
        const optionsWithJsonSave: CreateOptions = { jsonSave: true };
        expect(optionsWithJsonSave.jsonSave).toBe(true);
    });

    it('should have optional jsonBeautify property', () => {
        const options: CreateOptions = {};
        expect(options.jsonBeautify).toBeUndefined();
        
        const optionsWithJsonBeautify: CreateOptions = { jsonBeautify: false };
        expect(optionsWithJsonBeautify.jsonBeautify).toBe(false);
    });

    it('should have optional doNotBackup property', () => {
        const options: CreateOptions = {};
        expect(options.doNotBackup).toBeUndefined();
        
        const optionsWithDoNotBackup: CreateOptions = { doNotBackup: ['channel1', 'role2'] };
        expect(optionsWithDoNotBackup.doNotBackup).toEqual(['channel1', 'role2']);
    });

    it('should have optional saveImages property', () => {
        const options: CreateOptions = {};
        expect(options.saveImages).toBeUndefined();
        
        const optionsWithSaveImages: CreateOptions = { saveImages: 'base64' };
        expect(optionsWithSaveImages.saveImages).toBe('base64');
    });

    it('should accept all properties together', () => {
        const options: CreateOptions = {
            backupID: 'test-id',
            maxMessagesPerChannel: 50,
            jsonSave: true,
            jsonBeautify: true,
            doNotBackup: ['channel1'],
            saveImages: 'url'
        };
        
        expect(options.backupID).toBe('test-id');
        expect(options.maxMessagesPerChannel).toBe(50);
        expect(options.jsonSave).toBe(true);
        expect(options.jsonBeautify).toBe(true);
        expect(options.doNotBackup).toEqual(['channel1']);
        expect(options.saveImages).toBe('url');
    });
});