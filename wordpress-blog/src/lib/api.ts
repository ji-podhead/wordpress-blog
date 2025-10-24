const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getPosts() {
  const response = await fetch(`${API_URL}posts`);
  const posts = await response.json();
  return posts;
}

export async function getPost(slug: string) {
  const response = await fetch(`${API_URL}posts?slug=${slug}`);
  const post = await response.json();
  return post.length > 0 ? post[0] : null;
}
