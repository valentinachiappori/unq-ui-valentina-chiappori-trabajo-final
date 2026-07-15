const STORAGE_KEYS = {
  LEADERBOARD: 'leaderboard',
};

const MAX_ENTRIES = 10;

export const leaderboardService = {
  getScores: () => {
    const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    return stored ? JSON.parse(stored) : [];
  },

  saveScore: (name, score) => {
    const scores = leaderboardService.getScores();
    const updated = [...scores, { name, score }]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);

    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
    return updated;
  },
};