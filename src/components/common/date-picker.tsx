import { cn } from "@/utils";
import { format } from "date-fns";
import { CalendarFold } from "lucide-react";
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui";

type DatePickerProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  id: string;
  popoverProps?: ComponentProps<typeof Popover>;
  calendarProps?: Omit<
    ComponentProps<typeof Calendar>,
    "onSelect" | "mode" | "defaultMonth" | "selected" | "initialFocus"
  >;
};

export const DatePicker = ({
  date,
  setDate,
  id,
  popoverProps,
  calendarProps,
}: DatePickerProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Popover {...popoverProps}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal rounded-sm",
              !date && "text-muted-foreground"
            )}
            id={id}
          >
            {date ? (
              format(date, "d MMMM y")
            ) : (
              <span>{t("app.pick_date")}</span>
            )}
            <CalendarFold className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            autoFocus
            captionLayout="dropdown"
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
