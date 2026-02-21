import React, { createContext, useContext, useState, useCallback } from "react";
import { ProviderRole, ROLE_CONFIG } from "@/utils/constants";

interface RoleContextValue {
  role: ProviderRole | null;
  setRole: (role: ProviderRole | null) => void;
  roleConfig: typeof ROLE_CONFIG[ProviderRole] | null;
}

const RoleContext = createContext<RoleContextValue>({
  role: null,
  setRole: () => {},
  roleConfig: null,
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<ProviderRole | null>(null);

  const setRole = useCallback((r: ProviderRole | null) => {
    setRoleState(r);
  }, []);

  const roleConfig = role ? ROLE_CONFIG[role] : null;

  return (
    <RoleContext.Provider value={{ role, setRole, roleConfig }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
