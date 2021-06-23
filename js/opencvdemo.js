let videoHeight = 480
let videoWidth = 640

let cap = null
let faceCascade = null;
let src = null;
let gray = null;



function run() {
    // outputCanvas = document.getElementById("outputCanvas");

    cap = new cv.VideoCapture(video)
    src = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    gray = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);

    startCamera()
    requestAnimationFrame(grayMat)
}

async function startCamera() {
    let video = document.getElementById("video");
    let stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: {
                exact: videoWidth
            },
            height: {
                exact: videoHeight
            }
        },
        audio: false
    })
    video.srcObject = stream;
    video.play();
}

function grayMat() {
    cap.read(src)
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY)
    cv.imshow("canvas", gray)
    requestAnimationFrame(grayMat)
}