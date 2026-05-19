import type { ChannelsData } from './ChannelsData';
import type { CategoryData } from './CategoryData';
import type { TextChannelData } from './TextChannelData';
import type { VoiceChannelData } from './VoiceChannelData';
import type { BaseChannelData } from './BaseChannelData';
import type { ChannelPermissionsData } from './ChannelPermissionData';

// Mock Discord.js to avoid loading the full library
jest.mock('discord.js-selfbot-v13', () => ({
  TextBasedChannelTypes: {
    GUILD_TEXT: 'GUILD_TEXT',
    GUILD_NEWS: 'GUILD_NEWS',
    GUILD_NEWS_THREAD: 'GUILD_NEWS_THREAD',
    GUILD_PUBLIC_THREAD: 'GUILD_PUBLIC_THREAD',
    GUILD_PRIVATE_THREAD: 'GUILD_PRIVATE_THREAD',
    GUILD_VOICE: 'GUILD_VOICE',
    GUILD_STAGE_VOICE: 'GUILD_STAGE_VOICE',
  },
  VoiceBasedChannelTypes: {
    GUILD_VOICE: 'GUILD_VOICE',
    GUILD_STAGE_VOICE: 'GUILD_STAGE_VOICE',
  },
  ThreadChannelTypes: {
    GUILD_NEWS_THREAD: 'GUILD_NEWS_THREAD',
    GUILD_PUBLIC_THREAD: 'GUILD_PUBLIC_THREAD',
    GUILD_PRIVATE_THREAD: 'GUILD_PRIVATE_THREAD',
  },
}));

