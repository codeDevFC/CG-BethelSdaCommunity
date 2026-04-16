#!/bin/bash
# This script downloads sample images for the gallery
# Run: chmod +x scripts/download-gallery-images.sh && ./scripts/download-gallery-images.sh

mkdir -p public/images/gallery

echo "Gallery images will be loaded from Unsplash fallback if local images are not found."
echo "Place your own images in public/images/gallery/ named cg-01.jpg through cg-20.jpg"
