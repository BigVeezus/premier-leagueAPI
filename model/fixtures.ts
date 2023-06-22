import mongoose from "mongoose";
import * as slugger from "mongoose-slugger-plugin";

// An interface that describes the properties
// that are requried to create a new Match
interface FixtureAttrs {
  homeTeam: string;
  awayTeam: string;
  gameStadium: string;
  isCompleted?: boolean;
  isPending?: boolean;
  date: string;
}

// An interface that describes the properties
// that a Match Model has
interface FixtureModel extends mongoose.Model<FixtureDoc> {
  build(attrs: FixtureAttrs): FixtureDoc;
}

// An interface that describes the properties
// that a User Document has
interface FixtureDoc extends mongoose.Document {
  homeTeam: string;
  awayTeam: string;
  gameStadium: string;
  isCompleted?: boolean;
  isPending?: boolean;
  date: string;
  slug: string;
}

const fixtureSchema = new mongoose.Schema(
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
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPending: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
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

fixtureSchema.index({ date: 1, slug: 1 }, { name: "date_slug", unique: true });

fixtureSchema.plugin(
  slugger.plugin,
  new slugger.SluggerOptions({
    slugPath: "slug",
    generateFrom: ["homeTeam", "awayTeam"],
    index: "date_slug",
  })
);

fixtureSchema.statics.build = (attrs: FixtureAttrs) => {
  return new Fixture(attrs);
};

let Fixture = mongoose.model<FixtureDoc, FixtureModel>(
  "Fixture",
  fixtureSchema
);
Fixture = slugger.wrap(Fixture);

export { Fixture };
