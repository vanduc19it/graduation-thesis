from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import os
import cv2
import tempfile
import tensorflow as tf
from keras.preprocessing import image
from keras.applications.inception_v3 import InceptionV3, preprocess_input
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import load_model
import json
import pickle
import random
from datetime import datetime
from flask_cors import CORS
from pymongo import MongoClient 

client = MongoClient("mongodb+srv://vanduc19it:vanduc1904@cluster0.hjsis1h.mongodb.net/?retryWrites=true&w=majority")
db = client['Cluster0'] 

app = Flask(__name__)
CORS(app)

def load_and_preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.convert("RGB")
    img = img.resize((299, 299))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array


def load_and_preprocess_dataset(dataset_path):
    dataset = []
    supported_extensions = (".png", ".jpg", ".jpeg", ".avif", ".webp")
    for filename in os.listdir(dataset_path):
        if filename.lower().endswith(supported_extensions):
            img_path = os.path.join(dataset_path, filename)
            img_array = load_and_preprocess_image(img_path)
            dataset.append(img_array)
    return np.vstack(dataset)


def flip_and_save_temporary(img_path):
    img = cv2.imread(img_path)
    flipped_img = cv2.flip(img, 1)
    temp_dir = tempfile.mkdtemp()
    base_name = os.path.basename(img_path)
    temp_img_path = os.path.join(temp_dir, "flipped_" + base_name)
    cv2.imwrite(temp_img_path, flipped_img)
    return temp_img_path


def build_model():
    base_model = InceptionV3(weights='imagenet')
    model = tf.keras.Model(inputs=base_model.input, outputs=base_model.get_layer('avg_pool').output)
    return model


def check_similarity(test_image_array, dataset_features, model, threshold=5):
    test_features = model.predict(test_image_array)
    distances = np.linalg.norm(dataset_features - test_features, axis=1)
    is_similar = any(distance < threshold for distance in distances)
    return is_similar


def save_image_to_dataset(img_path, dataset_path):
    img = Image.open(img_path)
    base_name = os.path.basename(img_path)
    new_img_path = os.path.join(dataset_path, base_name)
    img.save(new_img_path)


@app.route('/detect_copy_nft', methods=['POST'])
def check_similarity_api():
    global model
    dataset_path = "dataset"
    dataset_features = model.predict(load_and_preprocess_dataset(dataset_path))

    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Save the uploaded file to a temporary directory
        temp_dir = tempfile.mkdtemp()
        temp_file_path = os.path.join(temp_dir, file.filename)
        file.save(temp_file_path)

        # Load and preprocess the uploaded image
        test_image_array = load_and_preprocess_image(temp_file_path)

        # Check similarity with the dataset
        is_similar = check_similarity(test_image_array, dataset_features, model)

        # Check similarity with the flipped image
        flipped_temp_path = flip_and_save_temporary(temp_file_path)
        test_image_array_flipped = load_and_preprocess_image(flipped_temp_path)
        is_similar_flipped = check_similarity(test_image_array_flipped, dataset_features, model)

        result = {'is_similar': is_similar, 'is_similar_flipped': is_similar_flipped}

        if not is_similar:
            save_image_to_dataset(temp_file_path, "dataset")

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    wallet_address = data.get('wallet_address')
    name = data.get('name')
    avatar = data.get('avatar')
    cover_photo = data.get('cover_photo')

    # Kiểm tra xem người dùng đã tồn tại chưa
    existing_user = db.users.find_one({'wallet_address': wallet_address})
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400

    # Tạo người dùng mới
    new_user = {
        'name': name,
        'avatar': avatar,
        'wallet_address': wallet_address,
        'created_at': datetime.utcnow(),
        'cover_photo': cover_photo,
        'favorites': [] 
    }

    # Lưu vào MongoDB
    result = db.users.insert_one(new_user)

    # Convert ObjectId to string
    new_user['_id'] = str(result.inserted_id)

    return jsonify({'message': 'User created successfully', 'user': new_user}), 201


@app.route('/add_favorite/<string:wallet_address>', methods=['POST'])
def add_favorite(wallet_address):
    data = request.get_json()
    item_info = {
        'description': data.get('description'),
        'image': data.get('image'),
        'itemId': data.get('itemId'),
        'name': data.get('name'),
        'owner': data.get('owner'),
        'price': data.get('price'),
        'seller': data.get('seller')
        # Add more fields as needed
    }

    # Tìm người dùng theo địa chỉ ví
    user = db.users.find_one({'wallet_address': wallet_address})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Kiểm tra xem item đã được thêm vào favorites chưa
    if item_info not in user['favorites']:
        # Thêm thông tin item vào mảng favorites
        db.users.update_one({'wallet_address': wallet_address}, {'$push': {'favorites': item_info}})

        return jsonify({'message': 'Item added to favorites successfully'}), 200
    else:
        return jsonify({'error': 'Item already in favorites'}), 400

@app.route('/update_avatar/<string:wallet_address>', methods=['PUT'])
def update_avatar(wallet_address):
    data = request.get_json()
    new_avatar = data.get('new_avatar')

    # Kiểm tra xem người dùng có tồn tại không
    existing_user = db.users.find_one({'wallet_address': wallet_address})
    if not existing_user:
        return jsonify({'error': 'User not found'}), 404

    # Update avatar
    db.users.update_one({'wallet_address': wallet_address}, {'$set': {'avatar': new_avatar}})

    # Fetch the updated user
    updated_user = db.users.find_one({'wallet_address': wallet_address})

    # Convert ObjectId to string
    updated_user['_id'] = str(updated_user['_id'])

    return jsonify({'message': 'Avatar updated successfully', 'user': updated_user}), 200

