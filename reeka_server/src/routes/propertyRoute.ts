import { Router } from "express";
import { PropertyController } from "../controllers";

class PropertyRoute extends PropertyController {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.route("/").get(this.getAllProperties);
    this.router.route("/:propertyId/prices").post(this.getPropertyPrices);
    this.router.route("/update-price").post(this.updatePropertyPrice);
  }
}
export default new PropertyRoute().router;
