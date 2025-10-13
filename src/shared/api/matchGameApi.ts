import { generateDynamicLevel } from "../helpers/matchGameHelpers";

export function fetchLevel(level: number) {
  const PAIRS_PER_LEVEL = 5;
  return generateDynamicLevel(level, PAIRS_PER_LEVEL);
}


