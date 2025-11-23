import axios from "axios";
import { API_URL } from "./config";

export const createSlot = async ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const res = await axios.post(
    `${API_URL}/schedule/slot`,
    { startTime, endTime },
    { withCredentials: true }
  );
  return res;
};

export const deleteSlots = async (ids: number[]) => {
  await axios.delete(`${API_URL}/schedule/slot`, {
    data: { ids },
    withCredentials: true,
  });
};

export const bookSlot = async (slotId: number) => {
  const res = await axios.post(
    `${API_URL}/schedule/slot/${slotId}/reserve`,
    {},
    { withCredentials: true }
  );
  return res;
};
