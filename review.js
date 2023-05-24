
// REVIEW DATABASE WITH REVIEW , FROM , FOR FIELDS OR STORING ALL THE REVIEWS
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },

    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    for: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review',ReviewSchema);
module.exports =Review;