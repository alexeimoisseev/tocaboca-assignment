import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CalculatorService } from './calculator/calculator.service';
import { HistoryInterceptor } from './history.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CalculatorService, HistoryInterceptor],
})
export class AppModule {}
