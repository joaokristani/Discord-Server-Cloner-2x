import { ChannelPermissionsData } from './ChannelPermissionData';

describe('ChannelPermissionData', () => {
    it('should be defined as a type', () => {
        // Testing that the type can be used without errors
        const mockChannelPermission: ChannelPermissionsData = {
            roleName: 'test-role',
            allow: 'read',
            deny: 'write'
        };
        expect(mockChannelPermission).toBeDefined();
    });

    it('should have the correct structure', () => {
        const mockChannelPermission: ChannelPermissionsData = {
            roleName: 'test-role',
            allow: 'read',
            deny: 'write'
        };

        expect(mockChannelPermission).toHaveProperty('roleName');
        expect(mockChannelPermission).toHaveProperty('allow');
        expect(mockChannelPermission).toHaveProperty('deny');
    });

    it('should accept string values for roleName', () => {
        const mockChannelPermission: ChannelPermissionsData = {
            roleName: 'admin',
            allow: 'read',
            deny: 'write'
        };

        expect(typeof mockChannelPermission.roleName).toBe('string');
    });

    it('should accept string values for allow', () => {
        const mockChannelPermission: ChannelPermissionsData = {
            roleName: 'admin',
            allow: 'read',
            deny: 'write'
        };

        expect(typeof mockChannelPermission.allow).toBe('string');
    });

    it('should accept string values for deny', () => {
        const mockChannelPermission: ChannelPermissionsData = {
            roleName: 'admin',
            allow: 'read',
            deny: 'write'
        };

        expect(typeof mockChannelPermission.deny).toBe('string');
    });

    it('should allow empty strings as values', () => {
        const mockChannelPermission: ChannelPermissionsData = {
            roleName: '',
            allow: '',
            deny: ''
        };

        expect(mockChannelPermission.roleName).toBe('');
        expect(mockChannelPermission.allow).toBe('');
        expect(mockChannelPermission.deny).toBe('');
    });
});