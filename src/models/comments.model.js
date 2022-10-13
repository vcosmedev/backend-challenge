import mongoose from 'mongoose'

// Schema de comments

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true
    },
    picture: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    commentDate: {
        type: String,
        required: true,
        trim: true
    },
    commentReply: {
        type: String,
        trim: true
    },
    replyDate: {
        type: String,
        trim: true
    }
})

// Regex -> los compiladores se crean con Regex
//    / regex /  Nos permite trabajar con patrones de busqueda sobre texto
// Crear el modelo
//            (nombre colección a la que hacemos referencia, schema)
const Comment = mongoose.model('comment', commentSchema)

export {Comment}


