document.getElementById('request-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const userInput = document.getElementById('user-input').value;
    
    const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput }),
    });
    
    const result = await response.json();
    document.getElementById('response-output').textContent = result.output;
});
