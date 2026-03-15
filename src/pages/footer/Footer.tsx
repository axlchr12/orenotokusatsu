const appName = import.meta.env.APP_NAME;
const appVersion = import.meta.env.APP_VERSION;

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section id="footer">
        <div id="copyright">
          <span className="text-[13px] tracking-tighter">
            &copy; {currentYear} {appName}-{appVersion}. All Rights Reserved. |
            Inspired by&nbsp;
            <a
              href="https://otaku-song.pages.dev/"
              className="underline text-amber-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              俺のオタクソング9選
            </a>
          </span>
        </div>
      </section>
    </>
  );
};
