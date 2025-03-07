import { DataTypes, Model } from "sequelize";
import db from "..";
import { PriceOverrideInstance } from "./priceOverride";

interface PropertyAttributes {
  id: string;
  name: string;
  location: string;
  description: string;
  basePrice: number;
  userId: string;
}

export class PropertyInstance extends Model<PropertyAttributes> {
  id: string;
  basePrice: number;
}

PropertyInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    basePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Property",
    tableName: "Properties",
  }
);

PropertyInstance.hasMany(PriceOverrideInstance, {
  foreignKey: "propertyId",
  as: "priceOverrides",
});
PriceOverrideInstance.belongsTo(PropertyInstance, {
  foreignKey: "propertyId",
  as: "property",
});
