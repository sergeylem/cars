import React from 'react';
import ReactPlayer from 'react-player'

const playSound = (props) => {

  return <ReactPlayer  //ReactPlayer must be in the same string where is RETURN or it's necessary to use "()"
    playing
    url={[props.urlStr]}
  />
};

export default playSound;


// import React from 'react';
// import Sound from 'react-sound';

// const playSound = (props) => {
//     // return <div>
//     //           <audio src = { props.urlStr} autoPlay />
//     //         </div>
//     return <Sound  //Sound must be in the same string where is RETURN or it's necessary to use "()"
//         url = {props.urlStr}
//         autoLoad = {true}
//         playStatus = {Sound.status.PLAYING} />        
// };

// export default playSound;