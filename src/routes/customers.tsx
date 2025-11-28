import { CustomersPage } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/customers")({
  component: CustomersPage,
});
