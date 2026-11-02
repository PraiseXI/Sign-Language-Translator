# Sign Language Translator

Real-time sign language to text translation in the browser — built as a final-year university dissertation proof-of-concept.

> ⚠️ **Proof-of-concept** — this project was developed as an academic research prototype. It demonstrates a working end-to-end pipeline rather than a production-ready translator.

## Overview

Sign Language Translator captures a live webcam feed and classifies hand signs into letters in real time, building them up into words and sentences that can be read on screen and translated into other languages.

## How it works

1. **Capture** — the webcam stream is captured using the browser's `getUserMedia` API.
2. **Classify** — each video frame is passed to a Google Teachable Machine image classifier via [ml5.js](https://ml5js.org/).
3. **Aggregate** — classifications are sampled repeatedly and the most common letter is chosen to build words and sentences.
4. **Output** — the resulting sentence is displayed and can be translated with the Google Translate widget.

## Tech stack

- **JavaScript** (vanilla)
- **[p5.js](https://p5js.org/)** — canvas rendering and video capture
- **[ml5.js](https://ml5js.org/)** — image classification wrapper
- **Google Teachable Machine** — the pre-trained classification model
- **Google Translate widget** — multi-language output

## Running locally

The app uses your webcam, so it must be served from `localhost` (a secure context is required for camera access).

```sh
# from the project root
python3 -m http.server 8000
```

Then open `http://localhost:8000/startPage.html` and allow camera access.

## Flow

`startPage.html` → `translate.html` → `output.html`

## Limitations

- Recognises individual letters (a Teachable Machine model) rather than full signs or gestures.
- Classification accuracy depends on lighting, background, and hand positioning.
- Built for a university dissertation — the model and UI are intentionally minimal.

## Status

Developed as a dissertation proof-of-concept. Not actively maintained.
