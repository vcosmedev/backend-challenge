import { StatusHttp } from '../libs/errorCustom.js';
import {Writer} from '../models/writers.model.js';
import bcrypt from '../libs/bcrypt.js';

async function create(newWriter) {
    // Modificar
    const {email, password} = newWriter;
    // find({}) -> []
    const writerFound = await Writer.findOne({email});

    // Si encuentra al Writer -> {}
    // Si no encuentra al Writer -> undefined

    if(writerFound) throw new StatusHttp('Ya existe un Writer con este email');

    // Encriptar el password
    const encryptedPassword = await bcrypt.hash(password); // 
    console.log({...newWriter, password: encryptedPassword})

    // const writer = Writer.create({...newWriter, password: encryptedPassword});
    // console.log(writer)
    return Writer.create({...newWriter, password: encryptedPassword});
};

async function updateById(idWriter, newData) {
    const writerFound = await Writer.findById(idWriter);

    if(!writerFound) throw new StatusHttp('No existe este Writer');

    return await Writer.updateOne({_id: idWriter}, newData);
};

async function deleteById(idWriter) {
    const writerFound = await Writer.findById(idWriter);

    if(!writerFound) throw new StatusHttp('No existe este Writer');

    return await Writer.deleteOne({_id: idWriter});
};

function getById(idWriter) {
    return Writer.findById(idWriter);
};

function getAll() {
    return Writer.find({}); // Regresa una promesa
};

function getAllByPage(page, limit) {
    return Writer.find().sort({'createdAt': -1}).skip((page - 1) * limit).limit(limit);
};

// Find; Sort: ordena forma descendente, por fecha de creación; Skip -> Saltar por límite de 10 Writers

export {
    create,
    updateById,
    deleteById,
    getById,
    getAll,
    getAllByPage
};