@app.route('/update_cover_photo/<string:wallet_address>', methods=['PUT'])
def update_cover_photo(wallet_address):
    data = request.get_json()
    new_cover_photo = data.get('new_cover_photo')

    # Kiểm tra xem người dùng có tồn tại không
    existing_user = db.users.find_one({'wallet_address': wallet_address})
    if not existing_user:
        return jsonify({'error': 'User not found'}), 404

    # Update cover photo
    db.users.update_one({'wallet_address': wallet_address}, {'$set': {'cover_photo': new_cover_photo}})

    # Fetch the updated user
    updated_user = db.users.find_one({'wallet_address': wallet_address})

    # Convert ObjectId to string
    updated_user['_id'] = str(updated_user['_id'])

    return jsonify({'message': 'Cover photo updated successfully', 'user': updated_user}), 200

@app.route('/update_username/<string:wallet_address>', methods=['PUT'])
def update_username(wallet_address):
    data = request.get_json()
    new_username = data.get('new_username')

    # Kiểm tra xem người dùng có tồn tại không
    existing_user = db.users.find_one({'wallet_address': wallet_address})
    if not existing_user:
        return jsonify({'error': 'User not found'}), 404

    # Update username
    db.users.update_one({'wallet_address': wallet_address}, {'$set': {'name': new_username}})

    # Fetch the updated user
    updated_user = db.users.find_one({'wallet_address': wallet_address})

    # Convert ObjectId to string
    updated_user['_id'] = str(updated_user['_id'])

    return jsonify({'message': 'Username updated successfully', 'user': updated_user}), 200

@app.route('/get_user/<wallet_address>', methods=['GET'])
def get_user(wallet_address):
    try:
        user = db.users.find_one({'wallet_address': wallet_address})
        if user:
            user['_id'] = str(user['_id'])
            return jsonify({'user': user}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        app.logger.error(f'Error fetching user: {str(e)}')
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/add_to_cart/<string:wallet_address>', methods=['POST'])
def add_to_cart(wallet_address):
    data = request.get_json()
    item_info = {
        'description': data.get('description'),
        'image': data.get('image'),
        'itemId': data.get('itemId'),
        'name': data.get('name'),
        'owner': data.get('owner'),
        'price': data.get('price'),
        'seller': data.get('seller')
    }

    # Tìm người dùng theo địa chỉ ví
    user_cart = db.carts.find_one({'wallet_address': wallet_address})

    if not user_cart:
        # Nếu người dùng chưa có giỏ hàng, tạo một giỏ hàng mới
        user_cart = {'wallet_address': wallet_address, 'cart': []}

    # Kiểm tra xem item đã được thêm vào giỏ hàng chưa
    if item_info not in user_cart['cart']:
        # Thêm thông tin item vào mảng cart
        user_cart['cart'].append(item_info)

        # Cập nhật hoặc thêm giỏ hàng vào cơ sở dữ liệu
        db.carts.update_one({'wallet_address': wallet_address}, {'$set': user_cart}, upsert=True)

        return jsonify({'message': 'Item added to cart successfully'}), 200
    else:
        return jsonify({'error': 'Item already in cart'}), 400
    
# Route để lấy thông tin giỏ hàng dựa trên địa chỉ ví
@app.route('/get_cart/<string:wallet_address>', methods=['GET'])
def get_cart(wallet_address):
    # Tìm giỏ hàng dựa trên địa chỉ ví
    user_cart = db.carts.find_one({'wallet_address': wallet_address})

    if user_cart:
        # Nếu giỏ hàng tồn tại, trả về thông tin giỏ hàng
        return jsonify({'cart': user_cart['cart']}), 200
    else:
        # Nếu không tìm thấy giỏ hàng, trả về thông báo lỗi
        return jsonify({'error': 'Cart not found'}), 404
    
@app.route('/clear_cart/<string:wallet_address>', methods=['DELETE'])
def clear_cart(wallet_address):
    # Tìm giỏ hàng dựa trên địa chỉ ví
    user_cart = db.carts.find_one({'wallet_address': wallet_address})

    if user_cart:
        db.carts.update_one({'wallet_address': wallet_address}, {'$set': {'cart': []}})

        return jsonify({'message': 'Cart cleared successfully'}), 200
    else:
        return jsonify({'error': 'Cart not found'}), 404
    
# Route để xóa một mục từ giỏ hàng dựa trên địa chỉ ví và itemId
@app.route('/remove_from_cart/<string:wallet_address>/<int:item_id>', methods=['DELETE'])
def remove_from_cart(wallet_address, item_id):
    # Tìm giỏ hàng dựa trên địa chỉ ví
    user_cart = db.carts.find_one({'wallet_address': wallet_address})

    if user_cart:
        # Lọc ra mục cần xóa từ giỏ hàng
        updated_cart = [item for item in user_cart['cart'] if item['itemId'] != item_id]
        db.carts.update_one({'wallet_address': wallet_address}, {'$set': {'cart': updated_cart}})

        return jsonify({'message': 'Item removed from cart successfully'}), 200
    else:
        return jsonify({'error': 'Cart not found'}), 404




model1 = load_model('chatbot_model.h5')
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
intents = json.loads(open('intents.json').read())
lemmatizer = WordNetLemmatizer()

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words


def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)



def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


def get_response(intents_json, tag):
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data['message']
    ints = predict_class(user_message, model1)
    response = get_response(intents, ints[0]['intent'])
    return jsonify({"response": response})

if __name__ == '__main__':
    model = build_model()
    app.run(debug=True)
