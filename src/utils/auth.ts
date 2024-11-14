import bcrypt from 'bcrypt'

export const hashPassword = async (password:string)=>{

    //Hashear password---un salt es un valor aleatorio y unico que se genera por cada contraseña antes de aplicar el algoritmo de bcrypt -genSalt(rondas)
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

export const checkPassword = async (enteredPassword: string, storedHash:string )=>{
    return await bcrypt.compare(enteredPassword,storedHash)
}