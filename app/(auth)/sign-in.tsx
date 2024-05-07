import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/ui/FormField";
import CustomButton from "../../components/ui/CustomButton";
import { Link, Redirect, router } from "expo-router";
import { signIn } from "../../lib/supabase";
import { useAuthContext } from "../../context/AuthContext";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const session = await signIn(formData.email, formData.password);
      setUser(session);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert(
        "Confirm email",
        "Please check your email for the confirmation link"
      );
    } finally {
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full flex-col-reverse min-h-[83vh] px-4 my-6">
          <View className="w-full">
            <FormField
              placeholder="Email Address"
              value={formData.email}
              handleChangeText={(e) => setFormData({ ...formData, email: e })}
              otherStyles="mt-7"
            />
            <FormField
              placeholder="Password"
              value={formData.password}
              handleChangeText={(e) =>
                setFormData({ ...formData, password: e })
              }
              otherStyles="mt-4"
              secureTextEntry={true}
            />
            <CustomButton
              title="Sign in"
              handlePress={handleSignIn}
              buttonStyles="mt-10"
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-blue-500"
              >
                Sign Up
              </Link>
            </View>
          </View>
          <View className="w-[80vw]">
            <Text className="font-pbold text-white text-2xl">
              Login to Couchity
            </Text>
            <Text className="font-pregular text-white text-lg">
              You'll find what you're looking for in the ocean of movies
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
