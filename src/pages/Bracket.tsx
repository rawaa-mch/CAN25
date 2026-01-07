import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";

import { TournamentBracket } from "@/components/TournamentBracket";
import { PrizesSection } from "@/components/PrizesSection";
import { Leaderboard } from "@/components/Leaderboard";
import { Loader2, Save, LogIn, Trophy, Target, Users, Calendar, Download } from "lucide-react";
import { useContext, useRef } from "react";
import MatchResults from '@/components/MatchResults';
import { PredictionContext } from "@/contexts/PredictionContext";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FALLBACK_TEAMS } from "@/data/fallbackData";

const Bracket = () => {
  const { t } = useTranslation();
  const predictionContext = useContext(PredictionContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCapturing, setIsCapturing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);
  const bracketRef = useRef<HTMLDivElement>(null);

  const scrollToBracket = () => {
    bracketRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = async () => {
    if (isCapturing) return;

    // Target the bracket container
    const target = bracketRef.current;
    if (!target) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Bracket element not found"
      });
      return;
    }

    try {
      setIsCapturing(true);

      toast({
        title: "Preparing image...",
        description: "Please wait while your bracket is generated."
      });

      // Ensure the bracket is visible before capture
      target.scrollIntoView({ behavior: 'auto', block: 'center' });

      // Small delay for stability
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(target, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Hide elements that shouldn't be in the screenshot
          const elementsToHide = clonedDoc.querySelectorAll('.md\\:hidden, button, .action-buttons');
          elementsToHide.forEach(el => (el as HTMLElement).style.display = 'none');

          // Ensure the bracket container in the clone is fully visible
          const bracketContainer = clonedDoc.querySelector('main');
          if (bracketContainer) {
            bracketContainer.style.padding = '40px';
            bracketContainer.style.width = 'auto';
            bracketContainer.style.height = 'auto';
          }
        }
      });

      // create blob to preview
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(b => resolve(b), 'image/png'));
      if (!blob) throw new Error("Image conversion error.");

      const objectUrl = URL.createObjectURL(blob);
      setPreviewBlob(blob);
      setPreviewUrl(objectUrl);
      setIsShareOpen(true);

      toast({
        title: "Image ready",
        description: "Choose an option to share or download."
      });

      setIsCapturing(false);
      return;
    } catch (error) {
      console.error("Capture error:", error);
      toast({
        variant: "destructive",
        title: "Share error",
        description: "Unable to generate the image. Please try again or use a screenshot."
      });
    } finally {
      setIsCapturing(false);
    }
  };

  // Helpers for preview and sharing

  const handleNativeShare = async () => {
    if (!previewBlob) return;
    try {
      const file = new File([previewBlob], 'bracket.png', { type: 'image/png' });
      const nav = navigator as unknown as { canShare?: (d?: ShareData) => boolean; share?: (d?: ShareData) => Promise<void> };

      if (typeof nav.canShare === 'function' && nav.canShare({ files: [file] })) {
        await nav.share?.({ files: [file], title: 'My CANGOAL bracket', text: 'Here are my predictions!' });
        toast({ title: "Shared!" });
      } else {
        toast({ title: "Sharing not supported", description: "Please use download instead." });
      }
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Share error" });
    }
  };

  const copyImageToClipboard = async () => {
    if (!previewBlob) return;
    try {
      const ClipboardItemCtor = (window as unknown as { ClipboardItem?: new (items: Record<string, Blob>) => unknown }).ClipboardItem;
      if (!ClipboardItemCtor || !navigator.clipboard?.write) {
        throw new Error('Clipboard API not available');
      }
      const item = new ClipboardItemCtor({ ['image/png']: previewBlob });
      // navigator.clipboard.write expects ClipboardItem[] in browsers that support this
      await (navigator.clipboard.write as unknown as (items: unknown[]) => Promise<void>)([item]);
      toast({ title: "Image copied" });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Unable to copy the image" });
    }
  };

  // web/social share helpers removed; keep native share, download and clipboard functions only


  const downloadPreview = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = 'mon-tableau-can2025.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const closeShareModal = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPreviewBlob(null);
    setIsShareOpen(false);
  };

  const { data: teams, isLoading, error: queryError } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
    retry: 1,
  });

  const displayTeams = queryError || (!isLoading && (!teams || teams.length === 0)) ? FALLBACK_TEAMS : teams;


  if (!predictionContext) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { getPredictedChampion, savePredictions, isSaving } = predictionContext;
  const champion = getPredictedChampion();

  return (
    <div className="min-h-screen bg-white" ref={componentRef}>
      <Header />

      {/* Hero Section - Clean Modern Design */}
      <section className="relative py-8 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">

            {/* Title Section */}
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                <div className="w-4 md:w-6 h-px bg-gradient-to-r from-transparent to-primary" />
                <Trophy className="w-6 md:w-8 h-6 md:h-8 text-primary animate-pulse" />
                <div className="w-4 md:w-6 h-px bg-gradient-to-l from-transparent to-primary" />
              </div>

              <h1 className="text-3xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
                 {/* Main Title */}
      

               <h1 className="font-royal text-6xl md:text-8xl lg:text-9xl ">
                <span className="text-royal-emerald drop-shadow-sm">CAN</span><span className="text-transparent bg-clip-text bg-gradient-saffron text-glow-saffron">GOAL</span>
               </h1>
              </h1> 
              <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                {t('bracket.subtitle')}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
                      <Target className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">{t('bracket.your_prediction')}</p>
                      <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">
                        {champion ? champion.name : t('bracket.not_set')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-blue-500/10 rounded-lg">
                      <Users className="w-5 md:w-6 h-5 md:h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">{t('bracket.active_predictors')}</p>
                      <p className="text-lg md:text-2xl font-bold text-gray-900">2,847</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-emerald-500/10 rounded-lg">
                      <Calendar className="w-5 md:w-6 h-5 md:h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">{t('common.time_remaining')}</p>
                      <p className="text-lg md:text-2xl font-bold text-gray-900">14 {t('common.days')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 px-4">
              {user ? (
                <>
                  <Button
                    onClick={savePredictions}
                    disabled={isSaving}
                    className="w-full md:w-auto h-11 md:h-12 px-6 md:px-8 text-sm md:text-base font-medium rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin mr-2 md:mr-3" />
                        {t('bracket.saving')}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
                        {t('bracket.save_predictions')}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto h-11 md:h-12 px-6 md:px-8 text-sm md:text-base font-medium rounded-full border-2 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={scrollToBracket}
                  >
                    {t('bracket.view_my')}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate('/auth')}
                  className="w-full md:w-auto h-11 md:h-12 px-6 md:px-8 text-sm md:text-base font-medium rounded-full bg- gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <LogIn className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
                  {t('bracket.signin_to_predict')}
                </Button>
              )}

              <Button
                onClick={handleDownload}
                disabled={isCapturing}
                className="w-full md:w-auto h-11 md:h-12 px-6 md:px-8 text-sm md:text-base font-medium rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                title={t('bracket.download_diagram')}
              >
                {isCapturing ? (
                  <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin mr-2 md:mr-3" />
                ) : (
                  <Download className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" />
                )}
                {isCapturing ? t('bracket.generating') : t('bracket.download_diagram')}
              </Button>
            </div>

            {/* Instructions */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
              <div className="max-w-3xl mx-auto text-center px-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">{t('bracket.how_to_play')}</h3>
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <div className="w-7 md:w-8 h-7 md:h-8 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm md:text-base">1</span>
                    </div>
                    <p className="text-xs md:text-base text-gray-600">{t('bracket.step1')}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-7 md:w-8 h-7 md:h-8 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm md:text-base">2</span>
                    </div>
                    <p className="text-xs md:text-base text-gray-600">{t('bracket.step2')}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-7 md:w-8 h-7 md:h-8 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm md:text-base">3</span>
                    </div>
                    <p className="text-xs md:text-base text-gray-600">{t('bracket.step3')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Main Bracket Section */}
      <main ref={bracketRef} className="container mx-auto px-2 md:px-4 py-6 md:py-16">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6 px-2">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900">{t('bracket.title')}</h2>
            <div className="text-xs md:text-sm text-gray-500">
              {displayTeams?.length || 0} {t('hero.stats.teams')}
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12 md:py-20">
              <div className="text-center">
                <Loader2 className="w-10 md:w-12 h-10 md:h-12 animate-spin text-primary mx-auto mb-3 md:mb-4" />
                <p className="text-sm md:text-base text-gray-600">{t('groups.loading')}</p>
              </div>
            </div>
          ) : (
            <>
              {/* Mobile scroll hint */}
              <div className="md:hidden text-center py-3 text-sm text-gray-500 flex items-center justify-center gap-2">
                <span>👈</span>
                <span>{t('bracket.swipe_hint')}</span>
                <span>👉</span>
              </div>
              <div className="bg-white rounded-xl md:rounded-2xl border md:border-2 border-gray-100 p-2 md:p-6 shadow-sm">
                <TournamentBracket teams={displayTeams || []} />
              </div>
            </>
          )}
        </div>
      </main>

      {/* Share / Preview Modal */}
      {isShareOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeShareModal} />
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
            <div className="flex gap-3">
              {previewUrl ? (
                <img src={previewUrl} className="w-32 h-24 object-cover rounded" alt="Preview" />
              ) : (
                <div className="w-32 h-24 bg-gray-100 rounded flex items-center justify-center text-sm">Preview</div>
              )}
              <div className="flex-1">
                <h4 className="font-semibold">Share your bracket</h4>
                <p className="text-sm text-gray-500">Choose an option below</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <Button onClick={handleNativeShare} className="w-full">Native Share</Button>
              <Button onClick={downloadPreview} className="w-full">Download</Button>
              <Button onClick={copyImageToClipboard} className="w-full">Copy Image</Button>
            </div>

            <div className="mt-3 text-right">
              <Button variant="ghost" onClick={closeShareModal}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Prizes Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-6 md:py-16">
        <PrizesSection winner={champion} />
      </div>

      {/* Leaderboard */}
      <div className="py-6 md:py-16">
        <Leaderboard />
      </div>

      {/* Mobile Action Buttons - Non-fixed for better scrolling */}
      {user && (
        <div className="md:hidden flex justify-center gap-4 py-6 px-4 bg-gray-50 border-t border-gray-200">
          <Button
            className="flex-1 max-w-[160px] h-12 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={savePredictions}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            {t('common.save')}
          </Button>
          <Button
            className="flex-1 max-w-[160px] h-12 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleDownload}
            disabled={isCapturing}
            title={t('bracket.download_diagram')}
          >
            {isCapturing ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Download className="w-5 h-5 mr-2" />
            )}
            {isCapturing ? t('bracket.generating') : "Share"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Bracket;