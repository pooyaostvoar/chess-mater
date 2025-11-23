import { Router } from "express";
import { isAuthenticated } from "../../middleware/passport";
import { AppDataSource } from "../../database/datasource";
import { ScheduleSlot } from "../../database/entity/schedule-slots";
import { In } from "typeorm";
import { SlotStatus } from "../../database/entity/types";

export const slotRouter = Router();

slotRouter.post("", isAuthenticated, async (req, res) => {
  try {
    const { startTime, endTime } = req.body;

    // if (!req?.user?.isMaster) {
    //   return res.status(403).json({ error: "Only masters can create slots" });
    // }

    const repo = AppDataSource.getRepository(ScheduleSlot);

    const slot = repo.create({
      master: req.user,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    await repo.save(slot);

    res.json({ success: true, slot });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

slotRouter.get("/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const repo = AppDataSource.getRepository(ScheduleSlot);

    const slots = await repo
      .createQueryBuilder("slot")
      .leftJoinAndSelect("slot.reservedBy", "reservedBy")
      .where("slot.master = :userId", { userId })
      .orderBy("slot.startTime", "ASC")
      .getMany();

    // Format slots to exclude sensitive user data
    const formattedSlots = slots.map((slot) => {
      const formatted: any = { ...slot };
      if (slot.reservedBy) {
        formatted.reservedBy = {
          id: slot.reservedBy.id,
          username: slot.reservedBy.username,
          email: slot.reservedBy.email,
          profilePicture: slot.reservedBy.profilePicture,
        };
      }
      return formatted;
    });

    res.json({ success: true, slots: formattedSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

slotRouter.delete("/", isAuthenticated, async (req, res) => {
  try {
    const ids: number[] = req.body.ids;
    const userId = (req.user as any)?.id;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "ids must be a non-empty array" });
    }

    const repo = AppDataSource.getRepository(ScheduleSlot);

    // Only delete slots owned by this master
    const slots = await repo.find({
      where: {
        id: In(ids),
        master: { id: userId },
      },
      relations: ["master"],
    });

    if (slots.length === 0) {
      return res.status(404).json({ error: "No valid slots found" });
    }

    await repo.remove(slots);

    return res.json({
      success: true,
      deletedIds: slots.map((s) => s.id),
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /schedule/slot/:id/reserve
slotRouter.post("/:id/reserve", isAuthenticated, async (req, res) => {
  const slotId = Number(req.params.id);
  const userId = (req.user as any)?.id;

  const repo = AppDataSource.getRepository(ScheduleSlot);

  const slot = await repo.findOne({
    where: { id: slotId },
    relations: ["master", "reservedBy"],
  });

  if (!slot) return res.status(404).json({ error: "Slot not found" });

  if (slot.status !== SlotStatus.Free)
    return res.status(400).json({ error: "Slot is not available" });

  slot.status = SlotStatus.Reserved;
  slot.reservedBy = { id: userId } as any;

  await repo.save(slot);

  // Reload with relations to return full user info
  const updatedSlot = await repo
    .createQueryBuilder("slot")
    .leftJoinAndSelect("slot.reservedBy", "reservedBy")
    .where("slot.id = :slotId", { slotId })
    .getOne();

  // Format to exclude sensitive user data
  if (updatedSlot?.reservedBy) {
    (updatedSlot as any).reservedBy = {
      id: updatedSlot.reservedBy.id,
      username: updatedSlot.reservedBy.username,
      email: updatedSlot.reservedBy.email,
      profilePicture: updatedSlot.reservedBy.profilePicture,
    };
  }

  res.json({ message: "Slot requested", slot: updatedSlot });
});

// PATCH /schedule/slot/:id/status
slotRouter.patch("/:id/status", isAuthenticated, async (req, res) => {
  const slotId = Number(req.params.id);
  const masterId = (req.user as any).id; // master
  const { status } = req.body;

  const repo = AppDataSource.getRepository(ScheduleSlot);

  const slot = await repo.findOne({
    where: { id: slotId, master: { id: masterId } },
    relations: ["reservedBy", "master"],
  });

  if (!slot)
    return res
      .status(404)
      .json({ error: "Slot not found or you are not the master" });

  // If making it "Free", clear user
  if (status === SlotStatus.Free) {
    slot.reservedBy = null;
  }

  slot.status = status;

  await repo.save(slot);

  // Reload with relations to return full slot info
  const updatedSlot = await repo
    .createQueryBuilder("slot")
    .leftJoinAndSelect("slot.reservedBy", "reservedBy")
    .where("slot.id = :slotId", { slotId })
    .getOne();

  // Format to exclude sensitive user data
  if (updatedSlot?.reservedBy) {
    (updatedSlot as any).reservedBy = {
      id: updatedSlot.reservedBy.id,
      username: updatedSlot.reservedBy.username,
      email: updatedSlot.reservedBy.email,
      profilePicture: updatedSlot.reservedBy.profilePicture,
    };
  }

  res.json({ message: "Slot status updated", slot: updatedSlot });
});

// GET /schedule/slot/my-bookings - Get bookings for regular users (slots they reserved)
slotRouter.get("/my-bookings", isAuthenticated, async (req, res) => {
  try {
    const userId = (req.user as any)?.id;

    const repo = AppDataSource.getRepository(ScheduleSlot);

    const slots = await repo
      .createQueryBuilder("slot")
      .leftJoinAndSelect("slot.master", "master")
      .where("slot.reservedBy = :userId", { userId })
      .orderBy("slot.startTime", "ASC")
      .getMany();

    // Format to exclude sensitive user data
    const formattedSlots = slots.map((slot) => {
      const formatted: any = { ...slot };
      if (slot.master) {
        formatted.master = {
          id: slot.master.id,
          username: slot.master.username,
          email: slot.master.email,
          title: slot.master.title,
          rating: slot.master.rating,
          profilePicture: slot.master.profilePicture,
          chesscomUrl: slot.master.chesscomUrl,
          lichessUrl: slot.master.lichessUrl,
        };
      }
      return formatted;
    });

    res.json({ success: true, bookings: formattedSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /schedule/slot/master-bookings - Get bookings for masters (slots reserved by others)
slotRouter.get("/master-bookings", isAuthenticated, async (req, res) => {
  try {
    const masterId = (req.user as any)?.id;

    const repo = AppDataSource.getRepository(ScheduleSlot);

    const slots = await repo
      .createQueryBuilder("slot")
      .leftJoinAndSelect("slot.reservedBy", "reservedBy")
      .where("slot.master = :masterId", { masterId })
      .andWhere("slot.reservedBy IS NOT NULL")
      .orderBy("slot.startTime", "ASC")
      .getMany();

    // Format to exclude sensitive user data
    const formattedSlots = slots.map((slot) => {
      const formatted: any = { ...slot };
      if (slot.reservedBy) {
        formatted.reservedBy = {
          id: slot.reservedBy.id,
          username: slot.reservedBy.username,
          email: slot.reservedBy.email,
          profilePicture: slot.reservedBy.profilePicture,
        };
      }
      return formatted;
    });

    res.json({ success: true, bookings: formattedSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
