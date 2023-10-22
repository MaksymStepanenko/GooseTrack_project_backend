import express from "express";
import reviewController from "../../controllers/reviews/reviews-controllers.js";
import authenticate from "../../middlewares/authenticate.js";
import isValidId from "../../middlewares/isValidId.js";

const reviewsRouter = express.Router();

// 1) Get reviews of all users. GET /reviews
reviewsRouter.get("/", reviewController.getAllReviews);

// 2) Get a user's review. GET /reviews/own

reviewsRouter.get("/own", authenticate, reviewController.getUserReview);

// 3) Add a review. POST /reviews/own
reviewsRouter.post("/own", authenticate, reviewController.addReview);

// 4) Update a user's review. PATCH /reviews/own
reviewsRouter.patch(
  "/own/:id",
  isValidId,
  authenticate,
  reviewController.updateReviewById
);

// 5) Delete a user's review.
reviewsRouter.delete(
  "/own/:id",
  isValidId,
  authenticate,
  reviewController.deleteReviewById
);

export default reviewsRouter;
