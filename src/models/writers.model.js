import mongoose from 'mongoose';

// Schema de Koders
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
    singUpDate: {
        type: Date,
        required: true,
    },
    bibliography: {
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
    }
});
 
// Crear el modelo
//            (nombre colección a la que hacemos referencia, Schema)
const Writer = mongoose.model('writers', writersSchema);

export {Writer};