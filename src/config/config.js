const config = {
    appwrite_api: String(import.meta.env.VITE_APPWRITE_API),
    appwrite_databaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrite_projectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_tableid: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwrite_bucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    TinyMCE_apikey: String(import.meta.env.VITE_TINYMCE_APIKEY),
}
export default config;