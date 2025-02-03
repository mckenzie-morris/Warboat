import mongoose from "mongoose";
import { format } from "date-fns";

const MostRecentScoreSchema = mongoose.Schema({
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

const MostRecentScore = mongoose.model('MostRecentScore', MostRecentScoreSchema);

export default MostRecentScore