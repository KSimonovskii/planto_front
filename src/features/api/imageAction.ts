interface answer {
    fileId: string,
    name: string,
    size: number,
    filePath: string,
    url: string,
    height: number,
    width: number
}

export const uploadFile = async (imageFile: Blob, imageName: string) => {

    const BASE_URL = "https://upload.imagekit.io/api/v1/files/upload";
    const API_KEY = import.meta.env.VITE_IMAGEKIT_API_KEY
    const encodedKey = btoa(`${API_KEY}:`);

    const headers = new Headers();
    headers.append("Authorization", `Basic ${encodedKey}`);

    const form = new FormData();
    form.append("file", imageFile);
    form.append("fileName", imageName);

    const options = {
        method: "POST",
        headers: headers,
        body: form
    }

    const response = await fetch(BASE_URL, options);

    if (!response.ok){
        return "";
    }
    return (await response.json() as answer).url;
}