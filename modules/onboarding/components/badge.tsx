import { StyleSheet, View, Text } from "react-native";

const Badge = () => {
  return (
    <View style={styles.badge}>
      <View style={styles.badgeInner}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />

        <Text style={styles.shieldIcon}>🛡️</Text>

        <View style={[styles.dot, styles.dot1]} />
        <View style={[styles.dot, styles.dot2]} />
        <View style={[styles.dot, styles.dot3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  badgeInner: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 2,
  },
  circle1: {
    width: 48,
    height: 48,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  circle2: {
    width: 60,
    height: 60,
    borderColor: "rgba(59, 130, 246, 0.1)",
  },
  shieldIcon: {
    fontSize: 32,
    color: "#3b82f6",
    zIndex: 10,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  dot1: {
    top: -2,
    right: -2,
    backgroundColor: "#10b981",
  },
  dot2: {
    bottom: -2,
    left: -2,
    backgroundColor: "#60a5fa",
  },
  dot3: {
    top: -2,
    left: -2,
    backgroundColor: "#ec4899",
  },
});
export default Badge;
