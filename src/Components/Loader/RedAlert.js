import React, {useEffect} from "react";
function RedAlert(props) {
    useEffect(() => {
      const timeId = setTimeout(() => {
        props.setRed(false);
      }, 3000);
      
      return () => {
        clearTimeout(timeId)
      }
    }, [])
    
    return (
      <div class="alert alert-danger" role="alert">
        Form not submitted...
      </div>
    );
  }
  
  export default RedAlert;
  