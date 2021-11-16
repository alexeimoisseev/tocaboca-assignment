import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate basic operations', () => {
    expect(service.calculate('1+2')).toBe('3');
    expect(service.calculate('2-1')).toBe('1');
    expect(service.calculate('2*3')).toBe('6');
    expect(service.calculate('6/2')).toBe('3');
    expect(service.calculate('-1+1')).toBe('0');
  });

  it('should consider floating points', () => {
    expect(service.calculate('1.5*2')).toBe('3');
    expect(service.calculate('-.5 * 2')).toBe('-1');
  });

  it('should consider parenthesis', () => {
    expect(service.calculate('(1+2)*2')).toBe('6');
    expect(service.calculate('(3+5)/(4-2)')).toBe('4');
    expect(service.calculate('(5*(3+1)-2)*(3+1)')).toBe('72');
  });

  it('should throw error with invalid input', () => {
    expect(() => {
      service.calculate('1a+2') 
    }).toThrow(Error);

    expect(() => {
      service.calculate('') 
    }).toThrow(Error);
  });

  it('should throw error when expression doesnt make sense', () => {
    expect(() => {
      service.calculate('1*') 
    }).toThrow(Error);
  });

  it('should not divide by zero', () => {
    expect(() => {
      service.calculate('1/0');
    }).toThrow(Error);
    
    expect(() => {
      service.calculate('1/(1-1)');
    }).toThrow(Error);

  });

  it('shoud fail to execute js', () => {
    expect(() => {
      service.calculate('1+2; (() => {})()');
    }).toThrow(Error);

    let t = 'foo';
    expect(() => {
      service.calculate('1+2; t = "bar";');
    }).toThrow(Error);

    expect(() => {
      service.calculate('t = "baz"');
    }).toThrow(Error);

    try {
      service.calculate('t = "fizz"');
    } catch (e) {

    }
    expect(t).toBe('foo');

  });
});
