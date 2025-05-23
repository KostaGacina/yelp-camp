const Campground = require("../models/campgrounds");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Review posted!");
  res.redirect(`/campgrounds/${campground._id}`);
};

//module.exports.renderReviewPage = async (req, res) => {
//  const id = req.params.id;
//  res.redirect(`/campgrounds/${id}`);
//};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review removed!");
  res.redirect(`/campgrounds/${id}`);
};
