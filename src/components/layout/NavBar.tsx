import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { iNavLinks, navLinks } from "../../consts/navLinks";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Outlet />
      <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-lg items-center justify-between gap-1 rounded-full border border-border bg-surface px-3 py-2.5 shadow-md sm:px-5">
          {navLinks.map((item: iNavLinks) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.link;
            return (
              <div
                key={item.id}
                className={`flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-0.5 transition-colors ${isActive ? "text-primary" : "text-text-secondary hover:text-primary"}`}
                onClick={() => navigate(item.link)}
              >
                <IconComponent size={18} strokeWidth={isActive ? 2.25 : 1.75} />
                <p className="max-w-full truncate text-[10px] font-medium">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
