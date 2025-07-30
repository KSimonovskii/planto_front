/// <reference types="vite/client" />
declare module 'swiper/css';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';

interface ImportMetaEnv
{
    readonly VITE_BASE_PRODUCT_URL: string;
    readonly VITE_IMAGEKIT_API_KEY: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_IMAGEKIT_ENDPOINT: string;
    readonly VITE_IMAGEKIT_EMPTY_PHOTO: string;
    readonly VITE_PRODUCT_CRITERIA_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

