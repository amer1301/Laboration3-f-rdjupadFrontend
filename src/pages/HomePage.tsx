import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postsApi } from "../api/postsApi";
import type { BlogPost } from "../types/blog.types";

const HomePage = () => {
    const [posts, setPosts] = useState<BlogPost[] | null>(null);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const all = await postsApi.list();
                // Visa senaste 3
                setPosts(all.slice(0, 3));
            } catch {
                setError('Kunde inte hämta inlägg. Försök igen senare.');
            }
        })();
    }, []);

    return (
        <div>
            <h1>Min blogg</h1>
            <p>Här finns de senaste inläggen.</p>

            {error && <p className="error-messade">{error}</p>}

            {!posts && !error && <p>Laddar...</p>}

            {posts && (
                <>
                <h2>Senaste inläggen</h2>
                {posts.length === 0 ? (
                    <p>Inga inlägg ännu.</p>
                ) : (
                    <ul>
                        {posts.map((p) => (
                            <li key={p.id}>
                                <Link to={`/posts/${p.id}`}>{p.title}</Link>
                                <div className="muted">{new Date(p.createdAt).toLocaleString()}</div>
                            </li>
                        ))}
                    </ul>
                )}
                <p>
                    <Link to="/posts">Visa alla inlägg →</Link>
                </p>
                </>
            )}
        </div>
    );
};

export default HomePage;