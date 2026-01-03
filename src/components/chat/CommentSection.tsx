
import { Comment } from "@/types/chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useRelativeTime } from "@/hooks/useRelativeTime";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CommentSectionProps {
    comments: Comment[];
    onAddComment: (text: string) => void;
    userInitial?: string;
    isSubmitting?: boolean;
}

export const CommentSection = ({
    comments,
    onAddComment,
    userInitial = "U",
    isSubmitting = false
}: CommentSectionProps) => {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (text.trim()) {
            onAddComment(text);
            setText("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="bg-slate-50 p-4 border-t border-slate-100 rounded-b-xl space-y-4 animate-in slide-in-from-top-1 duration-200">
            {comments.length > 0 && (
                <div className="space-y-3">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 group">
                            <Avatar className="h-6 w-6 shrink-0 border border-slate-200">
                                <AvatarFallback className="text-[9px] font-bold bg-white text-slate-600">
                                    {comment.user_name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-white p-2.5 rounded-r-lg rounded-bl-lg border border-slate-200/60 shadow-sm text-xs group-hover:border-slate-300 transition-colors">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-slate-900">{comment.user_name}</span>
                                    {/* Component wrapper needed for hook usage if this wasn't invalid, but here we just use the hook or helper */}
                                    <span className="text-[9px] text-slate-400">
                                        <TimeDisplay date={comment.created_at} />
                                    </span>
                                </div>
                                <p className="text-slate-600 font-medium leading-relaxed">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-3">
                <Avatar className="h-7 w-7 shrink-0 border border-slate-200">
                    <AvatarFallback className="text-[10px] font-bold bg-slate-100 text-slate-500">
                        {userInitial}
                    </AvatarFallback>
                </Avatar>
                <div className="relative flex-1">
                    <Input
                        placeholder="Écrire un commentaire..."
                        className="h-9 border-slate-200 focus-visible:ring-1 focus-visible:ring-royal-emerald text-xs font-medium pl-3 pr-10 bg-white rounded-lg"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isSubmitting}
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-0 h-9 w-9 text-royal-emerald hover:bg-transparent hover:scale-110 transition-all"
                        onClick={handleSubmit}
                        disabled={!text.trim() || isSubmitting}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Helper component for time to use the hook correctly
const TimeDisplay = ({ date }: { date: string }) => {
    const time = useRelativeTime(date);
    return <>{time}</>;
};
