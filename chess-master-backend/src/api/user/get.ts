import { Router } from "express";
import { getUserById } from "../../services/user.service";
import { userSchemaBase } from "@chess-master/schemas";

export const router = Router();

router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await getUserById(userId);
    const parsedUser = userSchemaBase.parse(user);
    res.json({ status: "success", user: parsedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
