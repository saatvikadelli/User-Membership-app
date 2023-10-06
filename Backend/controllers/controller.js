import asyncHandler from 'express-async-handler';
import User from '../../models/usermodel.js';
import generateToken from '../utils/generateToken.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';











//Auth user/set token
//route Post /api/users/auth
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password, phone, role , isSuspended} = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password)) && user.isSuspended== false) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isSuspended: user.isSuspended,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password Try again or User might have been suspended');
  }
});


//register  user/set token
//route Post /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {

    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });

  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'usermembership@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    }

  });

  if (user) {

    const sendMail = async (toEmail) => {

      try {

        const mailOptions = {
          from: 'usermembership@gmail.com',
          to: toEmail,
          subject: "Registeration Mail",
          text: "You are successfully registered",
        }
        const result = await transport.sendMail(mailOptions);
        console.log(result);
        return result;
      } catch (error) {
        return error;
      }
    }

    await sendMail(user.email)
      .then((result) => console.log('Email sent..', result));

    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });








  } else {
    res.status(400);
    throw new Error('IUnable to send email');
  }

  res.status(200).json({ message: 'Register User' })
});

//Logout user/set token
//route Post /api/users/logout
//@access Public

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'user logged out' });

});

//Get user/set token
//route get /api/users/profile
//@access Public

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
  }

  res.status(200).json({ user });
});
////////




//Update user/set token
//route Put /api/users/profile
//@access Public

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    })
  } else {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({ message: 'Update  User' })
});


//Admin page listing all users/set token
//route Post /api/users/members
//@access Public
const getAllMembers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ messag: error.message });
  }

});


//Add User page
//route Post /api/users/add
//@access Public

const AddMember = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    generateToken(res, user, _id);
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

  res.status(200).json({ message: 'Register User' })
});


//Delete User page
//route Post /api/users/members/:id
//@access Public
const deleteUser = asyncHandler(async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'User deleted successfully on this Page' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
})

//Get User page
//route Post /api/users/members/:id
//@access Public
const getMember = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "useris not found" });
    }
    res.status(200).json({ user });

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
})



//  //Edit User page
//  //route Post /api/users/members/:id
//  //@access Public

const editMember = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const user = await User.findById(userId);
    console.log('user:', user);

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    if (updateData.name) {
      user.name = req.body.name;
    }

    if (updateData.email) {
      user.email = req.body.email;
    }

    if (updateData.phone) {
      user.phone = req.body.phone;
    }

    if (updateData.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    console.log(updatedUser);

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

//suspend user
//route Put /api/users/:id/ suspend
const suspendMember = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({ message: 'No such member exists' });
    }

    user.isSuspended = !user.isSuspended;

    await user.save();

    res.json({ message: "user suspend status updated successfully", user });
  } catch (error) {
    console.error("error while updating suspend status of user", error);
    res.status(500).json({ message: "server error" });
  }
})

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  getAllMembers,
  AddMember,
  deleteUser,
  getMember,
  editMember,
  suspendMember,
};