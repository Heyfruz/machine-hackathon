import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as Crypto from 'expo-crypto';

export interface Attributes {
  type: 'text' | 'date' | 'checkbox' | 'number';
  label: string;
  id: string;
  value?: string | boolean;
}

export interface Machine {
  id: string;
  name: string;
  attributes: Attributes[];
  titleField?: string;
}

interface FormValue {
  attributeId: string;
  machineId: string;
  label: string;
  value: string;
}

interface MachinesState {
  machines: Machine[];
  form: FormValue[];
}

const initialState: MachinesState = {
  form: [],
  machines: [],
};

const machinesSlice = createSlice({
  initialState,
  name: 'machines',
  reducers: {
    addBatchMachineAttributes: (
      state,
      action: PayloadAction<{ machineId: string }>,
    ) => {
      const { machineId } = action.payload;
      const machineToUpdate = state.machines.find(
        machine => machine.id === machineId,
      );

      if (machineToUpdate) {
        const newAttributes = machineToUpdate.attributes.map(attr => ({
          ...attr,
          id: Crypto.randomUUID(),
          value: '',
        }));

        machineToUpdate.attributes.push(...newAttributes);
      }
    },
    addMachine: (state, action: PayloadAction<Machine>) => {
      const existingMachine = state.machines.find(
        machine => machine.name === action.payload.name,
      );

      if (!existingMachine || action.payload.name === '') {
        state.machines.push(action.payload);
      }
    },
    addMachineAttribute: (
      state,
      action: PayloadAction<{ machineId: string; attribute: Attributes }>,
    ) => {
      const { machineId, attribute } = action.payload;
      const machineToUpdate = state.machines.find(
        machine => machine.id === machineId,
      );

      if (machineToUpdate) {
        machineToUpdate.attributes.push(attribute);
      }
    },
    deleteMachine: (state, action: PayloadAction<string>) => {
      state.machines = state.machines.filter(
        machine => machine.id !== action.payload,
      );
    },
    deleteMachineAttribute: (
      state,
      action: PayloadAction<{ machineId: string; attributeId: string }>,
    ) => {
      const { machineId, attributeId } = action.payload;
      const machineToUpdate = state.machines.find(
        machine => machine.id === machineId,
      );

      if (machineToUpdate) {
        machineToUpdate.attributes = machineToUpdate.attributes.filter(
          attribute => attribute.id !== attributeId,
        );
      }
    },
    editMachine: (state, action: PayloadAction<Machine>) => {
      const { id } = action.payload;

      const existingMachine = state.machines.find(machine => machine.id === id);
      if (existingMachine) {
        Object.assign(existingMachine, action.payload);
      }
    },
    updateFormValues: (state, action: PayloadAction<FormValue[]>) => {
      action.payload.forEach(formValue => {
        const { attributeId, machineId, label, value } = formValue;

        const machineToUpdate = state.machines.find(
          machine => machine.id === machineId,
        );

        if (machineToUpdate) {
          const attributeToUpdate = machineToUpdate.attributes.find(
            attribute => attribute.id === attributeId,
          );

          if (attributeToUpdate) {
            attributeToUpdate.value = value;
          } else {
            machineToUpdate.attributes.push({
              id: attributeId,
              label,
              type: 'text',
              value,
            });
          }
        }
      });
    },
    updateMachineAttribute: (
      state,
      action: PayloadAction<{
        machineId: string;
        attributeId: string;
        attribute: Attributes;
      }>,
    ) => {
      const { machineId, attributeId, attribute } = action.payload;
      const machineToUpdate = state.machines.find(
        machine => machine.id === machineId,
      );

      if (machineToUpdate) {
        const attributeToUpdate = machineToUpdate.attributes.find(
          attr => attr.id === attributeId,
        );

        if (attributeToUpdate) {
          attributeToUpdate.type = attribute.type;
          attributeToUpdate.label = attribute.label;
        }
      }
    },
    updateMachineAttributeValue: (
      state,
      action: PayloadAction<{
        machineId: string;
        attributeId: string;
        value: string | boolean;
      }>,
    ) => {
      const { machineId, attributeId, value } = action.payload;
      const machineToUpdate = state.machines.find(
        machine => machine.id === machineId,
      );

      if (machineToUpdate) {
        const attributeToUpdate = machineToUpdate.attributes.find(
          attr => attr.id === attributeId,
        );

        if (attributeToUpdate) {
          attributeToUpdate.value = value;
        }
      }
    },
    updateMachineName: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      const { id, name } = action.payload;
      const machineToUpdate = state.machines.find(machine => machine.id === id);

      if (machineToUpdate) {
        machineToUpdate.name = name;
      }
    },
    updateMachineTitleField: (
      state,
      action: PayloadAction<{ machineId: string; titleField: string }>,
    ) => {
      const { payload } = action;
      const machineToUpdate = state.machines.find(
        machine => machine.id === payload.machineId,
      );

      if (machineToUpdate) {
        machineToUpdate.titleField = payload.titleField;
      }
    },
  },
});

export const {
  addMachine,
  editMachine,
  deleteMachine,
  updateMachineName,
  addBatchMachineAttributes,
  updateMachineTitleField,
  updateMachineAttribute,
  updateMachineAttributeValue,
  deleteMachineAttribute,
  updateFormValues,
  addMachineAttribute,
} = machinesSlice.actions;

export default machinesSlice.reducer;
