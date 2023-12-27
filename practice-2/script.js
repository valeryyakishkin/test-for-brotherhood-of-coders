function createTable(data) {
  const table = document.createElement("table");
  const trHead = document.createElement("tr");

  for (let key in data[0]) {
    th = document.createElement("th");
    th.textContent = key;
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
      document.body.appendChild(table);
    });
}

getData();
