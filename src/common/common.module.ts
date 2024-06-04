import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BcryptUtil } from './utils/bcrypt.util';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [BcryptUtil],
  exports: [BcryptUtil],
})
export class CommonModule {}