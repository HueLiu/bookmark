import { useEffect, useRef } from "react";
import logo from "../assets/logo.svg?url";
import SidebarClose from "../assets/sidebar-close.svg";

// Mobile Off-Canvas Menu
const OffCanvasMenu: React.FC = () => {
  const offCanvasMenuRef = useRef<HTMLDivElement>(null);
  const offCanvasBackdropRef = useRef<HTMLDivElement>(null);
  const offCanvasContentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const openSidebarButtonRef = useRef<HTMLButtonElement>(null);
  const closeSidebarButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const openSidebar = () => {
      offCanvasMenuRef.current?.classList.remove("hidden");
      setTimeout(() => {
        offCanvasBackdropRef.current?.classList.add("opacity-100");
        offCanvasContentRef.current?.classList.add("translate-x-0");
      }, 10);
    };

    const closeSidebar = () => {
      offCanvasBackdropRef.current?.classList.remove("opacity-100");
      offCanvasContentRef.current?.classList.remove("translate-x-0");
      setTimeout(() => {
        offCanvasMenuRef.current?.classList.add("hidden");
      }, 300);
    };

    openSidebarButtonRef.current?.addEventListener("click", () => {
      openSidebar();
      const navigation = document.getElementById("navigation")?.cloneNode(true);
      if (navigation) {
        sidebarRef.current?.appendChild(navigation);
      }
    });
    closeSidebarButtonRef.current?.addEventListener("click", closeSidebar);
    offCanvasBackdropRef.current?.addEventListener("click", closeSidebar);
  }, []);

  return (
    <div
      ref={offCanvasMenuRef}
      className="relative z-50 lg:hidden hidden"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={offCanvasBackdropRef}
        className="fixed inset-0 bg-gray-900/80 opacity-0 transition-opacity ease-linear duration-300"
      ></div>
      <div className="fixed inset-0 flex">
        <div
          ref={offCanvasContentRef}
          className="relative mr-16 flex w-full max-w-xs flex-1 -translate-x-full transition ease-in-out duration-300 transform"
        >
          <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
            <button
              ref={closeSidebarButtonRef}
              type="button"
              className="-m-2.5 p-2.5"
            >
              <span className="sr-only">Close sidebar</span>
              <SidebarClose className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:pintree-bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img className="pl-2 h-8 w-auto" src={logo} alt="FTab" />
              <a className="ml-4 font-extrabold text-2xl dark:text-white">
                FTab
              </a>
            </div>
            <div ref={sidebarRef} className="flex flex-1 flex-col"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffCanvasMenu;
