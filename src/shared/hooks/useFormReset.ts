import { useEffect, type DependencyList } from "react";
import type { UseFormReset } from "react-hook-form";

export const useFormReset = <T,>(
  reset: UseFormReset<T>,
  values: T,
  deps: DependencyList,
) => {
  useEffect(() => {
    reset(values);
  }, deps);
};
