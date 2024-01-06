import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'rolesKey';
export const Roles = (...role: [string]) => SetMetadata(ROLES_KEY, role);
