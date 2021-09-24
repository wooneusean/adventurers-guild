import { token, prefix } from './config.json';
import { Client, Intents } from 'discord.js';
import { Sequelize } from 'sequelize-typescript';
import GuildController from './controllers/leader';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './storage/database.sqlite',
  models: [__dirname + '/models'],
  define: {
    timestamps: true,
    paranoid: true,
  },
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity('with guild quests.', { type: 'PLAYING' });
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'guild') {
    GuildController.processCommand(message, args);
  }
});

(async () => {
  await sequelize.sync({ force: true });
  client.login(token);
})();