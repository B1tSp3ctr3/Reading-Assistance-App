import colors from "./colors";

export const defaultHeaderOptions = {
    headerStyle: {
        backgroundColor: colors.secondary, // e.g., a dark background color
    },
    headerTitleStyle: {
        color: colors.white, // White title text
        fontSize: 28, // A larger font size for the title
        fontWeight: "bold", // Make the title bold
    },
    headerTintColor:colors.white,
    headerTitleAlign: "left", // Left align the title
    headerShadowVisible: false, // Optional: removes bottom border/shadow
    headerLargeTitle: true,
    headerLargeTitleStyle:{
        color: colors.white,
        fontWeight: "bold",
        backgroundColor:colors.white,
    },
    headerTransparent: true,
};
