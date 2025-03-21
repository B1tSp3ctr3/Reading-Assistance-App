import { useEffect, useState, useMemo } from "react";
import React from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import Text from "../components/Text";
import Button from "../components/Button";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";
import useApi from "../hooks/useApi";
import { getListings } from "../api/listings";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { titleFilter } from "../helpers/filter";
function Home({ navigation }) {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: "Search documents...",
        },
    });
    const [refreshing, setRefreshing] = useState(false);
    const getListingsApi = useApi(getListings);
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
    const handlePress = (item) => {
        console.log(item);
    };
    const filteredListings = useMemo(() => {
        if (!getListingsApi.data || !getListingsApi.data.texts) return [];
        if (!search) return getListingsApi.data.texts;
        return getListingsApi.data.texts.filter(titleFilter(search));
    }, [search, getListingsApi.data]);

    return (
        <View style={styles.container}>
            {getListingsApi.loading && (
                <ActivityIndicator size="large" color={colors.primary} />
            )}
            {getListingsApi.error ? (
                <>
                    <Text>Could not retrieve the listings.</Text>
                    <View style={styles.reload}>
                        <Button title="Retry" onPress={getListingsApi.request} />
                    </View>
                </>
            ) : null}
            <FlatList
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
                ListFooterComponent={ListItemSeparator}
                ListHeaderComponent={ListItemSeparator}
                data={filteredListings}
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
                            handlePress(item);
                        }}
                        uri={item.fileURL}
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
    reload: {
        flex: 1,
        width: "80%",
        alignSelf: "center",
        top: 10,
    },
});

export default Home;
