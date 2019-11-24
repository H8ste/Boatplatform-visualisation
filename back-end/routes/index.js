import boat from "../controllers/boatController";
import boatModel from "../models/boatModel";

export default app => {
  app.route("/boat").post(boat.sendAndSaveBoat);

  // app
  //   .route("/spells/:spellId")
  //   .get(boat.getSpell)
  //   .put(boat.updateSpell)
  //   .delete(boat.deleteSpell);
};
