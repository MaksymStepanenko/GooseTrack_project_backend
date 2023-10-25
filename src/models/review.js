import { Schema, model } from "mongoose";
import Joi from "joi";

const reviewSchema = new Schema(
  {
    text: { type: String, default: "", required: true, maxlength: 250 }, // Maximum of 250 characters in the review.
    rating: { type: Number, default: 5, required: true, min: 1, max: 5 }, // Rating from 1 to 5 stars.
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const addReviewSchema = Joi.object({
  text: Joi.string().required().max(250),
  rating: Joi.number().required().min(1).max(5),
});

const Review = model("reviews", reviewSchema);

export default Review;
