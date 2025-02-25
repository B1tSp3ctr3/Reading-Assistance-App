import { useEffect, useState } from "react";
import React from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import Text from "../components/Text";
import Button from "../components/Button";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";
import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import { getAudio } from "../api/tts";
function Home({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const getListingsApi = useApi(listingsApi.getListings);
    const getAudioApi = useApi(getAudio);
    useEffect(() => {
        const unsubscribeFocus = navigation.addListener("focus", () => {
            getListingsApi.request();
        });
        return () => unsubscribeFocus();
    }, [getListingsApi.request]);
    const handleRefresh = async () => {
        setRefreshing(true);
        await getListingsApi.request();
        setRefreshing(false);
    };
    const handlePress = async (fileID) => {
        setRefreshing(true);
        const result = getAudioApi(fileID);
        if (!result.ok) {
            alert("Could not get the audio.");
            console.log(result.problem);
            return;
        }

        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            {getListingsApi.loading && (
                <ActivityIndicator size="large" color={colors.primary} />
            )}
            {getListingsApi.error ? (
                <>
                    <Text>Could not retrieve the listings.</Text>
                    <Button title="Retry" onPress={getListingsApi.request} />
                </>
            ) : null}
            <FlatList
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
                ListFooterComponent={ListItemSeparator}
                ListHeaderComponent={ListItemSeparator}
                data={getListingsApi.data.texts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <ListItem
                        title={`${item.title}`}
                        subtitle={`${item.text.replace(/\n/g, " ")}`}
                        IconComponent={
                            <Icon
                                size={40}
                                backgroundColor={colors.primary}
                                iconColor={colors.neutral}
                                name={"file"}
                            />
                        }
                        onPress={() => {
                            handlePress(item.fileID);
                        }}
                    />
                )}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ItemSeparatorComponent={ListItemSeparator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
});

export default Home;
