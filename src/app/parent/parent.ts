import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Medias } from '../media/models/media.model';
import { User } from '../user/user.model';
import { ProfilParents } from './models/parent.model';
import { Preference } from '../Preference/models/preference.model';
import { Parameter } from '../parameter/models/parameter.model';

export const ParentProviders = [
  {
    provide: 'PARENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ProfilParents),
    inject: ['DATA_SOURCE'],
  }
];
