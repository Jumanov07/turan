import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormFieldset } from "@/shared/ui/form-fieldset";
import { FormTextField } from "@/shared/ui/form-text-field";
import { useWebhookForm } from "../../hooks/useWebhookForm";

interface Props {
  onClose: () => void;
}

export const WebhookForm = ({ onClose }: Props) => {
  const { control, onSubmit, isPending } = useWebhookForm({ onClose });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <FormFieldset disabled={isPending}>
        <FormTextField
          label="URL вебхука"
          fullWidth
          name="url"
          control={control}
        />
      </FormFieldset>

      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button type="submit" variant="contained" disabled={isPending}>
          Создать
        </Button>
      </Box>
    </Box>
  );
};
