import { useQuery } from '@tanstack/react-query';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const searchTokuMulti = async (query: string) => {
  if (!query) return [];

  const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  };

  try {
    const urlEN = `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=1`;
    const resEN = await fetch(urlEN, { headers });
    if (!resEN.ok) throw new Error('Failed to fetch EN data');
    const dataEN = await resEN.json();

    const filteredEN = (dataEN.results || [])
      .filter((item: any) => {
        const isMedia =
          (item.media_type === 'tv' || item.media_type === 'movie') &&
          item.poster_path;
        const isJapan = item.original_language === 'ja';
        const hasTokuVibe = item.genre_ids?.some((id: number) =>
          [10765, 10759, 878].includes(id),
        );
        const isNotAnime = !item.genre_ids?.includes(16);
        return isMedia && isJapan && hasTokuVibe && isNotAnime;
      })
      .slice(0, 4);

    const results = await Promise.all(
      filteredEN.map(async (item: any) => {
        try {
          const detailUrl = `${BASE_URL}/${item.media_type}/${item.id}?language=ja-JP`;
          const resJP = await fetch(detailUrl, { headers });
          const itemJP = resJP.ok ? await resJP.json() : null;

          const date = item.first_air_date || item.release_date || '';

          return {
            id: item.id,
            title:
              item.name === 'Masked Rider DCD'
                ? 'Kamen Rider Decade'
                : item.name || item.title,
            titleJapanese: item.original_name || item.original_title,
            year: date ? date.split('-')[0] : 'N/A',
            overview: item.overview || 'No overview.',
            overviewJp: itemJP?.overview || '詳細なし',
            image: `https://wsrv.nl/?url=https://image.tmdb.org/t/p/w342${itemJP?.poster_path || item.poster_path}&output=webp&q=70&il&n=-1`,
            type: item.media_type,
            rating: item.vote_average ? item.vote_average.toFixed(1) : '0',
          };
        } catch (error) {
          throw new Error('Failed to capture data:', { cause: error });
        }
      }),
    );

    return results;
  } catch (error) {
    throw new Error('Failed to capture data:', { cause: error });
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
    gcTime: 1000 * 60 * 30,
  });
};
