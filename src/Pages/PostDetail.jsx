import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import service from "../Appwrite/Blog_conf";
import Button from "../components/Button";

function PostDetail() {
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const { postid } = useParams();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (postid) {
            service.getPost(postid)
                .then((res) => {
                    if (res) {
                        setPost(res);
                    } else {
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    navigate('/');
                });
        } else {
            navigate('/');
        }
    }, [postid, navigate]);

    const isAuthor = userData && post ? (userData.$id === post.UserId) : false;

    const deletePost = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) {
            return;
        }

        if (isAuthor) {
            await service.DeletePost(post.$id).then((res) => {
                if (res) {
                    service.deleteFile(post.FeaturedImage);
                    navigate('/');
                }
            });
        } else {
            alert("You are not authorized to delete this post.");
        }
    };

    return post ? (
        <div className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-10">
            {/* background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-zinc-700/10 blur-3xl" />
                <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 rounded-full bg-zinc-600/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-5xl">
                {/* Image Section */}
                <div className="relative mb-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-3 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent" />

                    <img
                        src={service.getFilePreview(post.FeaturedImage)}
                        alt={post.Title}
                        className="max-h-[500px] w-full rounded-2xl object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-zinc-700 hover:bg-zinc-600"
                                    className="rounded-2xl border border-zinc-600 px-5 py-2 text-zinc-100 shadow-[0_0_20px_rgba(161,161,170,0.12)] transition-all duration-300 hover:-translate-y-1"
                                >
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                bgColor="bg-red-900 hover:bg-red-800"
                                className="rounded-2xl border border-red-700 px-5 py-2 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-300 hover:-translate-y-1"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                    <div className="mb-6 inline-flex rounded-full border border-zinc-700 bg-zinc-800/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                        Post Details
                    </div>

                    <h1 className="mb-8 text-4xl font-black leading-tight tracking-tight text-zinc-100 md:text-5xl">
                        {post.Title}
                    </h1>

                    <div className="prose prose-invert max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-strong:text-zinc-100 prose-a:text-zinc-300 prose-blockquote:border-zinc-600 prose-blockquote:text-zinc-400 prose-code:text-zinc-200 prose-pre:bg-zinc-900">
                        {parse(post.Content)}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 px-10 py-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-zinc-300" />

                <h2 className="text-2xl font-bold text-zinc-100">
                    Loading Post...
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                    Preparing your content
                </p>
            </div>
        </div>
    );
}

export default PostDetail;