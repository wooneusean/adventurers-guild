import { Message } from 'discord.js';
import Leader from '../models/Leader';
import Party from '../models/Party';

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

      case 'party': {
        this.viewPartyInfo(message);
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

    const createdLeader = await Leader.create({ id: message.author.id, name: message.author.username });
    const createdParty = await createdLeader.createParty({ partyName, leaderId: message.author.id });

    message.reply(`You've successfully registered your party, **${createdParty.partyName}**, into the guild!`);
  }

  static async viewPartyInfo(message: Message) {
    const party = await Party.findOne({ where: { leaderId: message.author.id } });

    if (party) {
      message.reply(`Party name: ${party.partyName}`);
    } else {
      message.reply(`You haven't registered into the guild yet!`);
    }
  }
}
