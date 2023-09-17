import { NewPost, Post } from './types';

const API_URL = 'http://localhost:3001/posts';

export const getPosts = async () => {
  const response = await fetch(API_URL);
  console.log('Response', response);
  const data = (await response.json()) as unknown;
  assertIsPosts(data);
  return data;
};

export function assertIsPosts(posts: any): asserts posts is Post[] {
  if (!Array.isArray(posts)) {
    throw new Error('Posts is not an array');
  }
  if (posts.length === 0) {
    return;
  }
  posts.forEach((post) => {
    if (!('id' in post)) {
      throw new Error('Post must have an id');
    }
    if (!('title' in post)) {
      throw new Error('Post must have a title');
    }
    if (!('description' in post)) {
      throw new Error('Post must have a description');
    }
  });
}

export const addPost = async (newPost: NewPost) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = (await response.json()) as unknown;
  assertIsSavedPost(data);
  return { ...data, ...newPost };
};

function assertIsSavedPost(savedPost: any): asserts savedPost is { id: number } {
  if (!('id' in savedPost)) {
    throw new Error('SavedPost must have an id');
  }
}
