import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/ui/FormField";
import CustomButton from "../../components/ui/CustomButton";
import { Link, router } from "expo-router";
import { signUp } from "../../lib/supabase";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
      await signUp(formData.email, formData.username, formData.password);
    } catch (error) {
      Alert.alert("Error", `Error signing up: ${error}`);
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
              placeholder="Username"
              value={formData.username}
              handleChangeText={(e) =>
                setFormData({ ...formData, username: e })
              }
              otherStyles="mt-4"
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
              title="Sign up"
              handlePress={handleSignUp}
              buttonStyles="mt-10"
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-blue-500"
              >
                Sign In
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

export default SignUp;
