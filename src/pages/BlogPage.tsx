import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import PostForm from '../components/PostForm';
import Posts from '../components/Posts';
import { addPost, assertIsPosts } from '../posts/api';
import { NewPost, Post } from '../posts/types';

type PostsData = {
  posts: Post[];
};

function assertIsPostsData(data: unknown): asserts data is PostsData {
  if (typeof data !== 'object') {
    throw new Error('PostsData must be an object');
  }
  if (data === null) {
    throw new Error('PostsDate must not be null');
  }
  if (!('posts' in data)) {
    throw new Error('PostsData must have posts');
  }
}

export default function BlogPage() {
  const data = useLoaderData();
  assertIsPostsData(data);

  const handleSave = async (newPost: NewPost) => {
    await addPost(newPost);
  };

  const loading = <div className="text-xs text-slate-900 mt-1">Fetching...</div>;

  return (
    <div className="flex flex-col pt-5 pb-10 mx-auto max-w-sm">
      <h2 className="text-lg font-semibold mb-3">Posts</h2>
      <PostForm onSave={handleSave} />
      <Suspense fallback={loading}>
        <Await resolve={data.posts}>
          {(posts) => {
            console.log('Posts', posts);
            assertIsPosts(posts);
            return <Posts posts={posts} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
