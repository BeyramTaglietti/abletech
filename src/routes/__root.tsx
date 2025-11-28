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
        <div className="w-14 lg:w-80 h-full transition-all duration-300">
          <Sidebar />
        </div>
        <main className="w-[calc(100%-3.5rem)] lg:w-[calc(100%-20rem)] px-4 py-6 transition-all duration-300">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
