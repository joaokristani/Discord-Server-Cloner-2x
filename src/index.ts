import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv"; 
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";

dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const token = process.env.TOKEN;

client.on("ready", async () => {
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang('pt');
  } else {
    setlang('en');
  }
  const guild = client.guilds.cache.get('1014921352500756500');
  if (guild) {
    const channel = guild.channels.cache.get('1173960818841354382');

    if (channel) {
      (channel as TextChannel).send({ content: 'Hello world' }).catch(error => {});
    } else {
      console.log('...');
    }
  
  } else {
    console.log(gradient(["red", "orange"])(t('nosvr')));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const unixTimestamp = 1677642874;
  const dateFromTimestamp = new Date(unixTimestamp * 1000);
  const r = new Discord.RichPresence()
    .setApplicationId('1146949248617828455')
    .setType('PLAYING')
    .setURL('https://discord.gg/infinite-community-1014921352500756500')
    .setName('Infinite Community')
    .setState('Running...')
    .setDetails('The best server about selfbots and bots')
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1014927587954393098/1145100637281992784/infinite_logo.png?width=468&height=468')
    .setAssetsLargeText('Infinite Community')
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1014927587954393098/1145100637281992784/infinite_logo.png?width=468&height=468')
    .setAssetsSmallText('Join')
    .setStartTimestamp(dateFromTimestamp)
    .addButton('Join', 'https://discord.gg/infinite-community-1014921352500756500');
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  rl.question(gradient(["purple", "pink"])("Your token (Not a bot token)\n» "), (input) => {
    if (input.trim() === '') {
      console.log(gradient(["red", "orange"])("O token foi retornado como vazio"));
      process.kill(1);
    } else {
      client.login(input)
        .catch((error) => {
          if (error.message === 'An invalid token was provided.') {
            console.clear();
            console.log(gradient(["red", "orange"])("Invalid token"));
          } else {
            console.clear();
            console.error(gradient(["red", "orange"])(`Erro ao fazer login: ${error.message}`));
          }
        });
    }
  });
} else {
  console.clear();
  client.login(token)
    .catch((error) => {
      console.clear();
      if (error.message === 'An invalid token was provided.') {
        console.log(gradient(["red", "orange"])("Invalid token"));
      } else {
        console.clear();
        console.error(gradient(["red", "orange"])(`Erro ao fazer login: ${error.message}`));
      }
    });
}
export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
// fiquei com preguiça de utilizar tudo isso
export const translations: Translations = {
  en: {
    optionPrompt: 'Option (Type "back" to go back): ',
    menuText: `Warn: The English version does not have complete translations\n1 - Clone everything to an existing server\n2 - Clone everything to a server the cloner will create\n3 - Clone everything to a server the cloner will create and generate a template\n5 - Account information\n6 - Server information by ID\n7 - Official Discord Server\n8 - Mudar para português`,
    cloneInProgress: '> Cloning in progress...',
    returnnull: 'No response...',
    yandn: ' (1 - Yes, 2 - No): ',
    messagesPerChannel: 'How many messages per channel do you want to clone? (This function is temporarily disabled): ',
    saveToJson: 'Do you want to save to JSON? (1 - Yes, 2 - No): ',
    beautifyJson: 'Do you want to beautify the JSON? (1 - Yes, 2 - No): ',
    ignoreOptions: 'Enter what you want to ignore (e.g., emojis, channels, roles): ',
    reconfigure: 'Do you want to reconfigure? (1 - Yes, 2 - No, 3 - Back): ',
    invalidOption: 'This option is not defined',
    cloneCompleted: '> Cloning completed!',
    configTime: '> Configuration time: ',
    error2: 'An error occurred (You can report this error on our discord):\n',
    undefinedfunc: 'Option not set manually',
    ServerID: 'Enter the ID of the server you want to clone: ',
    ServerID2: 'Enter your server ID (Server for which you have an administrator role or ownership): ',
    clonedChannels: '> Number of cloned channels: ',
    errorCount: '> Error count during cloning: ',
    enterServerId: 'Enter the server ID: ',
    loadInProgress: '> Loading in progress...',
    loadTime: '> Loading time: ',
    pressEnter: 'Press "ENTER" to continue...',
    guildName: 'Server Name: ',
    guildDescription: 'Server Description: ',
    memberCount: 'Number of Members: ',
    channelCount: 'Number of Channels: ',
    createdDate: 'Created at: ',
    guildId: 'Server ID: ',
    iconUrl: 'Server Icon URL: ',
    splashUrl: 'Server Splash URL: ',
    discoverySplashUrl: 'Server Discovery Splash URL: ',
    serverFeatures: 'Server Features: ',
    emojisCount: 'Number of Emojis: ',
    awaitenter: 'click "ENTER" to continue...',
    stickersCount: 'Number of Stickers: ',
    configcloner: 'Configuring the cloner:',
    msgcloner: "Clone how many messages per channel? (The clone message function has been disabled for testing)",
    savejsonconfig: 'Save to Json?',
    beautifuljson: 'Beautiful Json?',
    noclone: 'Do not clone',
    ignoretickets: 'Ignore tickets?',
    option234: 'Do you want to configure? (1 - Yes, 2 - No, 3 - Back): ',
    invalidid: "The destination server does not exist or you are not on it, try correcting the ID",
    initcloner: "» Starting cloning",
    yes: "Yes",
    no: "No",
    cloningmessage: "How many messages do you want to clone per channel? (The message clone function has been disabled for testing): ",
    savejsoninput: "Do you want to save to JSON? ",
    noclonerinput: "Enter what you want to ignore (e.g. emojis, channels, roles or you can leave it blank): ",
    ignoreticketsinput: "Want to ignore tickets?",
    debugoption: "Do you want to activate debugging?",
    nosvr: "» You must be on the Infinite Community server to start the cloner\n» Invitation: https://discord.gg/infinite-community-1014921352500756500",
    rolecreate: '» Role created: ',
    voicechannelcreate: '» Voice channel created: ',
    createemoji: 'Emoji created: ',
    ignoreticketmsg: 'It was ignored because it was possibly a ticket',
    textchannelcreate: '» Created text channel: ',
    categorycreate: '» Category created: ',
    msgfinalcloner: '» Cloning took time: ',
    configtime: '» Configuration took time: ',
    channelnumber: '» Number of cloned channels: ',
    errorcloning: '» Error count during cloning: '


  },
  pt: {
    optionPrompt: 'Opção (Digite "back" para voltar): ',
    yandn: ' (1 - Sim, 2 - Não): ',
    ServerID: 'Digite o ID do servidor que você deseja clonar: ',
    undefinedfunc: 'Opção não definida manualmente',
    returnnull: 'Não obteve retorno...',
    awaitenter: 'Clique no "ENTER" para continuar...',
    ServerID2: 'Digite o ID do seu servidor (Servidor que você tem um cargo administrador ou posse): ',
    menuText: `1 - Clonar tudo para um servidor já criado\n2 - Clonar tudo para um servidor que o clonador irá criar\n3 - Clonar tudo para um servidor que o clonador irá criar e gerar um template\n5 - Informações da conta\n6 - Informações do servidor por ID\n7 - Discord Oficial\n8 - Change to english`,
    cloneInProgress: '> Clonagem em andamento...',
    messagesPerChannel: 'Quantas mensagens por canal você deseja clonar? (Esta função está temporariamente desativada): ',
    saveToJson: 'Deseja salvar em JSON? (1 - Sim, 2 - Não): ',
    beautifyJson: 'Deseja formatar o JSON? (1 - Sim, 2 - Não): ',
    ignoreOptions: 'Digite o que você deseja ignorar (por exemplo, emojis, canais, cargos): ',
    reconfigure: 'Deseja reconfigurar? (1 - Sim, 2 - Não, 3 - Voltar): ',
    invalidOption: 'Esta opção não está definida',
    cloneCompleted: '> Clonagem concluída!',
    configTime: '> Tempo de configuração: ',
    clonedChannels: '> Número de canais clonados: ',
    errorCount: '> Contagem de erros durante a clonagem: ',
    enterServerId: 'Digite o ID do servidor: ',
    loadInProgress: '> Carregando em andamento...',
    loadTime: '> Tempo de carregamento: ',
    pressEnter: 'Pressione "ENTER" para continuar...',
    guildName: 'Nome do servidor: ',
    guildDescription: 'Descrição do servidor: ',
    memberCount: 'Número de membros: ',
    error2: 'Aconteceu um erro (Você pode reportar esse erro em nosso discord):\n',
    channelCount: 'Número de canais: ',
    createdDate: 'Criado em: ',
    guildId: 'ID do servidor: ',
    iconUrl: 'URL do ícone do servidor: ',
    splashUrl: 'URL do splash do servidor: ',
    discoverySplashUrl: 'URL do splash de descoberta do servidor: ',
    serverFeatures: 'Recursos do servidor: ',
    emojisCount: 'Número de emojis: ',
    stickersCount: 'Número de adesivos: ',
    configcloner: 'Configurando o clonador:',
    msgcloner: "Clonar quantas mensagens por canal? (A função de clonar mensagens foi desativada para testes)",
    savejsonconfig: 'Salvar no Json?',
    beautifuljson: 'Json Bonito?',
    noclone: 'Não clonar',
    ignoretickets: 'Ignorar tickets?',
    option234: 'Deseja configurar? (1 - Sim, 2 - Não, 3 - Voltar): ',
    invalidid: "O servidor de destino não existe ou você não está nele, tente corrigir o ID",
    initcloner: "» Começando a clonagem",
    yes: "Sim",
    no: "Não",
    cloningmessage: "Deseja clonar quantas mensagens por canal? (A função de clonar mensagens foi desativada para testes): ",
    savejsoninput: "Deseja salvar no JSON?",
    noclonerinput: "Digite o que você deseja ignorar (ex: emojis, channels, roles ou você pode deixar em branco): ",
    ignoreticketsinput: "Deseja ignorar tickets?",
    debugoption: "Deseja ativar o debug?",
    nosvr: '» É preciso estar no servidor Infinite Community para iniciar o clonador\n» Convite: https://discord.gg/infinite-community-1014921352500756500',
    rolecreate: '» Cargo criado: ',
    voicechannelcreate: '» Canal de voz criado: ',
    emojicreate: 'Emoji criado: ',
    ignoreticketmsg: ' Foi ignorado por possivelmente ser um ticket',
    textchannelcreate: '» Canal de texto criado: ',
    categorycreate: '» Categoria criada: ',
    msgfinalcloner: '» A clonagem demorou: ',
    configtime: '» A configuração demorou: ',
    channelnumber: '» Número de canais clonados: ',
    errorcloning: '» Contagem de erros durante a clonagem: '},
};
