#!/bin/bash
# Create placeholder images using ImageMagick or fallback to empty files

images=(
  "urban-oasis.jpg"
  "marina.jpg"
  "seaside.jpg"
  "tech-hub.jpg"
  "museum.jpg"
  "riverside.jpg"
  "mountain.jpg"
  "library.jpg"
)

for img in "${images[@]}"; do
  if command -v convert &> /dev/null; then
    # Create 600x400 placeholder with gradient
    convert -size 600x400 gradient:#4A90E2-#7B68EE -font Arial -pointsize 24 \
      -fill white -gravity center -annotate +0+0 "$(basename $img .jpg)" "$img"
  else
    # Fallback: copy from existing structure or create minimal valid JPEG
    echo "⚠️  ImageMagick not found. Creating empty placeholders..."
    # Create minimal valid JPEG header (1x1 pixel)
    printf '\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.\x27 \x0c\x0c(7),01444\x1f\x27>H>DAEA<7HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4\x00\x14\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xc4\x00\x14\x10\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xda\x00\x08\x01\x01\x00\x00?\x00\x7f\x00\xff\xd9' > "$img"
  fi
  echo "✓ Created $img"
done

echo "✅ All placeholder images created"
