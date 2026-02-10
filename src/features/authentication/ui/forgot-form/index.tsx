import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { sendForgotRequest } from "@/entities/authentication";
import { ForgotFormSchema } from "../../model/schema";
import type { ForgotFormValues } from "../../model/types";

export const ForgotForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(ForgotFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotFormValues) => {
    setLoading(true);
    setError("");
    setSuccess("");

    sendForgotRequest(values.email)
      .then(() => {
        setSuccess("Инструкция для восстановления отправлена на почту.");
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Ошибка при восстановлении",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 360, borderRadius: 3 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Восстановление пароля
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? "Отправка..." : "Отправить"}
          </Button>

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="primary" textAlign="center">
              {success}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
