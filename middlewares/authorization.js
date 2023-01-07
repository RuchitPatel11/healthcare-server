const authorizeRole = (rolesArray) => (req, res, next) => {
  if (!res.locals.user) {
    return res.status(401).json({
      success: false,
      message: "Session expired",
    });
  }

  let authorized = false;
  //if user has a role that is required to access any API
  rolesArray.forEach((role) => {
    authorized = res.locals.user.role === role;
  });
  if (authorized) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "Unauthorized Access",
  });
};

module.exports = authorizeRole;
