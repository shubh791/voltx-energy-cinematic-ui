"use client";
import { useCallback, useState } from "react";

export default function useActionModal() {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const showNotice = useCallback((title) => {
    setModalTitle(title);
    setOpenModal(true);
  }, []);

  const closeNotice = useCallback(() => setOpenModal(false), []);

  return { openModal, modalTitle, showNotice, closeNotice };
}
