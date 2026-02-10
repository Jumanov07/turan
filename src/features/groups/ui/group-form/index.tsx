import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { createGroup, updateGroup, type Group } from "@/entities/groups";
import { GroupFormSchema } from "../../model/schema";
import type { GroupFormValues } from "../../model/types";

interface Props {
  groupToEdit: Group | null;
  onClose: () => void;
}

export const GroupForm = ({ groupToEdit, onClose }: Props) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormValues>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: {
      name: groupToEdit?.name ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: groupToEdit?.name ?? "",
    });
  }, [groupToEdit, reset]);

  const onSubmit = async (values: GroupFormValues) => {
    try {
      const name = values.name.trim();
      if (groupToEdit) {
        await updateGroup(groupToEdit.id, name);
        toast.success("Группа обновлена");
      } else {
        await createGroup(name);
        toast.success("Группа создана");
      }

      await queryClient.invalidateQueries({ queryKey: ["groups"] });
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || "Ошибка при сохранении группы",
      );
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
        label="Название группы"
        {...register("name")}
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {groupToEdit ? "Сохранить" : "Создать"}
        </Button>
      </Box>
    </Box>
  );
};
