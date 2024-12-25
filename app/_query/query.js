
import User from "../models/User";

export async function createUser(userObject) {
   
    console.log('type from query',typeof userObject);
    
    return await User.create(userObject);
}

export async function findUserByCredentials(credentials) {
    const user = await User.findOne({email:credentials.email}).lean();
    if (user) {
        return user;
    }
    return null;
}