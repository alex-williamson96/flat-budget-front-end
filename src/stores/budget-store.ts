import { create } from "zustand";
import { Budget } from "../routes/budget";

interface BudgetState {
  month: string;
  year: string;
  budgetDollar: number;
  budgetCents: number;
  assignedDollar: number;
  assignedCents: number;
  setBudgetDollar: (amount: number) => void;
  setBudgetCents: (amount: number) => void;
  setAssignedDollar: (amount: number) => void;
  setAssignedCents: (amount: number) => void;
  updateAssignedDollar: (amount: number) => void;
  updateAssignedCents: (amount: number) => void;
  setMonth: (newMonth: string) => void;
  setYear: (newYear: string) => void;
}

const date = new Date();

const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const useBudgetStore = create<BudgetState>()((set) => ({
  month: months[date.getMonth()],
  year: date.getFullYear().toString(),
  budgetDollar: 0,
  budgetCents: 0,
  assignedDollar: 0,
  assignedCents: 0,
  setBudgetDollar: (amount: number) => set({ budgetDollar: amount }),
  setBudgetCents: (amount: number) => set({ budgetCents: amount }),
  setAssignedDollar: (amount: number) => set({ assignedDollar: amount }),
  setAssignedCents: (amount: number) => set({ assignedCents: amount }),
  updateAssignedDollar: (amount: number) =>
    set((state) => ({ assignedDollar: state.assignedDollar + amount })),
  updateAssignedCents: (amount: number) =>
    set((state) => ({ assignedCents: state.assignedCents + amount })),
  setMonth: (newMonth: string) => set({ month: newMonth }),
  setYear: (newYear: string) => set({ year: newYear }),
}));

export default useBudgetStore;
