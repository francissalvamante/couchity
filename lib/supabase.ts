import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const config = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
};

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const getUserDetails = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .filter("email", "eq", email);

  if (error) throw error;

  return data[0];
};

const addUser = async (userData) => {
  const { error } = await supabase.from("users").insert(userData);

  if (error) throw error;
};

export const signUp = async (email, username, password) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  await addUser({ username, email });
};

export const signIn = async (email, password) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const userDetails = await getUserDetails(session.user.email);

  return { ...session, userDetails };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;

  return;
};

export const getUser = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;

  if (!session) return session;

  const userDetails = await getUserDetails(session?.user?.email);

  return { ...session, userDetails };
};

export const addToWatchList = async (user, item) => {
  try {
    const userDetails = await getUserDetails(user.email);

    const { error } = await supabase.from("watchlist").insert({
      user_id: userDetails.id,
      details: item,
    });

    if (error) throw error;

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

export const removeFromWatchList = async (user, item) => {
  try {
    const userDetails = await getUserDetails(user.email);

    const { error } = await supabase
      .from("watchlist")
      .update({
        is_valid: false,
      })
      .eq("id", item.id)
      .eq("user_id", userDetails.id);

    if (error) throw error;

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserWatchList = async (user) => {
  try {
    const userDetails = await getUserDetails(user.email);

    const { data, error } = await supabase
      .from("watchlist")
      .select()
      .filter("user_id", "eq", userDetails.id)
      .filter("is_valid", "eq", true);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
