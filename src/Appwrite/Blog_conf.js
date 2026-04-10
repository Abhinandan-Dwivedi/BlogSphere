import conf from '../config/config.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { Permission, Role } from "appwrite";


export class Blogservice {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_api)
            .setProject(conf.appwrite_projectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async CreatePost({ title, slug, content, featuredImage, status, userId }) {
        try {
            console.log("Blog_conf.js: CreatePost called with:", { title, slug, content, featuredImage, status, userId });
            const payload = {
                Title: title,
                Content: content,
                FeaturedImage: featuredImage,
                status: status,
                UserId: userId,
            };
            console.log("Blog_conf.js: About to createDocument with:", payload);
            return await this.databases.createDocument(
                conf.appwrite_databaseid,
                conf.appwrite_tableid,
                slug,
                payload
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async UpdatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwrite_databaseid,
                conf.appwrite_tableid,
                slug,
                {
                    Title: title,
                    Content: content,
                    FeaturedImage: featuredImage,
                    status: status,
                    UserId: userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async DeletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwrite_databaseid,
                conf.appwrite_tableid,
                slug

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwrite_databaseid,
                conf.appwrite_tableid,
                slug

            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwrite_databaseid,
                conf.appwrite_tableid,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            throw error;
        }
    }


    // file upload service

    async uploadFile(file) {
        console.log("Appwrite serive :: uploadFile called in Blogconf: file", file);
        try {
            return await this.bucket.createFile(
                conf.appwrite_bucketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            if (fileId) {
                await this.bucket.deleteFile(
                    conf.appwrite_bucketid,
                    fileId
                );
            }
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        if (fileId) {
            // using getFileView instead of getFilePreview to avoid "storage_image_transformations_blocked" error on free plans
            return this.bucket.getFileView(
                conf.appwrite_bucketid,
                fileId
            );
        }
        return null;
    }
}
const service = new Blogservice();
export default service;