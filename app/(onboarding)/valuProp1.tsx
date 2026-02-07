import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Badge from "../../modules/onboarding/components/badge";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button, useTheme } from "react-native-paper";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ValuePropositionScreen1 = ({ onNext }: { onNext: () => void }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/young-woman.png")}
        />
        {/* Gradient background using expo-linear-gradient */}
        <LinearGradient
          colors={["rgba(59, 130, 246, 0.8)", "transparent", "transparent"]}
          style={styles.imageOverlay}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
        />

        {/* Badge Component */}
        <Badge />
      </View>
      <View style={{ width: "100%" }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Travel with{" "}
            <Text style={[styles.bold, { color: theme.colors.tertiary }]}>
              Peace
            </Text>
          </Text>
          <Text style={styles.subtitle}>
            Stay connected and protected on every trip
          </Text>
        </View>

        <View style={styles.shareJourneyContainer}>
          <View style={styles.shareJourneyOuter}>
            <View style={{ marginRight: 12 }}>
              <MaterialIcons
                name="share-location"
                size={28}
                color={theme.colors.tertiary}
              />
            </View>
            <View style={styles.shareJourneyInner}>
              <Text style={{ fontWeight: "600" }}>Share Journey</Text>
              <Text style={[styles.subtitle]}>
                Instantly share your live location with your trusted circle
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.dotsContainer}>
        <View
          style={[styles.dot, { backgroundColor: theme.colors.tertiary }]}
        />
        <View style={[styles.dot, { backgroundColor: "#F2F2F2" }]} />
        <View style={[styles.dot, { backgroundColor: "#F2F2F2" }]} />
      </View>
      <Button
        onPress={onNext}
        icon="skip-next"
        mode="contained"
        buttonColor={theme.colors.tertiary}
        contentStyle={{
          flexDirection: "row-reverse", // Reverse order (icon on right)
          height: 48,
          width: "100%",
        }}
        style={{
          marginTop: 18,
          marginBottom: 48,
        }}
      >
        Next
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: SCREEN_WIDTH - 35,
    height: SCREEN_WIDTH,
    resizeMode: "cover",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    bottom: 0,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 4 / 4,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 25,
    overflow: "hidden",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 1,
  },

  bold: {
    fontWeight: "700",
  },
  titleContainer: {
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  shareJourneyOuter: {
    display: "flex",
    flexDirection: "row",
  },
  shareJourneyInner: {
    display: "flex",
    flexDirection: "column",
  },
  locationIcon: {
    flexGrow: 0,
  },
  shareJourneyText: {
    flexGrow: 1,
  },
  shareJourneyContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F2F2F2",
    borderRadius: 25,
    marginBottom: 28,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 6,
  },
  dotsContainer: {
    justifyContent: "center",
    flexDirection: "row",
    display: "flex",
  },
});

export default ValuePropositionScreen1;
