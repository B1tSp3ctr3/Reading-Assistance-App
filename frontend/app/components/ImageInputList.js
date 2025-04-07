import React from 'react';
import { View, StyleSheet , ScrollView} from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
    const scrollView = React.useRef();
    return (
        <View>
        <ScrollView 
        horizontal 
        ref={scrollView}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
        <View style={styles.container}>
        {imageUris.map((uri) => (
            <ImageInput
            imageUri={uri}
            key={uri}
            onChangeImage={() => onRemoveImage(uri)}
            />
        ))}
        <ImageInput onChangeImage={(uri) => onAddImage(uri)} iconName={"camera"} />
        </View>
        </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});
export default ImageInputList;
