import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { postsApi } from "../api/postsApi";
import type { BlogPost } from "../types/blog.types";

const PostDetailsPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                setPost(await postsApi.get(id));
            } catch {
                setError("Inlägget kunde inte hämtas.");
            }
        })();
    }, [id]);

    if(error) {
        return (
            <div>
                <p className="error-message">{error}</p>
                <p>
                    <Link to="/posts">Tillbaka</Link>
                </p>
            </div>
        );
    }

    if (!post) return <p>Laddar...</p>;

    return (
        <article>
            <h1>{post.title}</h1>
            <div className="muted">
                Av {post.author} • {new Date(post.createdAt).toLocaleString()}
            </div>
            <hr />
            <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

            <p>
                <Link to="/posts">← Tillbaka till listan</Link>
            </p>
        </article>
    );
};

export default PostDetailsPage;