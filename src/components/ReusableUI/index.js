import React from 'react'
import './style.scss';
import { Link } from 'react-router-dom';

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div
            className="modalClose"
            onClick={props.onClose}
          >
            x
          </div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>
  );
}

const DropdownMenu = (props) => {
  return (
    <div className="headerDropdownContainer">
      {props.menu}
      <div className="dropdown">
        <div className="upArrowContainer">
          <div className="upArrow"></div>
        </div>
        <div className="dropdownMenu">
          {props.firstMenu}
          <ul className="headerDropdownMenu">
            {props.menus &&
              props.menus.map((item, index) => (
                <li key={index}>
                  <Link
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick && item.onClick();
                      }
                    }}
                    to={`${item.to}`}
                  >
                    <span className="dropdown-item">{item.icon}
                      <p>{item.label}</p>
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Anchor = (props) => {
  return (
    <button {...props} className="anchorButton">
      {props.name}
    </button>
  );
}

export { Modal, DropdownMenu, Anchor }