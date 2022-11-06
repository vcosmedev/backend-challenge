import express from "express";
import * as posts from "../useCases/posts.use.js";
import * as commentUseCase from "../useCases/comments.use.js";
import { auth } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";
import { StatusHttp } from "../libs/errorCustom.js";

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    let allPosts = "";
    const { idWriter } = request.query;

    if (idWriter) {
      allPosts = await posts.getByUser(idWriter);
    } else {
      allPosts = await posts.getAll();
    }
    response.json({
      success: true,
      data: {
        posts: allPosts,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});
router.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.query;

    let postByID = await posts.getByID(id);
    response.json({
      success: true,
      data: {
        posts: postByID,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.get("/writer/:idWriter", auth, async (request, response, next) => {
  try {
    const { idWriter } = request.params;
    console.log(idWriter);
    const card = await posts.getPostByUserId(idWriter);

    response.json({
      success: true,
      data: {
        cards: card,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { body: newPostData } = request;
    const token = request.headers.authorization;
    const { id } = jwt.decode(token);
    console.log(id);
    const newPost = await posts.create(newPostData, id);

    response.json({
      success: true,
      data: {
        post: newPost,
      },
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.delete("/:idPost", async (request, response, next) => {
  try {
    const { idPost } = request.params;
    const postDelete = await posts.deleteById(idPost);
    const commentsDeleted = await commentUseCase.deleteById(idPost);
    response.status(200).json({
      success: true,
      card: postDelete,
      comments: commentsDeleted,
      message: "Post Deleted!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

router.patch("/:idPost", auth, async (request, response, next) => {
  try {
    const postUpdated = request.body;
    const { idPost } = request.params;
    const cardUpdated = await posts.update(idPost, postUpdated);
    response.status(200).json({
      success: true,
      card: cardUpdated,
      message: "card Updated!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;
