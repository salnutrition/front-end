export function preventDefault(fn: (e: SubmitEvent) => void) {
    return function (event: SubmitEvent) {
        event.preventDefault();
        fn(event);
    };
}

export function formDataToJson(formData: FormData): Record<string, any> {
    const obj: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
        obj[key] = value;
    }
    return obj;
}

export function getPath(url: string): string {
    const BACKEND_URL = "http://localhost:8000/";
    const path = BACKEND_URL + url;
    return path;
}   