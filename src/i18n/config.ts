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
