import React, { useState } from 'react'
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

const Input = (props) => {
  const [focus, setFocus] = useState(props.value === '' ? false : true);
  return (
    <div
      className="reusableInput"
      style={props.style}
    >
      <label className={`label ${focus ? "focus" : ""}`} >
        {props.label && `${props.label}`}
      </label>
      <input
        className="input"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onFocus={(e) => {
          setFocus(true);
        }}
      />
    </div>
  );
}

const Button = (props) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <div>
      <button
        className="reusableButton"
        style={{
          backgroundColor: props.bgColor,
          color: props.textColor,
          fontSize: props.fontSize,
          borderRadius: props.borderRadius,
          ...props.style
        }}
        onClick={onClick}
      >
        {props.icon && props.icon}
        {props.title && props.title}
      </button>
    </div >

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

const Breed = (props) => {
  return (
    <div className="breed">
      <ul>
        {props.breed?.map((item, index) => (
          <li key={index}>
            <Link to={item.to}>{item.name}</Link>
            {props.breedIcon}
          </li>
        ))}
      </ul>
    </div>
  );
}

export {
  Modal,
  Input,
  Button,
  DropdownMenu,
  Anchor,
  Breed
}