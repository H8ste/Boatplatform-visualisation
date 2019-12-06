import mongoose, { Schema } from "mongoose";
const GPSScheme = new Schema(
  {
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
  }
  // gps: {
  //   header: {
  //     seq: Number,
  //     stamp: {
  //       sec: Number,
  //       nsec: Number
  //     },
  //     frame_id: String,
  //     GPSStatus: {
  //       header: {
  //         seq: Number,
  //         stamp: {
  //           sec: Number,
  //           nsec: Number
  //         },
  //         frame_id: String
  //       },
  //       satellites_used: Number,
  //       satellite_used_prn: [],
  //       satellites_visible: Number,
  //       satellite_visible_prn: [],
  //       satellite_visible_z: [],
  //       satellite_visible_azimuth: [],
  //       satellite_visible_snr: [],
  //       status: Number,
  //       motion_source: Number,
  //       orientation_source: Number,
  //       position_source: Number,
  //       latitude: Number,
  //       longitude: Number,
  //       altitude: Number,
  //       track: Number,
  //       speed: Number,
  //       climb: Number,
  //       pitch: Number,
  //       roll: Number,
  //       dip: Number,
  //       time: Number,
  //       gdop: Number,
  //       pdop: Number,
  //       hdop: Number,
  //       vdop: Number,
  //       tdop: Number,
  //       err: Number,
  //       err_horz: Number,
  //       err_vert: Number,
  //       err_track: Number,
  //       err_speed: Number,
  //       err_climb: Number,
  //       err_time: Number,
  //       err_pitch: Number,
  //       err_roll: Number,
  //       err_dip: Number,
  //       position_covariance: [Number],
  //       position_covariance_type: Number
  //     }
  //   }
  // }
  // gps: String
);

export default mongoose.model("GPS", GPSScheme);
