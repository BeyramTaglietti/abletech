import { machinesStore } from "@/features/machines/stores";
import { Link } from "@tanstack/react-router";
import { CpuIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSnapshot } from "valtio";

export const IndexPage = () => {
  const { t } = useTranslation();

  const machinesStoreSnapshot = useSnapshot(machinesStore);

  const totalMachines = Object.keys(machinesStoreSnapshot.machines).length;

  return (
    <>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("dashboard.title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("dashboard.subtitle")}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/machines"
            className="group overflow-hidden rounded-xl border-2 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 flex items-center justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                {t("dashboard.total")}{" "}
                {t("machines.title", { count: totalMachines })}
              </span>
              <span className="text-4xl font-bold tabular-nums tracking-tight">
                {totalMachines}
              </span>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <CpuIcon className="h-6 w-6" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
