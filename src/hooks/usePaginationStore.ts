import { PagingResult } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define the shape of the pagination store's state
type PaginationState = {
  pagination: PagingResult; // Holds pagination data like current page, size, etc.
  setPagination: (count: number) => void; // Initializes pagination with a total item count
  setPage: (page: number) => void; // Updates the current page number
  setPageSize: (pageSize: number) => void; // Updates the number of items per page
};

// Create the Zustand store with middleware for devtools debugging
const usePaginationStore = create<PaginationState>()(
  devtools(
    (set) => ({
      pagination: {
        pageNumber: 1,
        pageSize: 12,
        totalCount: 0,
        totalPages: 1,
      },
      setPagination: (totalCount: number) =>
        set((state) => ({
          pagination: {
            pageNumber: 1,
            pageSize: state.pagination.pageSize, // Keep existing page size
            totalCount, // Set the total count
            totalPages: Math.ceil(totalCount / state.pagination.pageSize), // Calculate total pages
          },
        })),
      setPage: (page: number) =>
        set((state) => ({
          pagination: { ...state.pagination, pageNumber: page },
        })),
      // Set a new page size and recalculate total pages
      setPageSize: (pageSize: number) =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            pageSize: pageSize,
            pageNumber: 1,
            totalPages: Math.ceil(state.pagination.totalCount / pageSize),
          },
        })),
    }),
    { name: "paginationStoreDemo" } // Store name in devtools for easier debugging
  )
);

export default usePaginationStore;
