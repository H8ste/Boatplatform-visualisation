import boat from "../controllers/boatController";

export default app => {
  app.route("/boat").get(boat.getAllBoatVariables);
  app.route("/boat/:boatID").delete(boat.deleteBoatVariable);

  app.route("/boats").delete(boat.deleteAllBoats);

  app.route("/boatRecent/:elementToReadFrom").get(boat.getRecentInputs);
  app.route("/boatInitial/:elementToReadFrom").get(boat.getInitialInput);
};
