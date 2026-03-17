import { useQueries } from '@tanstack/react-query';

const parseJapaneseTitle = (content: string, fallback: string) => {
  const nihongoMatch = content.match(
    /\{\{nihongo\|((?:[^{}]|\{\{[^{}]*\}\})*)\}\}/i,
  );
  if (!nihongoMatch) return fallback;

  let raw = nihongoMatch[1];
  raw = raw.replace(/\{\{[Rr]uby\|([^|{}]+)\|[^|{}]+\}\}/g, '$1');

  const parts = raw.split('|');
  const target = parts[1] || '';

  return (
    target
      .replace(/['\[\]{}|]/g, '')
      .replace(/<br.*?>/gi, '')
      .normalize('NFKC')
      .trim() || fallback
  );
};

const fetchFandomToku = async (domain: string, category: string) => {
  const url = `https://${domain}.fandom.com/api.php?action=query&generator=categorymembers&gcmtitle=Category:${category}&gcmlimit=50&prop=pageimages|categories|revisions&piprop=thumbnail&pithumbsize=600&cllimit=max&rvprop=content&rvslots=main&rvsection=0&format=json&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.query) return [];

    return Object.values(data.query.pages)
      .filter((data: any) => data?.thumbnail)
      .map((page: any) => {
        return {
          id: page.pageid,
          title: page.title,
          titleJapanese: parseJapaneseTitle(
            page.revisions?.[0]?.slots?.main?.['*'] || '',
            page.title,
          ),
          image: page.thumbnail?.source
            ? page.thumbnail.source.split('/revision')[0]
            : null,
          source: page.title.toLowerCase().includes('sentai')
            ? `${domain}-sentai`
            : domain,
        };
      });
  } catch (error) {
    console.error(`Error fetching ${domain}:`, error);
    return [];
  }
};

export const useTokusatsuData = () => {
  const configs = [
    { domain: 'kamenrider', cat: 'Series' },
    { domain: 'powerrangers', cat: 'Sentai_Season' },
    { domain: 'powerrangers', cat: 'Season' },
    { domain: 'ultraseries', cat: 'Series' },
    { domain: 'tokusatsu', cat: 'Shows' },
  ];

  const queryResults = useQueries({
    queries: configs.map(conf => ({
      queryKey: ['toku', conf.domain, conf.cat],
      queryFn: () => fetchFandomToku(conf.domain, conf.cat),
      staleTime: 1000 * 60 * 60,
    })),
  });

  const isLoading = queryResults.some(q => q.isLoading);
  const isError = queryResults.some(q => q.isError);

  const masterList = queryResults.filter(q => q.data).flatMap(q => q.data);

  const uniqueMasterList = Array.from(
    new Map(masterList.map((item: any) => [item.id, item])).values(),
  );

  return {
    data: uniqueMasterList,
    isLoading,
    isError,
  };
};
