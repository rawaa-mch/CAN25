import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Trophy, Camera, Loader2, Check,
    ChevronRight, Sparkles, Star, Shield
} from "lucide-react";
import { toast } from "sonner";
import { FALLBACK_TEAMS } from "@/data/fallbackData";
import { isSupabaseConfigured } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";


export default function ProfileSetup() {
    const { t } = useTranslation();
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [favoriteTeam, setFavoriteTeam] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        } else if (user.user_metadata) {
            setFullName(user.user_metadata.full_name || "");
            setFavoriteTeam(user.user_metadata.favorite_team || "");
            setPreviewUrl(user.user_metadata.avatar_url || null);
        }
    }, [user, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image too large (max 2MB)");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
                setAvatarUrl(reader.result as string); // Using base64 for now to avoid storage complexity
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await updateProfile({
                full_name: fullName,
                avatar_url: avatarUrl || undefined,
                favorite_team: favoriteTeam
            });

            if (error) throw error;

            toast.success(t('auth.security_note'), { // Using security note as success for now or translation
                icon: <Sparkles className="w-4 h-4 text-saffron" />
            });
            navigate("/");
        } catch (err: any) {
            toast.error("Error updating profile: " + err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-royal overflow-hidden relative flex items-center justify-center p-4 py-20">
            {/* Background Ornaments from Auth page */}
            <div className="absolute inset-0 zellige-grid opacity-[0.1] animate-float pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-96 h-96 moorish-arch bg-gradient-to-br from-saffron/10 to-transparent -rotate-45" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 star-8-clip bg-gradient-to-tl from-star-red/10 to-transparent rotate-45" />

            <div className="w-full max-w-xl relative z-10 transition-all duration-700 animate-in fade-in zoom-in-95">
                <div className="glass-zellige rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl border border-white/20">

                    <div className="text-center mb-10">
                        <h1 className="font-royal text-4xl text-royal-emerald mb-4 uppercase tracking-tighter">
                            {t('profile_setup.title')} <span className="text-star-red">{t('profile_setup.subtitle')}</span>
                        </h1>
                        <p className="text-royal-emerald/60 font-black uppercase tracking-[0.2em] text-[10px] bg-white/10 px-4 py-1.5 rounded-full inline-block">
                            {t('profile_setup.welcome')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Avatar Selection */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-saffron via-star-red to-royal-emerald blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                                <Avatar className="w-32 h-32 border-4 border-white/30 shadow-2xl relative ring-4 ring-royal-emerald/5">
                                    <AvatarImage src={previewUrl || ""} className="object-cover" />
                                    <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-royal-emerald font-royal text-3xl">
                                        {fullName.charAt(0) || <Trophy className="w-10 h-10 opacity-20" />}
                                    </AvatarFallback>
                                </Avatar>
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute bottom-0 right-0 p-3 bg-saffron text-royal-emerald rounded-2xl shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white"
                                >
                                    <Camera className="w-5 h-5" />
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            <p className="text-[10px] font-black text-royal-emerald/40 uppercase tracking-widest">
                                {t('chat.media')}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label className="font-royal text-royal-emerald/80 uppercase tracking-widest text-[10px] ml-2 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-saffron rounded-full" />
                                    {t('profile_setup.label_name')}
                                </Label>
                                <Input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder={t('profile_setup.placeholder_name')}
                                    required
                                    className="h-14 bg-white/40 border-royal-emerald/10 rounded-2xl font-royal text-royal-emerald focus:ring-2 focus:ring-saffron/30 transition-all placeholder:text-royal-emerald/20 text-lg px-6 shadow-inner"
                                />
                            </div>

                            {/* Favorite Team */}
                            <div className="space-y-2">
                                <Label className="font-royal text-royal-emerald/80 uppercase tracking-widest text-[10px] ml-2 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-saffron rounded-full" />
                                    {t('profile_setup.label_team')}
                                </Label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                    {FALLBACK_TEAMS.map((team) => (
                                        <button
                                            key={team.id}
                                            type="button"
                                            onClick={() => setFavoriteTeam(team.name)}
                                            className={`relative p-3 rounded-2xl border transition-all duration-300 group flex flex-col items-center gap-2 ${favoriteTeam === team.name
                                                ? 'bg-royal-emerald border-saffron shadow-lg scale-105'
                                                : 'bg-white/40 border-royal-emerald/5 hover:border-royal-emerald/20 hover:bg-white/60'
                                                }`}
                                        >
                                            <img src={team.flag_url} alt={team.name} className="w-8 h-6 object-cover rounded-sm shadow-sm" />
                                            <span className={`text-[9px] font-black uppercase tracking-tighter text-center line-clamp-1 ${favoriteTeam === team.name ? 'text-white' : 'text-royal-emerald/70'
                                                }`}>
                                                {team.name}
                                            </span>
                                            {favoriteTeam === team.name && (
                                                <div className="absolute -top-1 -right-1 bg-saffron text-royal-emerald rounded-full p-0.5 shadow-sm">
                                                    <Check className="w-2.5 h-2.5" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !fullName || !favoriteTeam}
                            className="btn-royal w-full h-16 text-md mt-6 shadow-2xl shadow-royal-emerald/30 group relative overflow-hidden flex items-center justify-center gap-3 rounded-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    {t('profile_setup.btn_join')}
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-[9px] text-royal-emerald/30 mt-8 text-center font-medium uppercase tracking-[0.3em]">
                        {t('auth.security_note')}
                    </p>
                </div>
            </div>
        </div>
    );
}
