import { FaFacebookF, FaInstagram, FaLinkedinIn, FaFutbol, FaGithub, FaTwitter } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Footer() {
  const { t } = useTranslation();

  const navigationLinks = [
    { name: t("nav.matches"), path: "/" },
    { name: t("nav.groups"), path: "/groups" },
    { name: t("nav.tableau"), path: "/bracket" },
    { name: t("nav.chat"), path: "/chat" },
    { name: "PORTFOLIOS", path: "/portfolios" },
  ];

  const teamMembers = [
    { name: "AYA ASRIR", role: "Developer Web Full Stack", linkedin: "https://www.linkedin.com/in/aya-asrir-94931a375/" },
    { name: "RAWÂA M'CHAABAT", role: "Developer  Web Full Stack", linkedin: "https://www.linkedin.com/in/rawâa-m-chaabat-4705a2371" },
    { name: "HASSANIA EL-FALAH", role: "Developer Web Full Stack", linkedin: "https://www.linkedin.com/in/hassania-el-falah-021606363/" },
  ];

  const socialLinks = [
    { icon: FaGithub, link: "https://github.com/ayaasrir26/CanProjet", label: "GitHub" },
    { icon: FaInstagram, link: "https://www.instagram.com/cangoal25/?utm_source=qr&igsh=MTE1NXA4b3YzZWNjdQ%3D%3D#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-[#041915] text-white pt-12 md:pt-20 pb-10 px-6 md:px-20 rounded-t-[2.5rem] md:rounded-t-[3rem] overflow-hidden border-t border-white/10">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-royal-emerald/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto">

        {/* Mobile Layout (Visible only on small screens) */}
        <div className="md:hidden space-y-8">
          {/* Mobile Logo & About */}
          <div className="flex flex-col items-center text-center space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo-new.png"
                alt="CAN 2025"
                className="h-16 w-auto object-contain drop-shadow-2xl"
              />
              <div>
                <h2 className="text-xl font-royal font-extrabold tracking-tighter uppercase leading-none">
                  <span className="text-royal-emerald">CAN</span>
                  <span className="text-transparent bg-clip-text bg-gradient-saffron">GOAL</span>
                </h2>
                <p className="text-[9px] text-gray-500 font-black tracking-widest mt-1">MOROCCO 2025</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
              {t('footer.description')}
            </p>
            <div className="flex gap-3 justify-center">
              {socialLinks.map(({ icon: Icon, link, label }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Accordion Navigation */}
          <Accordion type="single" collapsible className="w-full border-t border-white/5">
            <AccordionItem value="navigation" className="border-white/5">
              <AccordionTrigger className="text-white font-royal tracking-widest uppercase text-sm hover:no-underline hover:text-green-400">
                {t('footer.navigation')}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pt-2">
                  {navigationLinks.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-gray-400 hover:text-green-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/20" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="team" className="border-white/5">
              <AccordionTrigger className="text-white font-royal tracking-widest uppercase text-sm hover:no-underline hover:text-green-400">
                {t('footer.our_team')}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pt-2">
                  {teamMembers.map((member) => (
                    <li key={member.name}>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="block group">
                        <p className="text-sm font-bold text-gray-300 group-hover:text-green-400 transition-colors">{member.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{member.role}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" className="border-white/5">
              <AccordionTrigger className="text-white font-royal tracking-widest uppercase text-sm hover:no-underline hover:text-green-400">
                {t('footer.contact')}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <MdLocationOn className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300">Casablanca, Maroc</span>
                  </a>
                  <a href="tel:+212600000000" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <MdPhone className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300">+212 6 00 00 00 00</span>
                  </a>
                  <a href="mailto:cangoal25@gmail.com" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <MdEmail className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300">cangoal25@gmail.com</span>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>


        {/* Desktop Layout (Hidden on mobile, Visible on md+) */}
        <div className="hidden md:grid gap-12 grid-cols-2 lg:grid-cols-4 relative z-10 text-left">

          {/* Logo & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo-new.png"
                alt="CAN 2025"
                className="h-20 w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
              />
              <div>
                <h2 className="text-2xl font-royal font-extrabold tracking-tighter uppercase leading-none">
                  <span className="text-royal-emerald">CAN</span>
                  <span className="text-transparent bg-clip-text bg-gradient-saffron">GOAL</span>
                </h2>
                <p className="text-[10px] text-gray-500 font-black tracking-widest mt-1">MOROCCO 2025</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              {t('footer.description')}
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, link, label }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300 group shadow-lg hover:shadow-green-900/20"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-royal text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest border-b border-white/10 pb-2 inline-block shadow-sm">{t('footer.navigation')}</h3>
            <ul className="space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-green-400 text-sm font-semibold transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400/20 group-hover:bg-green-400 transition-colors shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* team */}
          <div>
            <h3 className="font-royal text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest border-b border-white/10 pb-2 inline-block shadow-sm">{t('footer.our_team')}</h3>
            <ul className="space-y-6">
              {teamMembers.map((member) => (
                <li key={member.name} className="group">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl bg-white/5 border border-white/5 hover:border-green-400/20 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-200 group-hover:text-green-400 transition-colors">{member.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{member.role}</p>
                      </div>
                      <FaLinkedinIn className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-royal text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest border-b border-white/10 pb-2 inline-block shadow-sm">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-400/30 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-400/10 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-shadow">
                  <MdLocationOn className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Address</span>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Casablanca, Maroc</span>
                </div>
              </a>
              <a href="tel:+212600000000" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-400/30 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-400/10 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.1)] group-hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-shadow">
                  <MdPhone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Phone</span>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">+212 6 00 00 00 00</span>
                </div>
              </a>
              <a href="mailto:cangoal25@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-400/30 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-400/10 text-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.1)] group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-shadow">
                  <MdEmail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email</span>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">cangoal25@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 md:mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="text-xs text-gray-500 font-medium text-center md:text-left">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">{t('footer.developed_with')} <span className="animate-pulse text-red-500">❤️</span> in Morocco</span>
            <span className="text-sm">🇲🇦</span>
          </div>
        </div>


      </div>
    </footer>
  );
}
