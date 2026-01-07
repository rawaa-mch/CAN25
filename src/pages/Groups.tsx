import { Header } from '@/components/Header';
import { GroupStandings } from '@/components/GroupStandings';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

import { TeamStats } from '@/components/TeamState';
import { GeneralStats } from '@/components/GeneralStats';
import { FALLBACK_TEAMS } from '@/data/fallbackData';


export default function Groups() {
  const { t } = useTranslation();
  const { data: teams, isLoading, error: queryError, refetch } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      console.log('Fetching teams from Supabase...');
      try {
        const { data, error } = await supabase.from('teams').select('*').order('group_name').order('name');
        if (error) {
          console.error('Supabase error fetching teams:', error);
          throw error;
        }
        console.log('Teams fetched successfully:', data?.length, 'teams found.');
        return data;
      } catch (err) {
        console.error('Unexpected error in queryFn:', err);
        throw err;
      }
    },
    retry: 1, // Don't retry too many times
  });

  // Use fallback data if there's an error or no data returned
  const displayTeams = queryError || (!isLoading && (!teams || teams.length === 0)) ? FALLBACK_TEAMS : teams;

  const groupedTeams = displayTeams?.reduce((acc, team: any) => {
    if (!acc[team.group_name]) acc[team.group_name] = [];
    acc[team.group_name].push(team);
    return acc;
  }, {} as Record<string, any[]>);


  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-10 mt-20">
          <h1 className="font-display text-5xl text-white mb-2">{t('groups.title')}</h1>
          <p className="text-muted-foreground  text-white">{t('groups.subtitle')}</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground animate-pulse">{t('groups.loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedTeams && Object.entries(groupedTeams).map(([groupName, groupTeams]) => (
              <GroupStandings key={groupName} groupName={groupName} teams={groupTeams || []} />
            ))}
          </div>
        )}

        <br />
        <hr />
        <br />
        <h1 className="text-center font-display text-5xl text-white mb-2">{t('groups.overview')}</h1>
        <GeneralStats />
      </main>
    </div>

  );
}
