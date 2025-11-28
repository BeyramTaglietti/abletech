import { MachinesPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/machines")({
  component: MachinesPage,
});
