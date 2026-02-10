export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface BlogPostCreate {
    title: string;
    content: string;
}

export interface BlogPostUpdate {
    title: string;
    content: string;
}