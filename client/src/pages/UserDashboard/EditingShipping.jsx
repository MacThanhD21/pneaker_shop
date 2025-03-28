import styled from "styled-components";
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
  Wrapper,
  TitleContainer,
  Title,
  EditButton,
  Info,
  Label,
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

    // Kiểm tra số điện thoại qua API
    try {
      const apiKey = "503e582c7742d1af11602ddda4378e54"; // Thay bằng API Key của bạn
      const response = await axios.get(
        `https://apilayer.net/api/validate?access_key=${apiKey}&number=${trimmedPhone}&country_code=VN&format=1`
      );

      const { valid } = response.data;

      if (!valid) {
        return "Phone number is invalid or does not exist.";
      }

      return ""; // ✅ Số điện thoại hợp lệ
    } catch (error) {
      console.error("Error validating phone number:", error);
      return "Error checking phone number. Please try again.";
    }
  };

  // Hàm kiểm tra Address & State/Region (chỉ cho phép chữ cái, số và khoảng trắng)
  const validateAddress = (address) => {
    const regex = /^[\p{L}0-9]+(?:\s[\p{L}0-9]+)*$/u;
    return regex.test(address.trim());
  };

  // Hàm kiểm tra Zipcode (chỉ chứa số, không có chữ cái hoặc ký tự đặc biệt)
  const validateZipCode = (postalCode) => {
    const regex = /^[0-9]+$/;
    return regex.test(postalCode);
  };

  // Hàm xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Kiểm tra số điện thoại
    const phoneError = await validatePhoneNumber(values.phoneNumber);
    if (phoneError) {
      validationErrors.phoneNumber = phoneError;
    }

    // Kiểm tra Address
    if (!validateAddress(values.address)) {
      validationErrors.address = "Address must not contain special characters!";
    }

    // Kiểm tra State/Region
    if (!validateAddress(values.country)) {
      validationErrors.country = "State/Region must not contain special characters!";
    }

    // Kiểm tra Zip/Postal Code
    if (!validateZipCode(values.postalCode)) {
      validationErrors.postalCode = "Zip/Postal Code must contain only numbers!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Nếu có lỗi, không tiếp tục
    }

    // Nếu tất cả hợp lệ, tiến hành cập nhật thông tin
    updateShipping();
  };

  // Hàm gọi mutation cập nhật thông tin
  function updateShippingCallback() {
    updateShipping();
  }

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Title>{title}</Title>
          <EditButton onClick={toggleEdit}>Cancel</EditButton>
        </TitleContainer>
        <Form onSubmit={handleSubmit}>
          <Info>
            <Label>Address</Label>
            <Input
              name="address"
              value={values.address || ""}
              onChange={onChange}
              type="text"
            />
            {errors.address && <MuiError value={errors.address} type="error" />}
          </Info>
          <Info>
            <Label>City</Label>
            <select name="city" value={values.city} onChange={onChange}>
              <option value="">-- Chọn tỉnh/thành phố --</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.city && <MuiError value={errors.city} type="error" />}
          </Info>
          <Info>
            <Label>State/Region</Label>
            <Input
              name="country"
              value={values.country || ""}
              onChange={onChange}
              type="text"
            />
            {errors.country && <MuiError value={errors.country} type="error" />}
          </Info>
          <Info>
            <Label>Zip/Postal Code</Label>
            <Input
              name="postalCode"
              value={values.postalCode || ""}
              onChange={onChange}
              type="text"
            />
            {errors.postalCode && <MuiError value={errors.postalCode} type="error" />}
          </Info>
          <Info>
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              value={values.phoneNumber || ""}
              onChange={onChange}
              type="text"
            />
            {errors.phoneNumber && <MuiError value={errors.phoneNumber} type="error" />}
          </Info>
          <Info>
            <Label>
              {loading ? (
                <Loading style={{ margin: "0 auto" }} />
              ) : (
                <SubmitButton disabled={loading}>Submit</SubmitButton>
              )}
            </Label>
          </Info>
        </Form>
      </Wrapper>
    </>
  );
};

export default EditingShipping;

const Input = styled.input`
  margin-top: -2rem;
  border-radius: 0.25rem;
  padding: 0.357rem 0.75rem;
  border: 1px solid var(--clr-gray);
  background-color: transparent;
  font-size: 100%;
  line-height: 1.15;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  height: 5vh;
  margin-top: 1.8rem;
  min-width: 50%;
  background: transparent;
  border: none;
  background-color: var(--clr-primary-2);
  cursor: pointer;
  transition: all 0.3s;
  color: white;
  font-size: 14px;
  letter-spacing: 0.5px;
  &:hover {
    background-color: var(--clr-primary);
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 30vh;
`;
