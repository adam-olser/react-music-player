import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const animationPercentage =
    songInfo.duration &&
    isFinite(songInfo.duration) &&
    isFinite(songInfo.currentTime)
      ? (songInfo.currentTime / songInfo.duration) * 100
      : 0;
  //UseEffect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);
  //Event Handlers
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
  };
  const getTime = (time) => {
    if (!isFinite(time) || isNaN(time)) return "0:00";
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    // Radio streams don't support seeking, only allow seeking if duration is finite
    if (songInfo.duration && isFinite(songInfo.duration)) {
      audioRef.current.currentTime = e.target.value;
      setSongInfo({ ...songInfo, currentTime: e.target.value });
    }
  };
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    switch (direction) {
      case "skip-back":
        setCurrentSong(
          songs[(currentIndex - 1 >= 0 ? currentIndex : songs.length) - 1],
        );
        break;
      case "skip-forward":
        setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        break;
      default:
    }
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]}`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div
            className="animate-track"
            style={{ transform: `translateX(${animationPercentage}%)` }}
          />
        </div>
        <p>
          {songInfo.duration
            ? getTime(songInfo.duration - songInfo.currentTime)
            : "0:00"}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          size="2x"
          className="skip-back"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          size="2x"
          className="play"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
