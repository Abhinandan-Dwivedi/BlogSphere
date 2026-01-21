import React from 'react'
import  Postcard  from '../components/Posts.jsx';
import { useState , useEffect } from 'react'; 
import service from "../Appwrite/Blog_conf.js"; 

export default function Allposts() {
    const [posts  , setposts  ] = useState([]);
    useEffect (()=>{
        service.getPosts().then((res)=>{
            if ( res && res.total >0 ){
                setposts(res.documents); 
            }
        })

    } , []);

  return (
    <div className=' w-full py-5' >
        <div className='w-full max-w-7xl mx-auto px-4' >
            <div className='flex flex-wrap'>
                { posts.map((post) => {
                    <div key = { post.$id } className='w-full md:w-1/2 lg:w-1/3 p-2 ' >
                        <Postcard { ...post} />
                    </div>
                } )}
            </div>
            
            </div> 

    </div>
  )
}