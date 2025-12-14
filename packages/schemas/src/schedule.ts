import { z } from "zod";
import { userSchemaBase } from "./user";

// If SlotStatus is a TS enum or string union
export enum SlotStatus {
  Free = "free",
  Booked = "booked",
  Reserved = "reserved",
}
export const slotStatusSchema = z.nativeEnum(SlotStatus);

export const scheduleSlotSchema = z.object({
  id: z.number().int().positive(),

  master: userSchemaBase,

  startTime: z.coerce.date(),

  endTime: z.coerce.date(),

  status: slotStatusSchema.default(SlotStatus.Free),

  title: z.string().nullable(),

  youtubeId: z.string().nullable(),

  reservedBy: userSchemaBase.nullish(),
});
