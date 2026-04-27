import type { Role } from '../../types/User';

const roleToColor: Record<Role, string> = {
  Publisher: 'success',
  User: 'info',
  Admin: 'warning',
};

export default roleToColor;
