import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postsApi } from '../api/postsApi';
import type { BlogPost } from '../types/blog.types';

const HomePage = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <>
      <section className="hero">
        <div className="container heroInner">
          <p className="heroKicker">PERSONLIG BLOGG</p>
          <h1 className="heroTitle">Amandas Journal</h1>
          <p className="heroLead">
            Texter om vardag, kreativitet och små saker som gör livet fint.
          </p>

          <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn btnPrimary" to="/posts">
              Läs bloggen
            </Link>
            <Link className="btn" to="/login">
              Logga in
            </Link>
          </div>
        </div>
      </section>

      <main className="container">
        <section style={{ padding: '26px 0 44px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '1.6rem' }}>Senaste inläggen</h2>
            <Link to="/posts" className="navLink">
              Visa alla →
            </Link>
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
  {p.coverImageUrl ? (
    <img className="postImage" src={p.coverImageUrl} alt={p.title} />
  ) : null}
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

                    <h3 className="postTitle" style={{ marginTop: 10 }}>
                      <Link to={`/posts/${p.id}`} style={{ textDecoration: 'none' }}>
                        {p.title}
                      </Link>
                    </h3>

                    <p className="postExcerpt">
                      {p.content?.length > 140 ? `${p.content.slice(0, 140)}…` : p.content}
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
    </>
  );
};

export default HomePage;
