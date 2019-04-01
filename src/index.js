function shuffle(array) {
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

function writeGroup() {
  let results = document.querySelector("#results");
  results.innerHTML = "";

  let members = document
    .querySelector("#members")
    .value.replace(/\r?\n/g, "")
    .split(",");
  let s = shuffle(members);
  let group = getGroup(s);
  console.log(group);

  for (var i = 0; i < group.length; i++) {
    var col = document.createElement("div");
    col.className = "col s12 m6";
    results.appendChild(col);

    var ul = document.createElement("ul");
    ul.className = "collection with-header";
    col.appendChild(ul);

    var color = getColor();
    var liHeader = document.createElement("li");
    liHeader.className = "collection-item lighten-4 " + color;
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
  return shuffle(colors).shift();
}
