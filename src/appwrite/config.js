import conf from "../conf/conf";
import { Client, Account, ID, Query ,Storage,Dt} from "appwrite";

export class DBServeice{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteurl);

        this.databases = new Database(this.client);
        this.bucket = new Storage(this.client);
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabase,conf.appwriteCollectionID,slug);
        } catch (error) {
            console.log("error from :: getPost()",error);

        }
    }
    async getPosts(queries=[Query.equal('status','active')]){
     try {
        return this.databases.listDocuments(conf.appwriteDatabase,conf.appwriteCollectionID,queries); 
     } catch (error) {
        console.log("error from :: getPosts()",error);
     }
    }

    async createPost({title,slug,content,featuredImage,status,userID}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabase,conf.appwriteCollectionID,slug,{
                title,content,featuredImage,status,userID
            });
        } catch (error) {
            console.log("error from :: createpost()",error);

        }
    }

    async updatePost(slug ,{title,content,featuredImage,status,userID}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabase,conf.appwriteCollectionID,slug,{
              title,content,featuredImage,status,userID
            })
        } catch (error) {
          console.log("error from :: updatepost()",error);

        }
}


async deletePost(slug){

    try {
         await this.databases.updateDocument(conf.appwriteDatabase,conf.appwriteCollectionID,slug);
         return true;
    } catch (error) {
      console.log("error from :: deletepost()",error);

    }
}

//storage files

async createbucket(file){
    try {

        return await this.bucket.createFile(conf.appwriteBucketID,ID.unique(),file);
        
    } catch (error) {
        console.log("error from :: createbucket()",error);

    }
}

async createbucket(fileID){
    try {

        return await this.bucket.deleteFile(conf.appwriteBucketID,fileID);
        
    } catch (error) {
        console.log("error from :: deleteID()",error);

    }
}

getFilePreview(fileID){
    return this.bucket.getFilePreview(conf.appwriteBucketID,fileID).href
}
}

const service = new DBServeice();