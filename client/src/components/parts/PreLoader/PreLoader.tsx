import { FC } from 'react';
import Loader from '../../../assets/loading';
import { Box } from '@mui/material';

const PreLoader: FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Loader />
    </Box>
  );
};

export default PreLoader;
