import React from "react";
import { useForm } from "react-hook-form";
import RT_Editor from "./RT_Editor";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from './Button';
import Input from './Input';
import Select from './Select';
import service from "../Appwrite/Blog_conf.js";

function Postform({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            postid: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submitbtn = async (data) => {
        console.log("statrting of submitbtn function")
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredImage);
            }
            console.log("Updating post with data: starting of $id", data);
            const dbPost = await service.UpdatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log("userData:", userData);

                const dbPost = await service.CreatePost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        console.log("submit is finised here ");
    }
    const postidTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("postid", postidTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, postidTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submitbtn)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="postid:"
                    placeholder="postid"
                    className="mb-4"
                    {...register("postid", { required: true })}
                    onInput={(e) => {
                        setValue("postid", postidTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RT_Editor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    { console.log("submit button is cllled ")}
                    { post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
export default Postform;