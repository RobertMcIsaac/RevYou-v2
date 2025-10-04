export function escapeRegex(regexStr: string): string {
  return regexStr.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}
