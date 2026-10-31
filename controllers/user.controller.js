const httpStatus = require("http-status");

const register = async (req, res) => {
  // const user = await userService.createUser(req.body);
  // const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user: null, tokens: "" });
};

module.exports = {
  register,
};
