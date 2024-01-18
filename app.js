document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('cameraFeed');
    const constraints = { video: { facingMode: 'environment' } };

    // Access the device camera
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing the camera:', error);
        });
});

function takePhoto() {
    const video = document.getElementById('cameraFeed');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL representing a PNG image
    const photoDataUrl = canvas.toDataURL('image/png');

    // Create a link element to download the photo
    const link = document.createElement('a');
    link.href = photoDataUrl;
    link.download = 'photo.png';

    // Trigger a click on the link to download the photo
    link.click();
}
