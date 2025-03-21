import React, { useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import * as Yup from "yup";
import {
    AppForm as Form,
    AppFormField as FormField,
    FormImagePicker,
    SubmitButton,
} from "../components/Forms";
import { addImages, updateListing } from "../api/listings";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";
import { tts } from "../api/tts";
import apiClient from "../api/client";
import colors from "../config/colors";
import AppText from "../components/Text";
const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    images: Yup.array().min(1, "Please select at least one image."),
});
//
function NewDoc() {
    const addImageApi = useApi(addImages);
    const ttsApi = useApi(tts);
    const updateListingApi = useApi(updateListing);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (listing, { resetForm }) => {
        setIsSubmitting(true);
        const result = await addImageApi.request(listing);
        if (!result.ok) {
            setIsSubmitting(false);
            alert("Could not upload the images.");
            console.log(result.problem);
            return;
        }
        const recognizedText = result.data.text;
        const ttsResponse = await ttsApi.request(recognizedText);
        if (!ttsResponse.ok) {
            setIsSubmitting(false);
            console.log(ttsResponse.problem);
            alert("Could not convert text to speech");
            return;
        }

        const audioURL = ttsResponse.data.audioURL;
        let baseURL = apiClient.getBaseURL();
        baseURL = baseURL.slice(0, -1);
        const fileURL = baseURL + audioURL;
        const updateResponse = await updateListingApi.request({
            ...addImageApi.data,
            fileURL: fileURL,
        });
        if (!updateResponse.ok) {
            setIsSubmitting(false);
            alert("Could not update the listing.");
            console.log(updateResponse.problem);
            return;
        }
        alert("Uploaded successfully.");
        resetForm({ values: { title: "", images: [] } });
        setIsSubmitting(false);
    };

    return (
        <Screen style={styles.container}>
            {isSubmitting && (
                <View
                    style={styles.loadingOverlay}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <AppText style={styles.loadingText}>Uploading...</AppText>
                    </View>
                </View>
            )}
            <Form
                initialValues={{
                    title: "",
                    images: [],
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormImagePicker name="images" />
                <FormField name="title" placeholder="Title" />
                <SubmitButton title="Upload" loading={false} />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
        zIndex: 1,
    },
    loadingContainer: {
        backgroundColor: "#333", // Dark gray background
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#ffffff", // White text
    },
});
export default NewDoc;
