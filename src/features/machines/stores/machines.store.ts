import { proxy, subscribe } from "valtio";
import type { Machine } from "../models";

type Store = {
  machines: Record<string, Machine>;
};

const storePersistConfig = {
  key: "machines_store",
  getStorage: () => localStorage.getItem(storePersistConfig.key),
};

const DEFAULT: Store = JSON.parse(
  localStorage.getItem(storePersistConfig.key) ||
    JSON.stringify({
      machines: {},
    })
);

export const machinesStore = proxy<Store>(DEFAULT);

subscribe(machinesStore, () => {
  localStorage.setItem(storePersistConfig.key, JSON.stringify(machinesStore));
});

export const machinesStoreActions = {
  addMachine: (machine: Omit<Machine, "uuid">) => {
    const newUuid = crypto.randomUUID();
    machinesStore.machines[newUuid] = { ...machine, uuid: newUuid };
  },
  removeMachine: (uuid: string) => {
    delete machinesStore.machines[uuid];
  },
  updateMachine: (uuid: string, machine: Omit<Machine, "uuid">) => {
    machinesStore.machines[uuid] = { ...machine, uuid };
  },
};
