export interface Team {
    id: string;
    name: string;
    code: string;
    flag_url: string;
    group_name: string;
    points: number;
    goal_difference: number;
}

export const FALLBACK_TEAMS: Team[] = [
    // Group A
    { id: '1', name: 'Morocco', code: 'MAR', flag_url: 'https://flagcdn.com/ma.svg', group_name: 'Group A', points: 0, goal_difference: 0 },
    { id: '2', name: 'Senegal', code: 'SEN', flag_url: 'https://flagcdn.com/sn.svg', group_name: 'Group A', points: 0, goal_difference: 0 },
    { id: '3', name: 'Burkina Faso', code: 'BFA', flag_url: 'https://flagcdn.com/bf.svg', group_name: 'Group A', points: 0, goal_difference: 0 },
    { id: '4', name: 'Mauritania', code: 'MTN', flag_url: 'https://flagcdn.com/mr.svg', group_name: 'Group A', points: 0, goal_difference: 0 },

    // Group B
    { id: '5', name: 'Egypt', code: 'EGY', flag_url: 'https://flagcdn.com/eg.svg', group_name: 'Group B', points: 0, goal_difference: 0 },
    { id: '6', name: 'Ghana', code: 'GHA', flag_url: 'https://flagcdn.com/gh.svg', group_name: 'Group B', points: 0, goal_difference: 0 },
    { id: '7', name: 'Cape Verde', code: 'CPV', flag_url: 'https://flagcdn.com/cv.svg', group_name: 'Group B', points: 0, goal_difference: 0 },
    { id: '8', name: 'Mozambique', code: 'MOZ', flag_url: 'https://flagcdn.com/mz.svg', group_name: 'Group B', points: 0, goal_difference: 0 },

    // Group C
    { id: '9', name: 'Cameroon', code: 'CMR', flag_url: 'https://flagcdn.com/cm.svg', group_name: 'Group C', points: 0, goal_difference: 0 },
    { id: '10', name: 'Guinea', code: 'GUI', flag_url: 'https://flagcdn.com/gn.svg', group_name: 'Group C', points: 0, goal_difference: 0 },
    { id: '11', name: 'Gambia', code: 'GAM', flag_url: 'https://flagcdn.com/gm.svg', group_name: 'Group C', points: 0, goal_difference: 0 },
    { id: '12', name: 'Equatorial Guinea', code: 'EQG', flag_url: 'https://flagcdn.com/gq.svg', group_name: 'Group C', points: 0, goal_difference: 0 },

    // Group D
    { id: '13', name: 'Algeria', code: 'ALG', flag_url: 'https://flagcdn.com/dz.svg', group_name: 'Group D', points: 0, goal_difference: 0 },
    { id: '14', name: 'Angola', code: 'ANG', flag_url: 'https://flagcdn.com/ao.svg', group_name: 'Group D', points: 0, goal_difference: 0 },
    { id: '15', name: 'Burundi', code: 'BDI', flag_url: 'https://flagcdn.com/bi.svg', group_name: 'Group D', points: 0, goal_difference: 0 },
    { id: '16', name: 'Tanzania', code: 'TAN', flag_url: 'https://flagcdn.com/tz.svg', group_name: 'Group D', points: 0, goal_difference: 0 },

    // Group E
    { id: '17', name: 'Tunisia', code: 'TUN', flag_url: 'https://flagcdn.com/tn.svg', group_name: 'Group E', points: 0, goal_difference: 0 },
    { id: '18', name: 'Mali', code: 'MLI', flag_url: 'https://flagcdn.com/ml.svg', group_name: 'Group E', points: 0, goal_difference: 0 },
    { id: '19', name: 'South Africa', code: 'RSA', flag_url: 'https://flagcdn.com/za.svg', group_name: 'Group E', points: 0, goal_difference: 0 },
    { id: '20', name: 'Namibia', code: 'NAM', flag_url: 'https://flagcdn.com/na.svg', group_name: 'Group E', points: 0, goal_difference: 0 },

    // Group F
    { id: '21', name: 'Ivory Coast', code: 'CIV', flag_url: 'https://flagcdn.com/ci.svg', group_name: 'Group F', points: 0, goal_difference: 0 },
    { id: '22', name: 'Nigeria', code: 'NGA', flag_url: 'https://flagcdn.com/ng.svg', group_name: 'Group F', points: 0, goal_difference: 0 },
    { id: '23', name: 'DR Congo', code: 'COD', flag_url: 'https://flagcdn.com/cd.svg', group_name: 'Group F', points: 0, goal_difference: 0 },
    { id: '24', name: 'Zambia', code: 'ZAM', flag_url: 'https://flagcdn.com/zm.svg', group_name: 'Group F', points: 0, goal_difference: 0 },
];
