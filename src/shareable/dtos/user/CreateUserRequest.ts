// src/shareable/dtos/user/CreateUserRequest.ts

export default class CreateUserRequest {
  name: string;
  email: string;
  password: string;
  roleId: string;

  constructor(body: any) {
    this.name = body.name;
    this.email = body.email;
    this.password = body.password;
    this.roleId = body.roleId;
  }

  isValid(): boolean {
    return !!this.name && !!this.email && !!this.password && !!this.roleId;
  }

  getValidationErrors(): string[] {
    const errors: string[] = [];
    if (!this.name) errors.push('Name is required');
    if (!this.email) errors.push('Email is required');
    if (!this.password) errors.push('Password is required');
    if (!this.roleId) errors.push('Role ID is required');
    return errors;
  }
}
