import { Link } from "react-router";
import { useSidebar } from "../../context/SidebarContext";
import SidebarMenu from "./SidebarMenu";


const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-4 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[250px]"
            : isHovered
            ? "w-[250px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <h1 className="text-3xl font-bold text-brand-500 dark:text-brand-400">
                SneakerLog
              </h1>
            </>
          ) : (
            <h1 className="text-3xl font-bold text-brand-500 dark:text-brand-400">
              S
            </h1>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <SidebarMenu/>
      </div>
    </aside>
  );
};

export default AppSidebar;
