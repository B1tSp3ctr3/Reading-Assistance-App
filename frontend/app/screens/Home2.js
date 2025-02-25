import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import { getListings } from "../api/listings";
import ListItemSeperator from "../components/ListItemSeperator";
import ListItem from "../components/ListItem";
import ImageInput from "../components/ImageInput";
import colors from "../config/colors";
import ImageUploader from "../components/ImageUploader";

function Home() {
  const [imageUri, setImageUri] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(getListings);
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadListings();
    setRefreshing(false);
  };
  useEffect(() => {
    loadListings();
  }, []);
  if (loading) {
    return (
      <ActivityIndicator visible={true} size="large" color={colors.primary} />
    );
  }
  const renderItem = ({ item }) => {
    <ListItem title={item.title} subtitle={item.subtitle} image={item.image} />;
  };
  return (
    <Screen>
      <View style={styles.header}></View>
      <View style={styles.container}>
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          ItemSeparatorComponent={ListItemSeperator}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={renderItem}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    heght: 20,
    flexDirection: "row",
  },
  container: {
    flex: 1,
    marginVertical: 20,
  },
});
export default Home;
