import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsApi } from "../api/postsApi";
import type { BlogPost } from "../types/blog.types";

const PostsListPage = () => {
    const [posts, setPosts] = useState<BlogPost[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setPosts(await postsApi.list());
            } catch {
                setError('Kunde inte hämta inlägg.');
            }
        })();
    }, []);

    return (
        <div>
            <h1>Alla inlägg</h1>
            {error && <p className="error-message">{error}</p>}
            {!posts && !error && <p>Laddar...</p>}

            {posts && (
                <ul>
                    {posts.map((p) => (
                        <li key={p.id}>
                            <Link to={`/posts(${p.id}`}>{p.title}</Link>
                            <div className="muted">
                                Av {p.author} • {new Date(p.createdAt).toLocaleString()}
                                </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostsListPage;