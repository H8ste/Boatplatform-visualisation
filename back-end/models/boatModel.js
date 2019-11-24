import mongoose, { Schema } from "mongoose";
import { Interface } from "readline";

/**
 * Create database scheme for spells
 */
const BoatScheme = new Schema({
  remoteController: Object,
  imu: Object,
  gps: Object,
  rudder: Object,
  sail: Object,
  windvane: Object
});

export default mongoose.model("Boat", BoatScheme);
