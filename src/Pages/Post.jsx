import React from 'react'
import { useEffect, useState } from 'react';
import service from '../Appwrite/Blog_conf'
import { Link , useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import Button from '../components/Button';

function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null)
  const { postid } = useParams();

  const userdata = useSelector((state) => state.auth.userdata);

  useEffect(() => {
    if (postid) {
      service.getPost(postid).then((res) => {
        if (res) {
          setPost(res);
        } else {
          navigate('/');
        }
      })
    }
  }, [postid, navigate]);

  const auther = userdata && post ? (userdata.$id === post.autherId) : false;

  const Delete = async () => {
    if (auther) {
      await service.DeletePost(post.$id).then((res) => {
        if (res) {
          service.deleteFile(post.featuredImage);
          navigate('/');
        }
      });
    }
    else {
      alert("You are not authorized to delete this post.");
    }
  }

  return post ? (
    <div className="py-8">
      <div className="px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
          <div className="absolute right-6 top-6">
            {isAuthor && (
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
            )}
            <Button bgColor="bg-red-500" onClick={Delete}>
              Delete
            </Button>
          </div>

        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {parse(post.content)}
        </div>
      </div>
    </div>
  ) : null;
}
export default Post;