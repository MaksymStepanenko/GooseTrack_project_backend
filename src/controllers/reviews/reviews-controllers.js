import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import Review from "../../models/review.js";

// 1) Get all reviews in the database without authentication.
const getAllReviews = async (req, res) => {
  const { page = 1, limit = 100 } = req.query;
  if (page <= 0) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  const skip = (page - 1) * limit;

  const reviews = await Review.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "userName avatarURL");

  if (!reviews) {
    throw HttpError(200, "Any review");
  }

  res.json(reviews);
};

// 2) Get a user's review by owner ID.
const getUserReview = async (req, res) => {
  const { _id: owner } = req.user;
  const requestedUserId = req.user._id;

  if (!owner.equals(requestedUserId)) {
    return res
      .status(403)
      .json({ message: "You don't have permission to access this resource" });
  }

  const reviews = await Review.find(
    { owner: owner },
    "-createdAt -updatedAt"
  ).populate("owner", "userName avatarURL");

  if (!reviews.length) {
    return res.json(reviews); // Return an empty array with status(200) if no reviews are found.
  }

  res.json(reviews[0]);
};

// 3) Add a review by a user.
const addReview = async (req, res) => {
  const { _id: owner } = req.user;

  const existingReview = await Review.findOne({ owner });

  if (existingReview) {
    return res.status(400).json({ message: "You can only add one review." });
  }

  const result = await Review.create({ ...req.body, owner });

  res.status(201).json(result);
};

// 4) Update a user's review by review ID.
const updateReview = async (req, res) => {
  const { _id: owner } = req.user;

  const review = await Review.findOneAndUpdate(
    { owner },
    { ...req.body },
    { new: true }
  );

  if (!review) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  res.json(review);
};

// 5) Delete a user's review by review ID.
const deleteReview = async (req, res) => {
  const { _id: owner } = req.user;

  const review = await Review.findOne({ owner });

  if (!review) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  const result = await Review.findByIdAndRemove(review._id);

  if (!result) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({
    message: "Delete success",
  });
};

export default {
  getAllReviews: ctrlWrapper(getAllReviews),
  getUserReview: ctrlWrapper(getUserReview),
  addReview: ctrlWrapper(addReview),
  deleteReview: ctrlWrapper(deleteReview),
  updateReview: ctrlWrapper(updateReview),
};
