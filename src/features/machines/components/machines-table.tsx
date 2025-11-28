import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  buttonVariants,
} from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { date_formats } from "@/config";
import { format } from "date-fns";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import type { Machine } from "../models";
import type { newMachineSchema } from "../validation";
import { MachineFormDialog } from "./machine-form-dialog";

type MachinesTableProps = {
  machines: Array<Machine>;
  onDeleteMachine: (uuid: string) => void;
  onUpdateMachine: (
    uuid: string,
    values: z.infer<typeof newMachineSchema>
  ) => void;
};

export const MachinesTable = ({
  machines,
  onDeleteMachine,
  onUpdateMachine,
}: MachinesTableProps) => {
  const { t } = useTranslation();

  const [deleteMachineDialog, setDeleteMachineDialog] = useState({
    uuid: "",
    open: false,
  });

  const [updateMachineDialog, setUpdateMachineDialog] = useState<{
    machine: Machine | undefined;
    open: boolean;
  }>({
    machine: undefined,
    open: false,
  });

  const handleUpdateMachine = (
    uuid: string,
    values: z.infer<typeof newMachineSchema>
  ) => {
    onUpdateMachine(uuid, values);
    setUpdateMachineDialog({ machine: undefined, open: false });
  };

  const calculateOperationalTotalHours = (machine: Machine) => {
    const now = new Date();
    const operationalDate = new Date(machine.operational_date);
    const hoursDifference = Math.floor(
      (now.getTime() - operationalDate.getTime()) / (1000 * 60 * 60)
    );
    return hoursDifference;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("machines.name")}</TableHead>
            <TableHead>{t("machines.customer")}</TableHead>
            <TableHead>{t("machines.operational_date")}</TableHead>
            <TableHead className="text-center">
              {t("machines.operational_total_hours")}
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(machines).map((machine) => (
            <TableRow key={machine.uuid}>
              <TableCell className="font-medium">{machine.name}</TableCell>
              <TableCell>{machine.customer}</TableCell>
              <TableCell>
                {format(
                  machine.operational_date,
                  date_formats.SHORT_DATE_FORMAT
                )}
              </TableCell>
              <TableCell className="text-center">
                {calculateOperationalTotalHours(machine)}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() =>
                    setUpdateMachineDialog({ machine, open: true })
                  }
                >
                  <PencilIcon />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() =>
                    setDeleteMachineDialog({ uuid: machine.uuid, open: true })
                  }
                >
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MachineFormDialog
        open={updateMachineDialog.open}
        onOpenChange={(open) =>
          setUpdateMachineDialog((prev) => ({ ...prev, open }))
        }
        machine={updateMachineDialog.machine}
        onFormSubmit={(values) =>
          updateMachineDialog.machine?.uuid &&
          handleUpdateMachine(updateMachineDialog.machine?.uuid, values)
        }
      />
      <AlertDialog
        open={deleteMachineDialog.open}
        onOpenChange={(open) =>
          setDeleteMachineDialog((prev) => ({ ...prev, open }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("machines.delete_machine.title")}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            {t("machines.delete_machine.description")}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("app.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDeleteMachine(deleteMachineDialog.uuid)}
              className={buttonVariants({ variant: "destructive" })}
            >
              {t("app.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
