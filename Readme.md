# Interactive Piano: Painting Music with Gestures

## Overview
This project creates an interactive musical experience where users "paint" Van Gogh's *Starry Night* by playing the melody of "Twinkle Twinkle Little Star" using hand gestures captured through a webcam. The application uses machine learning for hand tracking and combines visual art with musical interaction.

## Concept
Inspired by Van Gogh's *Starry Night*, this application merges art and music to create an immersive interactive experience. As users play each note of the melody correctly, the famous painting gradually materializes in the background, creating a sense of accomplishment and visual reward.

## Features
- **Gesture-based Interaction**: Control the application using your index finger via webcam
- **Progressive Art Reveal**: Watch as the *Starry Night* painting gradually appears with each correct note
- **Interactive Piano Interface**: Play the notes of "Twinkle Twinkle Little Star" by touching virtual keys
- **Real-time Hand Tracking**: Uses ML5.js handPose for accurate hand position detection
- **Audio Synthesis**: Uses Tone.js to generate high-quality piano sounds

## Technical Implementation

### Libraries Used
- **p5.js**: For canvas rendering and visual elements
- **ML5.js**: For hand pose detection
- **Tone.js**: For synthesizing piano sounds

### Key Components
1. **Hand Tracking System**: Uses ML5's handPose model to detect and track finger positions
2. **Interactive Piano Interface**: Displays virtual piano keys that respond to touch
3. **Visual Feedback System**: Gradually reveals the background painting as notes are played
4. **Audio Engine**: Synthesizes piano notes when keys are activated

## How to Use

### Playing the Piano
1. From the start screen, point your index finger at the "Let's Begin!" button
2. Piano keys will appear alternately on the left and right sides of the screen
3. Point your index finger at the keys to play the notes
4. With each correct note, more of the *Starry Night* painting will be revealed
5. Complete the entire "Twinkle Twinkle Little Star" melody to fully reveal the painting

### Controls
- **Index Finger**: Main interaction method for pressing buttons and playing notes
- **Full Screen Button**: Located in the top-right corner for an immersive experience
- **Back to Menu Button**: Returns to the start screen (resets progress)

## Project Structure

### Main Functions
- `setup()`: Initializes the canvas, video capture, and ML models
- `draw()`: Main rendering loop that displays the interface and processes interactions
- `gotPoses()`: Callback function for hand tracking results
- `drawPiano()`: Renders the piano interface and current note
- `checkKeyInteraction()`: Detects when a user interacts with a piano key
- `generateNewKey()`: Creates a new key with the next note in the sequence

### Visual Elements
- Gradient background simulating sky
- Semi-transparent webcam feed for user feedback
- Van Gogh's *Starry Night* painting that gradually appears
- Interactive buttons with hover effects
- Visual indicator for the index finger position

## Requirements
- Modern web browser with JavaScript enabled
- Webcam
- Sufficient lighting for hand detection
- Recommended minimum resolution: 500x500 pixels

## Future Enhancements
- Additional songs and artworks
- Two-handed piano playing
- Difficulty levels with more complex melodies
- Multiplayer mode for collaborative art creation
- Custom artwork upload feature

## Credits
- Hand tracking technology: ML5.js handPose model
- Audio synthesis: Tone.js
- Artwork: Vincent van Gogh's *Starry Night*
- Song: "Twinkle Twinkle Little Star"


## Working Project
- Follow the link to experience this project
[StarryNightsPiano](https://editor.p5js.org/Yash.r/full/mrWrwnkAE)
