import React, {useEffect} from "react";

function GreenAlert(props) {
  useEffect(() => {
    const timeId = setTimeout(() => {
      props.setGreen(false);
    }, 3000);
    
    return () => {
      clearTimeout(timeId)
    }
  }, [])
  
  return (
    <div class="alert alert-success" role="alert">
      Form Submitted Successfully...
    </div>
  );
}

export default GreenAlert;
