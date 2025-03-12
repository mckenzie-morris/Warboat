import mongoose from "mongoose";
import { format } from "date-fns";

const profileSchema = mongoose.Schema({
  username: {
    type: String,
    /* attach a required validator to this path, which ensures this path cannot 
    be set to a nullish value */
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  highestScore: {
    type: String,
    default: 'N/A',
  },
  mostRecentScore: {
    type: String,
    default: 'N/A',
  },
  acctCreated: {
    type: String,
    // Mongoose applies default if the value of the path is strictly undefined
    default: `${format(new Date(), "MM/dd/yyyy: HH:mm:ss")}`,
  },
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile