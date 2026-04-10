import React from 'react';
import service from '../Appwrite/Blog_conf';
import { Link } from 'react-router-dom';

export default function Posts({ $id, FeaturedImage, Title }) {
    return (
        <Link
            to={`/post/${$id}`}
            className="group block h-full w-full"
        >
            <div className="relative h-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-zinc-600 hover:shadow-[0_0_40px_rgba(161,161,170,0.12)]">
                
              
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent" />

                <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60">
                    <img
                        src={service.getFilePreview(FeaturedImage)}
                        alt={Title || "Post Image"}
                        className="h-56 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <h3 className="line-clamp-2 text-xl font-bold tracking-wide text-zinc-100 transition-colors duration-300 group-hover:text-zinc-300">
                    {Title}
                </h3>

               
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-zinc-500 to-zinc-300 transition-all duration-500 group-hover:w-full" />
            </div>
        </Link>
    );
}