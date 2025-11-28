import { Sidebar } from "@/components/common";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex flex-row size-full h-dvh w-dvw">
        <div className="w-120 h-full">
          <Sidebar />
        </div>
        <main className="size-full px-4 py-6">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
