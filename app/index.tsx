import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "../context/AuthContext";
import images from "../constants/images";
import CustomButton from "../components/ui/CustomButton";
import * as Animatable from "react-native-animatable";

const App = () => {
  const { loading, isLoggedIn } = useAuthContext();

  if (!loading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary flex-1 w-full h-full justify-center items-center">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex-1 justify-center items-center min-h-[85vh] -mt-10">
          <Text className="font-pbold text-white text-2xl mb-5">Couchity</Text>

          <Animatable.Image
            animation="tada"
            iterationCount="infinite"
            source={images.popcorn}
            className="w-[200px] h-[100px]"
            resizeMode="contain"
          />

          <CustomButton
            title="Sign In"
            handlePress={() => router.push("/sign-in")}
            buttonStyles="w-full mt-8"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#1e1e1e" style="light" />
    </SafeAreaView>
  );
};

export default App;
