const getUserById = async (req, res, next) => {
  let user;
  try {
    user = await adminUser.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannotfinduser", status: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

module.exports = getUserById;
