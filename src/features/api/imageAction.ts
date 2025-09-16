interface answer {
    fileId: string,
    name: string,
    size: number,
    filePath: string,
    url: string,
    height: number,
    width: number
}

export const uploadFile = async (imageFile: Blob, imageName: string, accessToken : any) => {

    const BASE_URL = "http://localhost:8080/uploadImage";

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

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