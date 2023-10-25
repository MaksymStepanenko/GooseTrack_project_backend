import express from "express";
import reviewController from "../../controllers/reviews/reviews-controllers.js";
import authenticate from "../../middlewares/authenticate.js";
import isValidId from "../../middlewares/isValidId.js";
import { validateBody } from "../../decorators/index.js";
import * as reviewsSchemas from "../../models/review.js";

const reviewsRouter = express.Router();

const reviewValidate = validateBody(reviewsSchemas.addReviewSchema);

// 1) Get reviews of all users. GET /reviews
reviewsRouter.get("/", reviewController.getAllReviews);

// 2) Get a user's review. GET /reviews/own

reviewsRouter.get("/own", authenticate, reviewController.getUserReview);

// 3) Add a review. POST /reviews/own
reviewsRouter.post(
  "/own",
  authenticate,
  reviewValidate,
  reviewController.addReview
);

// 4) Update a user's review. PATCH /reviews/own
reviewsRouter.patch(
  "/own",
  authenticate,
  reviewValidate,
  reviewController.updateReview
);

// 5) Delete a user's review.
reviewsRouter.delete("/own", authenticate, reviewController.deleteReview);

export default reviewsRouter;
