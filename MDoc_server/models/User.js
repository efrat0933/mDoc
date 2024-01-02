import mongoose from 'mongoose';
import bcrypt from "bcrypt";
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        lowercase: true,
        // validate: [isEmail, 'please enter valid text']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [4, 'minimum password length is 4 digits'],
    },
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        index: 1

    },
    lastName: {
        type: String,
        index: { sparse: true } 

    }
});


// before user created on db
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(this.password, salt)
      })
      .catch(err => {
       const errors = handleErrors(err)
      });
    next();
})

// function after user created on db
userSchema.post('save', function (doc, next) {
    console.log('user created and saved ', doc);
    next();
});

userSchema.statics.login = async function({username, password}) {
    const user = await this.findOne({username: username});
    // if (user) {
    //     const auth = await bcrypt.compare(password, user.password);
    //     if (auth) {
    //         return user;
    //     }
    //     throw Error('incorrect password');
        
    // } else {
    //     throw Error('incorrect username');
    // }
}

const User = mongoose.model('User', userSchema);

export default User;