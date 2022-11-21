import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { TravelModule } from './travel/travel.module';
import { Plan } from './travel/entities/plan.entity';
import { Diary } from './travel/entities/diary.eneity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [User, Plan, Diary],
    }),
    UsersModule,
    CommonModule,
    AuthModule,
    TravelModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
