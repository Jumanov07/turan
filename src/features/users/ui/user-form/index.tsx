import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { getCompanies } from "@/entities/companies";
import { useAuthStore } from "@/shared/stores";

import type { Company, Role } from "@/shared/types";
import {
  createUser,
  editUser,
  type CreateUserPayload,
  type UserRow,
} from "@/entities/users";
import { ROLE, ROLE_LABELS } from "@/shared/constants";
import {
  availableUserRolesFor,
  canSelectCompanyForRole,
  hasRoleSuperAdmin,
} from "@/shared/helpers";

interface Props {
  onClose: () => void;
  userToEdit?: UserRow | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUserFormSchema = (actorRole: Role | undefined, isEditing: boolean) =>
  z
    .object({
      email: z.string().optional(),
      firstName: z.string().trim().min(3, "Имя должно быть не менее 3 символов"),
      lastName: z
        .string()
        .trim()
        .min(3, "Фамилия должно быть не менее 3 символов"),
      role: z.string(),
      companyId: z.number().nullable().optional(),
    })
    .superRefine((values, ctx) => {
      if (!isEditing) {
        if (!values.email || values.email.length < 3) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email должен быть не менее 3 символов",
            path: ["email"],
          });
        } else if (!EMAIL_REGEX.test(values.email)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email должен быть валидным",
            path: ["email"],
          });
        }
      }

      const shouldSelectCompany = canSelectCompanyForRole(
        actorRole,
        values.role as Role,
      );

      if (shouldSelectCompany && !values.companyId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Выберите компанию",
          path: ["companyId"],
        });
      }
    });

type UserFormValues = z.infer<ReturnType<typeof createUserFormSchema>>;

export const UserForm = ({ onClose, userToEdit }: Props) => {
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  const isEditing = !!userToEdit;

  const schema = useMemo(
    () => createUserFormSchema(user?.role, isEditing),
    [user?.role, isEditing],
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: userToEdit?.email ?? "",
      firstName: userToEdit?.firstName ?? "",
      lastName: userToEdit?.lastName ?? "",
      role: userToEdit?.role ?? ROLE.ADMIN,
      companyId: userToEdit?.company?.id ?? null,
    },
  });

  useEffect(() => {
    reset({
      email: userToEdit?.email ?? "",
      firstName: userToEdit?.firstName ?? "",
      lastName: userToEdit?.lastName ?? "",
      role: userToEdit?.role ?? ROLE.ADMIN,
      companyId: userToEdit?.company?.id ?? null,
    });
  }, [userToEdit, reset]);

  const watchedRole = watch("role") as Role;

  const { data: companies, isLoading: isCompaniesLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(false),
    enabled: hasRoleSuperAdmin(user?.role),
  });

  const mutation = useMutation({
    mutationFn: (payload: CreateUserPayload) =>
      isEditing ? editUser(userToEdit!.id, payload) : createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      const role = watchedRole ?? ROLE.ADMIN;
      toast.success(
        isEditing
          ? `${ROLE_LABELS[role]} успешно обновлён`
          : `${ROLE_LABELS[role]} успешно создан`,
      );
    },
    onError: (error: AxiosError<{ message?: string; errors?: string[] }>) => {
      const messages = error.response?.data?.errors || [
        error.response?.data?.message || "Ошибка при сохранении пользователя",
      ];
      setApiErrors(messages);
    },
  });

  const availableRoles = availableUserRolesFor(user?.role);

  const showCompanySelect = canSelectCompanyForRole(user?.role, watchedRole);

  const onSubmit = (values: UserFormValues) => {
    setApiErrors([]);

    mutation.mutate({
      ...(!isEditing && { email: values.email }),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      role: values.role as Role,
      ...(showCompanySelect ? { companyId: values.companyId! } : {}),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {apiErrors.map((err, i) => (
        <Alert key={i} severity="error">
          {err}
        </Alert>
      ))}

      {!isEditing && (
        <TextField
          label="Email"
          {...register("email")}
          fullWidth
          required
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      )}

      <TextField
        label="Имя"
        {...register("firstName")}
        fullWidth
        required
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        label="Фамилия"
        {...register("lastName")}
        fullWidth
        required
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Роль"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            fullWidth
            required
          >
            {availableRoles.map((r) => (
              <MenuItem key={r} value={r}>
                {ROLE_LABELS[r]}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {showCompanySelect && (
        <Controller
          name="companyId"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Компания"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              fullWidth
              required
              disabled={isCompaniesLoading}
              error={!!errors.companyId}
              helperText={errors.companyId?.message}
            >
              {companies?.map(({ id, name }: Company) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? isEditing
            ? "Обновление..."
            : "Создание..."
          : isEditing
            ? "Сохранить"
            : "Создать"}
      </Button>
    </Box>
  );
};
