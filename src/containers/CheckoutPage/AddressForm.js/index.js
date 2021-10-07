import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../../actions';
import TextField from '@material-ui/core/TextField';
import './style.css';

const AddressForm = (props) => {
  const { initialData } = props;
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [mobileNumber, setMobileNumber] = useState(initialData ? initialData.mobileNumber : '');
  const [pinCode, setPinCode] = useState(initialData ? initialData.pinCode : '');
  const [locality, setLocality] = useState(initialData ? initialData.locality : '');
  const [address, setAddress] = useState(initialData ? initialData.address : '');
  const [cityDistrictTown, setCityDistrictTown] = useState(initialData ? initialData.cityDistrictTown : '');
  const [addressType, setAddressType] = useState(initialData ? initialData.addressType : '');
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : '');
  const dispatch = useDispatch();

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        addressType
      }
    };
    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  }

  useEffect(() => {
    if (submitFlag) {
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          addressType
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }
      props.onSubmitForm(_address);
    }
  }, [user.address]);

  const renderAddressForm = () => {
    return (
      <form autoComplete="off">
        <div style={{ display: 'flex' }}>
          <div className="textField-container">
            <TextField
              className="input-textField"
              label="Name"
              value={name}
              inputProps={{ style: { fontSize: 13 } }}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="textField-container">
            <TextField
              className="input-textField"
              label="Mobile phone number"
              type="number"
              value={mobileNumber}
              inputProps={{ style: { fontSize: 13 } }}
              onChange={(e) => setMobileNumber(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="textField-container">
            <TextField
              className="input-textField"
              label="Pincode"
              value={pinCode}
              type="number"
              inputProps={{ style: { fontSize: 13 } }}
              onChange={(e) => setPinCode(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="textField-container">
            <TextField
              className="input-textField"
              label="Locality"
              value={locality}
              inputProps={{ style: { fontSize: 13 } }}
              onChange={(e) => setLocality(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="textField-container">
            <TextField
              className="input-textField"
              label="City/District/Town"
              value={cityDistrictTown}
              inputProps={{ style: { fontSize: 13 } }}
              onChange={(e) => setCityDistrictTown(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className="textField-container">
            <TextField
              className="input-textField"
              label="Address details"
              value={address}
              inputProps={{ style: { fontSize: 13 } }}
              onChange={(e) => setAddress(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <div className="addressType-content">
          <label className="addressType-label">Address type</label>
          <div className="addressType-btn-actions">
            <div className="addressType-btn-container">
              <button
                style={{ width: '100%' }}
                className="addressType-btn" onClick={(e) => {
                  e.preventDefault();
                  setAddressType("home");
                }}>
                Home
              </button>
            </div>
            <div className="addressType-btn-container">
              <button
                style={{ width: '100%' }}
                className="addressType-btn" onClick={(e) => {
                  e.preventDefault();
                  setAddressType("work")
                }}>
                Workplace
              </button>
            </div>
          </div>
          <button className="saveCustomerInfo-btn" onClick={onAddressSubmit} style={{ margin: "20px 0" }}>
            Save and deliver here
          </button>
        </div>
      </form>
    );
  }

  if (props.withoutLayout) {
    return <div style={{ width: '100%' }}>{renderAddressForm()}</div>;
  }

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
      <div className="checkoutHeader">
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div className="addressForm-container">{renderAddressForm()}</div>
    </div>
  );
}

export default AddressForm;