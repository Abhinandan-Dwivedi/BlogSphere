import React, { useState, useEffect } from 'react'
import service from '../Appwrite/Blog_conf';
import Posts from '../components/Posts';


function Home() {
    const [posts, setposts] = useState([]);

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setposts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <div className='w-full max-w-7xl mx-auto px-4'>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h2 className="text-2xl font-bold hover:text-gray-500">
                                Login to read Posts.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
             <div className='w-full max-w-7xl mx-auto px-4'>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Posts {...post} />
                        </div>
                    ))}
                </div>
             </div>
        </div>
    )
}

export default Home;