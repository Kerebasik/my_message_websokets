import { Box, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { MouseEvent } from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { NavLink } from 'react-router-dom';
import './ChatNavMenu.css';
import ChatCard from '../ChatCard';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import PreLoader from '../PreLoader/PreLoader';
import { SEARCHREQUESTDELAY } from '../../../constants/delay';
import { User } from '../../../types/graphql';
import { useGetUserByPhone } from '../../../hooks/query/useGetUserByPhone';

const ChatNavMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open: boolean = !!anchorEl;
  const { getUserByPhone, loading } = useGetUserByPhone();
  const [search, setSearch] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>();
  const [data, setData] = useState<Array<User> | undefined>();

  const theme = useTheme();

  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchRef.current?.focus();
    if (search === '') {
      return setData(undefined);
    }
    const timer = setTimeout(() => {
      getUserByPhone(search).then((data) => {
        if (data) {
          return setData([data!]);
        } else {
          return setData(undefined);
        }
      });
    }, SEARCHREQUESTDELAY);

    return () => clearTimeout(timer);
  }, [search]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
    },
  }));

  return (
    <>
      <Box>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              aria-label='more'
              id='long-button'
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              size='large'
              edge='start'
              color='inherit'
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <BurgerMenu
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
            />
            <Search
              sx={{
                flexGrow: '1',
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                id={'search-nav-menu'}
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchOnChange}
                value={search}
                inputRef={searchRef}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      {loading ? (
        <>
          <PreLoader />
        </>
      ) : (
        <Box
          justifyContent={'center'}
          className={'custom-box'}
          sx={{
            position: 'relative',
            flexDirection: 'column',
            padding: theme.spacing(1, 1),
          }}
        >
          {data?.map((item, index) => {
            return (
              <NavLink key={item._id + index} to={item._id + index}>
                {({ isActive }) => (
                  <ChatCard
                    key={item._id + index}
                    user={item}
                    isActive={isActive}
                  />
                )}
              </NavLink>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default ChatNavMenu;
