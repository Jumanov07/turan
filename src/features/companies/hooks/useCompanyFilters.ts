import { useState } from "react";

export const useCompanyFilters = () => {
  const [isArchived, setIsArchived] = useState(false);

  return {
    isArchived,
    setIsArchived,
  };
};
