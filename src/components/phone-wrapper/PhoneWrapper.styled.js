import styled from 'styled-components';

const PhoneWrapper = styled.div`
  position: relative;
  height: 690px;
  width: 350px;
  padding-top: 32px;
  padding-bottom: 20px;
  border: 14px solid #333536;
  border-radius: 38px;
  background: #232526;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  overflow-y: hidden;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 34px;
    width: 200px;
    background: #333536;
    border-radius: 0 0 16px 16px;
    z-index: 2;
  }
  ::after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    height: 4px;
    width: 138px;
    background: rgb(170, 170, 170);
    border-radius: 20px;
    z-index: 2;
  }
`;

export default PhoneWrapper;
