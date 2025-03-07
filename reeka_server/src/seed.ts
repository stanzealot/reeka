import { PriceOverrideInstance } from "./db/models/priceOverride";
import { PropertyInstance } from "./db/models/property";

const seedDatabase = async () => {
  try {
    // No db.sync() here!

    // Check if properties already exist to avoid duplicates
    const existingProperties = await PropertyInstance.findAll();
    if (existingProperties.length > 0) {
      console.log("⚠️ Database already seeded. Skipping seeding...");
      return;
    }

    const properties = await PropertyInstance.bulkCreate([
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Luxury Villa",
        location: "Bali, Indonesia",
        description: "A beautiful villa with a private pool.",
        basePrice: 300,
        userId: "110e8400-e29b-41d4-a716-446655440000",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Beach House",
        location: "Maldives",
        description: "A cozy beach house with ocean view.",
        basePrice: 250,
        userId: "110e8400-e29b-41d4-a716-446655440000",
      },
    ]);

    await PriceOverrideInstance.bulkCreate([
      {
        id: "660e8400-e29b-41d4-a716-446655440000",
        propertyId: properties[0].id,
        date: new Date("2023-12-25"),
        price: 500,
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        propertyId: properties[0].id,
        date: new Date("2023-12-31"),
        price: 600,
      },
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error(" Error seeding database:", error);
  }
};

export { seedDatabase };
