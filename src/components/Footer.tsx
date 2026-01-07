import { FaFacebookF, FaInstagram, FaLinkedinIn, FaFutbol, FaGithub, FaTwitter } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export function Footer() {
  const navigationLinks = [
    { name: "MATCHES", path: "/" },
    { name: "GROUPS", path: "/groups" },
    { name: "TABLEAU", path: "/bracket" },
    { name: "CHAT", path: "/chat" },
    { name: "PORTFOLIOS", path: "/portfolios" },
  ];

  const teamMembers = [
    { name: "AYA ASRIR", role: "Developer Web Full Stack" },
    { name: "RAWÂA M'CHAABAT", role: "Developer  Web Full Stack" },
    { name: "HASSANIA EL-FALAH", role: "Developer Web Full Stack" },
  ];

  const socialLinks = [
    { icon: FaGithub, link: "https://github.com/ayaasrir26/CanProjet", label: "GitHub" },
    { icon: FaInstagram, link: "https://www.instagram.com/cangoal25/?utm_source=qr&igsh=MTE1NXA4b3YzZWNjdQ%3D%3D#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-[#041915] text-white pt-20 pb-10 px-6 md:px-20 rounded-t-[3rem] overflow-hidden border-t border-white/10">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-royal-emerald/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 relative z-10">

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
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The ultimate hub for the 2025 Africa Cup of Nations. Stay connected with fan-driven predictions. Engage with the heart of African football and never miss a moment of the action!
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, link, label }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-royal text-lg mb-6 text-white uppercase tracking-widest border-b border-white/5 pb-2 inline-block">Navigation</h3>
            <ul className="space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-green-400 text-sm font-semibold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400/20 group-hover:bg-green-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* team */}
          <div>
            <h3 className="font-royal text-lg mb-6 text-white uppercase tracking-widest border-b border-white/5 pb-2 inline-block">Our Team</h3>
            <ul className="space-y-4">
              {teamMembers.map((member) => (
                <li key={member.name} className="group">
                  <p className="text-sm font-bold text-gray-300 group-hover:text-green-400 transition-colors">{member.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{member.role}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-royal text-lg mb-6 text-white uppercase tracking-widest border-b border-white/5 pb-2 inline-block">Contact</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-green-400/30 transition-all group">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-400/10 text-green-400">
                  <MdLocationOn className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300">Casablanca, Maroc</span>
              </a>
              <a href="tel:+212600000000" className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-green-400/30 transition-all group">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-400/10 text-blue-400">
                  <MdPhone className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300">+212 6 00 00 00 00</span>
              </a>
              <a href="mailto:cangoal25@gmail.com" className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-green-400/30 transition-all group">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-400/10 text-orange-400">
                  <MdEmail className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300">cangoal25@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} CANGOAL Morocco — All rights reserved
          </p>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Developed with <span className="animate-pulse text-red-500">❤️</span> in Morocco</span>
            <span className="text-sm">🇲🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
      ©CAN 2025 — All rights reserved
        <span className="mx-2">•</span>
        Developed with ❤️ in Morocco 🇲🇦
      </div>
    </footer>
  );
}
