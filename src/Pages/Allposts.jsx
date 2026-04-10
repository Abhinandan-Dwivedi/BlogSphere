import React, { useState, useEffect } from 'react'
import Postcard from '../components/Posts.jsx'
import service from "../Appwrite/Blog_conf.js"

export default function Allposts() {
    const [posts, setposts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        service.getPosts()
            .then((res) => {
                if (res && res.total > 0) {
                    setposts(res.documents)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-zinc-950 px-4 py-10">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="flex items-center justify-center">
                        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 px-10 py-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-zinc-300" />

                            <h2 className="text-2xl font-bold tracking-wide text-zinc-100">
                                Loading Posts...
                            </h2>

                            <p className="mt-2 text-sm text-zinc-400">
                                Fetching your latest content
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 px-4 py-10">

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute   h-80 w-80 rounded-full bg-zinc-700/10 blur-3xl" />
                <div className="absolute   h-96 w-96 rounded-full bg-zinc-600/10 blur-3xl" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl">

                <div className="mb-10 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 inline-flex rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm font-medium uppercase tracking-[0.3em] text-zinc-400 backdrop-blur-xl">
                        All Posts
                    </div>

                    <h4 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
                        Explore Your Content
                    </h4>


                </div>

                {/* Posts Grid */}
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="w-full p-3 md:w-1/2 lg:w-1/3"
                        >
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}