import os
import cv2
import numpy as np

def load_and_preprocess_images(dataset_path):
    images = []
    labels = []
    categories = {"real": 1, "fake": 0}

    for category in categories:
        folder_path = os.path.join(dataset_path, category)

        if not os.path.exists(folder_path):
            print(f"Error: Folder {folder_path} does not exist!")
            continue

        # Recursively get all image paths from subfolders
        for root, _, files in os.walk(folder_path):
            for img_name in files:
                img_path = os.path.join(root, img_name)
                img = cv2.imread(img_path)

                if img is None:  # Skip invalid images
                    print(f"Warning: Skipping invalid image {img_path}")
                    continue

                img = cv2.resize(img, (128, 128))
                img = img / 255.0
                images.append(img)
                labels.append(categories[category])

    return np.array(images), np.array(labels)
