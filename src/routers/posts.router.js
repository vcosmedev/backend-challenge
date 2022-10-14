import express from 'express';
import * as posts from '../useCases/posts.use.js'
import * as commentUseCase from '../useCases/comments.use.js'
import {auth} from '../middlewares/auth.js'
import jwt from 'jsonwebtoken'


const router = express.Router();

router.get('/', async (request,response) => {
    try{
        let allPosts = ''
        const{idUser} = request.query

        if(idUser){
            allPosts = await posts.getByUser(idUser)
        }else{
            allPosts = await posts.getAll()
        }
        response.json({
            success: true,
            data: {
                posts: allPosts
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/writer/:idUser', async (request,response) => {
    try{
        const {idUser} = request.params
        console.log(idUser)
        const card = await posts.getPostByUserId(idUser)

        response.json({
            success: true,
            data: {
                cards: card
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})


router.post('/', auth,async (request,response,next) => {
    try{
        const {body: newPostContent} = request
        const token = request.headers.authorization
        const {id} = jwt.decode(token)
        console.log(id)
        const newPost = await posts.create(newPostContent,id)
        
        response.json({
            success: true,
            data: {
                post: newPost
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})


router.delete('/:idPost',auth, async (request, response)=>{
    try{
        const {idPost} = request.params
        const cardDeleted = await posts.deleteById(idPost)
        const commentsDeleted = await commentUseCase.deletePostComments(idPost)
        response.status(200).json({
            success: true,
            card: cardDeleted,
            comments: commentsDeleted,
            message: "card Deleted!"
        })
    } catch (error){
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.patch('/:idPost',auth, async (request, response)=>{
    try{
        const updateCardRequest = request.body
        const {idPost} = request.params
        const cardUpdated = await posts.update(idPost, updateCardRequest)
        response.status(200).json({
            success: true,
            card: cardUpdated,
            message: "card Updated!"
        })
    } catch (error){
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})


export default router