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
                "language": "Language",
                "time_remaining": "Time Remaining",
                "days": "days",
                "online": "Online"
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
            },
            "bracket": {
                "title": "Tournament Bracket",
                "subtitle": "Predict the path to glory",
                "download_diagram": "Download Diagram",
                "how_to_play": "How to Play",
                "step1": "Predict Winners",
                "step2": "Save Bracket",
                "step3": "Share Results",
                "swipe_hint": "Swipe to see full bracket",
                "save_predictions": "Save Predictions",
                "view_my": "View My Bracket",
                "your_prediction": "Your Prediction",
                "active_predictors": "Active Predictors"
            },
            "groups": {
                "title": "Groups",
                "subtitle": "The path to the knockout stage",
                "loading": "Loading groups...",
                "overview": "Overview"
            },
            "chat": {
                "placeholder_title": "What's on your mind?",
                "placeholder_content": "Share your thoughts...",
                "media": "Photo/Video",
                "my_posts": "My Posts",
                "score_impact": "Score Impact",
                "publishing": "Publishing...",
                "add_comment": "Add a comment...",
                "no_topics": "No discussions yet",
                "be_the_first": "Be the first to start a conversation!"
            },
            "ai": {
                "settings": "AI Settings",
                "api_key": "API Key",
                "placeholder_key": "Enter your API key",
                "storage_note": "Your API key is stored locally in your browser",
                "save_key": "Save Key"
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
                "language": "Langue",
                "time_remaining": "Temps Restant",
                "days": "jours",
                "online": "En ligne"
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
            },
            "bracket": {
                "title": "Tableau Final",
                "subtitle": "Pronostiquez le parcours vers la gloire",
                "download_diagram": "Télécharger le Diagramme",
                "how_to_play": "Comment Jouer",
                "step1": "Pronostiquez les Vainqueurs",
                "step2": "Sauvegarder le Tableau",
                "step3": "Partager les Résultats",
                "swipe_hint": "Glissez pour voir tout le tableau",
                "save_predictions": "Sauvegarder les Pronostics",
                "view_my": "Voir Mon Tableau",
                "your_prediction": "Votre Pronostic",
                "active_predictors": "Pronostiqueurs Actifs"
            },
            "groups": {
                "title": "Groupes",
                "subtitle": "Le chemin vers la phase éliminatoire",
                "loading": "Chargement des groupes...",
                "overview": "Aperçu"
            },
            "chat": {
                "placeholder_title": "À quoi pensez-vous ?",
                "placeholder_content": "Partagez vos pensées...",
                "media": "Photo/Vidéo",
                "my_posts": "Mes Publications",
                "score_impact": "Impact sur le Score",
                "publishing": "Publication...",
                "add_comment": "Ajouter un commentaire...",
                "no_topics": "Aucune discussion pour le moment",
                "be_the_first": "Soyez le premier à lancer une conversation !"
            },
            "ai": {
                "settings": "Paramètres IA",
                "api_key": "Clé API",
                "placeholder_key": "Entrez votre clé API",
                "storage_note": "Votre clé API est stockée localement dans votre navigateur",
                "save_key": "Sauvegarder la Clé"
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
                "language": "اللغة",
                "time_remaining": "الوقت المتبقي",
                "days": "أيام",
                "online": "متصل"
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
            },
            "bracket": {
                "title": "جدول البطولة",
                "subtitle": "توقع مسار خروج المغلوب نحو المجد",
                "download_diagram": "تحميل المخطط",
                "how_to_play": "كيف تلعب",
                "step1": "توقع الفائزين",
                "step2": "حفظ الجدول",
                "step3": "شارك النتائج",
                "swipe_hint": "اسحب لرؤية الجدول كاملاً",
                "save_predictions": "حفظ التوقعات",
                "view_my": "عرض جدولي",
                "your_prediction": "توقعك",
                "active_predictors": "المتوقعون النشطون"
            },
            "groups": {
                "title": "المجموعات",
                "subtitle": "الطريق إلى مرحلة خروج المغلوب",
                "loading": "جاري تحميل المجموعات...",
                "overview": "نظرة عامة"
            },
            "chat": {
                "placeholder_title": "ماذا تفكر؟",
                "placeholder_content": "شارك أفكارك...",
                "media": "صورة/فيديو",
                "my_posts": "منشوراتي",
                "score_impact": "تأثير النقاط",
                "publishing": "جاري النشر...",
                "add_comment": "أضف تعليق...",
                "no_topics": "لا توجد مناقشات بعد",
                "be_the_first": "كن أول من يبدأ محادثة!"
            },
            "ai": {
                "settings": "إعدادات الذكاء الاصطناعي",
                "api_key": "مفتاح API",
                "placeholder_key": "أدخل مفتاح API",
                "storage_note": "يتم تخزين مفتاح API محليًا في متصفحك",
                "save_key": "حفظ المفتاح"
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
