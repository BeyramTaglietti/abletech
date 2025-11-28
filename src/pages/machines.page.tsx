import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui";
import {
  MachineFormDialog,
  MachinesTable,
} from "@/features/machines/components";
import {
  machinesStore,
  machinesStoreActions,
} from "@/features/machines/stores";
import type { newMachineSchema } from "@/features/machines/validation";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnapshot } from "valtio";
import { z } from "zod";

export const MachinesPage = () => {
  const { t } = useTranslation();

  const machinesStoreSnapshot = useSnapshot(machinesStore);

  const [search, setSearch] = useState("");

  const [newMachineDialogOpen, setNewMachineDialogOpen] = useState(false);

  // ovviamente andrebbe fatto lato server e con debounce
  const filteredMachines = Object.values(machinesStoreSnapshot.machines).filter(
    (machine) =>
      machine.name.toLowerCase().includes(search.toLowerCase()) ||
      machine.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddMachine = (values: z.infer<typeof newMachineSchema>) => {
    machinesStoreActions.addMachine(values);
  };

  const handleDeleteMachine = (uuid: string) => {
    machinesStoreActions.removeMachine(uuid);
  };

  const handleUpdateMachine = (
    uuid: string,
    values: z.infer<typeof newMachineSchema>
  ) => {
    machinesStoreActions.updateMachine(uuid, values);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          {t("machines.title", { count: 1 })}
        </h1>
        <div className="flex items-center justify-between gap-4">
          <InputGroup>
            <InputGroupInput
              placeholder={t("app.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton>
                {filteredMachines.length}{" "}
                {t("machines.title", { count: filteredMachines.length })}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <Button onClick={() => setNewMachineDialogOpen(true)}>
            {t("machines.new_machine")}
          </Button>
        </div>
        <MachinesTable
          machines={filteredMachines}
          onDeleteMachine={handleDeleteMachine}
          onUpdateMachine={handleUpdateMachine}
        />
        <MachineFormDialog
          onFormSubmit={handleAddMachine}
          open={newMachineDialogOpen}
          onOpenChange={setNewMachineDialogOpen}
        />
      </div>
    </>
  );
};
