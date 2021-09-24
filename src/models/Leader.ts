import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Party from './Party';

@Table
export default class Leader extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  id!: string;

  @Column({ type: DataType.STRING })
  name!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 100 })
  health!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 50 })
  mana!: number;

  @ForeignKey(() => Party)
  @Column
  partyId!: number;

  @BelongsTo(() => Party)
  party!: Party;
}
