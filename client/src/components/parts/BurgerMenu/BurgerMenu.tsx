import {FC} from "react";
import {MenuItem, Typography, Menu} from "@mui/material";
import { StorageServiceInstance } from '../../../services/storageService';
import {LocalStorage} from "../../../constants/varibles";
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
                StorageServiceInstance.deleteItem(LocalStorage.accessToken)
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