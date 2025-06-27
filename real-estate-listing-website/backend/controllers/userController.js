exports.getUserDashboard = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
};
