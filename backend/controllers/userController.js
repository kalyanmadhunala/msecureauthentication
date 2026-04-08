import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, msg: "User doesn't exists" });
    }

    return res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified
      },
    });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
