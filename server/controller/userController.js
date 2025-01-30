import User from "../model/User.js";

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const existingUser = await User.findOne({ name });

    if (existingUser) return res.status(400).json({ success: false, message: `Username ${name} is already taken`});

    const newUser = await User.create({
      name: req.body.name,
      password: req.body.password,
      score: 0,
      createdAt: Date.now(),
    });
    //console.log('New user: ', newUser);
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
    const users = await User.find({});
    const sortedUsers = [...users].sort((a, b) => a.score - b.score);
    const usersWithScores = sortedUsers.filter((user) => user.score > 0);
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
      //console.log("Already registered: ", user.name);
      res.json({ success: true, user: user });
    } else {
      res.json({ success: false, message: "User not found." });
    }
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Server error, unable to login user"});
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    //console.log("Delete result: ", result);
    if (result.deletedCount === 1) {
      res.json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    //console.error("Error deleting user:", error);
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
    res.json("Updated user: ", updatedUser);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
