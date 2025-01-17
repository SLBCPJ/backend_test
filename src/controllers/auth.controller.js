const User = require("../models/user");
const authService = require("../services/auth.services");
const msg = require("../helpers/messages");


const authController = {
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json(msg.fieldsRequired);
      }
      const token = await authService.login(req.body);
      res.status(token.code).json(token);
    } catch (error) {
      res.send(error);
    }
  },
  register: async function (req, res) {

    try {
      const user = new User(req.body);
      const token = await authService.register(user);
      res.status(token.code).json({ token });
    } catch (error) {
      res.send(error);
    }
  },

};

module.exports = authController;
