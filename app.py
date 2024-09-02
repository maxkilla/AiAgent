from flask import Flask, render_template, request, jsonify
from agents import process_request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('layout.html')

@app.route('/api/request', methods=['POST'])
def handle_request():
    user_input = request.json.get('input')
    output = process_request(user_input)
    return jsonify({"output": output})

if __name__ == '__main__':
    app.run(debug=True)
