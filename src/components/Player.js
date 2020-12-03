import { useRef, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
  //Ref
  const audioRef = useRef(null)
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    }
    else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({...songInfo, currentTime: current, duration})
  }
  const getTime = (time) => {
    return (
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({...songInfo, currentTime: e.target.value})
  }
  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  return(
      <div className='player'>
        <div className='time-control'>
          <p>{getTime(songInfo.currentTime)}</p>
          <input min={0} max={songInfo.duration} value={songInfo.currentTime} type='range' onChange={dragHandler}/>
          <p>{getTime(songInfo.duration - songInfo.currentTime)}</p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon size='2x' className='skip-back'  icon={faAngleLeft}/>
          <FontAwesomeIcon onClick={playSongHandler} size='2x' className='play' icon={faPlay}/>
          <FontAwesomeIcon size='2x' className='skip-forward'  icon={faAngleRight}/>
        </div>
        <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}/>
      </div>
  )
}

export default Player