import { DataTypes, Model } from "sequelize";
import db from "..";
interface PriceOverrideAttributes {
  id: string;
  propertyId: string;
  date: Date;
  price: number;
}

export class PriceOverrideInstance extends Model<PriceOverrideAttributes> {}

PriceOverrideInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "PriceOverride",
    tableName: "PriceOverrides",
  }
);
