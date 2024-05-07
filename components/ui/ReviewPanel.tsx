import { View, Text, Image } from "react-native";
import { createAvatar, schema } from "@dicebear/core";
import { lorelei, notionists } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";
import Avatar from "./Avatar";

const ReviewPanel = ({ review }) => {
  return (
    <View className="w-full flex-row">
      <View className="w-1/4 items-center">
        <Avatar seed={review.author} avatarStyle="w-14 h-14" />
        {review?.author_details?.rating && (
          <Text className="text-white font-pregular text-lg">
            {review?.author_details?.rating}
          </Text>
        )}
      </View>
      <View className="w-3/4">
        <Text className="text-white font-psemibold text-lg">
          {review.author}
        </Text>
        <Text className="text-white font-pregular">{review.content}</Text>
      </View>
    </View>
  );
};

export default ReviewPanel;
