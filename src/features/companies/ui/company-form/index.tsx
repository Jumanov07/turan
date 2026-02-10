import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

import {
  createCompany,
  editCompany,
  type CompanyPayload,
} from "@/entities/companies";
import type { Company } from "@/shared/types";

interface Props {
  company?: Company | null;
  onClose: () => void;
}

const CompanyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Название должно быть не менее 3 символов"),
  address: z.string().trim().min(1, "Адрес обязателен"),
});

type CompanyFormValues = z.infer<typeof CompanyFormSchema>;

export const CompanyForm = ({ company, onClose }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const isEditing = !!company;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      name: company?.name ?? "",
      address: company?.address ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: company?.name ?? "",
      address: company?.address ?? "",
    });
  }, [company, reset]);

  const mutation = useMutation({
    mutationFn: (payload: CompanyPayload) =>
      isEditing ? editCompany(company!.id, payload) : createCompany(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      onClose();
      toast.success(
        isEditing ? "Компания успешно обновлена" : "Компания успешно создана",
      );
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setErrorMessage(
        error.response?.data?.message || "Ошибка при сохранении компании",
      );
    },
  });

  const onSubmit = (values: CompanyFormValues) => {
    setErrorMessage("");
    mutation.mutate({
      name: values.name.trim(),
      address: values.address.trim(),
    });
  };

  const buttonText = mutation.isPending
    ? isEditing
      ? "Обновление..."
      : "Создание..."
    : isEditing
      ? "Сохранить"
      : "Создать";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="Название компании"
        {...register("name")}
        fullWidth
        required
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Адрес"
        {...register("address")}
        fullWidth
        required
        error={!!errors.address}
        helperText={errors.address?.message}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={mutation.isPending}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
