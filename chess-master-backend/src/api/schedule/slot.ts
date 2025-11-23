import { Router } from "express";
import {
  createRouter,
  getRouter,
  deleteRouter,
  reserveRouter,
  updateStatusRouter,
  myBookingsRouter,
  masterBookingsRouter,
} from "./slot/index";

export const slotRouter = Router();

// Mount all slot route handlers
slotRouter.use("", createRouter);
slotRouter.use("", getRouter);
slotRouter.use("", deleteRouter);
slotRouter.use("", reserveRouter);
slotRouter.use("", updateStatusRouter);
slotRouter.use("", myBookingsRouter);
slotRouter.use("", masterBookingsRouter);
