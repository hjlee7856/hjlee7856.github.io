import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import * as React from 'react';

interface Props {
  menuBtn: React.ReactNode;
  menuItem: React.ReactNode[];
}

export default function DropDownMenu({ menuBtn, menuItem }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        {menuBtn}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4px',
          width: '160px',
        }}
      >
        {menuItem.map((item, idx) => (
          <Box key={idx}>{item}</Box>
        ))}
      </Menu>
    </div>
  );
}
