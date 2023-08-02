import {FC, useEffect, useState} from "react";
import {MenuItem, Box, Typography, Menu, Switch} from "@mui/material";
import {deleteItemFromLocalStorage} from "../../../services/localStorage";
import {LocalStorage} from "../../../enum/varibles";
import {useNavigate} from "react-router-dom";
import {useTheme} from "../../../hooks/useTheme";

const ITEM_HEIGHT = 76;

interface BurgerMenuProps{
    anchorEl:null | HTMLElement,
    open:Boolean,
    handleClose:()=>void
}

const BurgerMenu:FC<BurgerMenuProps> = ({anchorEl, open, handleClose})=>{
    const navigate = useNavigate()
    const {currentTheme, handleThemeChange} = useTheme()
    const [checked, setChecked]= useState<boolean>(currentTheme.palette.mode==='dark')

    useEffect(()=>{
        setChecked(currentTheme.palette.mode==="dark")
    },[currentTheme.palette.mode])

    const handleLogOutOnClick = () =>{
        new Promise((resolve, reject)=>{
            try {
                deleteItemFromLocalStorage(LocalStorage.accessToken)
                resolve('')
            } catch (e) {
                reject(e)
            }
        }).then(()=>{
            navigate('/login')
        }).finally(()=>{
            handleClose()
        })
    }



    return(
        <>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={Boolean(open)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '40ch',
                    },
                }}
            >
                <MenuItem>
                    <Box sx={{
                        width:"100%",
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}>
                        <Typography>Dark mode</Typography>
                        <Switch checked={checked} onChange={handleThemeChange}/>
                    </Box>
                </MenuItem>
                <MenuItem onClick={handleLogOutOnClick}>
                        <Typography>Log Out</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default BurgerMenu