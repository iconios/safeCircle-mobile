import * as Location from "expo-location";
import * as Contacts from "expo-contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define permission types
export type PermissionType = "LOCATION" | "CONTACTS";

class PermissionService {
  // Storage keys
  static readonly STORAGE_KEYS = {
    LOCATION_ASKED: "@app_location_asked",
    CONTACTS_ASKED: "@app_contacts_asked",
    LOCATION_GRANTED: "@app_location_granted",
    CONTACTS_GRANTED: "@app_contacts_granted",
  };

  // Check if permissions have been asked before
  static async hasAskedForPermission(permissionType: PermissionType) {
    try {
      const hasAsked = await AsyncStorage.getItem(
        this.STORAGE_KEYS[`${permissionType}_ASKED`],
      );
      return hasAsked === "true";
    } catch (error) {
      console.error(
        `Error checking ${permissionType} permission status:`,
        error,
      );
      return false;
    }
  }

  // Mark permssion has been asked before
  static async markPermissionAsked(permissionType: PermissionType) {
    try {
      await AsyncStorage.setItem(
        this.STORAGE_KEYS[`${permissionType}_ASKED`],
        "true",
      );
    } catch (error) {
      console.error(`Error marking ${permissionType} as asked:`, error);
    }
  }

  // Save permission grant status
  static async savePermissionStatus(
    permissionType: PermissionType,
    granted?: boolean,
  ) {
    try {
      await AsyncStorage.setItem(
        this.STORAGE_KEYS[`${permissionType}_GRANTED`],
        granted ? "true" : "false",
      );
    } catch (error) {
      console.error(`Error saving ${permissionType} stats:`, error);
    }
  }

  // Get permission grant status
  static async getPermissionStatus(permissionType: PermissionType) {
    try {
      const status = await AsyncStorage.getItem(
        this.STORAGE_KEYS[`${permissionType}_GRANTED`],
      );
      return status === "true";
    } catch (error) {
      console.error(`Error getting ${permissionType} status:`, error);
      return false;
    }
  }

  // Request location permission
  static async requestLocationPermission() {
    try {
      // Check if already granted
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();
      if (existingStatus === "granted") {
        await this.savePermissionStatus("LOCATION", true);
        return {
          granted: true,
          existing: true,
        };
      }

      // Check if location permission has been asked before
      const hasAsked = await this.hasAskedForPermission("LOCATION");
      if (hasAsked) {
        // If asked before, check current status
        const { status } = await Location.getForegroundPermissionsAsync();
        const granted = status === "granted";
        await this.savePermissionStatus("LOCATION", granted);
        return {
          granted,
          askedBefore: true,
        };
      }

      // First time asking
      await this.markPermissionAsked("LOCATION");
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === "granted";
      await this.savePermissionStatus("LOCATION", granted);
      return {
        granted,
        firstTime: true,
      };
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return {
        granted: false,
        error:
          error instanceof Error
            ? error.message
            : "Error requesting location permission",
      };
    }
  }

  // Request contacts permission
  static async requestContactsPermission() {
    try {
      // Check if already granted
      const { status: existingStatus } = await Contacts.getPermissionsAsync();
      if (existingStatus === "granted") {
        await this.savePermissionStatus("CONTACTS", true);
      }

      // Check if asked before
      const hasAsked = await this.hasAskedForPermission("CONTACTS");
      if (hasAsked) {
        // If asked before, check current status
        const { status } = await Contacts.getPermissionsAsync();
        const granted = status === "granted";
        await this.savePermissionStatus("CONTACTS", granted);
        return {
          granted,
          askedBefore: true,
        };
      }

      // First time asking
      await this.markPermissionAsked("CONTACTS");
      const { status } = await Contacts.requestPermissionsAsync();
      const granted = status === "granted";
      await this.savePermissionStatus("CONTACTS", granted);
      return {
        granted,
        firstTime: true,
      };
    } catch (error) {
      console.error("Error requesting contacts permission:", error);
      return {
        granted: false,
        error:
          error instanceof Error
            ? error.message
            : "Error requesting contacts permission",
      };
    }
  }

  // Request all permissions at once
  static async requestAllPermissions() {
    const [locationResult, contactsResult] = await Promise.all([
      this.requestLocationPermission(),
      this.requestContactsPermission(),
    ]);

    return {
      location: locationResult,
      contacts: contactsResult,
    };
  }

  // Check all permissions status
  static async checkAllPermissions() {
    const [locationGranted, contactsGranted] = await Promise.all([
      this.getPermissionStatus("LOCATION"),
      this.getPermissionStatus("CONTACTS"),
    ]);

    return {
      location: locationGranted,
      contacts: contactsGranted,
    };
  }

  // Clear all permission data (for testing)
  static async clearPermissionData() {
    try {
      const keys = Object.values(this.STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing permission data:", error);
    }
  }
}

export default PermissionService;
