import { useEffect, useState } from "react";
import {
  retrieveFromStore,
  saveInStore,
} from "../../../services/secureStore.service";
import * as Crypto from "expo-crypto";

const DEVICE_ID_KEY = "deviceId";

const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string>("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const initDeviceId = async () => {
      try {
        const storedId = await retrieveFromStore(DEVICE_ID_KEY);

        if (storedId) {
          if (isMounted) setDeviceId(storedId);
          return;
        }

        const newDeviceId = Crypto.randomUUID();
        await saveInStore(DEVICE_ID_KEY, newDeviceId);

        if (isMounted) setDeviceId(newDeviceId);
      } catch (error) {
        console.warn("Device ID initialization failed", error);
      } finally {
        if (isMounted) setIsReady(true);
      }
    };
    initDeviceId();

    return () => {
      isMounted = false;
    };
  }, []);

  return { deviceId, isReady };
};

export default useDeviceId;
