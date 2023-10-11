const moment = require("moment");
const ReactionSchema = require("./Reaction");
const { Schema, model } = require("mongoose");

const thoughSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAd: {
      type: Date,
      default: Date.now,
      get: (currentDate) => moment(currentDate).toDate(),
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
