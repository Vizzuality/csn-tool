export function unslug(string) {
  string = string.charAt(0).toUpperCase() + string.slice(1);
  return string.split('-').join(' ');
}
