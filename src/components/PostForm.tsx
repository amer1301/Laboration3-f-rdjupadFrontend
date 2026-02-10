import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BlogPost } from '../types/blog.types';

const schema = z.object({
  title: z.string().min(1, 'Titel är obligatorisk').max(120, 'Max 120 tecken'),
  content: z.string().min(1, 'Innehåll är obligatorisk').max(5000, 'Max 5000 tecken'),
});

export type PostFormValues = z.infer<typeof schema>;

interface PostFormProps {
  initial?: Pick<BlogPost, 'title' | 'content'>;
  submitText: string;
  isSubmitting?: boolean;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
}

const PostForm = ({ initial, submitText, isSubmitting, onSubmit }: PostFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title ?? '',
      content: initial?.content ?? '',
    },
  });

  useEffect(() => {
    reset({
      title: initial?.title ?? '',
      content: initial?.content ?? '',
    });
  }, [initial, reset]);

  return (
    <form onSubmit={handleSubmit(async (v) => onSubmit(v))}>
      <div className="form-group">
        <label htmlFor="title">Titel</label>
        <input id="title" type="text" {...register('title')} />
        {errors.title && <p className="error-message">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="content">Innehåll</label>
        <textarea id="content" rows={10} {...register('content')} />
        {errors.content && <p className="error-message">{errors.content.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {submitText}
      </button>
    </form>
  );
};

export default PostForm;
