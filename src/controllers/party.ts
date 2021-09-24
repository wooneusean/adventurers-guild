import { Message } from 'discord.js';
import Leader from '../models/Leader';
import Member from '../models/Member';
import Party from '../models/Party';

export default class PartyController {
  static processCommand(message: Message, args: string[]) {
    const command = args.shift();

    switch (command) {
      case 'add': {
        this.addPartyMember(message, args.join(' '));
      }

      default:
        break;
    }
  }

  static async addPartyMember(message: Message, memberName: string) {
    const leader = await Leader.findOne({
      where: { id: message.author.id },
      include: [
        {
          model: Party,
          include: [Member],
        },
      ],
    });

    if (!leader) return message.reply(`You haven't registered into the guild yet!`);

    try {
      await leader.party.addMember(await Member.create({ name: memberName, partyId: leader.party.id }));
    } catch (error) {
      if (leader.party.members.find((member) => member.name === memberName)) {
        message.reply(`This adventurer, **${memberName}**, is already in your party!`);
      } else {
        message.reply(`This adventurer, **${memberName}**, is already registered under another party!`);
      }
      return;
    }

    message.reply(`Added **${memberName}** to your party!`);
  }
}
