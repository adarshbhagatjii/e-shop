import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    role : {
        type: String,
        enum: ['admin', 'user', 'seller'],
        default: 'user'
    },
    imageUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
    },
   
}, {
    timestamps: true
});




export default mongoose.model("User", userSchema);