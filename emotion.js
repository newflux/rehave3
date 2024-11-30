// Load face-api.js models
async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.ageGenderNet.loadFromUri('/models');
    await faceapi.nets.emotionNet.loadFromUri('/models');
    console.log("Models loaded successfully.");
}

// Start webcam
function startWebcam() {
    const video = document.getElementById('video');

    // Access webcam
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => console.error('Error accessing webcam:', err));
}

// Detect emotion from webcam feed
async function detectEmotion() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const displaySize = { width: video.width, height: video.height };
    
    faceapi.matchDimensions(canvas, displaySize);

    // Detect faces and emotions
    const detections = await faceapi.detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withAgeAndGender()
        .withEmotion();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas?.clear();
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    if (detections.length > 0) {
        const emotions = detections[0].expressions;
        const topEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
        document.getElementById('emotion-result').textContent = `Current Emotion: ${topEmotion}`;
    } else {
        document.getElementById('emotion-result').textContent = 'No face detected';
    }
}

// Load models, start webcam, and detect emotion every 100ms
loadModels().then(() => {
    startWebcam();
    setInterval(detectEmotion, 100);
});