describe('ChannelsData Interface', () => {
  it('should have the correct structure', () => {
    const mockCategory: CategoryData = {
      name: 'test-category',
      permissions: [],
      children: []
    };

    const mockTextChannel: TextChannelData = {
      type: 'GUILD_TEXT',
      name: 'test-channel',
      permissions: [],
      nsfw: false,
      isNews: false,
      messages: [],
      threads: []
    };

    const mockVoiceChannel: VoiceChannelData = {
      type: 'GUILD_VOICE',
      name: 'test-voice',
      permissions: [],
      bitrate: 64000,
      userLimit: 0
    };

    const channelsData: ChannelsData = {
      categories: [mockCategory],
      others: [mockTextChannel, mockVoiceChannel]
    };

    expect(channelsData).toBeDefined();
    expect(channelsData.categories).toBeInstanceOf(Array);
    expect(channelsData.others).toBeInstanceOf(Array);
    expect(channelsData.categories).toHaveLength(1);
    expect(channelsData.others).toHaveLength(2);
  });

  it('should correctly type categories as CategoryData[]', () => {
    const mockCategory: CategoryData = {
      name: 'test-category',
      permissions: [],
      children: []
    };

    const channelsData: ChannelsData = {
      categories: [mockCategory],
      others: []
    };

    expect(Array.isArray(channelsData.categories)).toBe(true);
    expect(channelsData.categories[0]).toHaveProperty('name');
    expect(channelsData.categories[0]).toHaveProperty('permissions');
    expect(channelsData.categories[0]).toHaveProperty('children');
  });

  it('should correctly type others as Array<TextChannelData | VoiceChannelData>', () => {
    const mockTextChannel: TextChannelData = {
      type: 'GUILD_TEXT',
      name: 'test-channel',
      permissions: [],
      nsfw: false,
      isNews: false,
      messages: [],
      threads: []
    };

    const mockVoiceChannel: VoiceChannelData = {
      type: 'GUILD_VOICE',
      name: 'test-voice',
      permissions: [],
      bitrate: 64000,
      userLimit: 0
    };

    const channelsData: ChannelsData = {
      categories: [],
      others: [mockTextChannel, mockVoiceChannel]
    };

    expect(Array.isArray(channelsData.others)).toBe(true);
    expect(channelsData.others).toHaveLength(2);

    // Verify the first element is a TextChannelData
    const firstChannel = channelsData.others[0];
    if ('nsfw' in firstChannel) {
      expect(firstChannel).toHaveProperty('nsfw');
      expect(firstChannel).toHaveProperty('messages');
      expect(firstChannel).toHaveProperty('threads');
    }

    // Verify the second element is a VoiceChannelData
    const secondChannel = channelsData.others[1];
    if ('bitrate' in secondChannel) {
      expect(secondChannel).toHaveProperty('bitrate');
      expect(secondChannel).toHaveProperty('userLimit');
    }
  });

  it('should allow empty arrays for both categories and others', () => {
    const channelsData: ChannelsData = {
      categories: [],
      others: []
    };

    expect(channelsData).toBeDefined();
    expect(channelsData.categories).toBeInstanceOf(Array);
    expect(channelsData.others).toBeInstanceOf(Array);
    expect(channelsData.categories).toHaveLength(0);
    expect(channelsData.others).toHaveLength(0);
  });

  it('should support multiple categories and mixed channel types', () => {
    const mockCategory1: CategoryData = {
      name: 'category-1',
      permissions: [],
      children: []
    };

    const mockCategory2: CategoryData = {
      name: 'category-2',
      permissions: [],
      children: []
    };

    const mockTextChannel: TextChannelData = {
      type: 'GUILD_TEXT',
      name: 'text-channel',
      permissions: [],
      nsfw: false,
      isNews: false,
      messages: [],
      threads: []
    };

    const mockVoiceChannel: VoiceChannelData = {
      type: 'GUILD_VOICE',
      name: 'voice-channel',
      permissions: [],
      bitrate: 64000,
      userLimit: 0
    };

    const channelsData: ChannelsData = {
      categories: [mockCategory1, mockCategory2],
      others: [mockTextChannel, mockVoiceChannel, mockTextChannel] // Multiple channels
    };

    expect(channelsData.categories).toHaveLength(2);
    expect(channelsData.others).toHaveLength(3);
    expect(channelsData.categories[0].name).toBe('category-1');
    expect(channelsData.categories[1].name).toBe('category-2');
    expect(channelsData.others[0]).toHaveProperty('nsfw'); // Text channel
    expect(channelsData.others[1]).toHaveProperty('bitrate'); // Voice channel
    expect(channelsData.others[2]).toHaveProperty('nsfw'); // Another text channel
  });

  it('should properly extend BaseChannelData for channel types', () => {
    const mockTextChannel: TextChannelData = {
      type: 'GUILD_TEXT',
      name: 'test-channel',
      permissions: [],
      nsfw: false,
      isNews: false,
      messages: [],
      threads: []
    };

    const mockVoiceChannel: VoiceChannelData = {
      type: 'GUILD_VOICE',
      name: 'test-voice',
      permissions: [],
      bitrate: 64000,
      userLimit: 0
    };

    // Verify that both types have the properties from BaseChannelData
    expect(mockTextChannel).toHaveProperty('type');
    expect(mockTextChannel).toHaveProperty('name');
    expect(mockTextChannel).toHaveProperty('permissions');
    
    expect(mockVoiceChannel).toHaveProperty('type');
    expect(mockVoiceChannel).toHaveProperty('name');
    expect(mockVoiceChannel).toHaveProperty('permissions');
  });

  it('should handle optional properties correctly', () => {
    const mockTextChannelWithOptional: TextChannelData = {
      type: 'GUILD_TEXT',
      name: 'test-channel',
      permissions: [],
      nsfw: true,
      parent: 'parent-id',
      topic: 'This is a topic',
      rateLimitPerUser: 5,
      isNews: true,
      messages: [],
      threads: []
    };

    const channelsData: ChannelsData = {
      categories: [],
      others: [mockTextChannelWithOptional]
    };

    expect(channelsData.others[0]).toHaveProperty('parent');
    expect(channelsData.others[0]).toHaveProperty('topic');
    expect(channelsData.others[0]).toHaveProperty('rateLimitPerUser');
    expect((channelsData.others[0] as TextChannelData).parent).toBe('parent-id');
    expect((channelsData.others[0] as TextChannelData).topic).toBe('This is a topic');
    expect((channelsData.others[0] as TextChannelData).rateLimitPerUser).toBe(5);
  });
});