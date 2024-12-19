// script.js

// Replace with your Remove.bg API key
const API_KEY = 'ueP5Z8sxrjVVuMSSMxFVQKd1';

const uploadInput = document.getElementById('image-upload');
const removeBgButton = document.getElementById('remove-bg-btn');
const outputImage = document.getElementById('output-image');
const downloadLink = document.getElementById('download-link');
const loader = document.getElementsByClassName('loader');

removeBgButton.addEventListener('click', async () => {
    const file = uploadInput.files[0];
    console.log(file);
    
    if (!file) {
        alert('Please select an image!');
        return;
    }
    
    loader[0].style.display = 'inline-block';
    // Create form data
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
        // Send request to Remove.bg API
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to remove background');
        }

        // Get the processed image as a blob
        const blob = await response.blob();
        console.log(blob);
        loader[0].style.display = 'none';
        // Display the image
        const url = URL.createObjectURL(blob);
        outputImage.src = url;
        outputImage.style.display = 'block';
        
        // Set up the download link
        downloadLink.href = url;
        downloadLink.style.display = 'inline-block';
        
    } catch (error) {
        console.error(error);
        loader[0].style.display = 'none';
        alert('Error removing background. Please try again.');
    }
});
