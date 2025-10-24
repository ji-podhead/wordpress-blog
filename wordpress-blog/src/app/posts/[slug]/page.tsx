import { getPost } from "../../../lib/api";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{post.title.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        className="prose lg:prose-xl"
      />
    </div>
  );
}
