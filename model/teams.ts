import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new User
interface TeamAttrs {
  name: string;
  league: string;
  yearFounded: number;
  stadium: string;
}

// An interface that describes the properties
// that a Team Model has
interface TeamModel extends mongoose.Model<TeamDoc> {
  build(attrs: TeamAttrs): TeamDoc;
}

// An interface that describes the properties
// that a User Document has
interface TeamDoc extends mongoose.Document {
  name: string;
  league: string;
  yearFounded: number;
  stadium: string;
}

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    league: {
      type: String,
      required: true,
    },
    yearFounded: {
      type: Number,
      required: true,
    },
    stadium: {
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

teamSchema.statics.build = (attrs: TeamAttrs) => {
  return new Team(attrs);
};

const Team = mongoose.model<TeamDoc, TeamModel>("Team", teamSchema);

export { Team };
