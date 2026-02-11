import { useEffect, useMemo, useState } from 'react';
import { postsApi } from '../api/postsApi';
import type { BlogPost } from '../types/blog.types';
import PostForm from '../components/PostForm';
import type { PostFormValues } from '../components/PostForm';

const AdminPostsPage = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uiError, setUiError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selected = useMemo(
    () => posts?.find((p) => p.id === selectedId) ?? null,
    [posts, selectedId]
  );

  const refresh = async () => {
    setUiError(null);
    try {
      setPosts(await postsApi.list());
    } catch {
      setUiError('Kunde inte hämta inlägg. Är backend igång?');
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async (values: PostFormValues) => {
    setIsSubmitting(true);
    setUiError(null);
    setNotice(null);
    try {
      await postsApi.create(values);
      await refresh();
      setNotice('Inlägg skapat.');
    } catch {
      setUiError('Kunde inte skapa inlägg (är du inloggad?).');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (values: PostFormValues) => {
    if (!selectedId) return;
    setIsSubmitting(true);
    setUiError(null);
    setNotice(null);
    try {
      await postsApi.update(selectedId, values);
      await refresh();
      setNotice('Inlägg uppdaterat.');
    } catch {
      setUiError('Kunde inte uppdatera inlägg (är du inloggad?).');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = confirm('Är du säker på att du vill ta bort inlägget?');
    if (!ok) return;

    setIsSubmitting(true);
    setUiError(null);
    setNotice(null);
    try {
      await postsApi.remove(id);
      setSelectedId(null);
      await refresh();
      setNotice('Inlägg borttaget.');
    } catch {
      setUiError('Kunde inte ta bort inlägg (är du inloggad?).');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container">
      <section style={{ padding: '26px 0 44px' }}>
        <div className="pageHeader">
          <div>
            <p className="kicker">ADMIN</p>
            <h1 className="pageTitle">Hantera inlägg</h1>
          </div>
        </div>

        <hr className="hr" style={{ margin: '14px 0 18px' }} />

        {uiError && <div className="error">{uiError}</div>}
        {notice && <div className="notice">{notice}</div>}

        <div className="adminGrid">
          <div className="card adminPanel">
            <div className="panelHeader" style={{ marginBottom: 10 }}>
              <h2 style={{ fontFamily: 'var(--serif)', margin: 0, fontSize: '1.2rem' }}>
                {selected ? 'Redigera inlägg' : 'Skapa nytt inlägg'}
              </h2>
              <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
                {selected ? 'Uppdatera titel och innehåll.' : 'Skriv och publicera ett nytt inlägg.'}
              </p>
            </div>

            <PostForm
              disabled={isSubmitting}
              submitLabel={selected ? 'Spara ändringar' : 'Skapa inlägg'}
              initialValues={selected ? { title: selected.title, content: selected.content } : undefined}
              onSubmit={selected ? handleUpdate : handleCreate}
              onCancel={selected ? () => setSelectedId(null) : undefined}
            />
          </div>

          <div className="card adminPanel">
            <div className="panelHeader" style={{ marginBottom: 10 }}>
              <h2 style={{ fontFamily: 'var(--serif)', margin: 0, fontSize: '1.2rem' }}>
                Alla inlägg
              </h2>
              <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
                Klicka på ett inlägg för att redigera.
              </p>
            </div>

            {!posts && <p style={{ color: 'var(--muted)' }}>Laddar…</p>}
            {posts && posts.length === 0 && <p style={{ color: 'var(--muted)' }}>Inga inlägg ännu.</p>}

            {posts && posts.length > 0 && (
              <ul className="adminList">
                {posts.map((p) => (
                  <li
                    key={p.id}
                    className={`adminRow ${selectedId === p.id ? 'active' : ''}`}
                  >
                    <button
                      className="adminPick"
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      disabled={isSubmitting}
                    >
                      <span className="adminTitle">{p.title}</span>
                      <span className="adminMeta">
                        {'createdAt' in p && p.createdAt
                          ? new Date(p.createdAt as string).toLocaleDateString()
                          : ''}
                      </span>
                    </button>

                    <button
                      className="btn"
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      disabled={isSubmitting}
                    >
                      Ta bort
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminPostsPage;
