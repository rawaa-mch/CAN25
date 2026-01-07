import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Trophy, LogOut, User, LayoutDashboard, Menu, X, Languages, ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Get user info from metadata (works for both real Supabase and Demo Auth)
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || t('common.welcome');
  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-6 inset-x-4 z-50 flex justify-center">
      <div className="w-full max-w-7xl glass-zellige rounded-[2rem] border-white/20 shadow-2xl overflow-hidden relative group transition-all duration-700 hover:shadow-royal-emerald/10">
        {/* Animated Zellige Ornament */}
        <div className="absolute top-0 right-0 w-32 h-32 zellige-grid opacity-10 -mr-8 -mt-8 rotate-45 transition-transform duration-1000 group-hover:rotate-90" />
        <div className="absolute bottom-0 left-0 w-32 h-32 zellige-grid opacity-10 -ml-8 -mb-8 transition-transform duration-1000 group-hover:scale-110" />

        {/* Structural Arch Top Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-saffron opacity-60" />

        <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between h-20 relative z-10">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group/logo">
            <div className="relative transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-4">
              <img
                src="/logo-new.png"
                alt="CAN 2025"
                className="h-16 w-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-royal text-2xl tracking-tighter leading-none uppercase flex items-center gap-1">
                <span className="text-royal-emerald drop-shadow-sm">CAN</span><span className="text-transparent bg-clip-text bg-gradient-saffron text-glow-saffron">GOAL</span>
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-0.5 w-3 bg-gradient-passion rounded-full" />
                <p className="text-[10px] text-royal-emerald/60 font-black uppercase tracking-[0.3em] flex items-center gap-1">
                  2025 <span className="text-star-red text-[8px]">●</span> MOROCCO
                </p>
              </div>
            </div>
          </Link>

          {/* Premium Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {['matches', 'groups', 'tableau', 'chat'].map((key) => (
              <Link
                key={key}
                to={key === 'matches' ? '/' : (key === 'tableau' ? '/bracket' : `/${key.toLowerCase()}`)}
                className="text-sm font-black text-royal-emerald/70 hover:text-royal-emerald transition-all duration-300 uppercase tracking-widest relative group/nav"
              >
                {t(`nav.${key}`)}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-saffron transition-all duration-300 group-hover/nav:w-full rounded-full" />
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-sm font-black text-star-red hover:opacity-80 transition-all duration-300 uppercase tracking-widest">
                {t('nav.admin')}
              </Link>
            )}
          </nav>

          {/* Premium Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* Premium Language Switcher */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="flex items-center gap-2 p-1.5 px-3 bg-royal-emerald/5 hover:bg-royal-emerald/10 rounded-full border border-royal-emerald/5 transition-all group/lang">
                    <Languages className="w-4 h-4 text-royal-emerald/60 group-hover/lang:text-royal-emerald transition-colors" />
                    <span className="text-[10px] font-black text-royal-emerald uppercase tracking-widest">
                      {i18n.language.split('-')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-royal-emerald/30 group-hover/lang:text-royal-emerald transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-white/95 backdrop-blur-2xl border-royal-emerald/10 rounded-2xl shadow-2xl p-2 mt-2">
                  <DropdownMenuLabel className="font-royal text-[9px] text-royal-emerald/40 uppercase tracking-[0.2em] px-3 pb-1">
                    {t('common.language')}
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => changeLanguage('fr')}
                    className={`rounded-xl focus:bg-royal-emerald/5 font-bold uppercase text-[10px] cursor-pointer flex items-center justify-between ${i18n.language === 'fr' ? 'text-saffron' : 'text-royal-emerald'}`}
                  >
                    Français
                    {i18n.language === 'fr' && <Check className="w-3 h-3" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => changeLanguage('en')}
                    className={`rounded-xl focus:bg-royal-emerald/5 font-bold uppercase text-[10px] cursor-pointer flex items-center justify-between ${i18n.language.startsWith('en') ? 'text-saffron' : 'text-royal-emerald'}`}
                  >
                    English
                    {i18n.language.startsWith('en') && <Check className="w-3 h-3" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => changeLanguage('ar')}
                    className={`rounded-xl focus:bg-royal-emerald/5 font-bold uppercase text-[10px] cursor-pointer flex items-center justify-between ${i18n.language === 'ar' ? 'text-saffron' : 'text-royal-emerald'}`}
                  >
                    العربية
                    {i18n.language === 'ar' && <Check className="w-3 h-3" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {user ? (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <div className="flex items-center gap-3 p-1 pl-3 bg-royal-emerald/5 hover:bg-royal-emerald/10 rounded-full border border-royal-emerald/5 transition-all group/profile">
                      <span className="text-xs font-black text-royal-emerald uppercase tracking-widest hidden lg:block">
                        {fullName.split(' ')[0]}
                      </span>
                      <Avatar className="w-9 h-9 border-2 border-white ring-2 ring-saffron/20 transition-transform group-hover/profile:scale-105">
                        <AvatarImage src={avatarUrl || ""} className="object-cover" />
                        <AvatarFallback className="bg-gradient-saffron text-royal-emerald font-black text-xs uppercase">
                          {fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-royal-emerald/40 mr-1 group-hover/profile:text-royal-emerald transition-colors" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-2xl border-royal-emerald/10 rounded-2xl shadow-2xl p-2 mt-2">
                    <DropdownMenuLabel className="font-royal text-[10px] text-royal-emerald/40 uppercase tracking-[0.2em] px-3 pb-1">
                      {t('nav.profile')}
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigate('/profile-setup')}
                      className="rounded-xl focus:bg-royal-emerald/5 text-royal-emerald font-bold uppercase text-[10px] cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-2 opacity-60" />
                      {t('nav.profile')}
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem
                        onClick={() => navigate('/admin')}
                        className="rounded-xl focus:bg-royal-emerald/5 text-star-red font-bold uppercase text-[10px] cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2 opacity-60" />
                        Administration
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-royal-emerald/5 my-1" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="rounded-xl focus:bg-star-red/5 text-star-red font-bold uppercase text-[10px] cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2 opacity-60" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/auth')}
                  className="text-sm font-black text-royal-emerald/80 hover:text-royal-emerald uppercase tracking-widest px-4 py-2 transition-all"
                >
                  {t('nav.signin')}
                </button>
                <Button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="btn-royal shadow-royal-emerald/20"
                >
                  {t('nav.signup')}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-royal-emerald transition-transform active:scale-90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Premium Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-royal-emerald/5 bg-white/20 backdrop-blur-3xl animate-in slide-in-from-top duration-500">
            <nav className="flex flex-col gap-3 px-6">
              {['matches', 'groups', 'tableau', 'chat'].map((key) => (
                <Link
                  key={key}
                  to={key === 'matches' ? '/' : (key === 'tableau' ? '/bracket' : `/${key.toLowerCase()}`)}
                  className="px-6 py-3 text-sm font-black text-royal-emerald/80 hover:text-royal-emerald hover:bg-white/40 rounded-2xl transition-all uppercase tracking-widest"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-6 py-3 text-sm font-black text-star-red bg-star-red/5 hover:bg-star-red/10 rounded-2xl transition-all text-left uppercase tracking-widest"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.admin')}
                </Link>
              )}
              <div className="h-px bg-royal-emerald/5 my-2" />
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 px-6 py-4 bg-royal-emerald/5 rounded-2xl mx-1">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                      <AvatarImage src={avatarUrl || ""} className="object-cover" />
                      <AvatarFallback className="bg-gradient-saffron text-royal-emerald font-black">
                        {fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-royal-emerald uppercase tracking-widest leading-none mb-1">{fullName}</span>
                      <span className="text-[10px] font-bold text-royal-emerald/40 uppercase tracking-[0.2em]">{t('nav.profile')}</span>
                    </div>
                  </div>
                  <Link
                    to="/profile-setup"
                    className="px-6 py-3 text-sm font-black text-royal-emerald/80 hover:text-royal-emerald hover:bg-white/40 rounded-2xl transition-all uppercase tracking-widest"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.profile')}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="px-6 py-3 text-sm font-black text-star-red bg-star-red/5 rounded-2xl transition-all text-left uppercase tracking-widest"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/auth"
                    className="px-6 py-3 text-sm font-black text-royal-emerald/80 bg-white/40 rounded-2xl transition-all text-center uppercase tracking-widest"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.signin')}
                  </Link>
                  <Button
                    onClick={() => {
                      navigate('/auth?mode=signup');
                      setMobileMenuOpen(false);
                    }}
                    className="btn-royal w-full py-6 text-base"
                  >
                    {t('nav.signup')}
                  </Button>
                </div>
              )}
              {/* Mobile Translation Picker */}
              <div className="mt-4 px-6 flex items-center justify-between border-t border-royal-emerald/5 pt-4">
                <span className="text-[10px] font-black text-royal-emerald/40 uppercase tracking-widest">{t('common.language')}</span>
                <div className="flex gap-4">
                  <button
                    onClick={() => changeLanguage('fr')}
                    className={`text-[11px] font-bold uppercase ${i18n.language === 'fr' ? 'text-saffron' : 'text-royal-emerald hover:text-saffron'}`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`text-[11px] font-bold uppercase ${i18n.language.startsWith('en') ? 'text-saffron' : 'text-royal-emerald hover:text-saffron'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`text-[11px] font-bold uppercase ${i18n.language === 'ar' ? 'text-saffron' : 'text-royal-emerald hover:text-saffron'}`}
                  >
                    AR
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
