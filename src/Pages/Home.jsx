import React, { useState, useEffect } from 'react'
import service from '../Appwrite/Blog_conf'
import Posts from '../components/Posts'
import { LockIcon} from 'lucide-react'

function Home() {
    const [posts, setposts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        service.getPosts()
            .then((res) => {
                if (res) {
                    setposts(res.documents)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 px-4 py-10">
                <div className="absolute inset-0">
                    <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-zinc-700/10 blur-3xl" />
                    <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 rounded-full bg-zinc-600/10 blur-3xl" />
                </div>

                <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 px-10 py-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-zinc-300" />

                        <h2 className="text-2xl font-bold tracking-wide text-zinc-100">
                            Loading Posts...
                        </h2>

                        <p className="mt-2 text-sm text-zinc-400">
                            Please wait while we fetch your content
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-950 px-4">
                <div className="absolute inset-0">
                    <div className="absolute left-[-100px] top-[-100px] h-80 w-80 rounded-full bg-zinc-700/10 blur-3xl" />
                    <div className="absolute bottom-[-100px] right-[-100px] h-96 w-96 rounded-full bg-zinc-600/10 blur-3xl" />
                </div>

                <div className="relative max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900/70 px-10 py-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 text-2xl text-zinc-300">
                        <LockIcon />
                    </div>

                    <h2 className="text-3xl font-bold text-zinc-100">
                        No Posts Available
                    </h2>

                    <p className="mt-4 text-base leading-7 text-zinc-400">
                        Login to read and explore posts. Your content will appear here once you're signed in.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 px-4 py-10">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-zinc-700/10 blur-3xl" />
                <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 rounded-full bg-zinc-600/10 blur-3xl" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl">
                {/* Hero Header */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-400 backdrop-blur-xl">
                        Latest Posts
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-zinc-100 md:text-4xl">
                        Discover Your Stories
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                        Explore your latest articles, ideas, and content inside a modern interface.
                    </p>
                </div>

                 
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="w-full p-3 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                        >
                            <Posts {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home