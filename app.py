from flask import Flask, request, jsonify, render_template
import openai

app = Flask(__name__)

# Initialize OpenAI with your API key
openai.api_key = 'your-api-key'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'Message is required'}), 400

    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',  # Change to the appropriate model
            messages=[
                {'role': 'system', 'content': 'You are a helpful assistant.'},
                {'role': 'user', 'content': user_message},
            ]
        )
        ai_response = response.choices[0].message['content']
        return jsonify({'response': ai_response})
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Something went wrong'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
