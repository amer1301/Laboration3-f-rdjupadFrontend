import { useEffect, useState } from 'react';

export type PostFormValues = {
  title: string;
  content: string;
  coverImageUrl?: string;
};

type Props = {
  initialValues?: Partial<PostFormValues>;
  submitLabel: string;
  disabled?: boolean;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

const PostForm = ({
  initialValues,
  submitLabel,
  disabled,
  onSubmit,
  onCancel,
}: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Uppdatera formuläret när man väljer ett annat inlägg i admin
  useEffect(() => {
    setTitle(initialValues?.title ?? '');
    setContent(initialValues?.content ?? '');
    setCoverImageUrl(initialValues?.coverImageUrl ?? '');
  }, [
    initialValues?.title,
    initialValues?.content,
    initialValues?.coverImageUrl,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (title.trim().length < 3) {
      return setError('Titeln måste vara minst 3 tecken.');
    }

    if (content.trim().length < 20) {
      return setError('Innehållet måste vara minst 20 tecken.');
    }

    await onSubmit({
      title: title.trim(),
      content: content.trim(),
      coverImageUrl: coverImageUrl.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error" style={{ marginBottom: 12 }}>
          {error}
        </div>
      )}

      {/* Titel */}
      <div className="formRow">
        <label htmlFor="title">Titel</label>
        <input
          id="title"
          className="input"
          value={title}
          disabled={disabled}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Skriv en titel..."
        />
      </div>

      {/* Bild-URL */}
      <div className="formRow">
        <label htmlFor="cover">Bild-URL (valfritt)</label>
        <input
          id="cover"
          className="input"
          value={coverImageUrl}
          disabled={disabled}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://..."
        />

        {/* Live preview av bilden */}
        {coverImageUrl && (
          <div
            style={{
              marginTop: 10,
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}
          >
            <img
              src={coverImageUrl}
              alt="Förhandsvisning"
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Innehåll */}
      <div className="formRow">
        <label htmlFor="content">Innehåll</label>
        <textarea
          id="content"
          className="input"
          value={content}
          disabled={disabled}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Skriv ditt blogginlägg här..."
        />
      </div>

      <div className="formActions">
        <button className="btn btnPrimary" disabled={disabled} type="submit">
          {submitLabel}
        </button>

        {onCancel && (
          <button
            className="btn"
            disabled={disabled}
            type="button"
            onClick={onCancel}
          >
            Avbryt
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
