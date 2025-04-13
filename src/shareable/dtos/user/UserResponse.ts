import { RoleResponse } from "../role/RoleResponse";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: RoleResponse;
  createdAt: Date;
}
