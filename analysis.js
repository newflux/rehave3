document.getElementById('mood-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const mood = document.getElementById('mood').value;
    const stress = document.getElementById('stress').value;
    const energy = document.getElementById('energy').value;

    // Basic validation
    if (!mood || !stress || !energy) {
        alert("Please fill out all fields.");
        return;
    }

    // Generate a response message based on the answers
    let responseMessage = "Thank you for sharing your mood! Here is what you told us:\n";
    responseMessage += `1. You are feeling: ${mood}\n`;
    responseMessage += `2. Your stress level is: ${stress} out of 5\n`;
    responseMessage += `3. You feel: ${energy}\n`;

    // Display the response message
    const responseDiv = document.getElementById('response-message');
    responseDiv.textContent = responseMessage;
});
