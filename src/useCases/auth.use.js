import {Writer} from '../models/writers.model.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'
import {StatusHttp} from '../libs/statusHttp.js'

async function login(email, password){
    const koderFound = await Writer.findOne({email})

    if(!koderFound) throw new StatusHttp('Credenciales invalidas', 400)

    const isValidPassword = await bcrypt.compare(password, koderFound.password)

    if(!isValidPassword) throw new StatusHttp('Credenciales invalidas', 400)

    return jwt.sign({id: koderFound._id})
}

export{login}