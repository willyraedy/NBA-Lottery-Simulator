export default function generateArray(start, end) {
  const seasonsArray = [];
  for (let i = start; i <= end; i++) {
    seasonsArray.push(i);
  }
  return seasonsArray;
}
