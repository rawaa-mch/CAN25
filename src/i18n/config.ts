import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "nav": {
                "matches": "Matches",
                "groups": "Groups",
                "tableau": "Bracket",
                "chat": "Chat",
                "admin": "Admin",
                "signin": "Sign in",
                "signup": "Sign up",
                "logout": "Logout",
                "profile": "My Profile"
            },
            "common": {
                "loading": "Loading...",
                "error": "Error",
                "save": "Save",
                "cancel": "Cancel",
                "join_elite": "Join the Elite",
                "welcome": "Welcome",
                "language": "Language"
            },
            "hero": {
                "badge": "Africa Cup of Nations",
                "subtitle": "Morocco",
                "description": "Follow all 52 matches, 24 teams, and 6 groups. Get live scores, standings, and schedules for Africa's biggest football tournament.",
                "view_groups": "View Groups",
                "signup_free": "Sign Up Free",
                "stats": {
                    "teams": "Teams",
                    "groups": "Groups",
                    "matches": "Matches",
                    "cities": "Host Cities"
                }
            },
            "how_it_works": {
                "title": "How it works",
                "steps": {
                    "account": {
                        "title": "Create an account",
                        "desc": "Sign up or log in to start making your CANGOAL predictions."
                    },
                    "predict": {
                        "title": "Predict matches",
                        "desc": "Choose match winners and scores for each game."
                    },
                    "points": {
                        "title": "Earn points",
                        "desc": "Get points for correct predictions and results."
                    },
                    "rankings": {
                        "title": "Check rankings",
                        "desc": "See your position on the leaderboard and compare scores."
                    }
                }
            },
            "footer": {
                "description": "The ultimate platform for Africa Cup of Nations 2025 predictions. Join the competition, challenge your friends, and experience the passion of African football.",
                "navigation": "Navigation",
                "our_team": "Our Team",
                "contact": "Contact Us",
                "rights": "CANGOAL. All privileges reserved.",
                "developed_with": "Developed with"
            }
        }
    },
    fr: {
        translation: {
            "nav": {
                "matches": "Matchs",
                "groups": "Groupes",
                "tableau": "Tableau",
                "chat": "Communication",
                "admin": "Admin",
                "signin": "Connexion",
                "signup": "S'inscrire",
                "logout": "Déconnexion",
                "profile": "Mon Profil"
            },
            "common": {
                "loading": "Chargement...",
                "error": "Erreur",
                "save": "Sauvegarder",
                "cancel": "Annuler",
                "join_elite": "Rejoindre l'Élite",
                "welcome": "Bienvenue",
                "language": "Langue"
            },
            "hero": {
                "badge": "Coupe d'Afrique des Nations",
                "subtitle": "Maroc",
                "description": "Suivez les 52 matchs, 24 équipes et 6 groupes. Scores en direct, classements et calendrier de la plus grande compétition de football en Afrique.",
                "view_groups": "Voir les Groupes",
                "signup_free": "S'inscrire Gratuitement",
                "stats": {
                    "teams": "Équipes",
                    "groups": "Groupes",
                    "matches": "Matchs",
                    "cities": "Villes Hôtes"
                }
            },
            "how_it_works": {
                "title": "Comment ça marche",
                "steps": {
                    "account": {
                        "title": "Créer un compte",
                        "desc": "Inscrivez-vous ou connectez-vous pour commencer vos pronostics CANGOAL."
                    },
                    "predict": {
                        "title": "Pronostiquer les matchs",
                        "desc": "Choisissez les gagnants et les scores pour chaque match."
                    },
                    "points": {
                        "title": "Gagner des points",
                        "desc": "Obtenez des points pour vos pronostics et résultats corrects."
                    },
                    "rankings": {
                        "title": "Voir le classement",
                        "desc": "Consultez votre position dans le classement et comparez vos scores."
                    }
                }
            },
            "footer": {
                "description": "La plateforme ultime pour les pronostics de la Coupe d'Afrique des Nations 2025. Rejoignez la compétition, défiez vos amis et vivez la passion du football africain.",
                "navigation": "Navigation",
                "our_team": "Notre Équipe",
                "contact": "Contactez-nous",
                "rights": "CANGOAL. Tous droits réservés.",
                "developed_with": "Développé avec"
            }
        }
    },
    ar: {
        translation: {
            "nav": {
                "matches": "المباريات",
                "groups": "المجموعات",
                "tableau": "الجدول",
                "chat": "المجتمع",
                "admin": "إدارة",
                "signin": "تسجيل الدخول",
                "signup": "إنشاء حساب",
                "logout": "تسجيل الخروج",
                "profile": "ملفي الشخصي"
            },
            "common": {
                "loading": "جار التحميل...",
                "error": "خطأ",
                "save": "حفظ",
                "cancel": "إلغاء",
                "join_elite": "انضم للنخبة",
                "welcome": "أهلاً بك",
                "language": "اللغة"
            },
            "hero": {
                "badge": "كأس الأمم الأفريقية",
                "subtitle": "المغرب",
                "description": "تابع جميع المباريات الـ 52، والـ 24 فريقاً، والـ 6 مجموعات. احصل على النتائج المباشرة، الترتيب، وجداول أكبر بطولة كرة قدم في أفريقيا.",
                "view_groups": "عرض المجموعات",
                "signup_free": "سجل مجاناً",
                "stats": {
                    "teams": "الفرق",
                    "groups": "المجموعات",
                    "matches": "المباريات",
                    "cities": "المدن المضيفة"
                }
            },
            "how_it_works": {
                "title": "كيف يعمل",
                "steps": {
                    "account": {
                        "title": "أنشئ حساباً",
                        "desc": "سجل أو سجيل الدخول لبدء توقعاتك في CANGOAL."
                    },
                    "predict": {
                        "title": "توقع المباريات",
                        "desc": "ختر الفائزين والنتائج لكل مباراة."
                    },
                    "points": {
                        "title": "اجمع النقاط",
                        "desc": "احصل على نقاط للتوقعات والنتائج الصحيحة."
                    },
                    "rankings": {
                        "title": "تحقق من الترتيب",
                        "desc": "شاهد ترتيبك و قارن نقاطك مع الآخرين."
                    }
                }
            },
            "footer": {
                "description": "المنصة الأمثل لتوقعات كأس الأمم الأفريقية 2025. انضم للمنافسة، تحدى أصدقائك وعش شغف الكرة الأفريقية.",
                "navigation": "التنقل",
                "our_team": "فريقنا",
                "contact": "اتصل بنا",
                "rights": "CANGOAL. جميع الحقوق محفوظة.",
                "developed_with": "تم التطوير بـ"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
