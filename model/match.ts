import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Match
interface MatchAttrs {
  homeTeam: string;
  awayTeam: string;
  gameStadium: number;
  date: string;
}

// An interface that describes the properties
// that a Match Model has
interface MatchModel extends mongoose.Model<MatchDoc> {
  build(attrs: MatchAttrs): MatchDoc;
}

// An interface that describes the properties
// that a User Document has
interface MatchDoc extends mongoose.Document {
  homeTeam: string;
  awayTeam: string;
  gameStadium: number;
  date: string;
}

const matchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    gameStadium: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

matchSchema.statics.build = (attrs: MatchAttrs) => {
  return new Match(attrs);
};

const Match = mongoose.model<MatchDoc, MatchModel>("Match", matchSchema);

export { Match };
