export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    coverImageUrl?: string;
}

export interface BlogPostCreate {
    title: string;
    content: string;
    coverImageUrl?: string;
}

export interface BlogPostUpdate {
    title: string;
    content: string;
    coverImageUrl?: string;
}