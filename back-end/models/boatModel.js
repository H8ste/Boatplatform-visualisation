import mongoose, { Schema } from "mongoose";

/**
 * Create database scheme for spells
 */
const BoatScheme = new Schema({
  gps: {
    err_climb: Number,
    err_roll: Number,
    header: {
      stamp: {
        secs: Number,
        nsecs: Number
      },
      frame_id: String,
      seq: Number
    },
    err_track: Number,
    pitch: Number,
    err_vert: Number,
    speed: Number,
    gdop: Number,
    err_dip: Number,
    altitude: Number,
    err_pitch: Number,
    position_covariance: [Number],
    latitude: Number,
    roll: Number,
    position_covariance_type: Number,
    status: {
      satellite_visible_z: [],
      satellites_used: Number,
      position_source: Number,
      satellite_visible_snr: [],
      orientation_source: Number,
      satellite_visible_azimuth: [],
      satellite_visible_prn: [],
      header: {
        stamp: {
          secs: Number,
          nsecs: Number
        },
        frame_id: String,
        seq: Number
      },
      status: Number,
      satellites_visible: Number,
      motion_source: Number,
      satellite_used_prn: []
    },
    err_speed: Number,
    vdop: Number,
    hdop: Number,
    err_horz: Number,
    track: Number,
    err_time: Number,
    tdop: Number,
    err: Number,
    pdop: Number,
    longitude: Number,
    time: Number,
    climb: Number,
    dip: Number
  },
  imu: {
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
  },
  wind: {
    y: Number,
    x: Number,
    theta: Number
  },
  imu_dv: {
    linear: {
      y: Number,
      x: Number,
      z: Number
    },
    angular: {
      y: Number,
      x: Number,
      z: Number
    }
  },
  mag: {
    y: Number,
    x: Number,
    z: Number
  },
  time: {
    data: Number
  }
});

export default mongoose.model("Boat", BoatScheme);
