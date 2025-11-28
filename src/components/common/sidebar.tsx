import { cn } from "@/utils";
import { Link, type LinkProps } from "@tanstack/react-router";
import { CpuIcon, HomeIcon, type LucideProps } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-4 size-full bg-primary p-2 lg:p-4">
        <h2 className="text-2xl font-bold text-primary-foreground hidden lg:block">
          Abletech
        </h2>
        <nav className="size-full">
          <ul className="flex flex-col gap-4">
            <SidebarItem to="/" icon={HomeIcon} label={t("dashboard.title")} />
            <SidebarItem
              to="/machines"
              icon={CpuIcon}
              label={t("machines.title", { count: 2 })}
            />
          </ul>
        </nav>
      </div>
    </>
  );
};

const SidebarItem = ({
  to,
  icon,
  label,
}: {
  to: LinkProps["to"];
  icon: React.ComponentType<LucideProps>;
  label: string;
}) => {
  const Icon = icon;

  return (
    <Link to={to}>
      {({ isActive }) => (
        <li
          className={cn(
            "text-primary-foreground hover:bg-secondary/80 hover:text-secondary-foreground transition-all duration-300 rounded-md p-1 lg:p-2 flex items-center justify-center lg:justify-start gap-2",
            isActive && "bg-secondary text-secondary-foreground"
          )}
        >
          <Icon className="size-6" />
          <span className="hidden lg:block">{label}</span>
        </li>
      )}
    </Link>
  );
};
