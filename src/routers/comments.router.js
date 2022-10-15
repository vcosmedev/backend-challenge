import express from 'express'
import * as commentUseCase from '../useCases/comments.use.js'
import * as posts from '../useCases/posts.use.js'
import {StatusHttp} from '../libs/errorCustom.js'
import jwt from 'jsonwebtoken'
import {auth} from '../middlewares/auth.js'

const router = express.Router()

router.get('/:idPost', async(request, response)=>{
    try{
        const {idPost}= request.params
        const allPostComments = await commentUseCase.getById(idPost)
        response.json({
            success: true,
            data: {
                comment: allPostComments
            },
        })
    } catch(error){
        next(new StatusHttp(error.message, error.status, error.name))
    }
})

router.get('/', async(request, response)=>{
    try{

        const {idUser, idPost} = request.query
        let allComments = '';
        if(idUser){
            allComments = await commentUseCase.getByUser(idUser)
        }else if(idPost){
            allComments = await commentUseCase.getByPost(idPost)
        } 
        else{
            throw new StatusHttp('neither an user nor a post are declare!', 404)
        }

        response.json({
            success: true,
            data: {
                comment: allComments
            },
        })
    } catch(error){
        next(new StatusHttp(error.message, error.status, error.name))
    }
})

router.post('/post/:idPost',auth, async (request, response,next)=>{
    try{
    const idPost = request.params.idPost;
    const newCommentData = request.body
    const token = request.headers.authorization
    const {id} = jwt.decode(token)
    const newComment = await commentUseCase.create(newCommentData,id,idPost)
    const postUpdated = await posts.createComment(newComment.post, newComment.id)
    response.json({
        success: true,
        data: {
            comment: newComment
        }
    })
    } catch(error){
        next(new StatusHttp(error.message, error.status, error.name))
    }
})

router.patch('/:idComment', async (request, response)=>{
    try{
        const {idComment} = request.params
        const updatedCommentData = request.body
        const updatedComment = await commentUseCase.update(idComment, updatedCommentData) 
        response.json({
            success: true,
            data: {
                comment: updatedComment
            },
        })
    } catch (error){
        next(new StatusHttp(error.message, error.status, error.name))
    }
})

router.delete('/:idComment',auth, async (request, response)=>{
    try{
        const {idComment}= request.params
        const commentDeleted = await commentUseCase.deleteById(idComment)
        const postId = commentDeleted.post.toString()
        const postUpdated = await posts.deleteComment(postId, commentDeleted.id)
        response.json({
            success: true,
            data: {
                comment: commentDeleted
            }
        })
    } catch(error){
        next(new StatusHttp(error.message, error.status, error.name))
    }
})

export default router