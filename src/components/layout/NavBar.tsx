import { Outlet, useNavigate } from "react-router-dom";
import { iNavLinks, navLinks } from "../../consts/navLinks";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Outlet />
      <div className="fixed bottom-5 flex justify-center w-full">
        <div className="flex justify-between px-6 py-5 gap-8 bg-surface rounded-full">
          {navLinks.map((item: iNavLinks) => {
            const IconComponent = item.icon;
            return (
              <div
                className="flex flex-col items-center gap-1 "
                onClick={() => navigate(item.link)}
              >
                <IconComponent size={24} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
