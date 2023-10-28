// prefix:
const prefix = "yt-loop-27100145-";

let start = 0;
let end = 0;

const loops = [];
// one loop = {enabled, start, end};
//

function getLoopListElement() {
  return document.getElementById(prefix + "loop-list");
}

function setLoopTimestamp(pos) {
  const video = document.querySelector(".video-stream");
  
  if (pos === 0) { // beginning
    start = Math.round(video.currentTime);
    document.getElementById("in-start-timestamp").value = start;
  } else {
    end = Math.round(video.currentTime);
    document.getElementById("in-end-timestamp").value = end;
  }
}

function addLoop() {
  const idx = loops.length;
	loops.push({enabled: true, start, end});
  const loop = `<div><input type="checkbox" checked value="${loops.length}" onClick="toggleLoop(${idx})"> from ${start} to ${end}</div>`;
  getLoopListElement().innerHTML += loop;
}

function clearLoop() {
	start = 0;
	end = 0;
}

function removeLoop(idx) {
	loops.splice(idx, 1);
}

function toggleLoop(idx) {
  loops[idx].enabled = !loops[idx].enabled;
}


function findFirstLoopIdx() {
  for (let i = 0; i < loops.length; i++) {
    if (loops[i].enabled) {
      return i;
    }
  }
  return -1;
}

function findNextLoopIdx(curLoopIdx) {

  const nbLoops = loops.length;
  for (let i = 1; i <= nbLoops; i++) {
    const j = (curLoopIdx + i) % nbLoops;
    if (loops[j].enabled) {
      return j;
    }
  }

  // case where all loops has been disabled or removed
  return -1;

}

function startLoop() {


  if (loops.length === 0) return;

  const enabledLoopsNb = loops.reduce((acc, cur) => { return (cur.enabled) ? acc + 1 : acc}, 0);
  if (enabledLoopsNb === 0) return;

  // find first enabled loop

  // go through each loop
  // assume they are sorted by time
  // s1->e1 then s2->e2 then s3->e3
  // we need a state to know in which loop we currently are
  let currentLoopIdx = findFirstLoopIdx();

  if (currentLoopIdx === -1) return;


	const video = document.querySelector(".video-stream");
	video.currentTime = start;

	video.addEventListener('timeupdate', () => {
    if (video.currentTime >= loops[currentLoopIdx].end) {
      // find next enabled loop
      currentLoopIdx = findNextLoopIdx(currentLoopIdx);
      if (currentLoopIdx === -1) return;
      // set currentTime to start of loop
      video.currentTime = loops[currentLoopIdx].start;
    }
	});
  
  video.play();

}

function displayLoops() {

}

function clearLoops() {

}


const panel = document.createElement("div");
panel.style = "position: fixed; top:0px: width: 100px; min-height:100px; background-color: white; z-index:100000";
panel.innerHTML = '<label for="in-start-timestamp">start<input id="in-start-timestamp" name="in-start-timestamp" /></label><button onclick="setLoopTimestamp(0)">set</button><br /><label for="in-end-timestamp">end.<input id="in-end-timestamp" name="in-end-timestamp" /></label><button onclick="setLoopTimestamp(1)">set</button><br><button onclick="addLoop()">add loop</button><div id="yt-loop-27100145-loop-list"></div><button onclick="startLoop()">start loop</button>';

document.body.appendChild(panel);



