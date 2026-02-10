import { http } from "./http";
import type { BlogPost, BlogPostCreate, BlogPostUpdate } from "../types/blog.types";

export const postsApi = {
    async list(): Promise<BlogPost[]> {
        const res = await http.get<BlogPost[]>('/posts');
        return res.data;
    },

    async get(id: string): Promise<BlogPost> {
        const res = await http.get<BlogPost>(`/posts/${id}`);
        return res.data;
    },

    async create(payload: BlogPostCreate): Promise<BlogPost> {
        const res = await http.post<BlogPost>('/posts', payload);
        return res.data;
    },

    async update(id: string, payload: BlogPostUpdate): Promise<BlogPost> {
        const res = await http.put<BlogPost>(`/posts/${id}`, payload);
        return res.data;
    },

    async remove(id: string): Promise<void> {
        await http.delete(`/posts/${id}`);
    },
};