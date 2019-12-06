import mongoose, { Schema } from "mongoose";
const IMUSchema = new Schema(
  {
  linear_acceleration_covariance: [Number],
  orientation: {
    y: Number,
    x: Number,
    z: Number,
    w: Number
  },
  angular_velocity_covariance: [Number],
  orientation_covariance: [Number],
  header: {
    stamp: {
      secs: Number,
      nsecs: Number
    },
    frame_id: String,
    seq: Number
  },
  linear_acceleration: {
    y: Number,
    x: Number,
    z: Number
  },
  angular_velocity: {
    y: Number,
    x: Number,
    z: Number
  }
}
);

export default mongoose.model("IMU", IMUSchema);
