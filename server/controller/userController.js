import User from "../model/User.js";

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const existingUser = await User.findOne({ name });

    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: `Username ${name} is already taken` });

    const newUser = await User.create({
      name: req.body.name,
      password: req.body.password,
      score: 0,
      createdAt: Date.now(),
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error, unable to register new user" });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const sortedUsers = [...users].sort((a, b) => a.score - b.score);
    res.json(sortedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get users with scores
export const getUsersWithScores = async (req, res) => {
  try {
    const users = await User.find({ score: { $gt: 0 } });
    const usersWithScores = [...users].sort((a, b) => b.score - a.score);
    res.json(usersWithScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a user (login)
export const findUser = async (req, res) => {
  try {
    const user = await User.findOne({
      name: req.body.userName,
      password: req.body.password,
    });
    if (user) {

      const userData = {
        id: user._id,
        name: user.name,
        score: user.score,
      };
      res.json({ success: true, user: userData });
    } else {
      res.json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, unable to login user" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      res.json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
