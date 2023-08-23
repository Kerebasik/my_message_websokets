import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import type { User } from '../../types/graphql';

type ChatCardProps = {
  user: User;
  isActive?: boolean;
};

const ChatCard = ({ user, isActive }: ChatCardProps) => {
  const theme = useTheme();
  console.log(user);
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          margin: theme.spacing(1, 0),
          backgroundColor: `${isActive && 'action.disabled'}`,
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {user.username}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatCard;
