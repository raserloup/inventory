import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "1MB" } })
        // Set permissions and file types for this FileRoute

        .onUploadComplete(async ({ file }) => {

            console.log("file url", file.url);
        }),
};

