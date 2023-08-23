import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ChatNavMenu from '../parts/ChatNavMenu/ChatNavMenu';
import CreatePanelButton from '../parts/CreatePanelButton/CreatePanelButton';

const ChatLayout = () => {
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <Box
          sx={{
            flex: '1 1 25%',
            color: 'white',
            borderRight: '1px solid',
            borderRightColor: 'action.selected',
            backgroundColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <ChatNavMenu />
          <CreatePanelButton />
        </Box>
        <Box
          sx={{
            flex: '1 1 75%',
            color: 'white',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default ChatLayout;
