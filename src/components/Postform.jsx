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
            title: post?.Title || "",
            slug: post?.$id || "",
            content: post?.Content || "",
            status: post?.status || "active",
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submitbtn = async (data) => {
        if (!userData) {
            console.error("User data is not available.");
            return;
        }
        try {
            console.log("statrting of submitbtn function", data);
            if (post) {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    service.deleteFile(post.FeaturedImage);
                }
                console.log("Updating post with data: starting of $id", data);
                const dbPost = await service.UpdatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    featuredImage: file ? file.$id : post.FeaturedImage,
                    status: data.status,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await service.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    console.log("userData:", userData);

                    const dbPost = await service.CreatePost({
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        featuredImage: fileId,
                        status: data.status,
                        userId: userData.$id,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
            console.log("submit is finised here ");
        } catch (error) {
            console.error("Error in submitbtn:", error);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");

        return "";
    }, []);

    const onInvalid = (errors) => {
        console.error("Form validation errors:", errors);
    };
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submitbtn, onInvalid)}
            className="flex flex-wrap gap-6  border border-zinc-800 bg-zinc-950/70 p-6 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
            <div className="w-full lg:w-[65%] rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-[0_0_25px_rgba(161,161,170,0.05)]">
                <Input
                    label="title :"
                    placeholder="Title"
                    className="mb-5"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug:"
                    placeholder="Slug"
                    className="mb-5"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-[0_0_20px_rgba(161,161,170,0.04)] transition-all duration-300 focus-within:border-zinc-600">
                    <RT_Editor
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>
            </div>

            <div className="w-full lg:flex-1 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-[0_0_25px_rgba(161,161,170,0.05)]">
                <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/60 p-4 transition-all duration-300 hover:border-zinc-500">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-0 cursor-pointer file:mr-4 file:rounded-xl file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-sm file:font-medium file:text-zinc-200 hover:file:bg-zinc-700"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>

                {post && (
                    <div className="mt-5 mb-5 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 p-2 shadow-[0_0_25px_rgba(161,161,170,0.08)]">
                        <img
                            src={service.getFilePreview(post.FeaturedImage)}
                            alt={post.title}
                            className="h-auto w-full rounded-xl object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />
                    </div>
                )}

                <div className="mb-5 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-3 transition-all duration-300 focus-within:border-zinc-500">
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-0"
                        {...register("status", { required: true })}
                    />
                </div>

                <Button
                    type="submit"
                    bgColor={post ? "bg-zinc-700 hover:bg-zinc-600" : "bg-zinc-800 hover:bg-zinc-700"}
                    className="w-full rounded-2xl border border-zinc-700 py-3 text-base font-semibold text-zinc-100 shadow-[0_0_25px_rgba(161,161,170,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(161,161,170,0.18)]"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
export default Postform;