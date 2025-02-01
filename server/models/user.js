import mongoose from "mongoose";
import { format } from "date-fns";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // will this work? ▼
  acctCreated: {
    type: String,
    default: `${format(new Date(), "MM/dd/yyyy\tHH:mm:ss")}`,
  },
});

const User = mongoose.model('User', userSchema);

export default User