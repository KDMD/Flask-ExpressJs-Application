from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://root:root@mongo.vb4ujxi.mongodb.net/?retryWrites=true&w=majority&appName=MONGO")
db = client["FirstDB"]
collection = db["record"]

@app.route('/api/data', methods=['POST'])
def form():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')

    if not name or not email:
        return jsonify({"error": "All fields are required."}), 400

    try:
        collection.insert_one({'name': name, 'email': email})
        return jsonify({"message": f"Data saved for {name} with email {email}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
