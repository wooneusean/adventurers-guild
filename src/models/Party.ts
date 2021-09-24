import { Column, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { HasManyAddAssociationMixin, HasManyHasAssociationMixin } from 'sequelize/types';
import Leader from './Leader';
import Member from './Member';

@Table
export default class Party extends Model {
  @Column({ unique: true })
  partyName!: string;

  @ForeignKey(() => Leader)
  @Column
  leaderId!: string;

  @HasOne(() => Leader)
  leader!: Leader;

  @HasMany(() => Member)
  members: Member[];

  addMember: HasManyAddAssociationMixin<Member, number>;
  hasMember: HasManyHasAssociationMixin<Member, number>;
}
