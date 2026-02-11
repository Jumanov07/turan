import type { AxiosError } from "axios";
import { deleteWebhook, webhooksKeys } from "@/entities/webhooks";
import { useToastMutation } from "@/shared/hooks";
import { getApiErrorMessage } from "@/shared/helpers";

export const useWebhookActions = () => {
  const deleteMutation = useToastMutation({
    mutationFn: (id: number) => deleteWebhook(id),
    invalidateKeys: [webhooksKeys.all],
    successMessage: "Вебхук удалён",
    errorMessage: (error: AxiosError<{ message?: string }>) =>
      getApiErrorMessage(error, "Ошибка при удалении вебхука"),
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return { handleDelete };
};
