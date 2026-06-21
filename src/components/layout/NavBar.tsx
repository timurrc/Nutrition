import { Outlet, useNavigate } from "react-router-dom";
import { iNavLinks, navLinks } from "../../consts/navLinks";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Outlet />
      <div className=" fixed bottom-0 w-full flex justify-between px-4 pt-4 pb-5 bg-[#161B22]">
        {navLinks.map((item: iNavLinks) => {
          const IconComponent = item.icon;
          return (
            <div
              className="flex flex-col items-center gap-1"
              onClick={() => navigate(item.link)}
            >
              <IconComponent size={24} />
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
