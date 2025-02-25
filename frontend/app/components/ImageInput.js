import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
import CustomAlert from "./CustomAlert";

function ImageInput({ iconName, imageUri, onChangeImage }) {
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) alert("You need to enable permission to access the library");
      const { granted: cameraGranted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraGranted) alert("You need to enable permission to access the camera");
    };
    requestPermissions();
  }, []);

  const handlePress = () => {
    setAlertVisible(true);
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        onChangeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image", error);
    }
  };

  const pickFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        onChangeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error taking photo", error);
    }
  };

  const handleDelete = () => {
    onChangeImage(null);
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.container}>
          {!imageUri && (
            <FontAwesome5 name={iconName} size={40} color={colors.primary} />
          )}
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </View>
      </TouchableOpacity>
      {alertVisible && !imageUri && (
        <CustomAlert
          visible={alertVisible}
          title="Select Image"
          message="Choose an option"
          option1="Gallery"
          option2="Camera"
          onOption1={() => { setAlertVisible(false); pickFromGallery(); }}
          onOption2={() => { setAlertVisible(false); pickFromCamera(); }}
          onCancel={() => setAlertVisible(false)}
        />
      )}
      {alertVisible && imageUri && (
        <CustomAlert
          visible={alertVisible}
          title="Delete Image"
          message="Are you sure you want to delete this image?"
          option1="Yes"
          option2="No"
          onOption1={() => { setAlertVisible(false); handleDelete(); }}
          onOption2={() => setAlertVisible(false)}
          onCancel={() => setAlertVisible(false)}
        />
      )}
    </>
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

export default ImageInput;

