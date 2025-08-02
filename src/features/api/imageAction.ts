interface answer {
    fileId: string,
    name: string,
    size: number,
    filePath: string,
    url: string,
    height: number,
    width: number,
    msg: string
}

export const uploadFile = async (imageFile: Blob, imageName: string) => {

    const BASE_URL = "http://localhost:8080/uploadImage";

    const headers = new Headers();

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

    const answer = await response.json() as answer;
    if (answer.msg) {
        console.error(answer.msg);
    }
    return answer.url;
}