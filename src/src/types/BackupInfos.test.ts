import { BackupInfos } from './BackupInfos';
import { BackupData } from './BackupData';

describe('BackupInfos Interface', () => {
    // Mock a complete BackupData object for testing
    const mockBackupData: BackupData = {
        name: 'Test Server',
        iconURL: 'https://example.com/icon.png',
        iconBase64: 'base64encodedstring',
        verificationLevel: 'NONE',
        explicitContentFilter: 'DISABLED',
        defaultMessageNotifications: 'ALL_MESSAGES',
        afk: {
            name: 'AFK Channel',
            timeout: 300
        },
        widget: {
            enabled: true,
            channel: '123456789'
        },
        splashURL: 'https://example.com/splash.png',
        splashBase64: 'base64encodedstring',
        bannerURL: 'https://example.com/banner.png',
        bannerBase64: 'base64encodedstring',
        channels: {
            categories: [],
            others: []
        },
        roles: [],
        bans: [],
        emojis: [],
        createdTimestamp: Date.now(),
        guildID: '987654321',
        id: '111222333'
    };

    describe('Type Definition Tests', () => {
        it('should have the correct properties', () => {
            const backupInfos: BackupInfos = {
                id: 'backup-id-123',
                size: 1024,
                data: mockBackupData
            };

            expect(backupInfos).toHaveProperty('id');
            expect(backupInfos).toHaveProperty('size');
            expect(backupInfos).toHaveProperty('data');

            expect(typeof backupInfos.id).toBe('string');
            expect(typeof backupInfos.size).toBe('number');
            expect(typeof backupInfos.data).toBe('object');
        });

        it('should accept a valid BackupInfos object', () => {
            const validBackupInfos: BackupInfos = {
                id: 'valid-id',
                size: 2048,
                data: mockBackupData
            };

            expect(validBackupInfos.id).toBe('valid-id');
            expect(validBackupInfos.size).toBe(2048);
            expect(validBackupInfos.data).toEqual(mockBackupData);
        });

        it('should enforce id as a string property', () => {
            const backupInfos: BackupInfos = {
                id: 'test-backup-id',
                size: 512,
                data: mockBackupData
            };

            expect(backupInfos.id).toEqual(expect.any(String));
        });

        it('should enforce size as a number property', () => {
            const backupInfos: BackupInfos = {
                id: 'another-id',
                size: 4096,
                data: mockBackupData
            };

            expect(backupInfos.size).toEqual(expect.any(Number));
        });

        it('should enforce data as a BackupData object', () => {
            const backupInfos: BackupInfos = {
                id: 'data-test-id',
                size: 1000,
                data: mockBackupData
            };

            expect(backupInfos.data).toEqual(mockBackupData);
        });
    });

    describe('Data Integrity Tests', () => {
        it('should maintain data integrity when assigned', () => {
            const originalData = { ...mockBackupData };
            const backupInfos: BackupInfos = {
                id: 'integrity-test',
                size: 1234,
                data: originalData
            };

            // Verify the data property is correctly assigned
            expect(backupInfos.data).toEqual(originalData);
            expect(backupInfos.data.name).toBe(originalData.name);
        });

        it('should allow different sizes', () => {
            const smallBackup: BackupInfos = {
                id: 'small',
                size: 0,
                data: mockBackupData
            };

            const largeBackup: BackupInfos = {
                id: 'large',
                size: 999999999,
                data: mockBackupData
            };

            expect(smallBackup.size).toBe(0);
            expect(largeBackup.size).toBe(999999999);
        });
    });

    describe('Edge Cases', () => {
        it('should work with minimal size value', () => {
            const minimalSizeBackup: BackupInfos = {
                id: 'minimal-size',
                size: 0,
                data: mockBackupData
            };

            expect(minimalSizeBackup.size).toBe(0);
        });

        it('should work with empty string id', () => {
            // Though not recommended, an empty string is still a valid string
            const emptyIdBackup: BackupInfos = {
                id: '',
                size: 500,
                data: mockBackupData
            };

            expect(emptyIdBackup.id).toBe('');
        });

        it('should work with very long id', () => {
            const longId = 'a'.repeat(1000);
            const longIdBackup: BackupInfos = {
                id: longId,
                size: 750,
                data: mockBackupData
            };

            expect(longIdBackup.id).toBe(longId);
        });
    });
});