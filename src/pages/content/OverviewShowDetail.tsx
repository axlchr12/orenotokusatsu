import type { TokuItem } from '../../context';

type OverviewShowDetailProps = {
  tokuShow: TokuItem | null;
  currentLanguage: string;
};

export const OverviewShowDetail = ({
  tokuShow,
  currentLanguage,
}: OverviewShowDetailProps) => {
  return (
    <div className="max-h-96 overflow-y-auto">
      {!!tokuShow && (
        <div
          key={tokuShow.id}
          className="flex flex-col sm:flex-row items-center flex-wrap gap-3 p-2 rounded-xl transition-all mb-1 group"
        >
          <div className="w-48 h-full bg-gray-200 rounded-xl border border-gray-100">
            <img
              src={tokuShow.image || 'https://placehold.co/150'}
              className="w-full h-full object-cover"
              alt={tokuShow.title}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-800 leading-tight">
              [{tokuShow.type}-{tokuShow.year}]&nbsp;{tokuShow.title}
            </h4>

            <p className="text-[11px] text-gray-400 italic leading-tight">
              [{tokuShow.type}-{tokuShow.year}]&nbsp;
              {tokuShow.titleJapanese}
            </p>

            <p className="text-[15px] pt-2 text-gray-700 italic">
              {currentLanguage === 'ja'
                ? tokuShow.overviewJp
                : tokuShow.overview}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
