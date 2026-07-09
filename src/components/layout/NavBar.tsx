import { Outlet, useNavigate } from "react-router-dom";
import { iNavLinks, navLinks } from "../../consts/navLinks";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Outlet />
      <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-lg items-center justify-between rounded-full border border-border bg-surface px-6 py-3 shadow-md">
          {navLinks.map((item: iNavLinks) => {
            const IconComponent = item.icon;
            return (
              <div
                className="flex cursor-pointer flex-col items-center gap-1 text-text-secondary transition-colors hover:text-primary"
                onClick={() => navigate(item.link)}
              >
                <IconComponent size={22} strokeWidth={1.75} />
                <p className="text-xs font-medium">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
