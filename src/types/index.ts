export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
}
export interface Employee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  isActivated: boolean;
  role: UserRole;
  departmentInfo: {
    id: string;
    name: string;
    manager: {
      id: string;
      name: string | null;
    };
  };
}

export interface EmployeeFilter {
  name?: string;
  email?: string;
  phoneNumber?: string;
  isActivated?: boolean;
  role?: UserRole;
  departmentId?: string;
  hireDateFrom?: string;
  hireDateTo?: string;
}

export interface EmployeeRequest {
  name: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  departmentId: string;
  role: UserRole;
}

export interface EmployeeUpdateRequest {
  name: string;
  phoneNumber: string;
  departmentId: string;
  role: UserRole;
}

export interface Department {
  id: string;
  name: string;
  manager: {
    id: string;
    name: string;
  } | null;
  employeeCount: number;
}

export interface DepartmentFilter {
  name?: string;
  hasManager?: string;
  minEmployees?: string;
  maxEmployees?: string;
}

export interface DepartmentRequest {
  name: string;
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
