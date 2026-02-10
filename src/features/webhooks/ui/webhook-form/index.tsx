import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createWebhook } from "@/entities/webhooks";
import { WebhookFormSchema } from "../../model/schema";
import type { WebhookFormValues } from "../../model/types";

interface Props {
  onClose: () => void;
}

export const WebhookForm = ({ onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WebhookFormValues>({
    resolver: zodResolver(WebhookFormSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: WebhookFormValues) => {
    try {
      setLoading(true);
      await createWebhook(values.url.trim());
      toast.success("Вебхук создан");

      await queryClient.invalidateQueries({ queryKey: ["webhooks"] });
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при создании вебхука",
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
        label="URL вебхука"
        {...register("url")}
        fullWidth
        error={!!errors.url}
        helperText={errors.url?.message}
      />

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button type="submit" variant="contained" disabled={loading}>
          Создать
        </Button>
      </Box>
    </Box>
  );
};
