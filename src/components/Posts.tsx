import { Post } from '../posts/types';

type Props = {
  posts: Post[];
};

export default function Posts({ posts }: Props) {
  return (
    <ul className="list-none pt-3">
      {posts.map((post) => (
        <li key={post.id} className="border-b py-1">
          <div className="text-slate-900">
            <h1 className="text-sm font-semibold">{post.title}</h1>
            <p className="text-xs">{post.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
