import React, { useRef, useState } from "react";

import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data.js";
import Library from "./components/Library";
import LibrarySong from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  //Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <LibrarySong
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </div>
  );
}

export default App;
