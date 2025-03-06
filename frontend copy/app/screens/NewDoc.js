// import React from "react";
// import { StyleSheet } from "react-native";
// import * as Yup from "yup";
//
// import {
//     AppForm as Form,
//     AppFormField as FormField,
//     SubmitButton,
//     FormImagePicker,
// } from "../components/Forms";
// import { addImages, updateListing } from "../api/listings";
// import useApi from "../hooks/useApi";
// import Screen from "../components/Screen";
// import { tts } from "../api/tts.js";
// const validationSchema = Yup.object().shape({
//     title: Yup.string().required().min(1).label("Title"),
//     images: Yup.array().min(1, "Please select at least one image."),
// });
//
// function NewDoc() {
//     const addImageApi = useApi(addImages);
//     const ttsApi = useApi(tts);
//     const updateListingApi = useApi(updateListing);
//     const handleSubmit = async (listing, { resetForm }) => {
//         const result = await addImageApi.request(listing);
//         if (!result.ok) {
//             alert("Could not upload the images.");
//             console.log(result.problem);
//             return;
//         }
//         const recognizedText = result.data.text;
//         const ttsResponse = await ttsApi.request(recognizedText);
//         if (!ttsResponse.ok) {
//             console.log(ttsResponse.problem);
//             alert("Could not convert text to speech");
//             return;
//         }
//
//         // const fileID = ttsResponse.data.fileID;
//         // const updateResponse = await updateListingApi.request({
//         //     ...addImageApi.data,
//         //     fileID: fileID,
//         // });
//         // if (!updateResponse.ok) {
//         //     alert("Could not update the listing.");
//         //     console.log(updateResponse.problem);
//         //     return;
//         // }
//         alert("Uploaded successfully.");
//         resetForm({ values: { title: "", images: [] } });
//     };
//
//     return (
//         <Screen style={styles.container}>
//             <Form
//                 initialValues={{
//                     title: "",
//                     images: [],
//                 }}
//                 onSubmit={handleSubmit}
//                 validationSchema={validationSchema}
//             >
//                 <FormImagePicker name="images" />
//                 <FormField name="title" placeholder="Title" />
//                 <SubmitButton title="Upload" loading={addImageApi.loading} />
//             </Form>
//         </Screen>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         padding: 10,
//     },
// });
// export default NewDoc;

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
import { tts } from "../api/tts";
import TrackPlayer from "react-native-track-player";
import apiClient from "../api/client";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    images: Yup.array().min(1, "Please select at least one image."),
});

function NewDoc() {
    const addImageApi = useApi(addImages);
    const ttsApi = useApi(tts);
    const updateListingApi = useApi(updateListing);

    const handleSubmit = async (listing, { resetForm }) => {
        // Upload images & text; assume this returns recognized text in result.data.text
        const result = await addImageApi.request(listing);
        if (!result.ok) {
            alert("Could not upload the images.");
            console.log(result.problem);
            return;
        }
        const recognizedText = result.data.text;

        // Call TTS endpoint with the recognized text wrapped in an object
        const ttsResponse = await ttsApi.request({ text: recognizedText });
        if (!ttsResponse.ok) {
            console.log(ttsResponse.problem);
            alert("Could not convert text to speech");
            return;
        }

        // Extract the audio URL from the TTS response
        const fileId = ttsResponse.data.fileId;
        const fileUrl = `${apiClient.baseURL}audios/${fileId}`;
        // For testing, use TrackPlayer to play the audio from fileUrl
        try {
            await TrackPlayer.reset();
            await TrackPlayer.load({
                id: "ttsTrack",
                url: fileUrl, // This should be a streaming URL
                title: listing.title,
                artist: "TTS",
            });
            await TrackPlayer.play();
        } catch (error) {
            console.error("Error playing TTS audio", error);
        }

        // Optionally, update the listing with the fileUrl if needed:
        // const updateResponse = await updateListingApi.request({
        //   ...addImageApi.data,
        //   fileID: fileUrl,
        // });
        // if (!updateResponse.ok) {
        //   alert("Could not update the listing.");
        //   console.log(updateResponse.problem);
        //   return;
        // }

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
