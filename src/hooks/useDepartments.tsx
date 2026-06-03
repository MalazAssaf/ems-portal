import { getDepartments, getDepartmentsWithPagination } from "@/api/department";
import { useQuery } from "@tanstack/react-query";

export function useDepartmentsWithPagination(page: number, size: number) {
  return useQuery({
    queryKey: ["departments", page, size],
    queryFn: () => getDepartmentsWithPagination(page, size),
  });
}

export function useDepartments() {
  return useQuery({
    queryKey: ["departments", "all"],
    queryFn: () => getDepartments(),
    staleTime: 1000 * 60 * 5,
  });
}
