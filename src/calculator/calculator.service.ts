import { Injectable } from '@nestjs/common';
import { evalExpression } from '@hkh12/node-calc';

@Injectable()
export class CalculatorService {
  calculate(expression: string): string {
    const result = evalExpression(expression);
    return String(result);
  }
}
