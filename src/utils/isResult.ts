import { IResult } from "../types/IResult";

export function isResult(value: any): value is IResult {
  return value && typeof value.opponent === 'string' && typeof value.won === 'boolean';
}