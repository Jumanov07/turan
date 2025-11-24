import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { DevicesTable } from "@/features/devices/ui/devices-table";
import { getDevices, verifyDevice, deleteDevice } from "@/features/devices/api";
import { Loader } from "@/shared/ui/loader";
import { Pagination } from "@/shared/ui/pagination";

const Devices = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["devices", page, limit, verified, isArchived],
    queryFn: () => getDevices(page + 1, limit, verified, isArchived),
    staleTime: 5000,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <Alert severity="error">Ошибка при загрузке устройств</Alert>;

  const hasDevices = data?.data?.length > 0;

  const handleVerify = async (deviceId: number) => {
    try {
      await verifyDevice(deviceId);
      toast.success("Устройство подтверждено");

      queryClient.invalidateQueries({ queryKey: ["devices"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Ошибка при подтверждении устройства"
      );
    }
  };

  const handleDelete = async (deviceId: number) => {
    try {
      await deleteDevice([deviceId]);
      toast.success("Устройство удалено");

      queryClient.invalidateQueries({ queryKey: ["devices"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при удалении устройства"
      );
    }
  };

  return (
    <Box>
      {!hasDevices && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Нет неподтверждённых устройств
        </Alert>
      )}

      {hasDevices && (
        <>
          <DevicesTable
            devices={data.data}
            onVerify={handleVerify}
            onDelete={handleDelete}
          />

          <Pagination
            page={page}
            limit={limit}
            total={data.total}
            onPageChange={setPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Устройств на странице:"
            onRowsPerPageChange={(newLimit) => {
              setLimit(newLimit);
              setPage(0);
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Devices;
