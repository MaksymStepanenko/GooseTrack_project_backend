import { Schema, model } from "mongoose";

import handleSaveError from "../helpers/handleSaveError.js";
// import { timeRegexp, dateRegexp } from "../helpers/regexp.js";

const taskShema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      max: 250,
    },
    start: {
      type: String,
      // required: [true, "Start time is required"],
    //   match: [timeRegexp, "Start time do not match"],
    },
    end: {
      type: String,
      // required: [true, "End time is required"],
    //   match: [timeRegexp, "End time do not match"],
      // validate: {
      //   validator: function (v) {
      //     return v >= this.start;
      //   },
      //   message: "Start time must be lower then end time",
      // },
    },
    priority: {
      type: String,
      required: [true, "Priority is required"],
      enum: ["LOW", "MEDIUM", "HIGH"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    //   match: [dateRegexp, "Date do not match"],
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