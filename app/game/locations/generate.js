export function randomGrid(size, weights) {
  const entries = Object.entries(weights);
  const total = entries.reduce((a, [, w]) => a + w, 0);
  if (total <= 0) throw new Error("Weights sum must be > 0");

  const grid = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      let r = Math.random() * total;
      let picked = entries[entries.length - 1][0];
      for (const [id, w] of entries) {
        r -= w;
        if (r <= 0) {
          picked = id;
          break;
        }
      }
      row.push(picked);
    }
    grid.push(row);
  }
  return grid;
}
