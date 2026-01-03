
import { Post } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
    MessageSquare, Heart, ThumbsDown, Edit2, Trash2, Calendar,
    Share2, MoreVertical, Flag, Eye
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { CommentSection } from "./CommentSection";

interface PostCardProps {
    post: Post;
    currentUserInitial?: string;
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
    onEdit?: (post: Post) => void;
    onDelete?: (id: string) => void;
    onAddComment: (postId: string, text: string) => void;
}

export const PostCard = ({
    post,
    currentUserInitial = "U",
    onLike,
    onDislike,
    onEdit,
    onDelete,
    onAddComment,
}: PostCardProps) => {
    const { user } = useAuth();
    const isOwner = user?.id === post.user_id;
    const [showComments, setShowComments] = useState(false);

    return (
        <Card className="glass-card border-slate-100/50 rounded-[2rem] overflow-hidden mb-8 group relative transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            {/* Subtle Moroccan Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-royal-emerald via-saffron to-star-red opacity-80" />
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-slate-100 ring-2 ring-white shadow-sm shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                            <AvatarFallback className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-600 font-bold text-sm">
                                {post.user_name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 text-sm hover:text-royal-emerald transition-colors cursor-pointer tracking-tight">
                                    {post.user_name}
                                </span>
                                {post.is_pinned && (
                                    <span className="bg-royal-emerald/10 text-royal-emerald text-[9px] font-bold px-1.5 py-0.5 rounded border border-royal-emerald/20 uppercase tracking-wider">
                                        Épinglé
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: fr })}
                                </span>
                                {post.view_count !== undefined && post.view_count > 0 && (
                                    <>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {post.view_count}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 animate-in fade-in-0 zoom-in-95 duration-200">
                            {isOwner ? (
                                <>
                                    <DropdownMenuItem onClick={() => onEdit?.(post)} className="text-xs font-bold cursor-pointer">
                                        <Edit2 className="w-3.5 h-3.5 mr-2" />
                                        Modifier
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onDelete?.(post.id)} className="text-xs font-bold text-red-600 focus:text-red-700 cursor-pointer">
                                        <Trash2 className="w-3.5 h-3.5 mr-2" />
                                        Supprimer
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <DropdownMenuItem className="text-xs font-bold cursor-pointer">
                                    <Flag className="w-3.5 h-3.5 mr-2" />
                                    Signaler
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-xs font-bold cursor-pointer">
                                <Share2 className="w-3.5 h-3.5 mr-2" />
                                Partager
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex flex-col md:flex-row gap-8 cursor-pointer" onClick={() => setShowComments(!showComments)}>
                    <div className="flex-1 space-y-4">
                        <h3 className="text-xl md:text-2xl font-royal text-slate-900 leading-tight group-hover:text-royal-emerald transition-colors duration-300">
                            {post.title}
                        </h3>
                        {/* Use whitespace-pre-wrap to preserve newlines */}
                        <p className="text-slate-600 text-base leading-relaxed line-clamp-4 whitespace-pre-wrap font-medium">
                            {post.content}
                        </p>
                    </div>
                    {post.image_url && (
                        <div className="w-full md:w-48 h-36 shrink-0 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 pt-4 mt-4 border-t border-slate-50">
                    <button
                        onClick={(e) => { e.stopPropagation(); onLike(post.id); }}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-all p-1.5 rounded-md hover:bg-emerald-50 ${(post.likes > 0) ? 'text-royal-emerald' : 'text-slate-400 hover:text-royal-emerald'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${(post.likes > 0) ? 'fill-current' : ''}`} />
                        {post.likes || 0}
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onDislike(post.id); }}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-all p-1.5 rounded-md hover:bg-red-50 ${post.dislikes > 0 ? 'text-star-red' : 'text-slate-400 hover:text-star-red'
                            }`}
                    >
                        <ThumbsDown className={`w-4 h-4 ${post.dislikes > 0 ? 'fill-current' : ''}`} />
                        {post.dislikes || 0}
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-all ml-auto p-1.5 rounded-md hover:bg-slate-50 ${showComments ? 'text-royal-emerald' : 'text-slate-500 hover:text-royal-emerald'}`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        {post.chat_comments?.length || 0} Réponses
                    </button>
                </div>
            </div>

            {showComments && (
                <CommentSection
                    comments={post.chat_comments || []}
                    onAddComment={(text) => onAddComment(post.id, text)}
                    userInitial={currentUserInitial}
                />
            )}
        </Card>
    );
};
