//your JS code here. If required.
const output = document.getElementById("output");

// Show loading row initially
output.innerHTML = `
  <tr id="loading">
    <td colspan="2">Loading...</td>
  </tr>
`;

// Function to create a promise with random delay
function createPromise(index) {
  const delay = (Math.random() * 2 + 1).toFixed(3); // between 1 and 3 seconds

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: `Promise ${index}`,
        time: parseFloat(delay),
      });
    }, delay * 1000);
  });
}

const startTime = performance.now();

const promises = [
  createPromise(1),
  createPromise(2),
  createPromise(3),
];

// Wait for all promises
Promise.all(promises).then((results) => {
  // Calculate total time
  const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

  output.innerHTML = "";

  results.forEach((result) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time.toFixed(3)}</td>
    `;

    output.appendChild(row);
  });

  // Add total row
  const totalRow = document.createElement("tr");

  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}</td>
  `;

  output.appendChild(totalRow);
});