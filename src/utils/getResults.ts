import { IResult } from "../types/IResult";
import { isResult } from "./isResult";

export const getResults: () => IResult[] = () => {
  const results = localStorage.getItem('results');
  if (results) {
    const parsedResults = JSON.parse(results) as IResult[];
    if (parsedResults.find((r) => !isResult(r))) {
      localStorage.removeItem('results');
      return [];
    }
    return parsedResults as IResult[];
  } else {
    return [];
  }
}