import { createContext, useContext, useState, type ReactNode } from "react";
import {
  emptyStore,
  validateStore,
  type FormulaStore,
} from "../features/formulas/engine";
export const formulaKey = "mc-formula-v1";
function load() {
  try {
    return validateStore(
      JSON.parse(localStorage.getItem(formulaKey) || "null"),
    );
  } catch {
    return emptyStore();
  }
}
const Context = createContext<{
  store: FormulaStore;
  save: (s: FormulaStore) => void;
  storageError: boolean;
} | null>(null);
export function FormulaProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState(load);
  const [storageError, setError] = useState(() => {
    try {
      localStorage.getItem(formulaKey);
      return false;
    } catch {
      return true;
    }
  });
  function save(next: FormulaStore) {
    setStore(next);
    try {
      localStorage.setItem(formulaKey, JSON.stringify(next));
      setError(false);
    } catch {
      setError(true);
    }
  }
  return (
    <Context.Provider value={{ store, save, storageError }}>
      {children}
    </Context.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useFormulas() {
  const c = useContext(Context);
  if (!c) throw new Error("Missing FormulaProvider");
  return c;
}
