import {FC} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useTheme} from "@mui/material";

interface ChatCardProps {
    tag:string,
    isActive?:boolean
}




const ChatCard:FC<ChatCardProps> = ({tag, isActive})=>{
    const theme = useTheme()
    return(
        <>
            <Card sx={{ minWidth: 275,
                margin:theme.spacing(1 ,0),
                backgroundColor:`${isActive && 'action.disabled'}`
            }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {tag}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default ChatCard