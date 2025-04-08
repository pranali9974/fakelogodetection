🧠 Fake Logo Detection System

A Machine Learning-based web application that detects whether a logo is Real or Fake using image classification. Built with a full-stack setup using Python, Flask for backend, React for frontend, and TensorFlow/Keras for the model.

🌟 Features

Upload any logo image and get instant prediction
Beautiful animated UI with drag & drop support
Confidence percentage for prediction
Real-time backend processing using Flask
Pretrained model trained on a dataset of real and fake logos
Clean and responsive UI using custom CSS and gradients

📦 Installation

⚙️ Backend Setup
Navigate to the backend folder
cd fakelogodetection/backend
pip install -r requirements.txt
python model.py
python app.py

💻 Frontend Setup

Navigate to the frontend folder:
cd fakelogodetection/frontend
npm install
npm start

📄 Usage
Go to the React frontend (usually at http://localhost:3000)
Upload or drag & drop a logo image.
Click "Predict" to receive:
Classification (Real or Fake)
Confidence percentage

🧠 Model Training

The model is trained using Convolutional Neural Networks (CNN).
Input images are resized to 128x128 pixels and normalized.
It uses a simple CNN with 3 convolutional layers and ReLU activations.
The final model is saved in backend/saved_model/.
You can retrain the model by modifying model.py and running it again.

✨ Screenshots
[🎬 Click here to view the demo video](./assets/fake_logo_detection.mp4)
![not_loaded](assets/choose.png)
