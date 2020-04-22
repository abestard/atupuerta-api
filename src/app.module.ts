import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    UserModule, 
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost/nest-app-test',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
