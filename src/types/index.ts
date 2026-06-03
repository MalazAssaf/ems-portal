export interface Employee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  isActivated: boolean;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  departmentInfo: {
    id: string;
    name: string;
    manager: {
      id: string;
      name: string | null;
    };
  };
}

export interface EmployeeRequest {
  name: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  departmentId: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
}

export interface EmployeeUpdateRequest {
  name: string;
  phoneNumber: string;
  departmentId: string;
  role: "MANAGER" | "EMPLOYEE" | "ADMIN";
}

export interface Department {
  id: string;
  name: string;
  manager: {
    id: string;
    name: string;
  } | null;
}

export interface PaginatedResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  nextPage: string | null;
  previousPage: string | null;
}
