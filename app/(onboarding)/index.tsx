import { StyleSheet, View, Text } from "react-native";
import PagerView from "react-native-pager-view";
import ValuePropositionScreen1 from "./valuProp1";
import ValuePropositionScreen2 from "./valueProp2";
import ValuePropositionScreen3 from "./valueProp3";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";

const TOTAL_PAGES = 3;

export default function MyPager() {
  const [page, setPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();

  const goNext = () => {
    if (page < TOTAL_PAGES - 1) {
      pagerRef.current?.setPage(page + 1);
    } else {
      router.replace("/(auth)/");
    }
  };
  return (
    <View style={styles.container}>
      <PagerView
        style={styles.container}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        <View key="1">
          <ValuePropositionScreen1 onNext={goNext} />
        </View>
        <View key="2">
          <ValuePropositionScreen2 onNext={goNext} />
        </View>
        <View key="3">
          <ValuePropositionScreen3 onNext={goNext} />
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
