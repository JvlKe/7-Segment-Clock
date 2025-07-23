const SEGMENTS = {
  '0': [1,1,1,1,1,1,0], '1': [0,1,1,0,0,0,0], '2': [1,1,0,1,1,0,1],
  '3': [1,1,1,1,0,0,1], '4': [0,1,1,0,0,1,1], '5': [1,0,1,1,0,1,1],
  '6': [1,0,1,1,1,1,1], '7': [1,1,1,0,0,0,0], '8': [1,1,1,1,1,1,1],
  '9': [1,1,1,1,0,1,1]
};

const ids = ['hour-tens','hour-ones','minute-tens','minute-ones','second-tens','second-ones'];

function createDigit(id) {
  const d = document.createElement('div');
  d.className = 'digit';
  d.id = id;
  'abcdefg'.split('').forEach(s => {
    const seg = document.createElement('div');
    seg.className = `segment ${s}`;
    d.appendChild(seg);
  });
  return d;
}

function createColon() {
  const c = document.createElement('div');
  c.className = 'colon';
  ['top','bottom'].forEach(pos => {
    const dot = document.createElement('div');
    dot.className = `dot ${pos}`;
    c.appendChild(dot);
  });
  return c;
}

function updateDigit(elem, num) {
  const segs = elem.querySelectorAll('.segment');
  SEGMENTS[num].forEach((on, i) => segs[i].classList.toggle('on', on));
}

function pad2(n) {
  return n < 10 ? '0' + n : '' + n;
}

function updateClock() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const time = [...pad2(h), ...pad2(m), ...pad2(s)].map(Number);
  time.forEach((v, i) => updateDigit(document.getElementById(ids[i]), v.toString()));
  document.getElementById('ampm').textContent = ampm;
  document.getElementById('date').textContent = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
  document.getElementById('day').textContent = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
}

const container = document.getElementById('digits');
ids.forEach((id, i) => {
  container.appendChild(createDigit(id));
  if ((i + 1) % 2 === 0 && i < 4) container.appendChild(createColon());
});

updateClock();
setInterval(updateClock, 1000);
