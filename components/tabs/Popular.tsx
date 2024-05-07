import { FlatList } from "react-native";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
  addToWatchList,
  getUserWatchList,
  removeFromWatchList,
} from "../../lib/supabase";
import { getPopular } from "../../lib/tmdb";
import useTmdb from "../../lib/useTmdb";
import CoverComponent from "../ui/CoverComponent";

const Popular = () => {
  const { user } = useAuthContext();
  const { data: popular } = useTmdb(getPopular);

  const [loadingWatchlist, setLoadingWatchlist] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  const getWatchList = async () => {
    const userWatchList = await getUserWatchList(user?.user);

    setWatchlist(userWatchList);
    setLoadingWatchlist(false);
  };

  const saveToWatchList = async (item) => {
    await addToWatchList(user?.user, item);
    await getWatchList();
  };

  const remove = async (item) => {
    const watchlistedItem = isWatchListed(item);
    await removeFromWatchList(user?.user, watchlistedItem);
    await getWatchList();
  };

  const isWatchListed = (item) =>
    watchlist.find((w) => w.details.id === item.id);

  useEffect(() => {
    if (!user) return;

    getWatchList();
  }, []);

  return (
    <FlatList
      data={popular}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) =>
        !loadingWatchlist && (
          <CoverComponent
            item={item}
            index={index}
            watchlisted={isWatchListed(item)}
            saveToWatchList={() => saveToWatchList(item)}
            removeFromWatchList={() => remove(item)}
            imageStyles="w-[175px] h-[275px]"
          />
        )
      }
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{
        gap: 20,
      }}
    />
  );
};

export default Popular;
