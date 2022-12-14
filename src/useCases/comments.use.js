import {Comment} from '../models/comments.model.js'

function getAll(){
    return Comment.find({})
}

function getById(id){
    return Comment.findById(id)
}

function getByPost(id){
    return Comment.find({post: id})
}

function getByUser(id){
    return Comment.find({author: id})
}

async function create(newComment,user,post){
    const {text,reactions,date} = newComment
    return Comment.create({text,reactions,date,user,post})
}

function update(id, newComment){
    return Comment.findByIdAndUpdate(id, newComment, {new : true})
}

function deleteById(id){
    return Comment.findByIdAndDelete(id)
}



export {
    create, 
    getAll,
    getById,
    getByPost,
    getByUser,
    update,
    deleteById
}