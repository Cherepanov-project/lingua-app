import { generateDynamicLevel } from "../helpers/matchGameHelpers";

export function fetchLevel(level: number) {
  return generateDynamicLevel(level);
}


