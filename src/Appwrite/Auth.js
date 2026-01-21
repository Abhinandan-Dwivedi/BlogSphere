import conf from '../config/config.js';
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_api)
            .setProject(conf.appwrite_projectid);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
    try {
        const userAccount = await this.account.create(
            ID.unique(),
            email,
            password,
            name
        );
        if (userAccount) {
            return this.login({ email, password });
        }
        return userAccount;
    } catch (error) {
        throw error;
    }
}
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getaccount() {
        try {
            return await this.account.get();
        } catch (error) {
           console.log("Appwrite serive :: getaccount :: error", error);
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}
export const authservice = new Authservice();