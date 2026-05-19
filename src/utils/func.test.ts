import { jest } from '@jest/globals';

// Mock all external dependencies before importing the module
jest.mock('gradient-string', () => jest.fn(() => (str: string) => str));
jest.mock('boxen', () => jest.fn((str: string) => str));
jest.mock('chalk', () => ({
  red: jest.fn((str: string) => str),
  blue: jest.fn((str: string) => str),
  green: jest.fn((str: string) => str),
  yellow: jest.fn((str: string) => str)
}));

// Mock backup module
jest.mock('../src/index', () => ({}));

// Mock the modules properly before importing
jest.mock('../index', () => {
  const mockRl = {
    question: jest.fn((question, callback) => {
      // For testing purposes, we'll simulate a response
      if (typeof callback === 'function') {
        callback('test input');
      }
    }),
    close: jest.fn()
  };

  return {
    rl: mockRl,
    translations: {
      en: {
        optionPrompt: 'Choose an option',
        ServerID: 'Enter server ID',
        ServerID2: 'Enter destination server ID',
        msgcloner: 'Messages to clone',
        savejsonconfig: 'Save as JSON',
        beautifuljson: 'Beautify JSON',
        noclone: 'Items not to clone',
        ignoretickets: 'Ignore tickets',
        yes: 'Yes',
        no: 'No',
        option234: 'Config options',
        cloningmessage: 'Number of messages',
        savejsoninput: 'Save as JSON?',
        beautifuljsoninput: 'Beautify JSON?',
        noclonerinput: 'Items to exclude',
        ignoreticketsinput: 'Ignore tickets?',
        debugoption: 'Enable debug?',
        returnnull: 'Function returned null',
        undefinedfunc: 'Undefined function',
        error2: 'An error occurred',
        awaitenter: 'Press enter to continue',
        menuText: 'Main menu',
        idservererror: 'Server ID not found',
        svrlimitt: 'Server limit reached',
        invalidid: 'Invalid server ID',
        initcloner: 'Starting clone',
        msgfinalcloner: 'Clone completed in',
        configtime: 'Configuration time:',
        channelnumber: 'Channels cloned:',
        errorcloning: 'Errors during cloning:',
        yandn: '(1 for yes, 0 for no)'
      },
      pt: {
        optionPrompt: 'Escolha uma opção',
        ServerID: 'Insira o ID do servidor',
        ServerID2: 'Insira o ID do servidor de destino',
        msgcloner: 'Mensagens para clonar',
        savejsonconfig: 'Salvar como JSON',
        beautifuljson: 'Embelezar JSON',
        noclone: 'Itens não para clonar',
        ignoretickets: 'Ignorar tickets',
        yes: 'Sim',
        no: 'Não',
        option234: 'Opções de configuração',
        cloningmessage: 'Número de mensagens',
        savejsoninput: 'Salvar como JSON?',
        beautifuljsoninput: 'Embelezar JSON?',
        noclonerinput: 'Itens para excluir',
        ignoreticketsinput: 'Ignorar tickets?',
        debugoption: 'Ativar debug?',
        returnnull: 'Função retornou nulo',
        undefinedfunc: 'Função indefinida',
        error2: 'Ocorreu um erro',
        awaitenter: 'Pressione enter para continuar',
        menuText: 'Menu principal',
        idservererror: 'ID do servidor não encontrado',
        svrlimitt: 'Limite de servidores atingido',
        invalidid: 'ID de servidor inválido',
        initcloner: 'Iniciando clone',
        msgfinalcloner: 'Clone concluído em',
        configtime: 'Tempo de configuração:',
        channelnumber: 'Canais clonados:',
        errorcloning: 'Erros durante o clone:',
        yandn: '(1 para sim, 0 para não)'
      }
    }
  };
});

// Import after mocking
import { setlang, t, creatorname, menutext, infouser, Cloner, serverinfo, configop, configOptions, configOptions2, choiceinit } from './func';
import { Client } from 'discord.js-selfbot-v13';

// Mock discord.js-selfbot-v13
jest.mock('discord.js-selfbot-v13', () => ({
  Client: jest.fn(() => ({
    // Mock client with necessary properties
    user: {
      username: 'TestUser',
      globalName: 'Test Global Name',
      avatarURL: jest.fn(() => 'https://example.com/avatar.png'),
      bannerURL: jest.fn(() => 'https://example.com/banner.png'),
      id: '123456789',
      createdAt: new Date('2023-01-01'),
      nitroType: 'NITRO',
      emailAddress: 'test@example.com',
      phoneNumber: '+1234567890'
    },
    settings: {
      locale: 'en-US',
      theme: 'dark',
      developerMode: false,
      afkTimeout: 600,
      DMScanLevel: 1,
      compactMode: false,
      previewLink: true
    },
    guilds: {
      fetch: jest.fn(),
      cache: {
        size: 5,
        get: jest.fn()
      },
      create: jest.fn(() => ({ id: 'new-guild-id' })),
      createTemplate: jest.fn(() => ({ url: 'https://discord.new/template' }))
    },
    createTemplate: jest.fn(() => ({ url: 'https://discord.new/template' }))
  }))
}));

describe('func.ts utility functions', () => {
  let mockClient: Client;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create a new mock client instance
    mockClient = new (require('discord.js-selfbot-v13').Client)();
  });

  describe('Language functions', () => {
    test('setlang should update the language correctly', () => {
      expect(() => {
        setlang('en');
      }).not.toThrow();
      
      expect(() => {
        setlang('pt');
      }).not.toThrow();
    });

    test('t function should return translated string', () => {
      // We need to call setlang to set the language before testing
      setlang('en');
      expect(t('optionPrompt')).toBe('Choose an option');
      
      setlang('pt');
      expect(t('optionPrompt')).toBe('Escolha uma opção');
    });

    test('t function should return key if translation not found', () => {
      expect(t('nonexistentKey')).toBe('nonexistentKey');
    });
  });

  describe('Configuration functions', () => {
    test('configOptions should have default values', () => {
      expect(configOptions.maxMessagesPerChannel).toBe(0);
      expect(configOptions.jsonSave).toBe(true);
      expect(configOptions.jsonBeautify).toBe(true);
      expect(configOptions.doNotBackup).toEqual(['bans', 'emojis']);
    });

    test('configOptions2 should have default values', () => {
      expect(configOptions2.ignoreTickets).toBe(false);
      expect(configOptions2.Debug).toBe(false);
    });
  });

  // Note: The following tests mock console functions to prevent actual console output during testing
  describe('Console output functions', () => {
    const originalConsole = { ...console };
    
    beforeEach(() => {
      console.log = jest.fn();
      console.error = jest.fn();
      console.clear = jest.fn();
    });
    
    afterEach(() => {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.clear = originalConsole.clear;
    });

    test('creatorname should call console.clear and console.log', () => {
      creatorname();
      expect(console.clear).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalled();
    });
  });
});