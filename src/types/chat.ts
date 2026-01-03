
import { Database } from "@/integrations/supabase/types";

export type Post = Database["public"]["Tables"]["chat_posts"]["Row"] & {
    chat_comments?: Comment[];
    category?: Category;
    tags?: Tag[];
    user_reaction?: 'like' | 'dislike' | null;
    category_id?: string | null;
    is_pinned?: boolean;
    view_count?: number;
    share_count?: number;
    comment_count?: number;
    user_vote?: number; // 1 | -1 | undefined
};

export type Comment = Database["public"]["Tables"]["chat_comments"]["Row"] & {
    replies?: Comment[];
    parent_comment_id?: string | null;
};

export interface Category {
    id: string;
    name: string;
    color: string;
    icon: string;
    description?: string;
}

export interface Tag {
    id: string;
    name: string;
    usage_count: number;
}
