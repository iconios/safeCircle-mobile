import { Tabs } from "expo-router";
const isLoggedIn = true;

const TabLayout = () => {
  return (
    <Tabs.Protected guard={isLoggedIn}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="journeys"
        options={{
          title: "Journeys",
        }}
      />
      <Tabs.Screen
        name="circles"
        options={{
          title: "Circles",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs.Protected>
  );
};

export default TabLayout;
