import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useAuthStore } from "@/features/authentication/store/auth";
import {
  addMetersToGroup,
  deleteGroup,
  getGroups,
  removeMetersFromGroup,
} from "@/features/groups/api";
import type { Group } from "@/features/groups/interface";
import { getMetersWordForm } from "../utils/helpers";

interface Props {
  forFilter?: boolean;
}

export const useGroups = ({ forFilter = false }: Props) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";

  const { data, isLoading, isError } = useQuery({
    queryKey: forFilter
      ? ["groups", "all-for-filter"]
      : ["groups", page, limit],
    queryFn: () =>
      forFilter ? getGroups(1, 1000) : getGroups(page + 1, limit),
    staleTime: 5000,
  });

  const groups: Group[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const hasGroups = groups.length > 0;
  const emptyText = "Группы не найдены";

  const invalidateGroups = async () => {
    await queryClient.invalidateQueries({ queryKey: ["groups"] });
  };

  const invalidateMeters = async () => {
    await queryClient.invalidateQueries({ queryKey: ["meters"] });
  };

  const handleDelete = async (groupId: number) => {
    if (!isAdmin) return;

    try {
      await deleteGroup(groupId);
      toast.success("Группа удалена");
      await invalidateGroups();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении группы"
      );
    }
  };

  const handleAddMetersToGroup = async (
    groupId: number,
    meterIds: number[]
  ) => {
    if (!isAdmin) return;

    const count = meterIds.length;
    const word = getMetersWordForm(count);

    try {
      await addMetersToGroup(groupId, meterIds);
      toast.success(`${word} добавлен${count === 1 ? "" : "ы"} в группу`);
      await invalidateMeters();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          `Ошибка при добавлении ${word.toLowerCase()} в группу`
      );
    }
  };

  const handleRemoveMetersFromGroup = async (
    groupId: number,
    meterIds: number[]
  ) => {
    if (!isAdmin) return;

    const count = meterIds.length;
    const word = getMetersWordForm(count);

    try {
      await removeMetersFromGroup(groupId, meterIds);
      toast.success(`${word} удалён${count === 1 ? "" : "ы"} из группы`);
      await invalidateMeters();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          `Ошибка при удалении ${word.toLowerCase()} из группы`
      );
    }
  };

  return {
    groups,
    total,
    hasGroups,
    emptyText,
    isLoading,
    isError,

    page,
    limit,
    setPage,
    setLimit,

    isAdmin,
    handleDelete,

    handleAddMetersToGroup,
    handleRemoveMetersFromGroup,
  };
};
