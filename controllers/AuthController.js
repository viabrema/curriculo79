import jwt from "jsonwebtoken";
import { users } from "../data.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, "6891", {
    expiresIn: "1h",
  });

  return res.json({
    user: {
      name: user?.name,
      email: user?.email,
    },
    token,
  });
};

export default { login };
