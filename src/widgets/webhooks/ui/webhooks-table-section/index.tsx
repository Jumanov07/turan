import type { ReactNode } from "react";
import type { Webhook } from "@/entities/webhooks";
import type { Column } from "@/shared/types";
import { TableSection } from "@/shared/ui/table-section";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasWebhooks: boolean;
  emptyText: string;
  webhooks: Webhook[];
  columns: Column<Webhook>[];
  toolbar?: ReactNode;
}

export const WebhooksTableSection = ({
  isLoading,
  isError,
  hasWebhooks,
  emptyText,
  webhooks,
  columns,
  toolbar,
}: Props) => (
  <TableSection
    isLoading={isLoading}
    isError={isError}
    errorText="Ошибка при загрузке вебхуков"
    hasItems={hasWebhooks}
    emptyText={emptyText}
    toolbar={toolbar}
    rows={webhooks}
    columns={columns}
    getRowId={(w) => w.id}
  />
);
