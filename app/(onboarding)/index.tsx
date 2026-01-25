import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Badge from "../../modules/onboarding/components/badge";
const {width: SCREEN_WIDTH} = Dimensions.get("window")

const valuePropositionScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={["left", "top", "right"]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={require("../../assets/young-woman.png")}
                        />
                        {/* Gradient background using expo-linear-gradient */}
                        <LinearGradient
                            colors={['rgba(59, 130, 246, 0.8)', 'transparent', 'transparent']}
                            style={styles.imageOverlay}
                            start={{ x: 0.5, y: 1 }}
                            end={{ x: 0.5, y: 0 }}
                        />
                    
                        {/* Badge Component */}
                        <Badge />
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Travel with <Text style={styles.bold}>Peace</Text></Text>
                        <Text>Stay connected and protected on every trip</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: SCREEN_WIDTH-35,
    height: SCREEN_WIDTH,
    resizeMode: "cover",
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    bottom: 0,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  
  imageContainer: {
    width: '100%',
    aspectRatio: 4/4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 25,
    overflow: "hidden"
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 16,

  },

  bold: {
    fontWeight: "700",
    color: "#1FA6E3",
  },
  titleContainer: {
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  }
})

export default valuePropositionScreen;