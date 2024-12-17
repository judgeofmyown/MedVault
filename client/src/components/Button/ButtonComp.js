import React from 'react';
import { Link } from "react-router-dom";
import "./ButtonComp.css"

function ButtonComp({ Label, to, disabled}) {
  return (
    <Link to={disabled?"#":to} className="button-link">
        <button className={`${disabled?"disabled":""}`} disabled={disabled} title={disabled?"log in to access dashboard":""}>{Label}</button>
    </Link>
  )
}

export default ButtonComp