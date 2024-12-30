import jwt from 'jsonwebtoken'

export const generateJWT = () => {
    const data = {
        name:'Carlos',
        credit_card:'123456789',
        password:'password'
    }   
    const token = jwt.sign(data,process.env.JWT_SECRET,{
        expiresIn:'6m'
    })
    return token
}