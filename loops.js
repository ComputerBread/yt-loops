// prefix:
const prefix = "yt-loop-27100145-";


const loops = [];
// one loop = {enabled, start, end};
//

function getLoopListElement() {
  return document.getElementById(prefix + "loop-list");
}

function setLoopTimestamp(pos) {
  const video = document.querySelector(".video-stream");

  if (pos === 0) { // beginning
    const start = Math.round(video.currentTime);
    document.getElementById("in-start-timestamp").value = start;
  } else {
    const end = Math.round(video.currentTime);
    document.getElementById("in-end-timestamp").value = end;
  }
}

function addLoop() {

  // annoying way to write:
  // <div><input type="checkbox" checked value={idx} /> from ${start} to ${end}</div>
  // inside the loop list

  const idx = loops.length;

  const start = Number(document.getElementById("in-start-timestamp").value);
  const end = Number(document.getElementById("in-end-timestamp").value);
  // do some sanity checking
  if (isNaN(start) || isNaN(end) || start < 0 || end < 0 || start >= end) {
    return;
  }
  loops.push({ enabled: true, start, end });

  const div = document.createElement("div");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = true;
  input.onclick = function () { toggleLoop(idx); };

  div.append(input);

  const description = document.createTextNode(` from ${start} to ${end}`);
  div.append(description);

  getLoopListElement().append(div);

}

/**
 * Clear the loops.
 * 
 * @param panel the html element containing the checkboxes (loops)
 */
function clearLoops(panel) {

  document.getElementById("in-start-timestamp").value = 0;
  document.getElementById("in-end-timestamp").value = 0;

  loops.forEach((loop) => {
    loop.enabled = false;
    panel.querySelectorAll("input[type=checkbox]").forEach((checkbox) => checkbox.checked = false);
  });

}

function removeAllLoops() {
  loops.length = 0;
  getLoopListElement().innerHTML = '';
}

// unused
function removeLoop(idx) {
  loops.splice(idx, 1);
}

function toggleLoop(idx) {
  loops[idx].enabled = !loops[idx].enabled;
}


function findFirstEnabledLoopIdx() {
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

  const enabledLoopsNb = loops.reduce((acc, cur) => { return (cur.enabled) ? acc + 1 : acc }, 0);
  if (enabledLoopsNb === 0) return;

  let currentLoopIdx = findFirstEnabledLoopIdx();
  if (currentLoopIdx === -1) return;

  const video = document.querySelector(".video-stream");
  video.currentTime = loops[currentLoopIdx].start;

  let loopHandler = video.addEventListener('timeupdate', () => {

    // if we toggle off all the loops
    // alternative approach is to remove this handler when all loops are turned off, but do I want to keep the handler in a global variable?
    if (currentLoopIdx === -1) {
      currentLoopIdx = findNextLoopIdx(currentLoopIdx); // check if new one was toggled in between timeupdates
      return;
    }

    // all loops were removed
    if (loops.length === 0) {
      video.removeEventListener("timeupdate", loopHandler);
      return;
    }

    // when at end of loop, jump to next loop
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

// -----------------------------------------------------------------------------
// constructing & inserting elements

const panel = document.createElement("div");
//panel.style = "display: none; grid-template-columns: 100px auto; background-color: white; position: fixed; top:100px; margin: auto; width: 600px;";
panel.style = "display: none;  background-color: white; margin: auto; width: 600px;";
panel.innerHTML = '<div style="display: grid; grid-template-columns: 100px auto;"><button id="yt-loop-27100145-set-start">set start</button><input id="in-start-timestamp" name="in-start-timestamp" value="0" /><button id="yt-loop-27100145-set-end">set end</button><input id="in-end-timestamp" name="in-end-timestamp" value="0"/><div></div><button id="yt-loop-27100145-add-loop">add loop</button></div><div style="font-size:20px" class="bold style-scope yt-formatted-string">Loops</div></div><div id="yt-loop-27100145-loop-list"></div><button id="yt-loop-27100145-start-loop">start loop</button><button id="yt-loop-27100145-remove-loops">remove all loops</button>';

let panelIsVisible = false;
insertPanel();


function insertPanel() {
  const columns = document.getElementById("full-bleed-container");
  if (columns) {
    columns.after(panel);
    // document.body.append(panel);
    document.getElementById("yt-loop-27100145-set-start").onclick = function () { setLoopTimestamp(0); };
    document.getElementById("yt-loop-27100145-set-end").onclick = function () { setLoopTimestamp(1); };
    document.getElementById("yt-loop-27100145-add-loop").onclick = function () { addLoop(); };
    document.getElementById("yt-loop-27100145-start-loop").onclick = function () { startLoop(); };
    document.getElementById("yt-loop-27100145-remove-loops").onclick = function () { removeAllLoops(); };
  } else {
    setTimeout(insertPanel, 1000);
  }
}


// add icon to youtube player
const loopIcon = '<svg width="20px" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M47.2,32.6c0,0.1,0,0.1-0.1,0.2c-0.3,0.9-0.5,1.8-0.9,2.6c-0.4,0.9-0.8,1.9-1.3,2.7c-1,1.8-2.2,3.4-3.6,4.8 c-1.4,1.4-3,2.7-4.7,3.7c-1.7,1-3.6,1.9-5.6,2.4c-2,0.6-4.1,0.8-6.2,0.8C12.3,50,2,39.7,2,27.1S12.3,4.2,24.9,4.2 c4.3,0,8.3,1.2,11.7,3.2c0,0,0,0,0,0c1.7,1,3.2,2.2,4.5,3.5c0.4,0.3,0.7,0.6,1,1c0.8,0.6,1.3,0.2,1.3-0.8V3.6C43.4,2.8,44.2,2,45,2 h3.2c0.9,0,1.6,0.8,1.7,1.6v19.6c0,0.8-0.6,1.4-1.4,1.4H28.9c-0.9,0-1.5-0.6-1.5-1.5v-3.3c0-0.9,0.8-1.6,1.6-1.6h7.5 c0.6,0,1.2-0.2,1.4-0.5c-2.9-4-7.6-6.6-13-6.6c-8.9,0-16,7.2-16,16s7.2,16,16,16c7,0,12.9-4.4,15.1-10.6c0,0,0.3-1.4,1.4-1.4 c1.1,0,3.8,0,4.6,0c0.7,0,1.3,0.5,1.3,1.2C47.2,32.4,47.2,32.5,47.2,32.6z"></path> </g></svg>'
const loopIconButton = document.createElement("button");
loopIconButton.innerHTML = loopIcon;
loopIconButton.classList.add("ytp-button");
loopIconButton.style = "position: relative; top: -15px;"
// need to wait a bit before adding it, this could potentially fail! ⚠️
setTimeout(() => {
  const ctrl = document.querySelector(".ytp-right-controls")
  ctrl.prepend(loopIconButton);
}, 1000);

loopIconButton.addEventListener("click", (e) => {

  if (panelIsVisible) {
    panel.style.display = "none";
  } else {
    panel.style.display = "grid";
  }
  panelIsVisible = !panelIsVisible;

});






