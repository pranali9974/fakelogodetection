import React, { useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import "./App.css"; // Import the updated CSS

const App = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    // Drag and Drop handlers
    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        if (event.dataTransfer.files.length > 0) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    // Upload the file to the backend
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error uploading file", error);
            alert("Error uploading file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="upload-box"
            >
                <h2>Upload Logo for Detection</h2>

                {/* Drag and Drop File Upload */}
                <label
                    className={`upload-label ${dragActive ? "drag-active" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <UploadCloud size={40} className="text-gray-500 mb-2" />
                    {file ? <p>{file.name}</p> : <span>Click to Upload or Drag & Drop</span>}
                    <input type="file" className="hidden" onChange={handleFileChange} />
                </label>

                {/* Upload Button */}
                <motion.button
                    className="upload-button"
                    onClick={handleUpload}
                    disabled={loading}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {loading ? (
                        <>
                            Predicting...
                            <span className="loader"></span>
                        </>
                    ) : (
                        "Predict"
                    )}
                </motion.button>
            </motion.div>

            {/* Display Result */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="result-box"
                >
                    <h3 className="result-text">Prediction Result</h3>
                    <p className="text-xl font-bold mt-2">
                        {result.prediction === "Real Logo" ? "✅ Real Logo" : "❌ Fake Logo"}
                    </p>
                    <p className="confidence">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
                    
                    {/* Image Preview */}
                    {file && (
                        <div className="preview">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="preview-image"
                            />
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default App;
