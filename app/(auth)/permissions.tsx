import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Linking,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { usePermissions } from "../../modules/auth/contexts/permissionContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const PermissionScreen = () => {
  const router = useRouter();
  const { requestAllPermissions, isLoading } = usePermissions();

  const handleGrantPermissions = async () => {
    const result = await requestAllPermissions();

    if (result.location.granted && result.contacts.granted) {
      // Navigate to next screen if permissions are granted
      router.replace("/(app)/(tabs)/");
    } else {
      // Handle partial permissions - maybe show which ones were denied
      console.log("Some permissions were denied:", result);
    }
  };

  const handleLearnMore = () => {
    Linking.openURL("https://safecircle.ng/privacy");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8f6" />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <MaterialIcons name="security" size={28} color="#13ec5b" />
          </View>
        </View>

        <Text style={styles.title}>We need 2 permissions to keep you safe</Text>

        <Text style={styles.subtitle}>
          Your privacy is our priority. These permissions ensure SafeCircle
          functions correctly during emergencies.
        </Text>
      </View>

      {/* Permissions List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Location Permission */}
        <View style={styles.permissionCard}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconWrapper, styles.locationIcon]}>
              <MaterialIcons name="location-on" size={24} color="#13ec5b" />
            </View>
          </View>

          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>Location Access</Text>
            <Text style={styles.permissionDescription}>
              To share your live position with your circle during an alert.
            </Text>

            <View style={styles.permissionNote}>
              <MaterialIcons name="check-circle" size={14} color="#13ec5b" />
              <Text style={styles.noteText}>
                Only accessed when you trigger SOS
              </Text>
            </View>
          </View>
        </View>

        {/* Contacts Permission */}
        <View style={styles.permissionCard}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconWrapper, styles.contactsIcon]}>
              <MaterialIcons name="contacts" size={24} color="#13ec5b" />
            </View>
          </View>

          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>Contacts Access</Text>
            <Text style={styles.permissionDescription}>
              Quickly select trusted contacts directly from your phone book.
            </Text>

            <View style={styles.permissionNote}>
              <MaterialIcons name="lock" size={14} color="#13ec5b" />
              <Text style={styles.noteText}>
                We never message without consent
              </Text>
            </View>
          </View>
        </View>

        {/* Information Card - No SMS Permission Needed */}
        <View style={styles.infoCard}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconWrapper, styles.infoIcon]}>
              <MaterialIcons name="cloud" size={24} color="#3b82f6" />
            </View>
          </View>

          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>SMS Notifications</Text>
            <Text style={styles.permissionDescription}>
              Emergency alerts are sent securely from our servers. No SMS
              permission needed on your phone.
            </Text>

            <View style={styles.permissionNote}>
              <MaterialIcons name="shield" size={14} color="#3b82f6" />
              <Text style={[styles.noteText, { color: "#3b82f6" }]}>
                Secure backend processing
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer / Action Area */}
      <LinearGradient
        colors={["transparent", "#f6f8f6"]}
        style={styles.footerGradient}
        locations={[0, 0.5]}
      >
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.grantButton, isLoading && styles.buttonDisabled]}
            onPress={handleGrantPermissions}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.grantButtonText}>
              {isLoading ? "Requesting..." : "Grant Permissions"}
            </Text>
            <MaterialIcons name="arrow-forward" size={20} color="#102216" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.learnMoreLink}
            onPress={handleLearnMore}
          >
            <Ionicons
              name="information-circle-outline"
              size={14}
              color="#94a3b8"
            />
            <Text style={styles.learnMoreText}>Why is this needed?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8f6",
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(19, 236, 91, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    fontWeight: "800",
    color: "#111813",
    lineHeight: 32,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    fontWeight: "500",
    color: "#64748b",
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  permissionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "transparent",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  iconContainer: {
    marginRight: 20,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  locationIcon: {
    backgroundColor: "rgba(19, 236, 91, 0.2)",
  },
  contactsIcon: {
    backgroundColor: "rgba(19, 236, 91, 0.2)",
  },
  infoIcon: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
  },
  permissionContent: {
    flex: 1,
    paddingTop: 4,
  },
  permissionTitle: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    fontWeight: "700",
    color: "#111813",
    marginBottom: 4,
    lineHeight: 24,
  },
  permissionDescription: {
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 8,
  },
  permissionNote: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  noteText: {
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    fontWeight: "600",
    color: "#13ec5b",
    marginLeft: 4,
  },
  footerGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: "transparent",
  },
  grantButton: {
    backgroundColor: "#13ec5b",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#13ec5b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  grantButtonText: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    fontWeight: "800",
    color: "#102216",
    marginRight: 8,
  },
  learnMoreLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingVertical: 8,
  },
  learnMoreText: {
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    fontWeight: "500",
    color: "#94a3b8",
    marginLeft: 4,
  },
});

export default PermissionScreen;
