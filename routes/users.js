const usersRouter = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUser);
usersRouter.post("/", createUser);
usersRouter.patch("/me", updateUser);
usersRouter.patch("/me/avatar", updateUserAvatar);

module.exports = usersRouter;
