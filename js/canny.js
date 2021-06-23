let videoHeight = 480
let videoWidth = 640
let outputCanvas = document.getElementById("outputCanvas");

let cap = null
let faceCascade = null;
let src = null;
let gray = null;

let grad_x = null
let grad_y = null
let abs_grad_x = null
let abs_grad_y = null
let dst = null

function run() {
    cap = new cv.VideoCapture(video)
    src = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    gray = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);

    grad_x = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    grad_y = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    abs_grad_x = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    abs_grad_y = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
    dst = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);

    startCamera();
    requestAnimationFrame(sobelCanny)
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

function sobelCanny() {
    // 获取一帧图像
    cap.read(src)

    // 转为灰度图
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    cv.Sobel(gray, grad_x, cv.CV_16S, 1, 0, 3, 1, 1, cv.BORDER_DEFAULT)
    cv.convertScaleAbs(grad_x, abs_grad_x)
    cv.Sobel(gray, grad_y, cv.CV_16S, 0, 1, 3, 1, 1, cv.BORDER_DEFAULT)
    cv.convertScaleAbs(grad_y, abs_grad_y)
    cv.addWeighted(abs_grad_x, 0.5, abs_grad_y, 0.5, 0, dst)

    // 显示
    cv.imshow('outputCanvas', dst)

    requestAnimationFrame(sobelCanny)
}

// Config OpenCV
// var Module = {
//     // locateFile: function(name) {
//     //     let files = {
//     //         "opencv_js.wasm": '/opencv/opencv_js.wasm'
//     //     }
//     //     return files[name]
//     // },
//     preRun: [() => {
//         Module.FS_createPreloadedFile("/", "face.xml", "model/haarcascade_frontalface_default.xml",
//             true, false);
//     }],
//     postRun: [
//         run
//     ]
// };