
import { Router } from "express";
import { getUnreadSenders } from "./get-unread-senders";

export const messagesRouter = Router();

messagesRouter.get("/unread-senders", getUnreadSenders);
