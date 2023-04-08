// Get the video container and load videos from JSON file
const videoContainer = document.getElementById("video-container");
fetch('urls.json')
    .then(response => response.json())
    .then(data => {
        data.urls.forEach(url => addVideo(url));
    })
    .catch(error => console.error(error));

// Add video to container and write URL to JSON file
function addVideo(url) {
    const videoId = getVideoIdFromUrl(url);
    if (videoId) {
        const videoHtml = `<div class="video"><iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
        videoContainer.insertAdjacentHTML("beforeend", videoHtml);
        writeUrlToJson(url);
    } else {
        console.error(`Invalid YouTube URL: ${url}`);
    }
}

// Write video URL to JSON file
function writeUrlToJson(url) {
    fetch('urls.json')
        .then(response => response.json())
        .then(data => {
            data.urls.push(url);
            const jsonData = JSON.stringify(data);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const urlBlob = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = urlBlob;
            a.download = 'urls.json';
            a.click();
        })
        .catch(error => console.error(error));
}

// Get video ID from URL
function getVideoIdFromUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    }
    return null;
}

// Add video on form submit
document.getElementById("video-form").addEventListener("submit", event => {
    event.preventDefault();
    const url = document.getElementById("url-input").value;
    addVideo(url);
    document.getElementById("url-input").value = "";
});
