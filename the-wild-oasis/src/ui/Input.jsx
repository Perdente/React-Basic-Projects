import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  width: 100%;

  ${({ type }) => type === 'password' && `padding-right: 3rem;`}
  position: relative;
`;

const ToggleIconWrapper = styled.span`
  position: absolute;
  cursor: pointer;
  top: 30%; /* Adjust this based on input height */
  right: 10px;
  z-index: 1000;
`;

const InputComponent = forwardRef(function InputComponent({ type, ...props }, ref) {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((prevVisible) => !prevVisible);
  const passwordInputType = visible ? 'text' : 'password';
  const visibilityIcon = visible ? <HiOutlineEye /> : <HiOutlineEyeOff />;

  return (
    <div style={{ position: 'relative' }}>
      <Input type={type === 'password' ? passwordInputType : type} ref={ref} {...props} />

      {type === 'password' && <ToggleIconWrapper onClick={toggleVisibility}>{visibilityIcon}</ToggleIconWrapper>}
    </div>
  );
});

export default InputComponent;
