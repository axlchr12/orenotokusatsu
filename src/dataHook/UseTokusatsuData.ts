import { useQuery } from '@tanstack/react-query';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const searchTokuMulti = async (query: string) => {
  if (!query) return [];

  const url = `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch TMDb');
    const data = await response.json();
    return (data.results || [])
      .filter((item: any) => {
        const isMedia = item.media_type === 'tv' || item.media_type === 'movie';
        const isJapan = item.original_language === 'ja';
        const hasTokuVibe = item.genre_ids?.some((id: number) =>
          [10765, 878, 14].includes(id),
        );
        const isNotAnime = !item.genre_ids?.includes(16);
        return isMedia && isJapan && hasTokuVibe && isNotAnime;
      })
      .map((item: any) => {
        const date = item.first_air_date || item.release_date || '';
        return {
          id: item.id,
          title: item.name || item.title,
          titleJapanese: item.original_name || item.original_title,
          year: date ? date.split('-')[0] : 'N/A',
          overview: item.overview,
          image: item.poster_path
            ? `https://wsrv.nl/?url=https://image.tmdb.org/t/p/w500${item.poster_path}`
            : null,
          type: item.media_type,
          rating: item.vote_average ? item.vote_average.toFixed(1) : '0',
        };
      });
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

interface UseTokusatsuDataProps {
  query: string;
}

export const useTokusatsuData = ({ query }: UseTokusatsuDataProps) => {
  return useQuery({
    queryKey: ['tokuSearch', query],
    queryFn: () => searchTokuMulti(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });
};
