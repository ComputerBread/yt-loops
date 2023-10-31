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
panel.style = "display: none; grid-template-columns: 100px auto; background-color: white;";
//panel.innerHTML = '<label for="in-start-timestamp">start<input id="in-start-timestamp" name="in-start-timestamp" /></label><button onclick="setLoopTimestamp(0)">set</button><br /><label for="in-end-timestamp">end.<input id="in-end-timestamp" name="in-end-timestamp" /></label><button onclick="setLoopTimestamp(1)">set</button><br><button onclick="addLoop()">add loop</button><div id="yt-loop-27100145-loop-list"></div><button onclick="startLoop()">start loop</button>';

const startButton = document.createElement("button");
startButton.innerText = "set start";
startButton.onclick = "setLoopTimestamp(0)";
panel.append(startButton);

panel.innerHTML += '<input id="in-start-timestamp" name="in-start-timestamp" />';

const endButton = document.createElement("button");
endButton.innerText = "set end";
endButton.onclick = "setLoopTimestamp(1)";
panel.append(endButton);

panel.innerHTML += '<input id="in-end-timestamp" name="in-end-timestamp" /><div></div>';

const addLoopButton = document.createElement("button");
addLoopButton = "addLoop()";
panel.innerHTML += '<div class="bold style-scope yt-formatted-string">Loops</div><div id="yt-loop-27100145-loop-list"></div><button onclick="startLoop()">start loop</button>';
const startLoopButton = document.createElement("button");
startLoopButton.innerText = "start loop";
startLoopButton.onclick = ""



let panelIsVisible = false;
insertPanel();


function insertPanel() {
  const columns = document.getElementById("columns");
  if (columns) {
    columns.before(panel);
  } else {
    setTimeout(insertPanel, 1000);
  }
}


//const loopIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 18H7C5.34315 18 4 16.6569 4 15V9C4 7.34315 5.34315 6 7 6H17C18.6569 6 20 7.34315 20 9V15C20 16.6569 18.6569 18 17 18H12M12 18L15 15M12 18L15 21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const loopIcon = '<svg width="20px" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M47.2,32.6c0,0.1,0,0.1-0.1,0.2c-0.3,0.9-0.5,1.8-0.9,2.6c-0.4,0.9-0.8,1.9-1.3,2.7c-1,1.8-2.2,3.4-3.6,4.8 c-1.4,1.4-3,2.7-4.7,3.7c-1.7,1-3.6,1.9-5.6,2.4c-2,0.6-4.1,0.8-6.2,0.8C12.3,50,2,39.7,2,27.1S12.3,4.2,24.9,4.2 c4.3,0,8.3,1.2,11.7,3.2c0,0,0,0,0,0c1.7,1,3.2,2.2,4.5,3.5c0.4,0.3,0.7,0.6,1,1c0.8,0.6,1.3,0.2,1.3-0.8V3.6C43.4,2.8,44.2,2,45,2 h3.2c0.9,0,1.6,0.8,1.7,1.6v19.6c0,0.8-0.6,1.4-1.4,1.4H28.9c-0.9,0-1.5-0.6-1.5-1.5v-3.3c0-0.9,0.8-1.6,1.6-1.6h7.5 c0.6,0,1.2-0.2,1.4-0.5c-2.9-4-7.6-6.6-13-6.6c-8.9,0-16,7.2-16,16s7.2,16,16,16c7,0,12.9-4.4,15.1-10.6c0,0,0.3-1.4,1.4-1.4 c1.1,0,3.8,0,4.6,0c0.7,0,1.3,0.5,1.3,1.2C47.2,32.4,47.2,32.5,47.2,32.6z"></path> </g></svg>'

const el = document.createElement("button");
el.innerHTML = loopIcon;
el.classList.add("ytp-button");
el.style = "position: relative; top: -15px;"
const ctrl = document.querySelector(".ytp-right-controls")
ctrl.prepend(el);
el.addEventListener("click", (e) => {
 
  if (panelIsVisible) {
    panel.style.display = "none";
  } else {
    panel.style.display = "grid";
  }
  panelIsVisible = !panelIsVisible;

});






