import { React } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import data from '../data.json';

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
  let countryDetails;
  for (const c of data) {
    if (c.name === country) {
      countryDetails = c;
    }
  }

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
            src={`https://flagcdn.com/w20/${country.code?.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${country.code?.toLowerCase()}.png 2x`}
            alt=""
          /> */}
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: '600' }}>
            {country}
          </Typography>
        </div>
        <Divider/>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {countryDetails.img && <img src={countryDetails.img} style={{width: '550px', height: '250px', objectFit: 'cover', borderRadius: '8px'}}/>}
            <div style={{ backgroundColor: '#EDEDED', borderRadius: '8px', padding: '0px 15px 18px 15px' }}>
              <h3 style={{ marginBottom: '0' }}>⭐️ Capital</h3>
              <p style={{ marginBottom: '0' }}>{countryDetails.capital}</p>
            </div>
            <div style={{ backgroundColor: '#EDEDED', borderRadius: '8px', padding: '0px 15px 18px 15px' }}>
              <h3 style={{ marginBottom: '0' }}>🗣️ Languages</h3>
              <p style={{ marginBottom: '0' }}>{countryDetails.languages}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#EDEDED', borderRadius: '8px', width: '100%', padding: '15px' }}>
            <div>
              {countryDetails.description}
            </div>
            <Divider/>
            <h3 style={{ margin: '0' }}>⚠️ Alerts</h3>
            {
              countryDetails.alerts.map((a) => {
                return (
                  <div style={{display: 'flex', gap: '8px', padding: '10px', backgroundColor: '#ffe1bf', borderRadius: '8px', boxShadow: 'rgba(60, 66, 87, 0.03) 0px 7px 14px 0px, rgba(0, 0, 0, 0.03) 0px 3px 6px 0px' }}>
                    <h4 style={{ margin: '0' }}>{a.name}</h4>
                    <p style={{ margin: '0' }}>{a.date}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default CountryModal;