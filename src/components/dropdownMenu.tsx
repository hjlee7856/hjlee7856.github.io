import { Menu } from '@mui/material';
import * as React from 'react';

interface Props {
  menuBtn: React.ReactNode;
  menuItems: React.ReactNode[];
}

export default function DropDownMenu({ menuBtn, menuItems }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div onClick={handleClick} style={{ display: 'inline-flex', cursor: 'pointer' }}>
        {menuBtn}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {menuItems}
      </Menu>
    </>
  );
}
