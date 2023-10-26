// !!!!!!!!! THIS
const video = document.querySelector(".video-stream");

// Define the start and end timestamps in seconds
const startTime = 80; // Start at 30 seconds
const endTime = 115;   // End at 60 seconds

// Add an event listener for the 'timeupdate' event
video.addEventListener('timeupdate', () => {
    // Check if the current time is greater than or equal to the end time
    if (video.currentTime >= endTime) {
        // Set the current time back to the start time
        video.currentTime = startTime;
    }
});

video.play()




const el = document.createElement("button");
el.innerText = "loop";
el.classList.add("ytp-button");
const ctrl = document.querySelector(".ytp-right-controls")
ctrl.prepend(el);
el.addEventListener("click", (e) => {
 
});


const panel = document.createElement("div");
panel.style = "position: fixed; top:0px: width: 100px; height:100px; background-color: white; z-index:100000";
panel.innerHTML = '<label for="in-start-timestamp">start<input id="in-start-timestamp" name="in-start-timestamp" /></label><button onclick="setLoopTimestamp(0)">set</button><br /><label for="in-end-timestamp">end.<input id="in-end-timestamp" name="in-end-timestamp" /></label><button onclick="setLoopTimestamp(1)">set</button><br><button onclick="startLoop()">start loop</button>';

document.body.appendChild(panel);

let start = 0;
let end = 0;

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

function startLoop() {
	if (start >= end) return 0;
	
	const video = document.querySelector(".video-stream");
	video.currentTime = start;
	video.addEventListener('timeupdate', () => {
    		// Check if the current time is greater than or equal to the end time
    		if (video.currentTime >= end) {
        		// Set the current time back to the start time
        		video.currentTime = start;
    		}
	});
    	video.play();
}















