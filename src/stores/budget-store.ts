import { create } from "zustand";

interface BudgetState {
  month: string;
  year: string;
  setMonth: (newMonth: string) => void;
  setYear: (newYear: string) => void;
}

const date = new Date();

const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];


const useBudgetStore = create<BudgetState>()((set) => ({
  month: months[date.getMonth()],
  year: date.getFullYear().toString(),
  setMonth: (newMonth: string) => set({ month: newMonth }),
  setYear: (newYear: string) => set({ year: newYear }),
}));

export default useBudgetStore;
