import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
  
    client = new Client();
    account;

    constructor(){
         this.client
         .setEndpoint(conf.appwriteurl)
         .setProject(conf.appwriteID);
         this.account = new Account(this.client);
    }

    async CreateAccount({ID,email,password}){
        try{ 
            const useraccount = await this.account.create(ID.unique(),email,password);
             if(useraccount){
                return this.login({email,password});
             }
             else{
                return useraccount;
             }

        }
        catch(error){
            console.log("error from :: CreateAccount()",error);
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("error from :: login()",error);
        }
    }
    async currentUser(){
       try{
        return await  this.account.get();
       }
        catch (error) {
            console.log("error from :: currentUser()",error);
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("error from :: logout()",error);
        }
    }
}

export default autservice = new AuthService();