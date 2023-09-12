import { useState } from 'react';
import PostForm from '../components/PostForm';
import Posts from '../components/Posts';
import { addPost, getPosts } from '../posts/api';
import { NewPost, Post } from '../posts/types';
import { useEffect } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    getPosts().then((data) => {
      if (!cancel) {
        setPosts(data);
        setLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, []);

  const handleSave = async (newPost: NewPost) => {
    const savedPost = await addPost(newPost);
    setPosts([...posts, savedPost]);
  };

  if (loading) {
    return <div className="text-center p-5 text-slate-900">Loading...</div>;
  }
  return (
    <div className="flex flex-col pt-5 pb-10 mx-auto max-w-sm">
      <h2 className="text-lg font-semibold mb-3">Posts</h2>
      <PostForm onSave={handleSave} />
      <Posts posts={posts} />
    </div>
  );
}
