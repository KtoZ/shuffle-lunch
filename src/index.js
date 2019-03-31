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
