import {
  createWebhookColumns,
  useWebhookActions,
  useWebhooksQuery,
} from "@/features/webhooks";
import { WebhooksHeader } from "./ui/webhooks-header";
import { WebhooksModals } from "./ui/webhooks-modals";
import { WebhooksTableSection } from "./ui/webhooks-table-section";
import { useWebhooksUiState } from "./hooks/useWebhooksUiState";

export const WebhooksWidget = () => {
  const { webhooks, hasWebhooks, emptyText, isLoading, isError } =
    useWebhooksQuery();

  const { handleDelete } = useWebhookActions();

  const { isModalOpen, openModal, closeModal } = useWebhooksUiState();

  const columns = createWebhookColumns(handleDelete);

  const toolbar = <WebhooksHeader onCreate={openModal} />;

  return (
    <>
      <WebhooksTableSection
        isLoading={isLoading}
        isError={isError}
        hasWebhooks={hasWebhooks}
        emptyText={emptyText}
        webhooks={webhooks}
        columns={columns}
        toolbar={toolbar}
      />

      <WebhooksModals isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
