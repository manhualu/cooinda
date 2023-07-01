import { React } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const StyledCountryModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  height: '70vh',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  padding: 4,
  boxShadow: 'rgba(60, 66, 87, 0.08) 0px 7px 14px 0px, rgba(0, 0, 0, 0.08) 0px 3px 6px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',

  ".MuiBackdrop-root MuiModal-backdrop css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
};

const CountryModal = ({ country, openCountryModal, handleCloseCountryModal }) => {
  return (
    <Modal
      open={openCountryModal}
      onClose={handleCloseCountryModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={StyledCountryModal}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          {/* <img
            loading="lazy"
            width="36"
            src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
            alt=""
          /> */}
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
            {country.label}
          </Typography>
        </div>
        <Divider/>
        <Typography id="modal-modal-description" sx={{ mt: 2, margin: 0 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}

export default CountryModal;