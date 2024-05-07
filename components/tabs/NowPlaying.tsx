import { FlatList } from "react-native";
import { getNowPlaying } from "../../lib/tmdb";
import React from "react";
import useTmdb from "../../lib/useTmdb";
import CoverComponent from "../ui/CoverComponent";

const NowPlaying = () => {
  const { data } = useTmdb(getNowPlaying);

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

export default NowPlaying;
