import { DatePicker } from "@/components/common";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
} from "@/components/ui";
import { useForm } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import type { Machine } from "../models";
import { newMachineSchema } from "../validation";

type MachineFormDialogProps = {
  machine?: Machine;
  onFormSubmit: (values: z.infer<typeof newMachineSchema>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const MachineFormDialog = ({
  machine,
  onFormSubmit,
  open,
  onOpenChange,
}: MachineFormDialogProps) => {
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      name: machine?.name ?? "",
      customer: machine?.customer ?? "",
      operational_date: machine?.operational_date,
    } as z.infer<typeof newMachineSchema>,
    validators: {
      onChange: newMachineSchema,
    },
    onSubmit: ({ value }) => {
      form.reset();
      onOpenChange(false);
      onFormSubmit(value);
    },
  });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {machine ? t("machines.edit_machine") : t("machines.new_machine")}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldSet>
              <FieldGroup>
                <Field>
                  <form.Field name="name">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            {t("machines.name")}
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder={t("machines.name")}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </Field>
                <Field>
                  <form.Field name="customer">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            {t("machines.customer")}
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder={t("machines.customer")}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </Field>
                <Field>
                  <form.Field name="operational_date">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            {t("machines.operational_date")}
                          </FieldLabel>
                          <DatePicker
                            id={field.name}
                            date={
                              field.state.value
                                ? new Date(field.state.value)
                                : undefined
                            }
                            setDate={(date) =>
                              field.handleChange(
                                date?.toISOString() ?? new Date().toISOString()
                              )
                            }
                            popoverProps={{
                              modal: true,
                            }}
                            calendarProps={{
                              disabled: {
                                after: new Date(),
                              },
                            }}
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </Field>
              </FieldGroup>
            </FieldSet>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  {t("app.cancel")}
                </Button>
              </DialogClose>
              <form.Subscribe
                selector={(state) => [
                  state.isSubmitting,
                  state.canSubmit,
                  state.isDirty,
                ]}
              >
                {([isSubmitting, canSubmit, isDirty]) => (
                  <Button
                    type="submit"
                    disabled={isSubmitting || !canSubmit || !isDirty}
                  >
                    {machine ? t("app.update") : t("app.create")}
                  </Button>
                )}
              </form.Subscribe>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
