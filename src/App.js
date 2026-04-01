import React, { useRef, useState, useEffect } from "react";

import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import chillHop from "./data.js";
import Library from "./components/Library";
import LibrarySong from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load songs on component mount
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const songData = await chillHop();
        setSongs(songData);
        setCurrentSong(songData[0]);
      } catch (error) {
        console.error("Failed to load songs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, []);

  // Handle song changes - reset and start playing
  useEffect(() => {
    if (!audioRef.current || !currentSong || loading) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Playback error on song change:", err.message);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, loading]);

  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current || !currentSong || loading) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Playback error:", err.message);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong, loading]);

  //Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };
  const autoplayHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "1.5rem",
            color: "#fff",
          }}
        >
          Loading radio stations...
        </div>
      ) : currentSong ? (
        <>
          <Nav
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
          />
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
            onEnded={autoplayHandler}
            onError={(e) => {
              if (e.target.error) {
                console.error("Audio error:", e.target.error.message);
              }
            }}
          />
        </>
      ) : null}
    </div>
  );
}

export default App;
