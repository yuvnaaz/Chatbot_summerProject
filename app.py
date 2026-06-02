# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app) # Crucial for allowing the extension to talk to localhost

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    
    # 1. Grab both fields sent by your popup.js
    user_message = data.get('message', '')
    page_text = data.get('page_text', '')

    # 2. Construct a smart prompt that gives Gemini context
    # This is the missing link! We must tell Gemini to look at the page data.
    full_prompt = f"""
    You are an AI Browser Companion. You are helping a user analyze the webpage they are currently viewing.
    
    --- START WEBPAGE CONTENT ---
    {page_text}
    --- END WEBPAGE CONTENT ---
    
    User Question: {user_message}
    
    Provide a direct, accurate, and concise answer based on the webpage content provided above.
    """

    try:
        # 3. Send the combined prompt to Gemini
        response = model.generate_content(full_prompt)
        
        return jsonify({
            "response": response.text
        })
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "An error occurred while generating a response."}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)