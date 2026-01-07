import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare, Send, Heart, ThumbsDown,
  Trash2, Edit2, ImageIcon, Users,
  Calendar, Plus, Globe, ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { formatDistanceToNow } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";

interface Comment {
  id: string;
  content: string;
  user_name: string;
  user_id: string | null;
  created_at: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  user_name: string;
  user_id: string | null;
  likes: number;
  dislikes: number;
  created_at: string;
  chat_comments: Comment[];
}

import { FALLBACK_POSTS } from "@/data/fallbackData";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
import { translateText } from "@/services/translationService"; // Import translation service

const Chat = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [localUserName, setLocalUserName] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Fetch user reactions
  const { data: userReactions = { likes: [], dislikes: [] } } = useQuery({
    queryKey: ["user_reactions", user?.id],
    queryFn: async () => {
      if (!user || !isSupabaseConfigured) return { likes: [], dislikes: [] };

      const [likesResponse, dislikesResponse] = await Promise.all([
        supabase.from("chat_likes").select("post_id").eq("user_id", user.id),
        supabase.from("chat_dislikes").select("post_id").eq("user_id", user.id)
      ]);

      return {
        likes: likesResponse.data?.map(l => l.post_id) || [],
        dislikes: dislikesResponse.data?.map(d => d.post_id) || []
      };
    },
    enabled: !!user && isSupabaseConfigured,
  });

  const [localReactions, setLocalReactions] = useState<Record<string, 'like' | 'dislike' | null>>({});

  // Merge server and local reactions for display
  const getReaction = (postId: string) => {
    if (localReactions[postId] !== undefined) return localReactions[postId];
    if (userReactions.likes.includes(postId)) return 'like';
    if (userReactions.dislikes.includes(postId)) return 'dislike';
    return null;
  };
  const [localPosts, setLocalPosts] = useState<Post[]>(() => {
    // Load posts from localStorage on initial render
    const saved = localStorage.getItem('chat_local_posts');
    return saved ? JSON.parse(saved) : [];
  });

  // State to track translations
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState<Record<string, boolean>>({});

  const handleTranslate = async (id: string, text: string, lang: 'fr' | 'ar') => {
    if (translatedContent[id]) {
      // If already translated, allow re-translating if different, or we can add logic later.
      // For now, simple override.
    }

    setIsTranslating(prev => ({ ...prev, [id]: true }));
    try {
      const translated = await translateText(text, lang);
      setTranslatedContent(prev => ({ ...prev, [id]: translated }));
    } catch (error) {
      toast.error("Translation failed");
    } finally {
      setIsTranslating(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleRevert = (id: string) => {
    const newTranslations = { ...translatedContent };
    delete newTranslations[id];
    setTranslatedContent(newTranslations);
  };

  const dateLocale = i18n.language === 'fr' ? fr : enUS;

  // Save local posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chat_local_posts', JSON.stringify(localPosts));
  }, [localPosts]);

  const reactionMutation = useMutation({
    mutationFn: async ({ postId, type }: { postId: string, type: 'like' | 'dislike' }) => {
      if (!isSupabaseConfigured || !user) {
        // Fallback for demo/unauth
        setLocalReactions(prev => {
          const current = prev[postId];
          if (current === type) return { ...prev, [postId]: null };
          return { ...prev, [postId]: type };
        });

        // Also update the local post count simulation
        setLocalPosts(prev => prev.map(p => {
          if (p.id === postId) {
            let likes = p.likes;
            let dislikes = p.dislikes;
            const currentReaction = localReactions[postId];

            // Remove previous reaction effect
            if (currentReaction === 'like') likes--;
            if (currentReaction === 'dislike') dislikes--;

            // Add new reaction effect (if not toggling off)
            const isTogglingOff = currentReaction === type;
            if (!isTogglingOff) {
              if (type === 'like') likes++;
              if (type === 'dislike') dislikes++;
            }
            return { ...p, likes, dislikes };
          }
          return p;
        }));
        return;
      }

      const currentReaction = getReaction(postId);
      const isRemoving = currentReaction === type;

      // 1. Remove existing reaction if any
      if (currentReaction === 'like') {
        await supabase.from("chat_likes").delete().eq("post_id", postId).eq("user_id", user.id);
      } else if (currentReaction === 'dislike') {
        await supabase.from("chat_dislikes").delete().eq("post_id", postId).eq("user_id", user.id);
      }

      // 2. Add new reaction if not just removing
      if (!isRemoving) {
        if (type === 'like') {
          await supabase.from("chat_likes").insert({ post_id: postId, user_id: user.id, user_name: activeUserName });
        } else {
          await supabase.from("chat_dislikes").insert({ post_id: postId, user_id: user.id, user_name: activeUserName });
        }
      }
    },
    onMutate: async ({ postId, type }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ["user_reactions", user?.id] });
      await queryClient.cancelQueries({ queryKey: ["chat_posts"] });

      const previousReactions = queryClient.getQueryData(["user_reactions", user?.id]);
      const currentReaction = getReaction(postId);

      // Update UI state immediately
      setLocalReactions(prev => {
        if (currentReaction === type) return { ...prev, [postId]: null };
        return { ...prev, [postId]: type };
      });

      return { previousReactions };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_reactions"] });
      queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
    },
    onError: (err, newTodo, context: any) => {
      toast.error("Failed to update reaction");
      if (context?.previousReactions) {
        // We can't easily revert the complex merged state, but invalidating will fix it
      }
    }
  });

  const handleReaction = (postId: string, type: 'like' | 'dislike') => {
    if (!user && isSupabaseConfigured) {
      toast.error(t('auth.login_required') || "Please login to react");
      return;
    }
    reactionMutation.mutate({ postId, type });
  };

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data } = await supabase.from("profiles").select("full_name").eq("user_id", user.id).single();
        if (data) setProfile(data);
      };
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    let storedName = localStorage.getItem("chat_user_name");
    if (!storedName) {
      storedName = "Football Fan " + Math.floor(Math.random() * 1000);
      localStorage.setItem("chat_user_name", storedName);
    }
    setLocalUserName(storedName);
  }, []);

  // Subscribe to real-time changes
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel('public:chat_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_posts' },
        () => {
          queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_comments' },
        () => {
          queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_likes' },
        () => {
          queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
          queryClient.invalidateQueries({ queryKey: ["user_reactions"] });
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_dislikes' },
        () => {
          queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
          queryClient.invalidateQueries({ queryKey: ["user_reactions"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const activeUserName = user ? (profile?.full_name || user.email?.split('@')[0] || "Anonymous") : localUserName;

  // Fetch posts
  const { data: posts, isLoading, error: queryError } = useQuery({
    queryKey: ["chat_posts"],
    queryFn: async () => {
      if (!isSupabaseConfigured) return [];
      const { data, error } = await supabase
        .from("chat_posts")
        .select("*, chat_comments(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map((post: any) => ({
        ...post,
        chat_comments: (post.chat_comments || []).sort((a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      })) as Post[];
    },
    retry: 1,
  });

  const displayPosts = queryError || (!isLoading && (!posts || posts.length === 0))
    ? [...localPosts, ...FALLBACK_POSTS]
    : [...localPosts, ...(posts || [])];

  // Mutations
  const shareMutation = useMutation({
    mutationFn: async () => {
      if (!isSupabaseConfigured) {
        // Demo mode: just add to local state
        if (editingId) {
          setLocalPosts(prev => prev.map(p => p.id === editingId ? { ...p, title, content, image_url: image } : p));
        } else {
          const newPost: Post = {
            id: 'local-' + Date.now(),
            title,
            content,
            image_url: image || undefined,
            user_name: activeUserName,
            user_id: user?.id || null,
            likes: 0,
            dislikes: 0,
            created_at: new Date().toISOString(),
            chat_comments: []
          };
          setLocalPosts(prev => [newPost, ...prev]);
        }
        return;
      }

      if (editingId) {
        const { error } = await supabase.from("chat_posts")
          .update({ title, content, image_url: image, updated_at: new Date().toISOString() })
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("chat_posts").insert({
          title,
          content,
          image_url: image,
          user_name: activeUserName,
          user_id: user?.id || null
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      if (isSupabaseConfigured) {
        queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
      }
      const isDemo = !isSupabaseConfigured;
      setTitle("");
      setContent("");
      setImage(null);
      setEditingId(null);
      setIsFormOpen(false);
      toast.success(
        editingId
          ? (isDemo ? "Post edited locally (Demo Mode)" : "Post edited successfully!")
          : (isDemo ? "Post published locally (Demo Mode)" : "Post published successfully!")
      );
    },
    onError: (err: any) => toast.error("Error: " + (err.message || "Something went wrong.")),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!isSupabaseConfigured || id.startsWith('local-')) {
        setLocalPosts(prev => prev.filter(p => p.id !== id));
        return;
      }
      const { error } = await supabase.from("chat_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, id) => {
      if (isSupabaseConfigured && !id.startsWith('local-')) {
        queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
      }
      toast.success("Post deleted");
    },
    onError: (err: any) => toast.error("Error: " + err.message),
  });


  const commentMutation = useMutation({
    mutationFn: async ({ postId, text }: { postId: string, text: string }) => {
      if (!isSupabaseConfigured || postId.startsWith('local-')) {
        setLocalPosts(prev => prev.map(p => {
          if (p.id === postId) {
            const newComment: Comment = {
              id: 'local-c-' + Date.now(),
              content: text,
              user_name: activeUserName,
              user_id: null,
              created_at: new Date().toISOString()
            };
            return { ...p, chat_comments: [...p.chat_comments, newComment] };
          }
          return p;
        }));
        return;
      }
      const { error } = await supabase.from("chat_comments").insert({
        post_id: postId,
        content: text,
        user_name: activeUserName,
        user_id: user?.id || null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      if (isSupabaseConfigured) {
        queryClient.invalidateQueries({ queryKey: ["chat_posts"] });
      }
      toast.success("Comment added!");
    },
    onError: (err: any) => toast.error("Error: " + err.message),
  });


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image too large (max 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setImage(post.image_url || null);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] selection:bg-royal-emerald selection:text-white">
      <Header />

      <main className="container mx-auto px-4 pt-32 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-royal-emerald" />
                {t('chat.forum')}
              </h1>
              <p className="text-slate-500 font-medium mt-1">
                {t('chat.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-600">
                <Users className="w-4 h-4" />
                1,240 {t('common.online')}
              </div>
              <Button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className={`h-11 px-6 rounded-lg font-bold transition-all ${isFormOpen
                  ? 'bg-blue-200 text-blue-700 hover:bg-blue-300 shadow-sm'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md ring-1 ring-blue-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600'
                  }`}
              >
                {isFormOpen ? t('chat.cancel') : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    {t('chat.new_topic')}
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Feed */}
            <div className="lg:col-span-8 space-y-6">
              {isFormOpen && (
                <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white animate-in slide-in-from-top-2 duration-300">
                  <CardContent className="p-6">
                    <form
                      onSubmit={(e) => { e.preventDefault(); shareMutation.mutate(); }}
                      className="space-y-4"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10 border border-slate-100 shrink-0">
                          <AvatarFallback className="bg-slate-100 text-slate-600 font-bold uppercase">{activeUserName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <Input
                            placeholder={t('chat.placeholder_title')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-11 border-slate-200 focus:border-royal-emerald focus:ring-1 focus:ring-royal-emerald rounded-lg font-bold text-slate-900"
                          />
                          <Textarea
                            placeholder={t('chat.placeholder_content')}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[120px] border-slate-200 focus:border-royal-emerald focus:ring-1 focus:ring-royal-emerald rounded-lg font-medium text-slate-600 resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="post-image-upload"
                          />
                          <label
                            htmlFor="post-image-upload"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer transition-all font-bold text-xs"
                          >
                            <ImageIcon className="w-4 h-4" />
                            {t('chat.media')}
                          </label>
                        </div>
                        <Button
                          disabled={shareMutation.isPending || !title.trim() || !content.trim()}
                          className="h-10 px-6 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-bold shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                        >
                          {shareMutation.isPending ? t('chat.publishing') : (editingId ? t('common.save') : t('chat.publish'))}
                        </Button>
                      </div>

                      {image && (
                        <div className="relative mt-2 rounded-lg overflow-hidden border border-slate-100 group">
                          <img src={image} alt="Preview" className="w-full h-32 object-cover" />
                          <button
                            type="button"
                            onClick={() => setImage(null)}
                            className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Posts */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-40 bg-white border border-slate-200 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : displayPosts?.length === 0 ? (
                  <div className="text-center py-20 bg-white border border-slate-200 rounded-xl">
                    <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800">{t('chat.no_topics')}</h3>
                    <p className="text-slate-500 text-sm mt-1">{t('chat.be_the_first')}</p>
                  </div>
                ) : (
                  displayPosts?.map((post) => (
                    <Card key={post.id} className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white hover:border-royal-emerald/30 transition-all duration-300">
                      <div className="p-5">
                        {/* Post Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-slate-100 shrink-0">
                              <AvatarFallback className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
                                {post.user_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">{post.user_name}</span>
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                                  <Calendar className="w-3 h-3" />
                                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: dateLocale })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Show edit/delete for: 1) authenticated user's posts, 2) local posts created by current local user */}
                          {((user?.id && user.id === post.user_id) ||
                            (!user?.id && !post.user_id && post.user_name === activeUserName) ||
                            (post.id.startsWith('local-') && post.user_name === activeUserName)) && (
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(post)} className="h-8 w-8 rounded-md hover:bg-slate-100 text-slate-400">
                                  <Edit2 className="w-3.5 h-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(post.id)} className="h-8 w-8 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            )}
                        </div>

                        {/* Post Body */}
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                              {translatedContent[`title-${post.id}`] || post.title}
                            </h3>
                            <p className="text-slate-600 font-medium text-sm leading-relaxed line-clamp-3 mb-4">
                              {translatedContent[`content-${post.id}`] || post.content}
                            </p>
                            <div className="flex gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-7 px-2 text-slate-400 hover:text-royal-emerald"
                                    disabled={isTranslating[`title-${post.id}`]}
                                  >
                                    <Globe className="w-3 h-3 mr-1" />
                                    {isTranslating[`title-${post.id}`] ? "..." : (translatedContent[`title-${post.id}`] ? "Traduire" : "Traduire")}
                                    <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuItem onClick={() => {
                                    handleTranslate(`title-${post.id}`, post.title, 'fr');
                                    handleTranslate(`content-${post.id}`, post.content, 'fr');
                                  }}>
                                    Français
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    handleTranslate(`title-${post.id}`, post.title, 'ar');
                                    handleTranslate(`content-${post.id}`, post.content, 'ar');
                                  }}>
                                    العربية (Arabe)
                                  </DropdownMenuItem>
                                  {translatedContent[`title-${post.id}`] && (
                                    <DropdownMenuItem onClick={() => {
                                      handleRevert(`title-${post.id}`);
                                      handleRevert(`content-${post.id}`);
                                    }}>
                                      Voir l'original
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          {post.image_url && (
                            <div className="w-full md:w-32 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-100">
                              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        {/* Reactions */}
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                          <button
                            onClick={() => handleReaction(post.id, 'like')}
                            className={`flex items-center gap-1.5 text-xs font-bold transition-colors
                              ${getReaction(post.id) === 'like' ? 'text-royal-emerald bg-royal-emerald/10' : 'text-slate-400 hover:text-royal-emerald hover:bg-slate-50'}
                              rounded-md px-2 py-1`}
                          >
                            <Heart className={`w-4 h-4 ${getReaction(post.id) === 'like' ? 'fill-current' : ''}`} />
                            {post.likes}
                          </button>

                          <button
                            onClick={() => handleReaction(post.id, 'dislike')}
                            className={`flex items-center gap-1.5 text-xs font-bold transition-colors
                              ${getReaction(post.id) === 'dislike' ? 'text-red-500 bg-red-500/10' : 'text-slate-400 hover:text-red-500 hover:bg-slate-50'}
                              rounded-md px-2 py-1`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                            {post.dislikes}
                          </button>

                          <button
                            onClick={() => {
                              const commentSection = document.getElementById(`comments-${post.id}`);
                              if (commentSection) {
                                commentSection.classList.toggle('hidden');
                              }
                            }}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-md px-2 py-1 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                            {post.chat_comments?.length || 0}
                          </button>
                        </div>

                        {/* Comments Section */}
                        <div id={`comments-${post.id}`} className="hidden mt-4 pt-4 border-t border-slate-100 space-y-3">
                          {/* Existing Comments */}
                          {post.chat_comments && post.chat_comments.length > 0 && (
                            <div className="space-y-2 mb-3">
                              {post.chat_comments.map((comment) => (
                                <div key={comment.id} className="flex gap-2 bg-slate-50 rounded-lg p-3">
                                  <Avatar className="h-7 w-7 border border-slate-200 shrink-0">
                                    <AvatarFallback className="bg-white text-slate-600 font-bold text-xs uppercase">
                                      {comment.user_name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-bold text-slate-900 text-xs">{comment.user_name}</span>
                                      <span className="text-[9px] text-slate-400 font-bold uppercase">
                                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: dateLocale })}
                                      </span>
                                    </div>
                                    <p className="text-sm text-slate-600 font-medium break-words">
                                      {translatedContent[`comment-${comment.id}`] || comment.content}
                                    </p>
                                    <div className="flex gap-2">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <button
                                            className="text-[10px] text-slate-400 hover:text-royal-emerald font-bold mt-1 flex items-center gap-1"
                                            disabled={isTranslating[`comment-${comment.id}`]}
                                          >
                                            <Globe className="w-3 h-3" />
                                            {isTranslating[`comment-${comment.id}`] ? "..." : "Traduire"}
                                          </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                          <DropdownMenuItem onClick={() => handleTranslate(`comment-${comment.id}`, comment.content, 'fr')}>
                                            Français
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => handleTranslate(`comment-${comment.id}`, comment.content, 'ar')}>
                                            العربية (Arabe)
                                          </DropdownMenuItem>
                                          {translatedContent[`comment-${comment.id}`] && (
                                            <DropdownMenuItem onClick={() => handleRevert(`comment-${comment.id}`)}>
                                              Voir l'original
                                            </DropdownMenuItem>
                                          )}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Comment Form */}
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const input = e.currentTarget.elements.namedItem('comment-input') as HTMLInputElement;
                              if (input.value.trim()) {
                                commentMutation.mutate({ postId: post.id, text: input.value });
                                input.value = '';
                              }
                            }}
                            className="flex gap-2"
                          >
                            <Avatar className="h-7 w-7 border border-slate-200 shrink-0">
                              <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xs uppercase">
                                {activeUserName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex gap-2">
                              <Input
                                name="comment-input"
                                placeholder={t('chat.add_comment')}
                                className="h-9 border-slate-200 focus:border-royal-emerald focus:ring-1 focus:ring-royal-emerald rounded-lg text-sm"
                              />
                              <Button
                                type="submit"
                                size="sm"
                                className="h-9 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-bold shadow-sm"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </form>
                        </div>

                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
                <div className="bg-slate-900 p-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-slate-800">
                    <AvatarFallback className="bg-royal-emerald text-white font-bold">{activeUserName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-white">{activeUserName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('common.online')}</p>
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 font-bold uppercase tracking-tighter">{t('chat.my_posts')}</span>
                    <span className="font-bold text-slate-900">{displayPosts?.filter(p => p.user_id === user?.id).length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 font-bold uppercase tracking-tighter">{t('chat.score_impact')}</span>
                    <span className="font-bold text-royal-emerald">
                      {(displayPosts?.filter(p => p.user_id === user?.id).reduce((acc, p) => acc + (p.likes || 0), 0) || 0) * 10} pts
                    </span>
                  </div>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
