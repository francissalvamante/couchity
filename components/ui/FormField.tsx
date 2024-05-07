import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";

interface FormFieldProps {
  title?: string;
  value: string;
  placeholder?: string;
  handleChangeText?: any;
  otherStyles?: string;
  secureTextEntry?: boolean;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  secureTextEntry,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${otherStyles} space-y-2`}>
      {title && (
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      )}
      <View className="w-full h-16 px-4 bg-white rounded-2xl focus:border-secondary items-center flex-row border-2 border-black-200">
        <TextInput
          className="flex-1 text-black font-pbold text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          returnKeyType="next"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
