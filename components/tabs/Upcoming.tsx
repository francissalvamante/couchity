import { FlatList, Image } from "react-native";
import React from "react";
import useTmdb from "../../lib/useTmdb";
import { getUpcoming } from "../../lib/tmdb";
import CoverComponent from "../ui/CoverComponent";

const Upcoming = () => {
  const { data } = useTmdb(getUpcoming);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <CoverComponent
          item={item}
          index={index}
          imageStyles="w-[115px] h-[160px] mb-5"
          showRanking={false}
          showBookmark={false}
        />
      )}
      columnWrapperStyle={{
        gap: 10,
      }}
      numColumns={3}
    />
  );
};

export default Upcoming;
