import { Schema, model } from "mongoose";

import handleSaveError from "../helpers/handleSaveError.js";

const timeRegexp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const dateRegexp = /^20\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])/;

const taskShema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      max: 250,
    },
    start: {
      type: String,
      required: [true, "Start time is required"],
      match: [timeRegexp, "Start time do not match"],
    },
    end: {
      type: String,
      required: [true, "End time is required"],
      match: [timeRegexp, "End time do not match"],
      validate: {
        validator: function (v) {
          return v >= this.start;
        },
        message: "Start time must be lower then end time",
      },
    },
    priority: {
      type: String,
      required: [true, "Priority is required"],
      enum: ["LOW", "MEDIUM", "HIGH"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      match: [dateRegexp, "Date do not match"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["TODO", "INPROGRESS", "DONE"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);


taskShema.post("save", handleSaveError);

const Task = model("task", taskShema);

export default Task;