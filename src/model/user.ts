import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
    name: string,
    email: string,
    password: string
}

const UserSchema: Schema<User> = new Schema({
    name: {type:String, required: [true, "Name Is Required"]},
    email: {type:String, required: [true, "Email Is Required"]},
    password: {type:String, required: [true, "Password Is Required"]}
})

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)

export default UserModel;