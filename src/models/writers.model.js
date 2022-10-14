import mongoose from 'mongoose';

// Schema de Writers
const writersSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        required: true,
    },
    biography: {
        type: String,
        default: false,
        trim: true,
        minLength: 10,
        maxLength: 500,
    },
    citizenship: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },    
    email: {
        type: String,
        required: true,
        trim: true,
        match: /.*@.*\..*/
    },
    password: {
    type: String,
    required: true
    }
});
 
// Crear el modelo
//            (nombre colección a la que hacemos referencia, Schema)
const Writer = mongoose.model('writers', writersSchema);

export {Writer};