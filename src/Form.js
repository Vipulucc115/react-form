// src/Form.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Forms.css"; // Correct import path

const Form = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    countryCode: "",
    phoneNo: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
    countryCode: false,
    phoneNo: false,
    country: false,
    city: false,
    panNo: false,
    aadharNo: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const noErrors = Object.keys(formErrors).length === 0;
    const allFieldsFilled = Object.values(formValues).every(
      (value) => value.trim() !== ""
    );
    setIsSubmitDisabled(!(noErrors && allFieldsFilled));
  }, [formErrors, formValues]);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "firstName":
        return value.trim() ? null : "First Name is required";
      case "lastName":
        return value.trim() ? null : "Last Name is required";
      case "username":
        return value.trim() ? null : "Username is required";
      case "email":
        return value.trim()
          ? /^\S+@\S+\.\S+$/.test(value)
            ? null
            : "E-mail is invalid"
          : "E-mail is required";
      case "password":
        return value.length >= 6
          ? null
          : "Password must be at least 6 characters long";
      case "countryCode":
        return value.trim() ? null : "Country Code is required";
      case "phoneNo":
        return /^\d{10}$/.test(value) ? null : "Phone Number is invalid";
      case "country":
        return value.trim() ? null : "Country is required";
      case "city":
        return value.trim() ? null : "City is required";
      case "panNo":
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
          ? null
          : "PAN No. is invalid";
      case "aadharNo":
        return /^\d{12}$/.test(value) ? null : "Aadhar No. is invalid";
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const newTouchedFields = { ...touchedFields, [name]: true };
    setTouchedFields(newTouchedFields);
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formValues).forEach((fieldName) => {
      const error = validateField(fieldName, formValues[fieldName]);
      if (error) errors[fieldName] = error;
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      navigate("/success");
    }
  };

  return (
    <div style={{ width: "400px" }}>
      {" "}
      {/* Adjust the width as needed */}
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.firstName && formErrors.firstName && (
            <span>{formErrors.firstName}</span>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.lastName && formErrors.lastName && (
            <span>{formErrors.lastName}</span>
          )}
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.username && formErrors.username && (
            <span>{formErrors.username}</span>
          )}
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.email && formErrors.email && (
            <span>{formErrors.email}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formValues.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
          {touchedFields.password && formErrors.password && (
            <span>{formErrors.password}</span>
          )}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={formValues.phoneNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.phoneNo && formErrors.phoneNo && (
            <span>{formErrors.phoneNo}</span>
          )}
        </div>
        <div>
          <label>Country</label>
          <select
            name="country"
            value={formValues.country}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </select>
          {touchedFields.country && formErrors.country && (
            <span>{formErrors.country}</span>
          )}
        </div>
        <div>
          <label>City</label>
          <select
            name="city"
            value={formValues.city}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select City</option>
            {formValues.country === "India" && (
              <>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </>
            )}
            {formValues.country === "USA" && (
              <>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
              </>
            )}
            {formValues.country === "Canada" && (
              <>
                <option value="Toronto">Toronto</option>
                <option value="Vancouver">Vancouver</option>
              </>
            )}
          </select>
          {touchedFields.city && formErrors.city && (
            <span>{formErrors.city}</span>
          )}
        </div>
        <div>
          <label>PAN No.</label>
          <input
            type="text"
            name="panNo"
            value={formValues.panNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.panNo && formErrors.panNo && (
            <span>{formErrors.panNo}</span>
          )}
        </div>
        <div>
          <label>Aadhar No.</label>
          <input
            type="text"
            name="aadharNo"
            value={formValues.aadharNo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touchedFields.aadharNo && formErrors.aadharNo && (
            <span>{formErrors.aadharNo}</span>
          )}
        </div>
        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
