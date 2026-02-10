// src/features/meters/ui/meter-form.tsx
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { updateMeter } from "@/entities/meters";
import type { Meter } from "@/shared/types";
import { MeterFormSchema } from "../../model/schema";
import type { MeterFormValues } from "../../model/types";

interface Props {
  meterToEdit: Meter | null;
  onClose: () => void;
  canArchive: boolean;
}

export const MeterForm = ({ meterToEdit, onClose, canArchive }: Props) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<MeterFormValues>({
    resolver: zodResolver(MeterFormSchema),
    defaultValues: {
      customerID: meterToEdit?.customerID ?? "",
      client: meterToEdit?.client ?? "",
      address: meterToEdit?.address ?? "",
      descriptions: meterToEdit?.descriptions ?? "",
      isArchived: meterToEdit?.isArchived ?? false,
    },
  });

  useEffect(() => {
    reset({
      customerID: meterToEdit?.customerID ?? "",
      client: meterToEdit?.client ?? "",
      address: meterToEdit?.address ?? "",
      descriptions: meterToEdit?.descriptions ?? "",
      isArchived: meterToEdit?.isArchived ?? false,
    });
  }, [meterToEdit, reset]);

  const onSubmit = async (values: MeterFormValues) => {
    if (!meterToEdit) return;

    try {
      setLoading(true);

      const normalizedCustomerID =
        values.customerID && values.customerID.trim().length > 0
          ? values.customerID.trim()
          : null;

      await updateMeter({
        meterId: meterToEdit.id,
        customerID: normalizedCustomerID,
        client: values.client ?? "",
        address: values.address ?? "",
        descriptions: values.descriptions ?? "",
        isArchived: canArchive ? values.isArchived : meterToEdit.isArchived,
      });

      toast.success("Счётчик обновлён");
      await queryClient.invalidateQueries({ queryKey: ["meters"] });
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при сохранении счётчика",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        label="ID Клиента"
        {...register("customerID")}
      />

      <TextField
        label="Клиент"
        {...register("client")}
      />

      <TextField
        label="Адрес"
        {...register("address")}
      />

      <TextField
        label="Описание"
        {...register("descriptions")}
        multiline
        minRows={2}
      />

      {canArchive && (
        <FormControlLabel
          control={
            <Controller
              name="isArchived"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          }
          label="Отправить в архив"
        />
      )}

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button type="submit" variant="contained" disabled={loading}>
          Сохранить
        </Button>
      </Box>
    </Box>
  );
};
