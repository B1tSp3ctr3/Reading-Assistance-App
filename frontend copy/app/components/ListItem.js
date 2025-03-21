import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import colors from "../config/colors";
import AppText from "./Text";
import { useActiveTrack } from "react-native-track-player";

function ListItem({
    title,
    subtitle,
    IconComponent,
    image,
    ImageInput,
    onPress,
    uri,
}) {
    const isActive = useActiveTrack()?.url === uri;
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.container}>
                {IconComponent}
                {ImageInput}
                {image && <Image style={styles.image} source={image} />}
                <View style={styles.subcontainer}>
                    <AppText style={styles.title} numberOfLines={1}>
                        {title}
                    </AppText>
                    {subtitle ? (
                        <AppText style={styles.subtitle} numberOfLines={2}>
                            {subtitle}
                        </AppText>
                    ) : null}
                </View>
                <FontAwesome5
                    name={"ellipsis-h"}
                    size={20}
                    color={isActive ? colors.primary : colors.mediumgrey}
                />
            </View>
        </TouchableHighlight>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: colors.secondary,
        alignItems: "center",
    },
    subcontainer: {
        alignItems: "flex-start",
        marginTop: 5,
        marginLeft: 10,
        flexWrap: "nowrap",
        justifyContent: "center",
        flex: 1,
    },

    title: {
        fontWeight: "bold",
        fontSize: 19,
    },
    subtitle: {
        color: colors.mediumgrey,
        fontSize: 17,
        textAlign: "left",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
});
export default ListItem;
