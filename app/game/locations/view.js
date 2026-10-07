export const BASE_SIZE = 20;

export function viewSize(level) {
  return 8 + level * 2;
}

export function viewGrid(grid, level) {
  const size = viewSize(level);
  const offset = (BASE_SIZE - size) / 2;
  const out = [];
  for (let y = 0; y < size; y++) {
    out.push(grid[offset + y].slice(offset, offset + size));
  }
  return out;
}
