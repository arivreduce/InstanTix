import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const favsSchema = mongoose.Schema({
  favId: {
    type: String,
    required: true,
  },
  favData: {
    eventName: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    attId: {
      type: String,
      required: true,
    },
    filteredCountryCode: {
      type: String,
      required: true,
    },
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [favsSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
