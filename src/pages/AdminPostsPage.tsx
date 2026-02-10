import { useEffect, useMemo, useState } from "react";
import { postsApi } from "../api/postsApi";
import type { BlogPost } from "../types/blog.types";
import PostForm from "../components/PostForm";
import type { PostFormValues } from "../components/PostForm";


const AdminPostsPage = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uiError, setUiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selected = useMemo(() => posts?.find((p) => p.id === selectedId) ?? null, [posts, selectedId]);

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
    try {
      await postsApi.create(values);
      await refresh();
    } catch {
      setUiError('Kunde inte skapa inlägg (är du inloggad?).');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (values: PostFormValues) => {
    if (!selected) return;
    setIsSubmitting(true);
    setUiError(null);
    try {
      await postsApi.update(selected.id, values);
      await refresh();
    } catch {
      setUiError('Kunde inte uppdatera inlägg.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = confirm('Vill du verkligen ta bort inlägget?');
    if (!ok) return;
    setUiError(null);
    try {
      await postsApi.remove(id);
      setSelectedId(null);
      await refresh();
    } catch {
      setUiError('Kunde inte ta bort inlägg.');
    }
  };

  return (
    <div>
      <h1>Admin • Blogginlägg</h1>
      <p className="muted">Här kan du skapa, uppdatera och ta bort inlägg.</p>

      {uiError && <p className="error-message">{uiError}</p>}

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 2fr' }}>
        <section>
          <h2>Inlägg</h2>

          {!posts && <p>Laddar...</p>}

          {posts && posts.length === 0 && <p>Inga inlägg ännu.</p>}

          {posts && posts.length > 0 && (
            <ul>
              {posts.map((p) => (
                <li key={p.id} style={{ marginBottom: 12 }}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    style={{ fontWeight: p.id === selectedId ? 700 : 400 }}
                  >
                    {p.title}
                  </button>
                  <div className="muted">{new Date(p.createdAt).toLocaleString()}</div>
                  <button type="button" onClick={() => handleDelete(p.id)}>
                    Ta bort
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button type="button" onClick={() => setSelectedId(null)}>
            + Nytt inlägg
          </button>
        </section>

        <section>
          {selected ? (
            <>
              <h2>Redigera</h2>
              <PostForm
                initial={{ title: selected.title, content: selected.content }}
                submitText={isSubmitting ? 'Sparar...' : 'Spara ändringar'}
                isSubmitting={isSubmitting}
                onSubmit={handleUpdate}
              />
            </>
          ) : (
            <>
              <h2>Skapa nytt</h2>
              <PostForm
                submitText={isSubmitting ? 'Skapar...' : 'Skapa inlägg'}
                isSubmitting={isSubmitting}
                onSubmit={handleCreate}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPostsPage;
