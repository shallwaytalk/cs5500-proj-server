import userRegisterModel from "../models/usersRegister.js";
import bcypt from "bcrypt";

const saltRounds = 10;

export const createUser = (user) => {
  const salt = bcypt.genSaltSync(saltRounds);
  const hash = bcypt.hashSync(user.password, salt);
  const newUser = {
    ...user,
    password: hash,
  };
  userRegisterModel.create(newUser);
};

export const findByUsername = (username) =>
  userRegisterModel.findOne({ username });

export const findByCredentials = (credential, res) => {
  userRegisterModel.findOne({ username: credential.username }).then((user) => {
    if (!user) {
      console.log("login: user not found error.");
      return res.status(401).json({ error: new Error("User not found!") });
    }
    const isPasswordCorrect = bcypt.compareSync(
      credential.passwordInput,
      user.password
    );
    if (isPasswordCorrect) {
      console.log("user login succeed.");
      res.status(200).json(user);
      return;
    } else {
      return res.status(401).json({ msg: "Invalid credencial!" });
    }
  });
};

export const deleteUser = (uid) => userRegisterModel.deleteOne({ _id: uid });

export const updateUser = (username, userUpdates) =>
  userRegisterModel.findOneAndUpdate({ username: username }, { $set: userUpdates });
