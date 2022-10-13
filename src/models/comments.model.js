import mongoose from 'mongoose'

// Schema de comments

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'writers'
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    reply: {
        type: String,
        trim: true
    },
    replyDate: {
        type: Date,
        trim: true
    }
})

// Regex -> los compiladores se crean con Regex
//    / regex /  Nos permite trabajar con patrones de busqueda sobre texto
// Crear el modelo
//            (nombre colección a la que hacemos referencia, schema)
const Comment = mongoose.model('comment', commentSchema)

export {Comment}


