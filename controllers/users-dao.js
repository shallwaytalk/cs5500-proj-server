import userRegisterModel from "../models/usersRegister.js";
import tokenModel from "../models/token.js";
import bcypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
const saltRounds = 10;

export const createUser = (user) => {
  const salt = bcypt.genSaltSync(saltRounds);
  const hash = bcypt.hashSync(user.password, salt);

  const newUser = {
    ...user,
    password: hash,
  };
  console.log("dao createUser", newUser);
  return userRegisterModel.create(newUser);
};

export const createToken = (user) => {
  const newToken = {
    userId: user.username,
    token: crypto.randomBytes(32).toString("hex"),
  };
  return tokenModel.create(newToken);
};

export const findByUsername = (username) =>
  userRegisterModel.findOne({ username });

export const findByEmail = (email) => userRegisterModel.findOne({ email });

export const findTokenByUsername = (username) =>
  tokenModel.findOne({ userId: username });

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
    if (!user.verified) {
      let token = tokenModel.findOne({ userId: user.username });
      if (!token) {
        const newToken = {
          userId: user.username,
          token: crypto.randomBytes(32).toString("hex"),
        };
        token = tokenModel.create(newToken);
        const url = `${process.env.BASE_URL}users/${user.username}/verify/${token.token}`;
        sendEmail(user.email, "Verify Email", url);
      }
      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid credencial!" });
    }
    console.log("user login succeed.");
    // const token = user.generateAuthToken();
    res.status(200).send({ message: "logged in successfully" });
    // res.status(200).json(user);
    return;
  });
};

export const deleteUser = (uid) => userRegisterModel.deleteOne({ _id: uid });

export const updateUser = (username, userUpdates) =>
  userRegisterModel.findOneAndUpdate(
    { username: username },
    { $set: userUpdates }
  );
