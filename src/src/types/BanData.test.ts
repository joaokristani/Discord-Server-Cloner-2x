import { BanData } from './BanData';

describe('BanData Interface', () => {
    describe('Type Definition Tests', () => {
        it('should have the correct properties', () => {
            const banData: BanData = {
                id: '123456789012345678',
                reason: 'Test reason'
            };

            expect(banData).toHaveProperty('id');
            expect(banData).toHaveProperty('reason');

            expect(typeof banData.id).toBe('string');
            expect(typeof banData.reason).toBe('string');
        });

        it('should accept a valid BanData object', () => {
            const validBanData: BanData = {
                id: '987654321098765432',
                reason: 'Violation of server rules'
            };

            expect(validBanData.id).toBe('987654321098765432');
            expect(validBanData.reason).toBe('Violation of server rules');
        });

        it('should enforce id as a string property', () => {
            const banData: BanData = {
                id: '876543210987654321',
                reason: 'Test ban'
            };

            expect(banData.id).toEqual(expect.any(String));
        });

        it('should enforce reason as a string property', () => {
            const banData: BanData = {
                id: '765432109876543210',
                reason: 'Inappropriate behavior'
            };

            expect(banData.reason).toEqual(expect.any(String));
        });
    });

    describe('Data Integrity Tests', () => {
        it('should maintain data integrity when assigned', () => {
            const originalBan: BanData = {
                id: '111222333444555666',
                reason: 'Spamming'
            };

            const banData: BanData = originalBan;

            expect(banData).toEqual(originalBan);
            expect(banData.id).toBe(originalBan.id);
            expect(banData.reason).toBe(originalBan.reason);
        });

        it('should allow different reason values', () => {
            const banWithShortReason: BanData = {
                id: '222333444555666777',
                reason: 'Spam'
            };

            const banWithLongReason: BanData = {
                id: '333444555666777888',
                reason: 'Repeatedly posting inappropriate content that violates multiple community guidelines and terms of service'
            };

            expect(banWithShortReason.reason).toBe('Spam');
            expect(banWithLongReason.reason).toContain('inappropriate content');
        });
    });

    describe('Edge Cases', () => {
        it('should work with empty reason string', () => {
            const banData: BanData = {
                id: '444555666777888999',
                reason: '' // Empty reason
            };

            expect(banData.reason).toBe('');
        });

        it('should work with very long id', () => {
            const longId = '1234567890123456789012345678901234567890';
            const banData: BanData = {
                id: longId,
                reason: 'Testing long ID'
            };

            expect(banData.id).toBe(longId);
        });

        it('should work with very long reason', () => {
            const longReason = 'a'.repeat(1000);
            const banData: BanData = {
                id: '555666777888999000',
                reason: longReason
            };

            expect(banData.reason).toBe(longReason);
        });

        it('should work with numeric-like id string', () => {
            const numericLikeId = '000000000000000001';
            const banData: BanData = {
                id: numericLikeId,
                reason: 'Numeric-like ID test'
            };

            expect(banData.id).toBe(numericLikeId);
        });
    });
});