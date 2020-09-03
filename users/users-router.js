const express = require("express");
const Users = require("./users-model");
const middleware = require("./users-middleware");
const bcrypt = require("bcryptjs");
const router = express.Router();

// get list of users
router.get("/api/users", middleware.restrict(), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

// Create a new user
router.post("/api/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }
    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 12),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// Login in as user
router.post("/api/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "You shall not pass!",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "You shall not pass!",
      });
    }

    req.session.user = user;

    res.json({
      message: `Logged in as: ${user.username}`,
    });
  } catch (err) {
    next(err);
  }
});

// logout
router.get("/api/logout", middleware.restrict(), async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
