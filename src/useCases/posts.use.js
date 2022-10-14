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

async function create (newCard,author){
    const {title, date, tags, description, headerImg, postImg,reading} = newCard
    return Post.create({title, date, tags, description, headerImg, postImg,reading, author})
}

function update(idCard, unupdatedCard){
    return Post.findByIdAndUpdate(idCard, unupdatedCard, {new : true})
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