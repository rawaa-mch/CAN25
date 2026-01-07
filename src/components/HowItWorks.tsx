import { UserPlus, Edit3, Trophy, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('how_it_works.steps.account.title'),
      description: t('how_it_works.steps.account.desc'),
      icon: UserPlus,
    },
    {
      title: t('how_it_works.steps.predict.title'),
      description: t('how_it_works.steps.predict.desc'),
      icon: Edit3,
    },
    {
      title: t('how_it_works.steps.points.title'),
      description: t('how_it_works.steps.points.desc'),
      icon: Trophy,
    },
    {
      title: t('how_it_works.steps.rankings.title'),
      description: t('how_it_works.steps.rankings.desc'),
      icon: BarChart3,
    },
  ];

  return (
    <section className="relative py-20 bg-black/40 backdrop-blur-md">
      <h2 className="text-center text-4xl md:text-5xl font-display text-white mb-12">
        {t('how_it_works.title')}
      </h2>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center shadow-xl transition-transform duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
