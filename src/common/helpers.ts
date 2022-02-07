export function EncodeURI(url: string, items: string[]): string {
  return items.reduce((prev, curr, index) => {
    if (!index) {
      prev = `${prev}?ids=${curr}`;
    }
    prev = `${prev},${curr}`;
    return prev;
  }, url);
}
