import styled, { css } from 'styled-components';

const test = css`
  text-align: center;
  background-color: #46db7f;
`;

const Heading = styled.h1`
  font-size: 20px;
  font-weight: 600;
  /* background-color: #ffffff; */

  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 800;
    `}
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
    `} /* ${test}; */
    
  ${(props) =>
    props.as === 'log-in' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `} /* ${test}; */
`;

export default Heading;
