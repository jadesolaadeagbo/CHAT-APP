import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true    
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profile:{
        type: String,
        default:""
    }
})

export const User = mongoose.model("User", UserSchema);

export const getAllUsers = () => User.find();
export const getUserByIdentifier = (identifier) => {
    return User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    });
};
export const getUserBySessionToken = (sessionToken) => User.findOne({
    'authentication.sessionToken' : sessionToken
});
export const getUserById = (id) => User.findById(id);

export const createUser = (values) => new User(values)
    .save().then((user) => user.toObject());
export const deleteUserById = (id) => User.findOneAndDelete({_id: id})
export const updateUserById = (id, values) => User.findOneAndUpdate({id, values})
