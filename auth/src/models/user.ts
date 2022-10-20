import mongoose from "mongoose";
import { PasswordManager } from "../services/password";

// An interface that describes properties
// that are required to create a new user
interface UserAttrs {
    email: string,
    password: string
}

// An interface that describes properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;

    // extra properties goes here like these
    // createdAt: string;
    // updatedAt: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        },
    }
});

// NOTE: to use this keyword, we need to use normal function with function keyword, instead of arrow function.
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await PasswordManager.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }