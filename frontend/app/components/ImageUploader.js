import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";

function ImageUploader({ iconName, imageUri, onChangeImage }) {
  useEffect(() => {
    const requestPermission = async () => {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted)
        alert("You need to enable permission to access the library");
    };
  }, []);
  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    }
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.5,
      });
      if (!result.canceled) {
        onChangeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <FontAwesome5 name={iconName} size={40} color={colors.primary} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.lightgrey,
    borderRadius: 15,
    height: 75,
    justifyContent: "center",
    margin: 5,
    width: 75,
  },
  image: {
    borderColor: "white",
    borderRadius: 15,
    borderWidth: 5,
    width: "100%",
    height: "100%",
  },
});

export default ImageUploader;
