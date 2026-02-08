import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import PermissionService from "../services/permission.service";
import {
  allPermissionsResult,
  permissionContext,
  permissionResult,
  permissionStatus,
} from "../types/common.types";

const PermissionContext = createContext<permissionContext | undefined>(
  undefined,
);

export const usePermissions = (): permissionContext => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within PermissionProvider");
  }
  return context;
};

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<permissionStatus>({
    location: false,
    contacts: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPermissionStatus();
  }, []);

  const loadPermissionStatus = async (): Promise<void> => {
    try {
      const status = await PermissionService.checkAllPermissions();
      setPermissions(status);
    } catch (error) {
      console.error("Error loading permission status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestLocationPermission = async (): Promise<permissionResult> => {
    setIsLoading(true);
    try {
      const result = await PermissionService.requestLocationPermission();
      if (result.granted) {
        setPermissions((prev) => ({ ...prev, location: true }));
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const requestContactsPermission = async (): Promise<permissionResult> => {
    setIsLoading(true);
    try {
      const result = await PermissionService.requestContactsPermission();
      if (result.granted) {
        setPermissions((prev) => ({ ...prev, contacts: true }));
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const requestAllPermissions = async (): Promise<allPermissionsResult> => {
    setIsLoading(true);
    try {
      const result = await PermissionService.requestAllPermissions();
      setPermissions({
        location: result.location.granted,
        contacts: result.contacts.granted,
      });
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPermissions = async (): Promise<void> => {
    await loadPermissionStatus();
  };

  const contextValue = useMemo(() => {
    return {
      permissions,
      isLoading,
      requestLocationPermission,
      requestContactsPermission,
      requestAllPermissions,
      refreshPermissions,
    };
  }, []);

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  );
};
