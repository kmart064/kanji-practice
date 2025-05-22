export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function keysToCamel<T>(obj: any): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [snakeToCamel(key), val])
  ) as T;
}
