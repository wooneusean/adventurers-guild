import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Party from './Party';

@Table
export default class Member extends Model {
  @Column({ unique: true })
  name: string;

  @Column({ defaultValue: 100 })
  health: number;

  @Column({ defaultValue: 50 })
  mana: number;

  @Column({ defaultValue: 1 })
  level: number;

  @ForeignKey(() => Party)
  @Column
  partyId: number;

  @BelongsTo(() => Party)
  party: Party;
}
