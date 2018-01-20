import React from 'react';
import { css } from 'glamor';

const style = css({
  width: '100%',
  background: '#edd9c0',
  padding: '20px 50px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #3b3a36',
});

const Header = () => {
  return (
    <div {...style}>
      <h1>Queue Simulator!</h1>
    </div>
  );
};

export default Header;
