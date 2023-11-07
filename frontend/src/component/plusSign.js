import React from 'react';

function PlusSign({onClick}) {

  const AddPlaylist = () =>{
      onClick();
  }
  return (
    <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg" onClick={AddPlaylist} style= {{cursor: 'pointer'}}>
      <circle cx="15" cy="15" r="14" fill="none" stroke="white" strokeWidth="2" />
      <line x1="5" y1="15" x2="25" y2="15" stroke="white" strokeWidth="4" />
      <line x1="15" y1="5" x2="15" y2="25" stroke="white" strokeWidth="4" />
    </svg>
  );
}

export default PlusSign;