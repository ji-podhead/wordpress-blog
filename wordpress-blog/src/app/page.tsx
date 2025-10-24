import Link from "next/link";
import { getPosts } from "../lib/api";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <div key={post.id} className="border rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/posts/${post.slug}`}>{post.title.rendered}</Link>
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              className="text-gray-700 mb-4"
            />
            <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
