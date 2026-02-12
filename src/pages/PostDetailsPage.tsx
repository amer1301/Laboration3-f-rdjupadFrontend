import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { postsApi } from '../api/postsApi';
import type { BlogPost } from '../types/blog.types';

const PostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setError(null);
      try {
        const p = await postsApi.get(id);
        setPost(p);
      } catch {
        setError('Inlägget kunde inte hämtas.');
      }
    })();
  }, [id]);

return (
  <main className="container">
    <section className="article">
      <div className="articleInner">
        <Link className="btn" to="/posts">
          ← Tillbaka
        </Link>

        {error && (
          <div className="error" style={{ marginTop: 14 }}>
            {error}
          </div>
        )}

        {!post && !error && (
          <p style={{ color: "var(--muted)", marginTop: 14 }}>Laddar…</p>
        )}

        {post && (
          <>
            <div className="articleHero card" style={{ marginTop: 16 }}>
              {post.coverImageUrl ? (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="articleImage"
                />
              ) : (
                <div className="articleMedia" />
              )}
            </div>

            <p className="articleMeta" style={{ marginTop: 16 }}>
              Blogg
              {"createdAt" in post && post.createdAt ? (
                <>
                  <span> • </span>
                  <span>
                    {new Date(post.createdAt as string).toLocaleString()}
                  </span>
                </>
              ) : null}
            </p>

            <h1 className="articleTitle">{post.title}</h1>

            <div className="articleContent">{post.content}</div>
          </>
        )}
      </div>
    </section>
  </main>
);
}

export default PostDetailsPage;
