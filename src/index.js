function shuffle() {
  let results = document.querySelector("#results");
  results.innerHTML = "";

  let members = document
    .querySelector("#members")
    .value.replace(/\r?\n/g, "")
    .split(",");
  let s = shuffleArray(members);
  let group = getGroup(s);

  for (var i = 0; i < group.length; i++) {
    var col = document.createElement("div");
    col.className = "col s12 m6";
    results.appendChild(col);

    var ul = document.createElement("ul");
    ul.className = "collection with-header";
    col.appendChild(ul);

    var color = getColor();
    var liHeader = document.createElement("li");
    liHeader.className = `collection-item lighten-4 ${color}`;
    ul.appendChild(liHeader);

    var h4 = document.createElement("h4");
    h4.textContent = "Group " + (i + 1);
    liHeader.appendChild(h4);

    for (var j = 0; j < group[i].length; j++) {
      var li = document.createElement("li");
      li.className = "collection-item lighten-5 gray";
      li.textContent = group[i][j];
      ul.appendChild(li);
    }
  }

  let history = toHistory(group);
  addHistory(history);
}

function shuffleArray(array) {
  var n = array.length,
    t,
    i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}

function getGroup(array) {
  var groupCount = Math.ceil(array.length / 4);
  var modGroupCount = array.length % 4;

  switch (modGroupCount) {
    case 1:
      groupCount = groupCount - 3;
      modGroupCount = 3;
      break;
    case 2:
      groupCount = groupCount - 2;
      modGroupCount = 2;
      break;
    case 3:
      groupCount = groupCount - 1;
      modGroupCount = 1;
      break;
    default:
      break;
  }

  var group = [];

  for (var i = 0; i < groupCount; i++) {
    var g1 = [];
    g1.push(array.shift());
    g1.push(array.shift());
    g1.push(array.shift());
    g1.push(array.shift());
    group.push(g1);
  }

  for (var i = 0; i < modGroupCount; i++) {
    var g2 = [];
    g2.push(array.shift());
    g2.push(array.shift());
    g2.push(array.shift());
    group.push(g2);
  }

  return group;
}

function getColor() {
  const colors = [
    "red",
    "pink",
    "purple",
    "blue",
    "cyan",
    "teal",
    "green",
    "yellow",
    "amber",
    "orange"
  ];
  return shuffleArray(colors).shift();
}

function dispHistory() {

}

function addHistory(history) {
  let storage = localStorage.getItem('history');
  if (storage) {
    let repo = JSON.parse(storage);
    repo.unshift(history);

    if (repo.length > 20) {
      repo.pop();
    }

    localStorage.setItem('history', JSON.stringify(repo));
  }
  else {
    let repo = [];
    repo.push(history);
    localStorage.setItem('history', JSON.stringify(repo));
  }
}

function toHistory(groups) {
  let history = {
    id: generateUuid(),
    date: Date.now(),
    group: []
  };

  groups.forEach(group => {
    history.group.push(group);
  });

  return history;
}

function generateUuid() {
  // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
  // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case "x":
        chars[i] = Math.floor(Math.random() * 16).toString(16);
        break;
      case "y":
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
        break;
    }
  }
  return chars.join("");
}


// loaded
document.querySelector("#shuffle").addEventListener('click', shuffle);
window.addEventListener('load', dispHistory);
