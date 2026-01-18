from PIL import Image
import os

def convert_to_webp(filename):
    try:
        base = os.path.splitext(filename)[0]
        with Image.open(filename) as img:
            img.save(f"{base}.webp", "webp", quality=85)
            print(f"Converted {filename} to {base}.webp")
    except Exception as e:
        print(f"Failed to convert {filename}: {e}")

images = [
    'public/images/beard.jpg',
    'public/images/haircut.png',
    'public/images/logo.png',
    'public/images/final-poster.jpg'
]

for img in images:
    if os.path.exists(img):
        convert_to_webp(img)
    else:
        print(f"File not found: {img}")
