/// <reference types="vite/client" />
interface ImportMetaEnv
{
    readonly VITE_BASE_PRODUCT_URL: string;
    readonly VITE_PRODUCT_CRITERIA_URL: string;
    readonly VITE_BASE_ORDER_URL: string;
    readonly VITE_ORDER_CRITERIA_URL: string;
    readonly VITE_IMAGEKIT_API_KEY: string;
    readonly VITE_IMAGEKIT_ENDPOINT: string;
    readonly VITE_IMAGEKIT_EMPTY_PHOTO: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
