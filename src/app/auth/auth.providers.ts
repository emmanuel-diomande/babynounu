import { DataSource } from 'typeorm';
import { User } from '../user/user.model';

export const AuthProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];