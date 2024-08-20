const Footer: React.FC = () => {
  return (
    <footer className="bg-white w-full dark:pintree-bg-gray-900">
      <div className="mx-auto px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400 flex justify-center items-center">
            &copy; <span id="currentYear"></span>&nbsp;Built with
            <a
              href="https://github.com/HueLiu/ftab"
              className="text-blue-600 hover:text-blue-500 flex items-center ml-1"
              target="_blank"
            >
              FTab
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
