function createTable(data) {
  const table = document.createElement("table");
  const trHead = document.createElement("tr");

  for (let key in data[0]) {
    th = document.createElement("th");
    th.textContent = key;
    th.addEventListener("click", sortTable);
    trHead.appendChild(th);
  }

  table.appendChild(trHead);

  for (let obj of data) {
    const tr = document.createElement("tr");

    for (let key in obj) {
      const td = document.createElement("td");
      td.textContent = obj[key];
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  return table;
}

function getData() {
  const data = fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const table = createTable(data);
      const input = createInput();
      document.body.appendChild(input);

      input.addEventListener("input", function () {
        const value = this.value.toUpperCase();

        if (value.length >= 3) {
          const rows = table.querySelectorAll("tr:not(:first-child)");

          for (let row of rows) {
            let found = false;
            const cells = row.querySelectorAll("td");

            for (let cell of cells) {
              const text = cell.textContent.toUpperCase();

              if (text.includes(value)) {
                found = true;
                break;
              }
            }

            if (!found) {
              row.style.display = "none";
            } else {
              row.style.display = "";
            }
          }
        }
      });

      document.body.appendChild(table);
      res = data;
    });
}

function sortTable(event) {
  const th = event.target;
  const col = th.cellIndex;
  const table = th.closest("table");
  const rows = Array.from(table.rows).slice(1);
  let order = th.dataset.order || "asc";
  order = order === "asc" ? "desc" : "asc";
  th.dataset.order = order;

  rows.sort((a, b) => {
    const x = a.cells[col].textContent;
    const y = b.cells[col].textContent;

    if (!isNaN(x) && !isNaN(y)) {
      return order === "asc" ? x - y : y - x;
    } else {
      return order === "asc" ? x.localeCompare(y) : y.localeCompare(x);
    }
  });

  for (let row of rows) {
    table.appendChild(row);
  }
}

function createInput() {
  const input = document.createElement("input");
  input.placeholder = "Введите текст для поиска...";
  return input;
}

getData();
