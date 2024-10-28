import bycrypt from 'bcryptjs'

const hashPassword = async(password) =>{
    const salt = await bycrypt.genSalt(10);
   return await bycrypt.hash(password, salt);
    
}

export default hashPassword;