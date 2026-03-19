const appName = import.meta.env.APP_NAME;
const appVersion = import.meta.env.APP_VERSION;

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="w-full mt-5 border-gray-200">
      <div className="flex flex-col items-center justify-center gap-1.5">
        <p className="text-[9.5px] sm:text-[13px] tracking-[0.2em] text-center text-gray-500 uppercase font-bold">
          &copy; {currentYear} {appName}-{appVersion}. All Rights Reserved.
        </p>

        <div className="flex items-center">
          <a
            href="https://github.com/axlchr12/orenotokusatsu/"
            className="text-sky-800 text-[13px] font-semibold hover:text-sky-500 transition-colors hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github・
          </a>
          <a
            href="https://x.com/axlchr12"
            className="text-sky-800 text-[13px] font-semibold hover:text-sky-500 transition-colors hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            X (Twitter)
          </a>
        </div>
      </div>
    </footer>
  );
};
