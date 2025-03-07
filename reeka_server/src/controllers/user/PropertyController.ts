import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { PropertyInstance } from "../../db/models/property";
import { PriceOverrideInstance } from "../../db/models/priceOverride";
// import { PropertyInstance } from '../models/property';
// import { PriceOverrideInstance } from '../models/priceOverride';

export default class PropertyController {
  protected async updatePropertyPrice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { propertyId, date, price, startDate, endDate } = req.body;

      let property: any = await PropertyInstance.findOne({
        where: { id: propertyId },
        include: [{ model: PriceOverrideInstance, as: "priceOverrides" }],
      });

      property = property?.toJSON();

      if (property?.priceOverrides?.length > 0 && date) {
        const propertyPriceOnDate = property.priceOverrides.filter(
          (propert: any) => {
            return propert.date === String(new Date(date));
          }
        );

        if (propertyPriceOnDate?.length > 0) {
          const updatePriceOverrideInstance =
            await PriceOverrideInstance.update(
              { price },
              { where: { id: propertyPriceOnDate[0].id } }
            );

          const updatePropertyInstance = await PropertyInstance.update(
            { basePrice: price },
            { where: { id: propertyId } }
          );

          return res.status(200).json({
            message: "Price updated successfully",
            updatePriceOverrideInstance,
          });
        }
      } else if (property?.priceOverrides?.length > 0 && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const overrides = [];

        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          const propertyPriceOnDate = property.priceOverrides.filter(
            (propert: any) => {
              return propert.date === String(new Date(d));
            }
          );

          if (propertyPriceOnDate?.length > 0) {
            const updatePriceOverrideInstance =
              await PriceOverrideInstance.update(
                { price },
                { where: { id: propertyPriceOnDate[0].id } }
              );
            overrides.push(updatePriceOverrideInstance);
            const updatePropertyInstance = await PropertyInstance.update(
              { basePrice: price },
              { where: { id: propertyId } }
            );
          } else {
            const override = await PriceOverrideInstance.create({
              id: uuidv4(),
              propertyId,
              date: new Date(d),
              price,
            });
            overrides.push(override);
            const updatePropertyInstance = await PropertyInstance.update(
              { basePrice: price },
              { where: { id: propertyId } }
            );
          }
        }

        return res
          .status(200)
          .json({ message: "Prices updated successfully", overrides });
      }

      if (date) {
        const override = await PriceOverrideInstance.create({
          id: uuidv4(),
          propertyId,
          date: new Date(date),
          price,
        });
        const updatePropertyInstance = await PropertyInstance.update(
          { basePrice: price },
          { where: { id: propertyId } }
        );
        return res
          .status(200)
          .json({ message: "Price updated successfully", override });
      } else if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const overrides = [];

        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          const override = await PriceOverrideInstance.create({
            id: uuidv4(),
            propertyId,
            date: new Date(d),
            price,
          });
          overrides.push(override);
          const updatePropertyInstance = await PropertyInstance.update(
            { basePrice: price },
            { where: { id: propertyId } }
          );
        }

        return res
          .status(200)
          .json({ message: "Prices updated successfully", overrides });
      } else {
        return res.status(400).json({ error: "Invalid input" });
      }
    } catch (error) {
      console.log(error);
      next(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  protected async getPropertyPrices(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { propertyId } = req.params;

      const property = await PropertyInstance.findOne({
        where: { id: propertyId },
        include: [{ model: PriceOverrideInstance, as: "priceOverrides" }],
      });

      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      return res.status(200).json({ property });
    } catch (error) {
      console.log(error);
      next(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  protected async getAllProperties(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let properties: any = await PropertyInstance.findAll({
        include: [{ model: PriceOverrideInstance, as: "priceOverrides" }],
      });

      properties = properties.map((property: any) => property.toJSON());

      let todayDate = new Date().toISOString().split("T")[0] + "T00:00:00.000Z";

      properties = properties.map((property: any) => {
        let price = property.basePrice;
        const priceOverride = property.priceOverrides.find(
          (propert: any) => propert.date === todayDate
        );
        if (priceOverride) {
          price = priceOverride.price;
        }
        return { ...property, price };
      });

      return res.status(200).json(properties);
    } catch (error) {
      console.log(error);
      next(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
