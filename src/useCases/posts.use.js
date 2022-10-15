import {Post} from '../models/post.model.js'


function getAll(){
    return Post.find({}).populate('author')
}

function getById(id){
    return Post.findById(id).populate('author')
}

function getPostByUserId(id){
    return Post.find({author: id})
}

function getByUser(id){
    return Post.find({author: id})
}

function deleteById(id){
    return Post.findByIdAndDelete(id)
}

async function create (newPost,author){
    const {title, date, tags, description, headerImg, postImg,reading} = newPost
    return Post.create({title, date, tags, description, headerImg, postImg,reading, author})
}

function update(idPost, updatedPost){
    return Post.findByIdAndUpdate(idPost, updatedPost, {new : true})
}

export {
    getAll,
    getById,
    getByUser,
    getPostByUserId,
    deleteById,
    update, 
    create
    }