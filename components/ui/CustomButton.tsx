import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: any;
  buttonStyles?: string;
  textStyles?: string;
}

const CustomButton = ({
  title,
  handlePress,
  buttonStyles,
  textStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${buttonStyles} min-h-[62px] rounded-xl bg-blue-500 justify-center items-center`}
    >
      <Text className={`${textStyles} font-pbold text-white text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
