import { Message } from 'discord.js';
import Leader from '../models/Leader';

export default class GuildController {
  static async processCommand(message: Message, args: string[]) {
    const command = args.shift();

    switch (command) {
      case 'register': {
        if (args.length === 0) {
          message.reply('Please specify a party name!');
          return;
        }

        this.register(message, args.join(' '));
        break;
      }

      default:
        break;
    }
  }

  static async register(message: Message, partyName: string) {
    const hasDuplicate = Leader.findOne({ where: { id: message.author.id } }) == null;

    if (hasDuplicate) {
      message.reply(`You've already registered into the guild!`);
      return;
    }

    await Leader.create({ id: message.author.id, name: message.author.username });

    message.reply(`You've successfully registered into the guild!`);
  }
}
