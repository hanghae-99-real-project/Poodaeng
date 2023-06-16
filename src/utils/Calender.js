import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { koKR } from '@mui/x-date-pickers/locales';


const Calender = ({setCalender, calender}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText}>
      <DemoContainer
        components={[
          'MobileDateTimePicker',
          'StaticDateTimePicker',
        ]}
      >
        <DemoItem label="실종 시간"  >
          <MobileDateTimePicker localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText} value={dayjs(calender)} onChange={(date)=>setCalender(dayjs(date.$d))}  />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calender