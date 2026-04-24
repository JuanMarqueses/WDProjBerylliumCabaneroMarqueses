let lineup = JSON.parse(localStorage.getItem("lineup")) || [];
let editIndex = -1;

function saveData() {
  localStorage.setItem("lineup", JSON.stringify(lineup));
}

function displayLineup() {
  const container = document.getElementById("lineup");
  container.innerHTML = "";

  lineup.forEach((player, index) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${player.name}</strong> (${player.position})<br>
      <button onclick="editPlayer(${index})">Edit</button>
      <button onclick="deletePlayer(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

function addPlayer() {
  const name = document.getElementById("playerName").value;
  const position = document.getElementById("position").value;

  if (!name || !position) {
    alert("Fill all fields!");
    return;
  }

  if (editIndex === -1) {
    if (lineup.length >= 5) {
      alert("Lineup can only have 5 players!");
      return;
    }
    lineup.push({ name, position });
  } else {
    lineup[editIndex] = { name, position };
    editIndex = -1;
  }

  saveData();
  displayLineup();

  document.getElementById("playerName").value = "";
  document.getElementById("position").value = "";
}

function editPlayer(index) {
  const player = lineup[index];
  document.getElementById("playerName").value = player.name;
  document.getElementById("position").value = player.position;
  editIndex = index;
}

function deletePlayer(index) {
  if (confirm("Remove this player?")) {
    lineup.splice(index, 1);
    saveData();
    displayLineup();
  }
}

displayLineup();