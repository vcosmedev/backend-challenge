import express from "express";
import * as posts from "../useCases/posts.use.js";
import * as commentUseCase from "../useCases/comments.use.js";
import { auth } from "../middlewares/auth.js";
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

    const postByID = await posts.getById(id);
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

router.post("/", auth, async (request, response, next) => {
  try {
    const { body: newPostData, userCurrent } = request;
    console.log(userCurrent);
    const newPost = await posts.create(newPostData, userCurrent);

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
    const updatedPost = await posts.update(idPost, postUpdated);
    response.status(200).json({
      success: true,
      post: updatedPost,
      message: "card Updated!",
    });
  } catch (error) {
    next(new StatusHttp(error.message, error.status, error.name));
  }
});

export default router;
