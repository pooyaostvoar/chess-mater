import { Router } from "express";
import { findUsers } from "../../services/user.service";
import { userListSchema, userQuerySchema } from "@chess-master/schemas";
import { parseRequest } from "../../middleware/parse-request";

export const router = Router();

router.get(
  "",
  parseRequest({
    queryParser: userQuerySchema,
  }),
  async (req, res) => {
    try {
      const users = await findUsers(req.query);
      const parsedUsers = userListSchema.parse(users);
      res.json({ status: "success", users: parsedUsers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
