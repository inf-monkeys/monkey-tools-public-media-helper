import { CacheModule } from '@/common/cache/cache.module';
import { LockModule } from '@/common/lock/lock.module';
import { Module } from '@nestjs/common';
import { PublicMediaHelperController } from './public-media-helper.controller';
import { PublicMediaHelperService } from './public-media-helper.service';

@Module({
  controllers: [PublicMediaHelperController],
  providers: [PublicMediaHelperService],
  imports: [CacheModule, LockModule],
})
export class PublicMediaHelperModule {}
