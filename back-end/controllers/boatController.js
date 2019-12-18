import boat from "../models/boatModel.js";

exports.sendAndSaveBoat = (req, res) => {
  console.log(req.body);
  const newBoat = new boat(req.body);
  console.log(newBoat);
  newBoat.save((err, boat) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ status: "saved boat" });
    }
  });
};
exports.getAllBoatVariables = (req, res) => {
  boat.find({}, (err, boat) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(boat);
    }
  });
};
exports.deleteBoatVariable = (req, res) => {
  boat.remove(
    {
      _id: req.params.boatID
    },
    err => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({
          message: `boat: ${req.params.boatID} | was successfully deleted`
        });
      }
    }
  );
};
exports.deleteAllBoats = (req, res) => {
  boat.remove({}, (err, response) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(response);
    }
  });
};
exports.retrieveSensorsFromBoat = (req, res) => {
  const newGPS = new boat({
    gps: JSON.parse(req.body.gps),
    imu: JSON.parse(req.body.imu),
    time: JSON.parse(req.body.time),
    wind: JSON.parse(req.body.wind),
    rudder: JSON.parse(req.body.rudder),
    sail: JSON.parse(req.body.sail)
  });
  newGPS.save((err, boat) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json({ status: "ok" });
    }
  });
};
exports.getRecentInputs = (req, res) => {
  boat.count({}, (err, databaseEntriesCount) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (databaseEntriesCount - Number(req.params.elementToReadFrom) !== 0) {
        boat.find(
          {},
          "_id gps imu",
          {
            limit: databaseEntriesCount - req.params.elementToReadFrom,
            sort: "-_id"
          },
          (err, _boat) => {
            if (err) {
              res.send(err);
            } else {
              res.json({
                data: _boat.reverse(),
                dbCount: databaseEntriesCount
              });
            }
          }
        );
      } else {
        res.send({ message: "No new entries can be found in database" });
      }
    }
  });
};
exports.getInitialInput = (req, res) => {
  boat.count({}, (err, databaseEntriesCount) => {
    if (err) {
      res.send(err);
    } else {
      boat.find(
        {},
        "_id gps imu",
        { limit: Number(req.params.elementToReadFrom) + 1, sort: "_id" },
        (err, _boat) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.json({
              data: _boat[req.params.elementToReadFrom],
              dbCount: databaseEntriesCount
            });
          }
        }
      );
    }
  });
};
