import { UseApp } from '../../context';

export const TitleSelectionList = () => {
  const {} = UseApp();

  return (
    <div className="grid grid-cols-4 px-20 gap-2">
      {Array.from({ length: 12 }).map((data, index) => {
        return (
          <div className="">
            <img
              className=""
              src="https://pbs.twimg.com/media/HDg8hslaoAAwf41?format=jpg&name=small"
              key={index}
            />
          </div>
        );
      })}
    </div>
  );
};
