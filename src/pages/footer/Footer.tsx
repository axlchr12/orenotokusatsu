const appName = import.meta.env.APP_NAME;
const appVersion = import.meta.env.APP_VERSION;

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section id="footer">
        <div id="copyright" className="flex items-center justify-center ">
          <span className="text-[13px] tracking-widest">
            &copy; {currentYear} {appName}-{appVersion}. All Rights Reserved. |
            <a
              href="https://github.com/axlchr12/orenotokusatsu/"
              className="text-amber-800 mx-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </span>
        </div>
      </section>
    </>
  );
};
