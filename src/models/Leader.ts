import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { BelongsToCreateAssociationMixin, BelongsToSetAssociationMixin } from 'sequelize/types';
import Party from './Party';

@Table
export default class Leader extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  id!: string;

  @Column({ type: DataType.STRING })
  name!: string;

  @ForeignKey(() => Party)
  @Column
  partyId!: number;

  @BelongsTo(() => Party)
  party!: Party;

  createParty: BelongsToCreateAssociationMixin<Party>;
}
