import client from "./client";
const posttextendpoint = "text/recognize/";
const gettextendpoint = "recognisedtext/texts";
const updatetextendpoint = "database/saveText";
export const getListings = () => client.get(gettextendpoint);
export const addImages = (listing) => {
    const data = new FormData();
    data.append("title", listing.title);
    listing.images.forEach((image, index) =>
        data.append("images", {
            name: `image${index}`,
            type: "image/jpg",
            uri: image,
        }),
    );
    return client.post(posttextendpoint, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
export const updateListing = (listing) => {
    const data = new FormData();
    data.append("title", listing.title);
    data.append("text", listing.text);
    data.append("textFileName", listing.textFileName);
    data.append("textFilePath", listing.textFilePath);
    data.append("fileID", listing.fileID);

    return client.post(updatetextendpoint, data);
};
export default {
    addImages,
    getListings,
    updateListing,
};
