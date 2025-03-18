import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
    FormImagePicker,
} from "../components/Forms";
import { addImages, updateListing } from "../api/listings";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";
import { tts, getAudio } from "../api/tts";
import { writeBase64ToFile } from "../helpers/writeBase64ToFile";
const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    images: Yup.array().min(1, "Please select at least one image."),
});
//
function NewDoc() {
    const addImageApi = useApi(addImages);
    const ttsApi = useApi(tts);
    const getAudioApi = useApi(getAudio);
    const updateListingApi = useApi(updateListing);
    const handleSubmit = async (listing, { resetForm }) => {
        const result = await addImageApi.request(listing);
        if (!result.ok) {
            alert("Could not upload the images.");
            console.log(result.problem);
            return;
        }
        const recognizedText = result.data.text;
        const ttsResponse = await ttsApi.request(recognizedText);
        if (!ttsResponse.ok) {
            console.log(ttsResponse.problem);
            alert("Could not convert text to speech");
            return;
        }

        const fileID = ttsResponse.data.fileID;
        const audioResult = await getAudioApi.request(fileID);
        if (!audioResult.ok) {
            alert("Could not get the audio.");
            console.log(audioResult.problem);
        }
        const base64Audio = audioResult.data;
        let fileURL;
        try {
            fileURL = await writeBase64ToFile(base64Audio, `ttsAudio_${fileID}.mp3`);
        } catch (error) {
            alert("Error saving the audio locally.");
            console.log(error);
            return;
        }
        console.log(fileURL);
        const updateResponse = await updateListingApi.request({
            ...addImageApi.data,
            fileURL: fileURL,
        });
        if (!updateResponse.ok) {
            alert("Could not update the listing.");
            console.log(updateResponse.problem);
            return;
        }
        alert("Uploaded successfully.");
        resetForm({ values: { title: "", images: [] } });
    };

    return (
        <Screen style={styles.container}>
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
                <SubmitButton title="Upload" loading={addImageApi.loading} />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
export default NewDoc;
