import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider"
import { useEffect } from "react";
import axiosClient from "../axios-client";
import Footer from "../components/Footer";
import HeaderMain from "../components/Header";
import { Button, Grid } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext()

    if (!token) {
        return <Navigate to="/landingpage" />
    }

    const onLogout = (event) => {
        event.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            }).catch((err)=>{
                return <Navigate to="/landingpage" />
                // window.location.reload()
            })
    }, [])


    return (
        <>
            <HeaderMain />
            <Grid sx={{display:'flex', justifyContent:'right'}}>
            <Button color="error"  onClick={onLogout}><LogoutIcon />Logout</Button>
            </Grid>
                <Outlet />
            <Footer />
        </>
    )
}
