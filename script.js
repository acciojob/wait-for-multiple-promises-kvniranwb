const output = document.getElementById("output");

// Initial loading row
output.innerHTML = `
  <tr id="loading">
    <td colspan="2">Loading...</td>
  </tr>
`;

// Function to create promise
function createPromise(index) {
  const delay = Math.floor(Math.random() * 3) + 1; // 1-3 seconds

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: `Promise ${index}`,
        time: delay,
      });
    }, delay * 1000);
  });
}

// Create promises
const promises = [
  createPromise(1),
  createPromise(2),
  createPromise(3),
];

// Wait for all promises
Promise.all(promises).then((results) => {
  // Remove loading row
  output.innerHTML = "";

  // Add rows for each promise
  results.forEach((result) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time}</td>
    `;

    output.appendChild(row);
  });

  // Calculate total time (maximum delay)
  const totalTime = Math.max(...results.map((r) => r.time));

  // Add total row
  const totalRow = document.createElement("tr");

  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime.toFixed(3)}</td>
  `;

  output.appendChild(totalRow);
});