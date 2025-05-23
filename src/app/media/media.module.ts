import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaProviders } from './media';
import { DatabaseModule } from 'src/database/database.module';
import { ParameterService } from '../parameter/parameter.service';
import { ParameterModule } from '../parameter/parameter.module';
import { NounusService } from '../nounus/nounus.service';
import { ParentsService } from '../parent/parent.service';
import { PreferenceService } from '../Preference/preference.service';
import { ParameterProviders } from '../parameter/parameter';
import { NounusProviders } from '../nounus/nounus';
import { ParentProviders } from '../parent/parent.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    ParameterService,
    // NounusService,
    // ...NounusProviders,
    // ParentsService,
    // ...ParentProviders,
    ...ParameterProviders,
    ...MediaProviders,
  ],
})
export class MediaModule {}
