import { Post } from "../models/post.model.js";

function getAll() {
  return Post.find({}).populate("author");
}

function getById(id) {
  return Post.findById(id);
}

function getPostByUserId(id) {
  return Post.find({ author: id });
}

function getByUser(id) {
  return Post.find({ author: id });
}

function deleteById(id) {
  return Post.findByIdAndDelete(id);
}

async function create(newPost, author) {
  // console.log(author);
  const likes = Math.round(Math.random() * (50 - 0) + 0);
  const date = new Date().toDateString();
  const reading = Math.round(Math.random() * 10);
  const { title, tags, description, headerImg, postImg } = newPost;
  return Post.create({
    title,
    date,
    tags,
    description,
    headerImg,
    postImg,
    likes,
    reading,
    author,
  });
}

function update(idPost, updatedPost) {
  return Post.findByIdAndUpdate(idPost, updatedPost, { new: true });
}

export {
  getAll,
  getById,
  getByUser,
  getPostByUserId,
  deleteById,
  update,
  create,
};
