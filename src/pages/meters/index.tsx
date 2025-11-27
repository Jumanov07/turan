import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {
  getMeters,
  deleteMeters,
  sendMeterCommand,
} from "@/features/meters/api";
import type { Meter } from "@/features/meters/interfaces";
import { createMeterColumns } from "@/features/meters/columns";
import { MeterForm } from "@/features/meters/ui/meter-form";
import { DataTable } from "@/shared/ui/data-table";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";
import { Modal } from "@/shared/ui/modal";
import { useAuthStore } from "@/features/authentication/store/auth";

const Meters = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [editingMeter, setEditingMeter] = useState<Meter | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";
  const canEdit = user?.role === "admin" || user?.role === "controller";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["meters", page, limit],
    queryFn: () => getMeters(page + 1, limit, false, "normal"),
    staleTime: 5000,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert severity="error">Ошибка при загрузке счётчиков</Alert>;
  }

  const meters: Meter[] = data?.data ?? [];
  const hasMeters = meters.length > 0;

  const emptyText = "Счётчики не найдены";

  const handleEdit = (meter: Meter) => {
    if (!canEdit) return;

    setEditingMeter(meter);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingMeter(null);
    setModalOpen(false);
  };

  const handleDeleteOne = async (meterId: number) => {
    if (!isAdmin) return;

    try {
      await deleteMeters([meterId]);
      toast.success("Счётчик удалён");
      setSelectedIds((prev) => prev.filter((id) => id !== meterId));
      await queryClient.invalidateQueries({ queryKey: ["meters"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении счётчика"
      );
    }
  };

  const handleDeleteSelected = async () => {
    if (!isAdmin || selectedIds.length === 0) return;

    try {
      await deleteMeters(selectedIds);
      toast.success("Выбранные счётчики удалены");
      setSelectedIds([]);
      await queryClient.invalidateQueries({ queryKey: ["meters"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при удалении выбранных счётчиков"
      );
    }
  };

  const handleCommand = async (meterId: number, command: "open" | "close") => {
    if (!isAdmin) return;

    try {
      await sendMeterCommand(meterId, command);
      toast.success(
        command === "open"
          ? "Команда на открытие клапана отправлена"
          : "Команда на закрытие клапана отправлена"
      );
      await queryClient.invalidateQueries({ queryKey: ["meters"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при отправке команды клапану"
      );
    }
  };

  const allSelected =
    isAdmin && hasMeters && selectedIds.length === meters.length;
  const isIndeterminate = isAdmin && selectedIds.length > 0 && !allSelected;

  const handleToggleAll = (checked: boolean) => {
    if (!isAdmin) return;
    if (checked) {
      setSelectedIds(meters.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleOne = (id: number) => {
    if (!isAdmin) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const columns = createMeterColumns({
    isAdmin,
    canEdit,
    selectedIds,
    allSelected,
    isIndeterminate,
    onToggleAll: handleToggleAll,
    onToggleOne: handleToggleOne,
    onEdit: handleEdit,
    onDeleteOne: handleDeleteOne,
    onCommand: handleCommand,
  });

  return (
    <>
      <Box>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box />

          {isAdmin && (
            <Button
              variant="outlined"
              color="error"
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              Удалить выбранные
            </Button>
          )}
        </Box>

        {!hasMeters && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {emptyText}
          </Alert>
        )}

        {hasMeters && (
          <>
            <DataTable
              rows={meters}
              columns={columns}
              getRowId={(m: Meter) => m.id}
            />

            <Pagination
              page={page}
              limit={limit}
              total={data!.total}
              onPageChange={setPage}
              rowsPerPageOptions={[5, 10, 20]}
              labelRowsPerPage="Счётчиков на странице:"
              onRowsPerPageChange={(newLimit) => {
                setLimit(newLimit);
                setPage(0);
              }}
            />
          </>
        )}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title="Редактировать счётчик"
      >
        <MeterForm meterToEdit={editingMeter} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Meters;
