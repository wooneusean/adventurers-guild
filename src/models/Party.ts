import { Column, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import Leader from './Leader';

@Table
export default class Party extends Model {
  @Column
  partyName: string;

  @ForeignKey(() => Leader)
  @Column
  leaderId: string;

  @HasOne(() => Leader)
  leader: Leader;

  // @HasMany(() => Member)
  // members: Member[];
}
