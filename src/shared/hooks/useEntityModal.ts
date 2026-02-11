import { useState } from "react";

export const useEntityModal = <T,>() => {
  const [isOpen, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const openCreate = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    setOpen(true);
  };

  const close = () => {
    setEditingItem(null);
    setOpen(false);
  };

  return {
    isOpen,
    editingItem,
    openCreate,
    openEdit,
    close,
  };
};
