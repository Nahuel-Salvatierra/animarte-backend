import { RoleEnum } from 'src/module/user/user.entity';

export class LoginResponse {
  user: {
    userRole: Array<RoleEnum>;
    userId: number;
  };
  accessToken: string;
}
