import  User  from "../models/User.js";
import  mongoose  from 'mongoose';
import  jwt   from 'jsonwebtoken';


const handleErrors = (err) => {
  const errors = { username: '', password: '' };
  if (err instanceof mongoose.Error.ValidationError) {
    return { errorLog: err.errors, code: 422 };

  }

  // Check for duplicate key error
  if (err.code === 11000) {
    return { errorLog: 'User already exists', code: 400 };
  }

  // Any other errors
  return { errorLog: err, code: 500 };
}

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login({ username, password });
    const token = createToken(user._id);
    const userTosend = { user_id: user._id, username: user.username}
    res.status(200).json({user: userTosend, token}) ;
  } catch (err) {
    const { errorLog, code } = handleErrors(err);
    res.status(code).send(err);
  }

}

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'efrat rotshtein, You are amazing person.', {
    expiresIn: maxAge
  });
}

export const signup = async (req, res) => {
  const user = await addUserTodb(req,res);
  if(user) {
    const token = createToken(user._id);
    res.status(201).json(token);
  }
}

export const logout = (req, res) => {
  res.send('user is logout');
}

export const getUserById = (req, res) => {
  res.send('user by id');
}

export const addUser = async (req, res) => {
  const user = await addUserTodb(req, res);
  if(user) {
    res.status(201).json(user);
  }
}

async function addUserTodb(req, res) {  
  const username = req.body.username;
  const password = req.body.password;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  try {
    const user = await User.create({ username, password, firstName, lastName });
    return user;

  } catch (err) {
    const { errorLog, code } = handleErrors(err);
    res.status(code).send(errorLog);
  }
}

