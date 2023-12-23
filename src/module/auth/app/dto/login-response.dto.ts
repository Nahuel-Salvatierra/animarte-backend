import { RoleEnum } from 'src/module/user/domain/user.entity';

export class LoginResponse {
  user: {
    userRole: Array<RoleEnum>;
    userId: number;
  };
  accessToken: string;
}
