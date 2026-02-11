import Box from "@mui/material/Box";
import Button, { type ButtonProps } from "@mui/material/Button";

interface Props {
  submitLabel: string;
  submitLabelLoading?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
  cancelLabel?: string;
  align?: "flex-start" | "center" | "flex-end" | "space-between";
  fullWidth?: boolean;
  submitProps?: ButtonProps;
  cancelProps?: ButtonProps;
}

export const FormActions = ({
  submitLabel,
  submitLabelLoading,
  isSubmitting = false,
  onCancel,
  cancelLabel = "Отмена",
  align = "flex-end",
  fullWidth = false,
  submitProps,
  cancelProps,
}: Props) => {
  const submitDisabled = isSubmitting || submitProps?.disabled;
  const resolvedSubmitLabel =
    isSubmitting && submitLabelLoading ? submitLabelLoading : submitLabel;

  return (
    <Box display="flex" justifyContent={align} gap={1}>
      {onCancel && (
        <Button onClick={onCancel} {...cancelProps}>
          {cancelLabel}
        </Button>
      )}

      <Button
        {...submitProps}
        type="submit"
        variant={submitProps?.variant ?? "contained"}
        fullWidth={submitProps?.fullWidth ?? fullWidth}
        disabled={submitDisabled}
      >
        {resolvedSubmitLabel}
      </Button>
    </Box>
  );
};
