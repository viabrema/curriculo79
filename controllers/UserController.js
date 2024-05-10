import { users } from "../data.js";

const index = async (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req, res) => {
  const orgId = req.orgId;
  const { name, email, password } = req.body;

  try {
    const newUser = {
      name,
      email,
      password,
      org_id: orgId,
    };

    users.push(newUser);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Não foi possível criar o usuário",
    });
  }
};

export default { index, create };
