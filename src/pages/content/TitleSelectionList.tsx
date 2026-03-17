import { UseApp } from '../../context';

export const TitleSelectionList = () => {
  const {} = UseApp();

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sky-500 shadow-xs"
          >
            <span className="absolute top-2 left-3 text-sm font-bold text-black z-10">
              {index + 1}
            </span>

            <div className="text-black text-4xl font-light group-hover:text-blue-400 transition-colors">
              +
            </div>

            {/* Overlay image */}
            {/* <img
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              src="https://pbs.twimg.com/media/HDg8hslaoAAwf41?format=jpg&name=small"
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};
