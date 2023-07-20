import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";

const ChatOutlet = ()=>{
    const {id} = useParams()

    return(
        <>
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Typography>
                            @{id}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default ChatOutlet