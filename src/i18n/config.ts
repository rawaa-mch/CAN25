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
                "online": "Online",
                "back_to_home": "Back to Home",
                "create_account": "Create Account",
                "member_area": "Member Area"
            },
            "auth": {
                "join": "Join",
                "signin": "Sign in",
                "elite": "the Elite",
                "full_name": "Full Name",
                "placeholder_name": "John Doe",
                "placeholder_email": "john@example.com",
                "password": "Password",
                "strength": "Strength",
                "strong": "Strong",
                "medium": "Medium",
                "weak": "Weak",
                "create_btn": "Create Account",
                "signin_btn": "Sign In",
                "already_member": "Already a member?",
                "not_registered": "Not registered yet?",
                "security_note": "Your data is protected by Moroccan Elite security"
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
                "active_predictors": "Active Predictors",
                "not_set": "Not Set",
                "saving": "Saving...",
                "signin_to_predict": "Sign in to Predict",
                "generating": "Generating...",
                "final_bracket": "Final Bracket",
                "knockout_stage": "CANGOAL Knockout Stage",
                "r16": "Round of 16",
                "qf": "Quarter Finals",
                "sf": "Semi Finals",
                "final_label": "Final",
                "champion_2025": "Champion 2025",
                "tbd": "To be decided",
                "tbd_short": "TBD",
                "share": {
                    "preparing": "Preparing image...",
                    "preparing_desc": "Please wait while your bracket is generated.",
                    "ready": "Image ready",
                    "ready_desc": "Choose an option to share or download.",
                    "error": "Share error",
                    "error_desc": "Unable to generate the image. Please try again or use a screenshot.",
                    "shared": "Shared!",
                    "not_supported": "Sharing not supported",
                    "not_supported_desc": "Please use download instead.",
                    "copied": "Image copied",
                    "copy_error": "Unable to copy the image",
                    "title": "Share your bracket",
                    "subtitle": "Choose an option below",
                    "native": "Native Share",
                    "download": "Download",
                    "copy": "Copy Image",
                    "close": "Close",
                    "button": "Share"
                }
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
                "agent": "AI Assistant",
                "welcome": "Hello! I am your CANGOAL AI assistant. How can I help you today?",
                "placeholder_input": "Ask me anything...",
                "thinking": "Thinking...",
                "error": "Sorry, I encountered an error. Please try again.",
                "setup_req": "AI Key Required",
                "setup_desc": "Please provide a Gemini API key in settings to use the AI assistant.",
                "key_saved": "API Key Saved",
                "key_desc": "Your API key has been securely stored locally.",
                "settings": "AI Settings",
                "api_key": "API Key",
                "placeholder_key": "Enter your API key",
                "storage_note": "Your API key is stored locally in your browser",
                "save_key": "Save Key"
            },
            "portfolios": {
                "title": "GOLDEN TEAM",
                "subtitle": "Meet the brilliant developers behind the CANGOAL platform",
                "role": "Fullstack Developer",
                "card_status": "OFFICIAL MEMBER",
                "ball_click": "CLICK THE BALL TO VISIT"
            },
            "profile_setup": {
                "title": "Complete Profile",
                "subtitle": "Join the Action",
                "welcome": "Welcome to CANGOAL! Let's get your profile set up.",
                "label_name": "Display Name",
                "placeholder_name": "Enter your name",
                "label_team": "Favorite Team",
                "btn_join": "Complete Setup"
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
                "online": "En ligne",
                "back_to_home": "Retour à l'accueil",
                "create_account": "Créer un compte",
                "member_area": "Espace Membre"
            },
            "auth": {
                "join": "Rejoindre",
                "signin": "Connexion",
                "elite": "l'Élite",
                "full_name": "Nom Complet",
                "placeholder_name": "Jean Dupont",
                "placeholder_email": "jean@exemple.com",
                "password": "Mot de passe",
                "strength": "Force",
                "strong": "Fort",
                "medium": "Moyen",
                "weak": "Faible",
                "create_btn": "Créer mon compte",
                "signin_btn": "Se Connecter",
                "already_member": "Déjà membre ?",
                "not_registered": "Pas encore inscrit ?",
                "security_note": "Vos données sont protégées par la sécurité Elite Marocaine"
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
                "active_predictors": "Pronostiqueurs Actifs",
                "not_set": "Non Défini",
                "saving": "Sauvegarde...",
                "signin_to_predict": "Se connecter pour pronostiquer",
                "generating": "Génération...",
                "final_bracket": "Tableau Final",
                "knockout_stage": "Phase à Élimination Directe",
                "r16": "8èmes de finale",
                "qf": "Quarts de finale",
                "sf": "Demi-finales",
                "final_label": "Finale",
                "champion_2025": "Champion 2025",
                "tbd": "À déterminer",
                "tbd_short": "TBD",
                "share": {
                    "preparing": "Préparation de l'image...",
                    "preparing_desc": "Veuillez patienter pendant la génération de votre tableau.",
                    "ready": "Image prête",
                    "ready_desc": "Choisissez une option pour partager ou télécharger.",
                    "error": "Erreur de partage",
                    "error_desc": "Impossible de générer l'image. Veuillez réessayer ou utiliser une capture d'écran.",
                    "shared": "Partagé !",
                    "not_supported": "Partage non supporté",
                    "not_supported_desc": "Veuillez utiliser le téléchargement à la place.",
                    "copied": "Image copiée",
                    "copy_error": "Impossible de copier l'image",
                    "title": "Partager votre tableau",
                    "subtitle": "Choisissez une option ci-dessous",
                    "native": "Partage Natif",
                    "download": "Télécharger",
                    "copy": "Copier l'Image",
                    "close": "Fermer",
                    "button": "Partager"
                }
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
                "agent": "Assistant IA",
                "welcome": "Bonjour ! Je suis votre assistant IA CANGOAL. Comment puis-je vous aider ?",
                "placeholder_input": "Posez-moi une question...",
                "thinking": "Réflexion...",
                "error": "Désolé, j'ai rencontré une erreur. Veuillez réessayer.",
                "setup_req": "Clé IA Requise",
                "setup_desc": "Veuillez fournir une clé API Gemini dans les paramètres pour utiliser l'assistant IA.",
                "key_saved": "Clé API Enregistrée",
                "key_desc": "Votre clé API a été stockée localement en toute sécurité.",
                "settings": "Paramètres IA",
                "api_key": "Clé API",
                "placeholder_key": "Entrez votre clé API",
                "storage_note": "Votre clé API est stockée localement dans votre navigateur",
                "save_key": "Sauvegarder la Clé"
            },
            "portfolios": {
                "title": "ÉQUIPE D'OR",
                "subtitle": "Rencontrez les développeurs passionnés derrière la plateforme CANGOAL",
                "role": "Développeur Fullstack",
                "card_status": "MEMBRE OFFICIEL",
                "ball_click": "CLIQUEZ SUR LE BALLON POUR VISITER"
            },
            "profile_setup": {
                "title": "Compléter le Profil",
                "subtitle": "Rejoignez l'Action",
                "welcome": "Bienvenue sur CANGOAL ! Configurons votre profil.",
                "label_name": "Nom d'affichage",
                "placeholder_name": "Entrez votre nom",
                "label_team": "Équipe Favorite",
                "btn_join": "Terminer la configuration"
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
                "online": "متصل",
                "back_to_home": "العودة للرئيسية",
                "create_account": "إنشاء حساب",
                "member_area": "ركن الأعضاء"
            },
            "auth": {
                "join": "انضم",
                "signin": "دخول",
                "elite": "للنخبة",
                "full_name": "الاسم الكامل",
                "placeholder_name": "أحمد المغربي",
                "placeholder_email": "example@email.com",
                "password": "كلمة المرور",
                "strength": "القوة",
                "strong": "قوية",
                "medium": "متوسطة",
                "weak": "ضعيفة",
                "create_btn": "إنشاء حساب",
                "signin_btn": "تسجيل الدخول",
                "already_member": "هل لديك حساب؟",
                "not_registered": "ليس لديك حساب؟",
                "security_note": "بياناتك محمية بواسطة أنظمة حماية النخبة المغربية"
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
                "active_predictors": "المتوقعون النشطون",
                "not_set": "لم يتم التحديد",
                "saving": "جاري الحفظ...",
                "signin_to_predict": "سجل الدخول للتوقع",
                "generating": "جاري التحميل...",
                "final_bracket": "الجدول النهائي",
                "knockout_stage": "مرحلة خروج المغلوب",
                "r16": "دور الـ 16",
                "qf": "ربع النهائي",
                "sf": "نصف النهائي",
                "final_label": "النهائي",
                "champion_2025": "بطل 2025",
                "tbd": "لم يحدد بعد",
                "tbd_short": "قيد الانتظار",
                "share": {
                    "preparing": "جاري تجهيز الصورة...",
                    "preparing_desc": "يرجى الانتظار بينما يتم إنشاء الجدول الخاص بك.",
                    "ready": "الصورة جاهزة",
                    "ready_desc": "اختر خياراً للمشاركة أو التحميل.",
                    "error": "خطأ في المشاركة",
                    "error_desc": "تعذر إنشاء الصورة. يرجى المحاولة مرة أخرى أو استخدام لقطة شاشة.",
                    "shared": "تمت المشاركة!",
                    "not_supported": "المشاركة غير مدعومة",
                    "not_supported_desc": "يرجى استخدام التحميل بدلاً من ذلك.",
                    "copied": "تم نسخ الصورة",
                    "copy_error": "تعذر نسخ الصورة",
                    "title": "شارك جدولك",
                    "subtitle": "اختر خياراً أدناه",
                    "native": "مشاركة أصلية",
                    "download": "تحميل",
                    "copy": "نسخ الصورة",
                    "close": "إغلاق",
                    "button": "مشاركة"
                }
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
                "agent": "مساعد الذكاء الاصطناعي",
                "welcome": "مرحباً! أنا مساعدك الذكي في CANGOAL. كيف يمكنني مساعدتك اليوم؟",
                "placeholder_input": "اسألني أي شيء...",
                "thinking": "جاري التفكير...",
                "error": "عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.",
                "setup_req": "مفتاح API مطلوب",
                "setup_desc": "يرجى توفير مفتاح API لـ Gemini في الإعدادات لاستخدام المساعد الذكي.",
                "key_saved": "تم حفظ المفتاح",
                "key_desc": "تم حفظ مفتاح API الخاص بك محلياً وبأمان.",
                "settings": "إعدادات الذكاء الاصطناعي",
                "api_key": "مفتاح API",
                "placeholder_key": "أدخل مفتاح API",
                "storage_note": "يتم تخزين مفتاح API محليًا في متصفحك",
                "save_key": "حفظ المفتاح"
            },
            "portfolios": {
                "title": "الفريق الذهبي",
                "subtitle": "تعرف على المطورين المبدعين وراء منصة CANGOAL",
                "role": "مطور متكامل",
                "card_status": "عضو رسمي",
                "ball_click": "اضغط على الكرة للزيارة"
            },
            "profile_setup": {
                "title": "إكمال الملف الشخصي",
                "subtitle": "انضم إلى الحدث",
                "welcome": "مرحبًا بك في CANGOAL! لنقم بإعداد ملفك الشخصي.",
                "label_name": "الاسم المعروض",
                "placeholder_name": "أدخل اسمك",
                "label_team": "الفريق المفضل",
                "btn_join": "إتمام الإعداد"
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
