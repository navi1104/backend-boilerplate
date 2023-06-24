

const User = require("../models/User");

// Controller method to update user hasBooked status
const updateUserHasBookedStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the hasBooked property to true
    user.hasBooked = true;

    // Save the updated user data
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user hasBooked status:", error);
    res.status(500).json({ error: "Failed to update user hasBooked status" });
  }
};

module.exports = {
  updateUserHasBookedStatus
};
