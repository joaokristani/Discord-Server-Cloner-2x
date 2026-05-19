import { RoleData } from './RoleData';

describe('RoleData Interface', () => {
    describe('Type Definition Tests', () => {
        it('should have the correct properties', () => {
            const roleData: RoleData = {
                name: 'Test Role',
                color: '#FF0000',
                hoist: true,
                permissions: 'VIEW_CHANNEL',
                mentionable: false,
                position: 1,
                isEveryone: false
            };

            expect(roleData).toHaveProperty('name');
            expect(roleData).toHaveProperty('color');
            expect(roleData).toHaveProperty('hoist');
            expect(roleData).toHaveProperty('permissions');
            expect(roleData).toHaveProperty('mentionable');
            expect(roleData).toHaveProperty('position');
            expect(roleData).toHaveProperty('isEveryone');

            expect(typeof roleData.name).toBe('string');
            expect(typeof roleData.color).toBe('string');
            expect(typeof roleData.hoist).toBe('boolean');
            expect(typeof roleData.permissions).toBe('string');
            expect(typeof roleData.mentionable).toBe('boolean');
            expect(typeof roleData.position).toBe('number');
            expect(typeof roleData.isEveryone).toBe('boolean');
        });

        it('should accept a valid RoleData object', () => {
            const validRoleData: RoleData = {
                name: 'Moderator',
                color: '#00FF00',
                hoist: false,
                permissions: 'ADMINISTRATOR',
                mentionable: true,
                position: 5,
                isEveryone: false
            };

            expect(validRoleData.name).toBe('Moderator');
            expect(validRoleData.color).toBe('#00FF00');
            expect(validRoleData.hoist).toBe(false);
            expect(validRoleData.permissions).toBe('ADMINISTRATOR');
            expect(validRoleData.mentionable).toBe(true);
            expect(validRoleData.position).toBe(5);
            expect(validRoleData.isEveryone).toBe(false);
        });

        it('should enforce name as a string property', () => {
            const roleData: RoleData = {
                name: 'Administrator',
                color: '#0000FF',
                hoist: true,
                permissions: 'MANAGE_GUILD',
                mentionable: false,
                position: 10,
                isEveryone: false
            };

            expect(roleData.name).toEqual(expect.any(String));
        });

        it('should enforce color as a hex string property', () => {
            const roleData: RoleData = {
                name: 'Color Role',
                color: '#FFFFFF',
                hoist: false,
                permissions: 'VIEW_AUDIT_LOG',
                mentionable: false,
                position: 3,
                isEveryone: false
            };

            expect(roleData.color).toMatch(/^#[A-Fa-f0-9]+$/);
            expect(typeof roleData.color).toBe('string');
        });

        it('should enforce hoist as a boolean property', () => {
            const roleData: RoleData = {
                name: 'Hoist Role',
                color: '#FFFF00',
                hoist: true,
                permissions: 'SEND_MESSAGES',
                mentionable: false,
                position: 7,
                isEveryone: false
            };

            expect(roleData.hoist).toEqual(expect.any(Boolean));
        });

        it('should enforce permissions as a string property', () => {
            const roleData: RoleData = {
                name: 'Permission Role',
                color: '#FF00FF',
                hoist: false,
                permissions: 'MANAGE_ROLES',
                mentionable: true,
                position: 4,
                isEveryone: false
            };

            expect(roleData.permissions).toEqual(expect.any(String));
        });

        it('should enforce mentionable as a boolean property', () => {
            const roleData: RoleData = {
                name: 'Mentionable Role',
                color: '#00FFFF',
                hoist: false,
                permissions: 'MENTION_EVERYONE',
                mentionable: true,
                position: 6,
                isEveryone: false
            };

            expect(roleData.mentionable).toEqual(expect.any(Boolean));
        });

        it('should enforce position as a number property', () => {
            const roleData: RoleData = {
                name: 'Positioned Role',
                color: '#C0C0C0',
                hoist: false,
                permissions: 'READ_MESSAGE_HISTORY',
                mentionable: false,
                position: 2,
                isEveryone: false
            };

            expect(roleData.position).toEqual(expect.any(Number));
        });

        it('should enforce isEveryone as a boolean property', () => {
            const roleData: RoleData = {
                name: '@everyone',
                color: '#000000',
                hoist: false,
                permissions: 'VIEW_CHANNEL',
                mentionable: false,
                position: 0,
                isEveryone: true
            };

            expect(roleData.isEveryone).toEqual(expect.any(Boolean));
        });
    });

    describe('Data Integrity Tests', () => {
        it('should maintain data integrity when assigned', () => {
            const originalRole: RoleData = {
                name: 'Original Role',
                color: '#ABCDEF',
                hoist: true,
                permissions: 'SEND_TTS_MESSAGES',
                mentionable: false,
                position: 8,
                isEveryone: false
            };

            const roleData: RoleData = originalRole;

            expect(roleData).toEqual(originalRole);
            expect(roleData.name).toBe(originalRole.name);
            expect(roleData.color).toBe(originalRole.color);
            expect(roleData.hoist).toBe(originalRole.hoist);
            expect(roleData.permissions).toBe(originalRole.permissions);
            expect(roleData.mentionable).toBe(originalRole.mentionable);
            expect(roleData.position).toBe(originalRole.position);
            expect(roleData.isEveryone).toBe(originalRole.isEveryone);
        });

        it('should allow different position values', () => {
            const lowPositionRole: RoleData = {
                name: 'Low Position',
                color: '#123456',
                hoist: false,
                permissions: 'VIEW_CHANNEL',
                mentionable: false,
                position: 0,
                isEveryone: false
            };

            const highPositionRole: RoleData = {
                name: 'High Position',
                color: '#789ABC',
                hoist: true,
                permissions: 'ADMINISTRATOR',
                mentionable: true,
                position: 99,
                isEveryone: false
            };

            expect(lowPositionRole.position).toBe(0);
            expect(highPositionRole.position).toBe(99);
        });
    });

    describe('Edge Cases', () => {
        it('should work with empty string name', () => {
            const roleData: RoleData = {
                name: '',
                color: '#000000',
                hoist: false,
                permissions: '',
                mentionable: false,
                position: 0,
                isEveryone: false
            };

            expect(roleData.name).toBe('');
        });

        it('should work with very long name', () => {
            const longName = 'a'.repeat(100);
            const roleData: RoleData = {
                name: longName,
                color: '#FFFFFF',
                hoist: false,
                permissions: 'VIEW_CHANNEL',
                mentionable: false,
                position: 1,
                isEveryone: false
            };

            expect(roleData.name).toBe(longName);
        });

        it('should work with minimal position value', () => {
            const roleData: RoleData = {
                name: 'Min Position Role',
                color: '#111111',
                hoist: false,
                permissions: 'VIEW_CHANNEL',
                mentionable: false,
                position: -100,
                isEveryone: false
            };

            expect(roleData.position).toBe(-100);
        });

        it('should work with maximum position value', () => {
            const roleData: RoleData = {
                name: 'Max Position Role',
                color: '#EEEEEE',
                hoist: false,
                permissions: 'VIEW_CHANNEL',
                mentionable: false,
                position: 1000000,
                isEveryone: false
            };

            expect(roleData.position).toBe(1000000);
        });

        it('should work with empty permissions string', () => {
            const roleData: RoleData = {
                name: 'Empty Permissions',
                color: '#00FF00',
                hoist: false,
                permissions: '', // Empty permissions string
                mentionable: false,
                position: 5,
                isEveryone: false
            };

            expect(roleData.permissions).toBe('');
        });

        it('should work with different valid hex color formats', () => {
            const roleData: RoleData = {
                name: 'Hex Color Test',
                color: '#1234AB', // Valid hex color
                hoist: false,
                permissions: 'VIEW_CHANNEL',
                mentionable: false,
                position: 3,
                isEveryone: false
            };

            expect(roleData.color).toMatch(/^#[A-Fa-f0-9]+$/);
        });
    });
});