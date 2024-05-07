import { Image } from "react-native";
import React from "react";

const Avatar = ({ seed, avatarStyle }) => {
  return (
    <Image
      source={{
        uri: `https://api.dicebear.com/8.x/avataaars/png?seed=${seed}&mouth=default`,
      }}
      className={avatarStyle}
    />
  );
};

export default Avatar;
