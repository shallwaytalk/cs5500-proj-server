import {
  findByCredentials,
  findByUsername,
  findByEmail,
  findTokenByUsername,
} from "./users-dao.js";
import * as dao from "./users-dao.js";
import userRegisterModel from "../models/usersRegister.js";
import { sendEmail } from "../utils/sendEmail.js";
let currentUser = null;

const UsersController = (app) => {
  const createUser = async (req, res) => {
    const user = req.body;
    const actualUser = await dao.createUser(user);
    res.json(actualUser);
  };
  const createToken = async (req, res) => {
    const user = req.body;
    const actualUser = await dao.createToken(user);
    res.json(actualUser);
  };

  const deleteUser = async (req, res) => {
    const uid = req.params.uid;
    const status = await dao.deleteUser(uid);
    res.json(status);
  };

  const updateUser = async (req, res) => {
    const username = req.body.username;
    const updates = req.body;
    const status = await dao.updateUser(username, updates);
    console.log("status: ", status);
    res.json(status);
  };

  const updateCounty = async (req, res, next) => {
    try {
      const username = req.params.username;
      const country = req.body.country;
      const existingUser = await findByUsername(username);
      const status = await dao.updateUser(username, {
        ...existingUser._doc,
        country: country,
      });
      return res.json(status);
    } catch (ex) {
      next(ex);
    }
  };

  const loadUserByUsername = async (req, res) => {
    const username = req.query.username;
    const existingUser = await findByUsername(username);
    if (!existingUser) {
      res.sendStatus(403);
      return;
    }
    res.status(200).json(existingUser);
  };

  const register = async (req, res) => {
    const user = req.body;
    console.log("USER", user);
    const existingUser = await findByUsername(user.username);
    console.log("exisiting User", existingUser);
    const existingEmail = await findByEmail(user.email);
    console.log("exisiting Email", existingEmail);
    if (existingUser || existingEmail) {
      res.sendStatus(409);
      res
        .status(409)
        .send({ message: "User with given username or email already Exist!" });
      return;
    }
    const actualUser = await dao.createUser(user);
    console.log("actual User", actualUser);
    const token = await dao.createToken(user);
    console.log("token", token);
    currentUser = actualUser;
    const url = `${process.env.BASE_URL}users/${user.username}/verify/${token.token}`;
    try {
      await sendEmail(user.email, "Verify Email", url);
      res.status(201).send({
        message:
          "An Email sent to your email account, please click the link to verify",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
    // res.json(actualUser);
  };

  const verifyToken = async (req, res) => {
    const user = req.params;
    console.log("Verify Token user", user);
    try {
      const actualUser = await findByUsername(user.username);
      if (!actualUser) return res.status(400).send({ message: "Invalid link" });
      const token = await findTokenByUsername(user.username);
      console.log("token", token);
      if (!token) return res.status(400).send({ message: "Invalid link" });

      await userRegisterModel.updateOne({
        username: user.username,
        verified: true,
      });
      console.log("after setting verified to true", token);
      await token.remove();
      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      console.log("verify token error", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  const login = async (req, res) => {
    const credentials = req.body;
    console.log("login credential", credentials);
    await findByCredentials(credentials, res);
    // console.log("error: ", error);
    return;
  };

  const getByUsername = async (req, res, next) => {
    try {
      const username = req.params.username;
      const existingUser = await findByUsername(username);
      return res.json(existingUser);
    } catch (ex) {
      next(ex);
    }
  };

  app.post("/users", createUser);
  app.post("/users/:username/token", createToken);
  app.get("/users/:username/verify/:token", verifyToken);
  app.get("/oneuser", loadUserByUsername);
  app.delete("/users/:uid", deleteUser);
  app.post("/register", register);
  app.post("/login", login);
  app.get("/api/users/:username", getByUsername);
  app.post("/api/users/:username", updateCounty);
};

export default UsersController;
