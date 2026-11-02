const { status: httpStatus } = require("http-status");
const userService = require("../services/user.service");

const register = async (req, res) =>
{
  //console.log("users")
  const { phone_number, name, email, password } = req.body;
  
    const user = await userService.createUser(req.body);
    return res.status(httpStatus.CREATED).json(user);
};

const getUsers = async (req, res) =>
{

  const users = await userService.getAllUsers();
  return res.status(httpStatus.OK).json(users);
  
};

const getUserById = async (req, res) => {

    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }
    return res.status(httpStatus.OK).json(user);
};

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user === undefined) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }
    if (user === null) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "No valid fields provided" });
    }
    return res.status(httpStatus.OK).json(user);
};

const deleteUser = async (req, res) => {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }
    return res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
