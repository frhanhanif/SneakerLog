import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router";
import {
    ChevronDownIcon,
    GridIcon,
    ListBulletIcon,
    TableIcon,
  } from "../../icons";
import { useSidebar } from "../../context/SidebarContext";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { icon?: React.ReactNode, name: string; path: string;}[];
  };
  
const navItems: NavItem[] = [
    {
        icon: <ListBulletIcon />,
        name: "Sneaker Collection",
        // path: "/sneaker-list"
        subItems: [
          {
            name:"Card View",
            icon:<GridIcon/>,
            path:"/sneaker-list"
          },
          {
            name:"Table View",
            icon:<TableIcon/>,
            path:"sneaker-table"
          }
        ]
    },
];
  
const SidebarMenu: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered } = useSidebar();
    
    const location = useLocation();

    const [openSubmenu, setOpenSubmenu] = useState<{index: number} | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const isActive = useCallback(
        (path: string) => location.pathname === path,
        [location.pathname]
    );

    /*
    Toggles a submenu open or closed when the user clicks on it.
    index: which submenu is being clicked
    prevOpenSubmenu: the previous state of the submenu.
    Check prevOpenSubmenu is already open (not Null),
    and if it is the same submenu, it will Close (return null, it means user clicks twice the same submenu).
    If different, it sets to another index, meaning only one submenu can be open at a time.
    */
    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (prevOpenSubmenu && prevOpenSubmenu.index === index) {
                return null;
            }
            return { index };
        });
    };

    const submenuDropdown = (nav:NavItem,index:number) => (
        <button
        onClick={() => handleSubmenuToggle(index)}
        className={`menu-item group ${
            openSubmenu?.index === index
            ? "menu-item-active"
            : "menu-item-inactive"
            } cursor-pointer ${
            !isExpanded && !isHovered
                ? "lg:justify-center"
                : "lg:justify-start"
            }`}
        >
        <span className={`menu-item-icon-size ${openSubmenu?.index === index
              ? "menu-item-icon-active"
              : "menu-item-icon-inactive"
          }`}
        >
          {nav.icon}
        </span>
        {(isExpanded || isHovered || isMobileOpen) && (
          <span>{nav.name}</span>
        )}
        {(isExpanded || isHovered || isMobileOpen) && (
          <ChevronDownIcon
            className={`ml-auto w-5 h-5 transition-transform duration-200 ${
              
              openSubmenu?.index === index
                ? "rotate-180 text-brand-500"
                : ""
            }`}
          />
        )}
      </button>
    )

    const submenuItem = (nav:NavItem,index:number) => (
        <>
            {(isExpanded || isHovered || isMobileOpen) && (
                <div
                ref={(el) => {subMenuRefs.current[`${index}`] = el}}
                className="overflow-hidden transition-all duration-300"
                style={{
                    height: openSubmenu?.index === index ? `${subMenuHeight[`${index}`]}px` : "0px",
                }}
                >
                <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems?.map((subItem) => (
                    <li key={subItem.name}>
                        <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                            isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"
                        }`}
                        >
                        {subItem.icon}
                        {subItem.name}
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>
                
            )}
        </>
    )

    useEffect(
        () => {
        if (openSubmenu !== null) {
          const key = `${openSubmenu.index}`;
          if (subMenuRefs.current[key]) {
            setSubMenuHeight((prevHeights) => ({
              ...prevHeights,
              [key]: subMenuRefs.current[key]?.scrollHeight || 0,
            }));
          }
        }
      }, [openSubmenu]
    );

    return (
        <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
                <li key={nav.name}>
                    {/* If submenu exists, render dropdown button & submenu item */}
                    {nav.subItems ? (
                        <>
                            {submenuDropdown(nav,index)}
                            {submenuItem(nav,index)}
                        </>
                        ) : (
                        /* If no submenu, render as a normal link */
                        nav.path && (
                        <Link
                            to={nav.path}
                            className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
                        >
                            <span
                                className={`menu-item-icon-size ${
                                    isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && <span className="text-base">{nav.name}</span>}
                        </Link>
                        )
                    )}
                </li>
            ))}
        </ul>
    )
}


export default SidebarMenu;