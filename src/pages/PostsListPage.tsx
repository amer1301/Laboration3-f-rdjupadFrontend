import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postsApi } from '../api/postsApi';
import type { BlogPost } from '../types/blog.types';

const PostsListPage = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setError(null);
      try {
        const all = await postsApi.list();
        setPosts(all);
      } catch {
        setError('Kunde inte hämta inlägg. Är backend igång?');
      }
    })();
  }, []);

  return (
    <main className="container">
      <section style={{ padding: '26px 0 44px' }}>
        <div className="pageHeader">
          <div>
            <p className="kicker">BLOGG</p>
            <h1 className="pageTitle">Alla inlägg</h1>
          </div>
        </div>

        <hr className="hr" style={{ margin: '14px 0 18px' }} />

        {error && <div className="error">{error}</div>}
        {!posts && !error && <p style={{ color: 'var(--muted)' }}>Laddar…</p>}
        {posts && posts.length === 0 && <p style={{ color: 'var(--muted)' }}>Inga inlägg ännu.</p>}

        {posts && posts.length > 0 && (
          <div className="postsGrid">
            {posts.map((p) => (
              <article key={p.id} className="card postCard">
                <div className="postMedia">
  {p.coverImageUrl && (
    <img className="postImage" src={p.coverImageUrl} alt={p.title} />
  )}
</div>

                <div className="postBody">
                  <div className="postMeta">
                    <span>Blogg</span>
                    <span>•</span>
                    <span>
                      {'createdAt' in p && p.createdAt
                        ? new Date(p.createdAt as string).toLocaleDateString()
                        : ''}
                    </span>
                  </div>

                  <h2 className="postTitle">
                    <Link to={`/posts/${p.id}`} style={{ textDecoration: 'none' }}>
                      {p.title}
                    </Link>
                  </h2>

                  <p className="postExcerpt">
                    {p.content?.length > 160 ? `${p.content.slice(0, 160)}…` : p.content}
                  </p>

                  <div style={{ marginTop: 14 }}>
                    <Link className="btn" to={`/posts/${p.id}`}>
                      Läs mer
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default PostsListPage;
