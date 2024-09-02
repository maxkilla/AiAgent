<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent-Based GPT System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
        }
        pre {
            background: #272822;
            color: #f8f8f2;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            background: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <h1>Agent-Based GPT System</h1>
    <p>
        This project is a web-based application that allows users to interact with specialized agents that process user inputs using the OpenAI API.
        The system is designed with a front-end interface for user interaction, and a back-end that handles requests and communicates with the OpenAI API.
    </p>

    <h2>Project Structure</h2>
    <pre>
project/
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── backend/
│   ├── app.py
│   ├── agents.py
│   ├── requirements.txt
│   └── config.py
│
├── templates/
│   └── layout.html
│
└── static/
    └── styles.css
    </pre>

    <h2>Prerequisites</h2>
    <p>
        Before you begin, ensure you have met the following requirements:
    </p>
    <ul>
        <li>Python 3.8 or higher</li>
        <li>Pip (Python package installer)</li>
        <li>Virtualenv (optional but recommended)</li>
        <li>An OpenAI API key</li>
    </ul>

    <h2>Installation and Setup</h2>

    <h3>1. Clone the Repository</h3>
    <pre><code>git clone https://github.com/yourusername/agent-gpt-system.git
cd agent-gpt-system</code></pre>

    <h3>2. Create a Virtual Environment</h3>
    <p>Create and activate a virtual environment to isolate your project dependencies:</p>
    <pre><code>python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`</code></pre>

    <h3>3. Install Dependencies</h3>
    <p>Navigate to the <code>backend/</code> directory and install the necessary Python packages:</p>
    <pre><code>cd backend
pip install -r requirements.txt</code></pre>

    <h3>4. Set Up Environment Variables</h3>
    <p>
        You'll need to set your OpenAI API key as an environment variable. Replace <code>your-openai-api-key</code> with your actual OpenAI API key.
    </p>
    <p>On macOS/Linux:</p>
    <pre><code>export OPENAI_API_KEY='your-openai-api-key'</code></pre>
    <p>On Windows:</p>
    <pre><code>set OPENAI_API_KEY=your-openai-api-key</code></pre>

    <h3>5. Run the Application</h3>
    <p>Start the Flask application by running:</p>
    <pre><code>python app.py</code></pre>
    <p>The application will start, and you can access it by navigating to <code>http://127.0.0.1:5000/</code> in your web browser.</p>

    <h2>Usage</h2>
    <p>
        Once the application is running, you can:
    </p>
    <ol>
        <li>Open a web browser and go to <code>http://127.0.0.1:5000/</code>.</li>
        <li>Enter a request into the input field and click "Submit".</li>
        <li>The response from the agent will be displayed on the screen.</li>
    </ol>

    <h2>Project Details</h2>
    <ul>
        <li><strong>Frontend:</strong> Handles user input and displays the output. It consists of an HTML form, basic CSS for styling, and JavaScript to interact with the back-end.</li>
        <li><strong>Backend:</strong> Built with Flask, this handles incoming requests, communicates with OpenAI's API, and processes the response.</li>
        <li><strong>Agents:</strong> Each agent is a function in <code>agents.py</code> that performs specific tasks based on the user input.</li>
    </ul>

    <h2>Contributing</h2>
    <p>If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.</p>

    <h2>License</h2>
    <p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for details.</p>

    <h2>Acknowledgements</h2>
    <ul>
        <li><a href="https://flask.palletsprojects.com/" target="_blank">Flask</a></li>
        <li><a href="https://beta.openai.com/docs/" target="_blank">OpenAI API</a></li>
    </ul>
</body>
</html>
