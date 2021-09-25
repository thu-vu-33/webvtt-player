import React from 'react'
import ReactDOM from 'react-dom'
import { Player } from '../src/'
// import 'semantic-ui-css/semantic.min.css'

const root = document.getElementById('webvtt-player')

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <Player
    audio={root.dataset.audio}
    transcript={root.dataset.transcript}
    metadata={root.dataset.metadata}
    preload={true} />,
  root
)
