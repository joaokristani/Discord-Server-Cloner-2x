import { LoadOptions } from './LoadOptions';

describe('LoadOptions', () => {
    // Dummy interface to simulate MessageMentionOptions since we can't import the actual type
    interface MockMessageMentionOptions {
        parse?: string[];
        repliedUser?: boolean;
    }

    it('should have clearGuildBeforeRestore property', () => {
        const loadOptions: LoadOptions = {
            clearGuildBeforeRestore: true,
        };

        expect(loadOptions.clearGuildBeforeRestore).toBe(true);
    });

    it('should have optional maxMessagesPerChannel property', () => {
        const loadOptions: LoadOptions = {
            clearGuildBeforeRestore: true,
            maxMessagesPerChannel: 100,
        };

        expect(loadOptions.maxMessagesPerChannel).toBe(100);
    });

    it('should work without maxMessagesPerChannel property', () => {
        const loadOptions: LoadOptions = {
            clearGuildBeforeRestore: true,
        };

        expect(loadOptions.maxMessagesPerChannel).toBeUndefined();
    });

    it('should have optional allowedMentions property', () => {
        const mockAllowedMentions: any = {
            parse: ['users', 'roles'],
            repliedUser: true,
        };

        const loadOptions: LoadOptions = {
            clearGuildBeforeRestore: true,
            allowedMentions: mockAllowedMentions,
        };

        expect(loadOptions.allowedMentions).toEqual(mockAllowedMentions);
    });

    it('should work without allowedMentions property', () => {
        const loadOptions: LoadOptions = {
            clearGuildBeforeRestore: true,
        };

        expect(loadOptions.allowedMentions).toBeUndefined();
    });

    it('should have correct type structure', () => {
        const loadOptions: LoadOptions = {
            clearGuildBeforeRestore: false,
            maxMessagesPerChannel: 50,
            allowedMentions: {
                parse: ['everyone'],
                repliedUser: false,
            } as any,
        };

        expect(typeof loadOptions.clearGuildBeforeRestore).toBe('boolean');
        expect(loadOptions.maxMessagesPerChannel).toBe(50);
        expect(loadOptions.allowedMentions).toBeDefined();
    });

    it('should enforce required clearGuildBeforeRestore property', () => {
        // Testing that this property is required by creating an object that should fail
        // without it if we try to access it
        const partialOptions: Partial<LoadOptions> = {
            maxMessagesPerChannel: 10,
        };
        
        // Since clearGuildBeforeRestore is required, the full interface should have it
        const completeOptions: LoadOptions = {
            ...partialOptions,
            clearGuildBeforeRestore: false,
        };

        expect(completeOptions.clearGuildBeforeRestore).toBeDefined();
        expect(typeof completeOptions.clearGuildBeforeRestore).toBe('boolean');
    });
});