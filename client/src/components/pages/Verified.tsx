import { Container, Box, Typography } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export const Verified = () =>{
  return (
    <>
      <Container maxWidth={'sm'}>
        <Box
          component={'div'}
          sx={{
            height:'100vh',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Box
            component={'div'}
            sx={{
              display:"flex",
              flexDirection:"row",
              border:"10px solid",
              borderRadius:8,
              borderColor:"text.primary",
              justifyContent:'center',
              alignItems:'center',
              padding:4,
              gap:2,
              backgroundColor:"divider"
            }}
          >
            <VerifiedUserIcon sx={{
              fontSize:72,
              color:"text.primary"
            }}/>
            <Typography variant={'h1'} component={'h1'} color={'text.primary'}>
              Verified
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  )
}