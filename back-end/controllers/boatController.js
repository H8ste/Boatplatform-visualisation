import mongoose from "mongoose";
import boat from "../models/boatModel.js/index.js";
const request = require("request");

exports.sendAndSaveBoat = (req, res) => {
  //angular side
  //file side
};

// exports.getSpell = (req, res) => {
//   spell.findById(req.params.spellId, (err, spell) => {
//     if (err) {
//       res.send(err);
//     }

//     res.json(spell);
//   });
// };

// exports.getAllSpells = (req, res) => {
//   spell.find({}, (err, spells) => {
//     if (err) {
//       res.send(err);
//     }

//     res.json(spells);
//   });
// };

// exports.createSpell = (req, res) => {
//   const newspell = new spell(req.body);

//   newspell.save((err, spell) => {
//     if (err) {
//       res.send(err);
//     }

//     res.json(spell);
//   });
// };

// exports.updateSpell = (req, res) => {
//   spell.findOneAndUpdate(
//     {
//       _id: req.params.spellId
//     },
//     req.body,
//     (err, spell) => {
//       if (err) {
//         res.send(err);
//       }

//       res.json(spell);
//     }
//   );
// };

// exports.deleteSpell = (req, res) => {
//   console.log("inside delete");
//   spell.remove(
//     {
//       _id: req.params.spellId
//     },
//     err => {
//       if (err) {
//         res.send(err);
//       }

//       res.json({
//         message: `spell ${req.params.spellId} successfully deleted`
//       });
//     }
//   );
// };
