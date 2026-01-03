import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, Star, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
    userName?: string;
    userPostCount?: number;
    userImpactScore?: number;
}

export const ChatSidebar = ({ userName = "Invité", userPostCount = 0, userImpactScore = 0 }: ChatSidebarProps) => {
    return (
        <div className="space-y-6">
            <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden bg-white group">
                <div className="bg-gradient-royal p-8 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute top-2 right-2 opacity-20">
                        <Star className="w-12 h-12 text-saffron fill-saffron" />
                    </div>
                    <div className="flex flex-col items-center text-center gap-4 relative z-10">
                        <Avatar className="h-20 w-20 border-4 border-white/20 shadow-2xl">
                            <AvatarFallback className="bg-saffron text-slate-900 font-black text-2xl">{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-xl font-royal text-white tracking-wide">{userName}</p>
                            <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em] mt-1 flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                Expert Analyste
                            </p>
                        </div>
                    </div>
                </div>
                <CardContent className="p-6 grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Posts</span>
                        <span className="font-black text-slate-800 text-lg">{userPostCount}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-royal-emerald/5 rounded-2xl border border-royal-emerald/10">
                        <span className="text-[10px] text-royal-emerald/60 font-black uppercase tracking-widest mb-1">Impact</span>
                        <span className="font-black text-royal-emerald text-lg">{userImpactScore}</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-[2rem] p-8 relative overflow-hidden group bg-slate-900">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-royal-emerald/20 rounded-full blur-3xl group-hover:bg-royal-emerald/30 transition-colors" />
                <h3 className="text-sm font-black text-white mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                    <div className="p-2 bg-royal-emerald/20 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-royal-emerald" />
                    </div>
                    Sujets Brûlants
                </h3>
                <div className="space-y-6">
                    {[
                        { tag: '#CAN2025', count: '1.2k posts', trend: 'up' },
                        { tag: '#MarocQualif', count: '850 posts', trend: 'up' },
                        { tag: '#LionsIndomptables', count: '640 posts', trend: 'neutral' },
                        { tag: '#TactiqueCAN', count: '420 posts', trend: 'up' }
                    ].map((item, i) => (
                        <div key={i} className="group/item cursor-pointer flex items-center justify-between">
                            <div>
                                <p className="font-bold text-base text-slate-200 group-hover/item:text-royal-emerald transition-colors">{item.tag}</p>
                                <p className="text-[10px] text-slate-500 font-black uppercase mt-1 tracking-widest">{item.count}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover/item:text-royal-emerald group-hover/item:translate-x-1 transition-all" />
                        </div>
                    ))}
                </div>
                <Button variant="outline" className="w-full mt-8 border-slate-700 bg-transparent text-white font-black text-[10px] uppercase tracking-widest h-12 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all">
                    Explorer les Tendances
                </Button>
            </Card>

            <div className="p-6 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-5">
                    <ShieldCheck className="w-12 h-12 text-royal-emerald" />
                </div>
                <h4 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-[0.2em] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-royal-emerald rounded-full" />
                    Charte de la Communauté
                </h4>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                    Privilégiez l'expertise technique. Les débats passionnés sont le cœur du football, restez élégants dans l'analyse.
                </p>
            </div>
        </div>
    );
};
