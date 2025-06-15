import { UserFilters } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type FilterState = {
  // 'filters' holds all the user-selected filter values
  filters: UserFilters;
  // 'setFilters' is a function to update a specific filter by name
  setFilters: (
    filterName: keyof FilterState["filters"], // name of the filter to update
    value: string | number[] | string[] | boolean       // new value for the filter
  ) => void;
};

// Create the Zustand store
const useFilterStore = create<FilterState>()(
  devtools((set) => ({
     // Initial state for filters
    filters: {
      ageRange: [18, 100],
      gender: ["male", "female"],
      orderBy: "updated",
      withPhoto: true
    },
     // Function to update a specific filter dynamically
    setFilters: (filterName, value) =>
      set((state) => {
        return {
          filters: { ...state.filters, [filterName]: value },
        };
      }),
  }))
);

export default useFilterStore;
