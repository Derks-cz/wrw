const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;

const modelParams = {
    flipHorizontal: true,   
    maxNumBoxes: 20,        
    iouThreshold: 0.5,     
    scoreThreshold: 0.6,   
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("Видео запущено", status);
        if (status) {
            updateNote.innerText = "Видео запущено и отслеживает жесты"
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Включите видео"
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = "Запуск видео"
        startVideo();
    } else {
        updateNote.innerText = "Остановка видео"
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = "Видео остановлено"
    }
}



function runDetection() {
    model.detect(video).then(predictions => {
        console.log("Предсказания: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel
    updateNote.innerText = "Модель загружена"
    trackButton.disabled = false
});
