const conf = {
    appwriteurl: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteID: String(process.env.REACT_APP_APPWRITE_ID),
    appwriteDatabase: String(process.env.REACT_APP_DATABASE_ID),
    appwriteCollectionID: String(process.env.REACT_APP_COLLECTION_ID),
    appwriteBucketID: String(process.env.REACT_APP_BUCKET_ID)
}

export default conf