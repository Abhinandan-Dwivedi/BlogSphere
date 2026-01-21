import React from 'react';
import service from '../Appwrite/Blog_conf';
import { Link } from 'react-router-dom';

export default function Posts({ $id, imageid, title }) {
    return (
        <Link to={`/post/${$id}`} >
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(imageid)} alt="" className='rounded-xl' />
                </div>
                <h3 className='text-xl font-bold' >
                    {title}
                </h3>
            </div>
        </Link>
    )
}
