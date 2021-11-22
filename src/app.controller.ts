import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { CalculatorService } from './calculator/calculator.service';
import { HistoryInterceptor } from './history.interceptor';

@Controller()
@UseInterceptors(HistoryInterceptor)
export class AppController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get(':expression(*)')
  calculate(@Param('expression') expression): string {
    try {
      const result = this.calculatorService.calculate(expression);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
