import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc register new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc log out user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'User logged out.' });
});

// @desc get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc get API results
// route GET /api/users/search
// @access Private
const getAPIResults = asyncHandler(async (req, res) => {
  const { attId, filteredCountryCode } = req.body;
  const results = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?&size=200&attractionId=${attId}&countryCode=${filteredCountryCode}&apikey=x7FLnZ6Vxb976N6gD1A99dVqDaClGq7X`
  );
  const resultsJson = await results.json();
  if (resultsJson.page.totalElements === 0) {
    throw new Error('Attraction not found in chosen country!');
  }
  res.status(200).send(resultsJson);
});

// @desc set favorite data in DB
// route POST /api/users/results
// @access Private
const sendFavData = asyncHandler(async (req, res) => {
  const { eventName, imageURL, country, attId, userId, filteredCountryCode } =
    req.body;
  const user = await User.findById(userId);
  const favId = eventName.concat(attId);
  const newFav = {
    favId,
    favData: {
      eventName,
      imageURL,
      country,
      attId,
      filteredCountryCode,
    },
  };
  const doesFavExist = user.favorites.some((fav) => fav.favId === newFav.favId);
  if (doesFavExist) {
    throw new Error('Favorite already exists!');
  }
  const favUpdate = await User.findByIdAndUpdate(
    userId,
    { $push: { favorites: newFav } },
    { new: true }
  );
  console.log(favUpdate);
  if (favUpdate) {
    res.status(200).json(favUpdate);
  } else {
    throw new Error('Error updating user!');
  }
});

const getUserFavs = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  res.status(200).json(user);
});

const deleteFav = asyncHandler(async (req, res) => {
  const { userId, favId } = req.body;
  console.log(userId, favId);
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: { favId: favId } } },
    { new: true }
  );
  res.status(200).json(user);
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAPIResults,
  sendFavData,
  getUserFavs,
  deleteFav,
};
