import {FC} from "react";
import {MenuItem, Typography, Menu} from "@mui/material";
import {deleteItemFromLocalStorage} from "../../../services/localStorage";
import {LocalStorage} from "../../../enum/varibles";
import {useNavigate} from "react-router-dom";

const ITEM_HEIGHT = 76;

interface BurgerMenuProps{
    anchorEl:null | HTMLElement,
    open:Boolean,
    handleClose:()=>void
}

const BurgerMenu:FC<BurgerMenuProps> = ({anchorEl, open, handleClose})=>{
    const navigate = useNavigate()


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
                <MenuItem onClick={handleLogOutOnClick}>
                        <Typography>Log Out</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default BurgerMenu