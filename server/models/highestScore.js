import mongoose from "mongoose";
import { format } from "date-fns";

const highestScoreSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  score: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: `${format(new Date(), "MM/dd/yyyy\tHH:mm:ss")}`,
  },
});

const HighestScore = mongoose.model('HighestScore', highestScoreSchema);

export default HighestScore