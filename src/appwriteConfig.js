import { Client, Databases } from 'appwrite';


export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTIONS_ID_MSG = import.meta.env.VITE_COLLECTION_ID;


const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

export const databases = new Databases(client);

export default client