module.exports = function groupBy(arr, by) {
  // Initialize obj to hold grouped values
  const grouped = {}

  for (let val of arr) {
    let key
    if (typeof by === "function") {
        // Apply function to val to get key
        key = by(val)
    } else if (typeof by === "string") {
        // Use property of val to get key
        key = val[by]
    }

    if (Array.isArray(grouped[key])) {
        grouped[key].append(val)
    } else {
        grouped[key] = [val]
    }
  }

  // Return grouped items
  return grouped
}