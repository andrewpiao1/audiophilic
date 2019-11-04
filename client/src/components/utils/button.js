import React from 'react';
import { Link } from 'react-router-dom';


const MyButton = (props) => {

  const buttons = () => {  //checks the 'type' and returns the appropriate jsx
    let template = '';

    switch(props.type){
      case "link":
        template =
          <Link className="link_default"
            to={props.linkTo}
            {...props.addStyles}>

              {props.title}
          </Link>;
          break;

      default:
        template = '';
    }

    return template
  }

  return (
    <div className="my-button">
      {buttons()}     {/* Default scenario: Link */}
    </div>
  );
};

export default MyButton;