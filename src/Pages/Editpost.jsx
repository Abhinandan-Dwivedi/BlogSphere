import React from 'react'
import  Postform   from '../components/Postform';
import { useState , useEffect } from 'react';
import service from "../Appwrite/Blog_conf.js";
import { useNavigate, useParams } from 'react-router-dom';

export default function Editpost() {
    const [ post , setpost]  = useState(null);
    const { postid } = useParams();
    const navigate = useNavigate();

    useEffect (()=>{
        service.getPost(postid).then((res)=>{
            if ( res ){
                setpost(res); 
            }
            else {
                navigate('/notfound'); 
            }
        })
    } , [postid , navigate]); 
  return post ?  (
    <div className='w-full py-5'>
        <div className='w-full max-w-7xl mx-auto px-4'>
            <Postform post = {post} />
            </div>
    </div>
  ) : null ;
}