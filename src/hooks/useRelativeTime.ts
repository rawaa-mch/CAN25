
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";

export const useRelativeTime = (dateString: string | null | undefined) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    // If older than 7 days, show full date
    if (now.getTime() - date.getTime() > 7 * 24 * 60 * 60 * 1000) {
        return format(date, "d MMMM yyyy", { locale: fr });
    }

    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
};
