import { jest } from '@jest/globals';
import {
    fetchChannelPermissions,
    fetchVoiceChannelData,
    fetchChannelMessages,
    fetchTextChannelData,
    loadCategory,
    loadChannel,
    clearGuild
} from './util';

// Mock the external dependencies
jest.mock('node-fetch', () => jest.fn());
jest.mock('../utils/func', () => ({
    configOptions2: { Debug: false },
    t: (key: string) => `translated:${key}`
}));

describe('util.ts functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchChannelPermissions', () => {
        it('should fetch channel permissions correctly', () => {
            const mockRole: any = {
                name: 'Test Role'
            };

            const mockPermissionOverwrite: any = {
                id: 'role-id',
                type: 'role',
                allow: { bitfield: { toString: () => '1024' } },
                deny: { bitfield: { toString: () => '512' } }
            };

            const mockChannel: any = {
                permissionOverwrites: {
                    cache: {
                        filter: jest.fn().mockReturnThis(),
                        forEach: (callback: any) => {
                            callback(mockPermissionOverwrite);
                        }
                    }
                },
                guild: {
                    roles: {
                        cache: {
                            get: jest.fn().mockReturnValue(mockRole)
                        }
                    }
                }
            };

            const permissions: any = fetchChannelPermissions(mockChannel);

            expect(permissions).toEqual([
                {
                    roleName: 'Test Role',
                    allow: '1024',
                    deny: '512'
                }
            ]);
        });

        it('should handle missing role gracefully', () => {
            const mockPermissionOverwrite: any = {
                id: 'role-id',
                type: 'role',
                allow: { bitfield: { toString: () => '1024' } },
                deny: { bitfield: { toString: () => '512' } }
            };

            const mockChannel: any = {
                permissionOverwrites: {
                    cache: {
                        filter: jest.fn().mockReturnThis(),
                        forEach: (callback: any) => {
                            callback(mockPermissionOverwrite);
                        }
                    }
                },
                guild: {
                    roles: {
                        cache: {
                            get: jest.fn().mockReturnValue(null) // Role not found
                        }
                    }
                }
            };

            const permissions: any = fetchChannelPermissions(mockChannel);

            expect(permissions).toEqual([]);
        });
    });

    describe('fetchVoiceChannelData', () => {
        it('should fetch voice channel data correctly', async () => {
            const mockChannel: any = {
                name: 'voice-channel',
                bitrate: 64000,
                userLimit: 10,
                parent: { name: 'Parent Category' },
                type: 'GUILD_VOICE',
                permissionOverwrites: {
                    cache: {
                        filter: () => ({
                            forEach: () => {} // empty forEach
                        })
                    }
                }
            };

            const result: any = await fetchVoiceChannelData(mockChannel);

            expect(result).toEqual({
                type: 'GUILD_VOICE',
                name: 'voice-channel',
                bitrate: 64000,
                userLimit: 10,
                parent: 'Parent Category',
                permissions: [] // Empty because fetchChannelPermissions will return empty for mock
            });
        });
    });

    describe('fetchChannelMessages', () => {
        it('should fetch channel messages correctly', async () => {
            const mockMessage: any = {
                author: {
                    username: 'Test User',
                    displayAvatarURL: () => 'avatar-url'
                },
                cleanContent: 'Test message content',
                embeds: [],
                attachments: {
                    size: 0,
                    map: jest.fn().mockReturnValue([])
                },
                pinned: false
            };

            const mockCollection: any = {
                size: 1,
                last: () => ({ id: 'last-message-id' }),
                map: jest.fn(() => [Promise.resolve(mockMessage)]),
                forEach: (fn: any) => fn(mockMessage),
                get: () => mockMessage,
                set: () => {},
                [Symbol.iterator]: function* () {
                    yield ['key', mockMessage];
                }
            };

            const mockChannel: any = {
                messages: {
                    fetch: jest.fn().mockImplementation(() => Promise.resolve(mockCollection))
                }
            };

            const options: any = { maxMessagesPerChannel: 10 };

            const messages = await fetchChannelMessages(mockChannel, options);

            expect(Array.isArray(messages)).toBe(true);
        });
    });

    describe('fetchTextChannelData', () => {
        it('should fetch text channel data correctly', async () => {
            const mockChannel: any = {
                type: 'GUILD_TEXT',
                name: 'text-channel',
                nsfw: false,
                rateLimitPerUser: 5,
                parent: { name: 'Parent Category' },
                topic: 'Channel topic',
                threads: {
                    cache: {
                        size: 0,
                        map: jest.fn().mockReturnValue([])
                    }
                },
                permissionOverwrites: {
                    cache: {
                        filter: () => ({
                            forEach: () => {} // empty forEach
                        })
                    }
                }
            };

            const options: any = { maxMessagesPerChannel: 10 };

            const result: any = await fetchTextChannelData(mockChannel, options);

            expect(result).toEqual({
                type: 'GUILD_TEXT',
                name: 'text-channel',
                nsfw: false,
                rateLimitPerUser: 5,
                parent: 'Parent Category',
                topic: 'Channel topic',
                permissions: expect.any(Array),
                messages: [],
                isNews: false,
                threads: []
            });
        });
    });

    describe('loadCategory', () => {
        it('should create a category with permissions', async () => {
            const mockCategory: any = {
                permissionOverwrites: {
                    set: jest.fn()
                }
            };

            const mockGuild: any = {
                channels: {
                    create: jest.fn().mockImplementation(() => Promise.resolve(mockCategory))
                },
                roles: {
                    cache: {
                        find: jest.fn().mockReturnValue({ id: 'role-id', name: 'Test Role' })
                    }
                }
            };

            const categoryData: any = {
                name: 'Test Category',
                permissions: [
                    {
                        roleName: 'Test Role',
                        allow: '1024',
                        deny: '512'
                    }
                ],
                children: []
            };

            await loadCategory(categoryData, mockGuild);

            expect(mockGuild.channels.create).toHaveBeenCalledWith(
                'Test Category',
                { type: 'GUILD_CATEGORY' }
            );
        });
    });

    describe('loadChannel', () => {
        it('should create a voice channel with correct options', async () => {
            const mockCreatedChannel: any = {
                permissionOverwrites: {
                    set: jest.fn().mockImplementation(() => Promise.resolve(undefined))
                }
            };

            const mockGuild: any = {
                channels: {
                    create: jest.fn().mockImplementation(() => Promise.resolve(mockCreatedChannel))
                },
                roles: {
                    cache: {
                        find: jest.fn().mockReturnValue({ id: 'role-id', name: 'Test Role' })
                    }
                },
                features: [] as string[],
                premiumTier: 'NONE' as const
            };

            const channelData: any = {
                name: 'voice-channel',
                type: 'GUILD_VOICE',
                bitrate: 64000,
                userLimit: 10,
                parent: null,
                permissions: []
            };

            await loadChannel(channelData, mockGuild, undefined);

            expect(mockGuild.channels.create).toHaveBeenCalledWith(
                'voice-channel',
                expect.objectContaining({
                    type: 'GUILD_VOICE',
                    bitrate: 64000,
                    userLimit: 10
                })
            );
        });
    });

    describe('clearGuild', () => {
        it('should clear all guild resources', async () => {
            const mockRole: any = { 
                delete: jest.fn(), 
                managed: false, 
                editable: true, 
                id: 'different-id' 
            };
            
            const mockChannel: any = { delete: jest.fn() };
            const mockEmoji: any = { delete: jest.fn() };
            const mockWebhook: any = { delete: jest.fn() };
            const mockBan: any = { user: { username: 'test-user' } };
            const mockIntegration: any = { delete: jest.fn() };

            const mockRolesCollection: any = new Map([['role1', mockRole]]);
            mockRolesCollection.forEach = (callback: any) => callback(mockRole);
            mockRolesCollection.filter = jest.fn().mockReturnThis();
            mockRolesCollection.get = (id: string) => mockRole;

            const mockChannelsCollection: any = new Map([['channel1', mockChannel]]);
            mockChannelsCollection.forEach = (callback: any) => callback(mockChannel);
            mockChannelsCollection.get = (id: string) => mockChannel;

            const mockEmojisCollection: any = new Map([['emoji1', mockEmoji]]);
            mockEmojisCollection.forEach = (callback: any) => callback(mockEmoji);
            mockEmojisCollection.get = (id: string) => mockEmoji;

            const mockWebhooksCollection: any = new Map([['webhook1', mockWebhook]]);
            mockWebhooksCollection.forEach = (callback: any) => callback(mockWebhook);
            mockWebhooksCollection.get = (id: string) => mockWebhook;

            const mockBansCollection: any = new Map([['ban1', mockBan]]);
            mockBansCollection.forEach = (callback: any) => callback(mockBan);
            mockBansCollection.get = (id: string) => mockBan;

            const mockIntegrationsCollection: any = new Map([['integration1', mockIntegration]]);
            mockIntegrationsCollection.forEach = (callback: any) => callback(mockIntegration);
            mockIntegrationsCollection.get = (id: string) => mockIntegration;

            const mockGuild: any = {
                roles: { cache: mockRolesCollection },
                channels: { cache: mockChannelsCollection },
                emojis: { cache: mockEmojisCollection },
                fetchWebhooks: jest.fn().mockImplementation(() => Promise.resolve(mockWebhooksCollection)),
                bans: { 
                    fetch: jest.fn().mockImplementation(() => Promise.resolve(mockBansCollection)) 
                },
                fetchIntegrations: jest.fn().mockImplementation(() => Promise.resolve(mockIntegrationsCollection)),
                setAFKChannel: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setAFKTimeout: jest.fn(),
                setIcon: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setBanner: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setSplash: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setDefaultMessageNotifications: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setWidgetSettings: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setExplicitContentFilter: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setVerificationLevel: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setSystemChannel: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                setSystemChannelFlags: jest.fn().mockImplementation(() => Promise.resolve(undefined)),
                members: {
                    unban: jest.fn().mockImplementation(() => Promise.resolve(undefined))
                },
                features: ['COMMUNITY'] as string[],
                id: 'guild-id'
            };

            await clearGuild(mockGuild);

            expect(mockGuild.setAFKChannel).toHaveBeenCalledWith(null);
            expect(mockGuild.setAFKTimeout).toHaveBeenCalledWith(300);
            expect(mockGuild.setIcon).toHaveBeenCalledWith(null);
            expect(mockGuild.setDefaultMessageNotifications).toHaveBeenCalledWith('ONLY_MENTIONS');
        });
    });
});