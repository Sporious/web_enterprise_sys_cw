import * as mongoose from "mongoose";

const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },

})


UserSchema.virtual("password")
    .set(password => {
        if (this == undefined)
            return this;
        else {
        }
    })


