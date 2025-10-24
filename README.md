# Self-Hosted WordPress Blog with Next.js Frontend

This project combines a self-hosted WordPress backend with a Next.js frontend, managed via Docker Compose.

---

## Preview
### wordpress admin page
<img width="1182" height="749" alt="grafik" src="https://github.com/user-attachments/assets/3f169066-d985-4a40-97ee-9bd398bcbc72" />

> source: ![localhost:8080/wp-login](http://localhost:8080/wp-login) | ![localhost:8080/wp-admin](http://localhost:8080/wp-admin)

- after login: 

<img width="1720" height="1156" alt="grafik" src="https://github.com/user-attachments/assets/c2f0eae3-20f5-418a-a0a2-8183bc00f0f5" />

---

###  wordpress editor

<img width="1720" height="580" alt="grafik" src="https://github.com/user-attachments/assets/4589e6c4-b75f-4f05-bd8a-19a4ba64191f" />

> source: [localhost:8080/wp-admin/edit.php](http://localhost:8080/wp-admin/edit.php)
> <br> here you can edit, delete and create new blog posts

- adding a new post:
  <img width="1001" height="464" alt="grafik" src="https://github.com/user-attachments/assets/cd436f7e-ecb8-42c3-be82-a3232ef36d77" />
> ***you can even use markdown syntax here!***

--- 

### Demo Blog


<img width="1720" height="1119" alt="grafik" src="https://github.com/user-attachments/assets/6180dcfc-97c7-42c6-b514-d3de0ee466cf" />

> source: [localhost:8080/](http://localhost:8080/)

---

### React NextJs Example Project

<img width="1720" height="314" alt="grafik" src="https://github.com/user-attachments/assets/dc90528b-c3c8-431c-801b-9e12a7d0e043" />

> source: [localhost:3000/](http://localhost:3000/)

- example post in react:

<img width="1610" height="497" alt="grafik" src="https://github.com/user-attachments/assets/738eb865-914a-48b5-95f3-13522d503f77" />


> I just used an example image here. Notice that we dont have all the features that we have in the wordpress demo blog. We could add them, but it might not be required. Keep in mind that comes with an additional attack vector.

---

## Project Structure

*   `docker-compose.yml`: Defines the services for MySQL database, WordPress backend, and Next.js frontend.
*   `wordpress-blog/`: The Next.js frontend project.
    *   `wordpress-blog/Dockerfile.dev`: Dockerfile for the Next.js frontend in development mode.
    *   `wordpress-blog/src/lib/api.ts`: Functions for fetching data from the WordPress REST API.
    *   `wordpress-blog/src/app/page.tsx`: Main page displaying a list of blog posts.
    *   `wordpress-blog/src/app/posts/[slug]/page.tsx`: Dynamic page for displaying individual blog posts.
*   `Makefile`: Contains commands for building the frontend image and managing Docker Compose services.

## Getting Started

1.  **Install Frontend Dependencies (once):**
    Navigate to the `wordpress-blog` directory (relative to the project root) and install Bun dependencies:
    ```bash
    cd wordpress-blog
    bun install
    cd ..
    ```

2.  **Start Services:**
    Navigate to the project's root directory and run:
    ```bash
    make up
    ```
    This will build the frontend Docker image and start all services (MySQL, WordPress, Next.js).

3.  **Access:**
    *   WordPress Backend: `http://localhost:8080`
    *   Next.js Frontend: `http://localhost:3000`

## Creating and Publishing Blog Posts from Obsidian to Self-Hosted WordPress

This section describes a workflow for writing your blog posts in Obsidian (using Markdown) and then publishing them directly to your self-hosted WordPress instance, which then feeds the Next.js frontend.

**Obsidian Publish is NOT used for this integration.** Obsidian Publish creates its own separate static website and does not directly publish to a WordPress backend.

### Workflow: Obsidian (Markdown) -> Self-Hosted WordPress (REST API) -> Next.js Frontend

1.  **Write your Blog Posts in Obsidian:**
    *   Use Obsidian to write your blog posts in Markdown format. Organize them within your Vault as you prefer.

2.  **Export/Convert Markdown to WordPress-compatible format:**
    WordPress primarily uses HTML for post content. You will need a way to convert your Markdown files from Obsidian into HTML.
    *   **Manual Conversion:** You can copy the Markdown content from Obsidian and use an online Markdown-to-HTML converter, or a local tool/script, to get the HTML.
    *   **Obsidian Plugin (e.g., "Markdown Export"):** Look for community plugins in Obsidian that allow exporting Markdown to HTML or a format suitable for WordPress.
    *   **Custom Script (Recommended for Automation):** For a more streamlined workflow, you could develop a custom script (e.g., in Python or Node.js) that:
        *   Monitors your Obsidian Vault for new or updated Markdown files.
        *   Reads the Markdown content.
        *   Converts the Markdown to HTML (using libraries like `markdown-it` or `marked`).
        *   Uses the WordPress REST API to create new posts or update existing ones in your self-hosted WordPress instance.

3.  **Publish to Self-Hosted WordPress via REST API:**
    Once you have the HTML content, you need to send it to your WordPress instance.
    *   **WordPress REST API Endpoint:** Your WordPress instance exposes a REST API at `http://localhost:8080/wp-json/wp/v2/posts`.
    *   **Authentication:** To create or update posts, you'll need to authenticate with the WordPress REST API. This typically involves using Application Passwords (recommended) or OAuth.
    *   **API Request:** Send a `POST` request (for new posts) or `PUT` request (for updates) to the `/posts` endpoint with your HTML content in the `content.rendered` field and other post metadata (title, status, categories, etc.).

    **Example (Conceptual, using `curl` for a new post):**
    ```bash
    curl -X POST "http://localhost:8080/wp-json/wp/v2/posts" \
      -H "Content-Type: application/json" \
      -H "Authorization: Basic $(echo -n "your_username:your_application_password" | base64)" \
      -d '{
            "title": "My New Blog Post from Obsidian",
            "content": "<h1>This is my post content from Obsidian!</h1><p>It was written in Markdown and converted to HTML.</p>",
            "status": "publish"
          }'
    ```
    *(Replace `your_username` and `your_application_password` with your actual WordPress credentials.)*

4.  **Next.js Frontend Displays Content:**
    Once the content is in your self-hosted WordPress, your Next.js frontend (running on `http://localhost:3000`) will automatically fetch and display these posts, as it is configured to read from the WordPress REST API.

This workflow provides a robust way to leverage Obsidian for writing while maintaining full control over your content and publishing it through your self-hosted WordPress.
