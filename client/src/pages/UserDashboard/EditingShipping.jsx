import { useForm } from "../../utils/customHooks";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_SHIPPING } from "../../graphql/Mutations/userMutations";
import Loading from "../../assets/mui/Loading";
import { GET_USER_CART } from "../../graphql/Queries/cartQueries";
import { GET_USER_DETAILS } from "../../graphql/Queries/userQueries";
import axios from "axios";
import MuiError from "../../assets/mui/Alert";
import provinces from "../../utils/provinces.js";

const EditingShipping = ({
  toggleEdit,
  title,
  userInfo,
}) => {
  const { city, address, postalCode, phoneNumber, country } =
    userInfo.shippingAddress;

  const initialState = {
    city,
    address,
    postalCode,
    phoneNumber,
    country,
  };

  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit } = useForm(
    updateShippingCallback,
    initialState
  );

  const [updateShipping, { loading }] = useMutation(UPDATE_SHIPPING, {
    onCompleted() {
      toggleEdit();
    },
    variables: values,
    refetchQueries: [
      {
        query: GET_USER_CART,
        variables: { userId: userInfo?.id },
      },
      {
        query: GET_USER_DETAILS,
        variables: { userId: userInfo?.id },
      },
    ],
  });

  const validatePhoneNumber = async (phoneNumber) => {
    const trimmedPhone = phoneNumber.trim();

    if (!/^\d+$/.test(trimmedPhone)) {
      return "Phone number must contain only numbers.";
    }

    if (!/^0/.test(trimmedPhone)) {
      return "Phone number must start with 0.";
    }

    if (trimmedPhone.length < 10 || trimmedPhone.length > 11) {
      return "Phone number must have 10 or 11 digits.";
    }

    try {
      const apiKey = "503e582c7742d1af11602ddda4378e54";
      const response = await axios.get(
        `https://apilayer.net/api/validate?access_key=${apiKey}&number=${trimmedPhone}&country_code=VN&format=1`
      );

      const { valid } = response.data;

      if (!valid) {
        return "Phone number is invalid or does not exist.";
      }

      return "";
    } catch (error) {
      console.error("Error validating phone number:", error);
      return "Error checking phone number. Please try again.";
    }
  };

  const validateAddress = (address) => {
    const regex = /^[\p{L}0-9]+(?:\s[\p{L}0-9]+)*$/u;
    return regex.test(address.trim());
  };

  const validateZipCode = (postalCode) => {
    const regex = /^[0-9]+$/;
    return regex.test(postalCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    const phoneError = await validatePhoneNumber(values.phoneNumber);
    if (phoneError) {
      validationErrors.phoneNumber = phoneError;
    }

    if (!validateAddress(values.address)) {
      validationErrors.address = "Address must not contain special characters!";
    }

    if (!validateAddress(values.country)) {
      validationErrors.country = "State/Region must not contain special characters!";
    }

    if (!validateZipCode(values.postalCode)) {
      validationErrors.postalCode = "Zip/Postal Code must contain only numbers!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    updateShipping();
  };

  function updateShippingCallback() {
    updateShipping();
  }

  return (
    <div className="flex w-[80%] flex-col p-8 mx-12 my-8 bg-white rounded-lg shadow-sm border border-rose-100/50">
      <div className="flex w-full justify-between items-center pb-4 border-b border-rose-200/50">
        <h2 className="text-2xl font-bold text-rose-800">{title}</h2>
        <button 
          onClick={toggleEdit}
          className="w-[10%] h-10 bg-rose-800 text-white rounded-md transition-all duration-300 hover:bg-rose-700 text-sm tracking-wide md:w-[25%]"
        >
          Cancel
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-6 md:grid-cols-1">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-rose-800">Address</label>
          <input
            name="address"
            value={values.address || ""}
            onChange={onChange}
            type="text"
            className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          {errors.address && <MuiError value={errors.address} type="error" />}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-rose-800">City</label>
          <select 
            name="city" 
            value={values.city} 
            onChange={onChange}
            className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">-- Chọn tỉnh/thành phố --</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          {errors.city && <MuiError value={errors.city} type="error" />}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-rose-800">State/Region</label>
          <input
            name="country"
            value={values.country || ""}
            onChange={onChange}
            type="text"
            className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          {errors.country && <MuiError value={errors.country} type="error" />}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-rose-800">Zip/Postal Code</label>
          <input
            name="postalCode"
            value={values.postalCode || ""}
            onChange={onChange}
            type="text"
            className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          {errors.postalCode && <MuiError value={errors.postalCode} type="error" />}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-rose-800">Phone Number</label>
          <input
            name="phoneNumber"
            value={values.phoneNumber || ""}
            onChange={onChange}
            type="text"
            className="w-full px-4 py-2.5 text-base text-gray-700 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          {errors.phoneNumber && <MuiError value={errors.phoneNumber} type="error" />}
        </div>
        <div className="col-span-2 flex justify-center mt-4">
          {loading ? (
            <Loading style={{ margin: "0 auto" }} />
          ) : (
            <button 
              type="submit"
              disabled={loading}
              className="w-[50%] h-12 bg-rose-800 text-white rounded-md transition-all duration-300 hover:bg-rose-700 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditingShipping;
