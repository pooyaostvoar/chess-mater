import React from "react";
import { useParams } from "react-router-dom";

import EditSlotSection from "../components/slots/EditSlotSection";

const EditSlot: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <EditSlotSection id={Number(id)} />;
};

export default EditSlot;
