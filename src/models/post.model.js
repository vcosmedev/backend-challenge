import mongoose from "mongoose";

// Schema de post model

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "writers",
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  tags: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  headerImg: {
    type: String,
    trim: true,
  },
  postImg: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "comments",
  },
  reading: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Post = mongoose.model("posts", postSchema);

export { Post };
