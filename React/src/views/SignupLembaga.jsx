import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { useState } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                HopefulHarbor
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const noReqRef = useRef()
    const noTelpRef = useRef()
    const roleRef = useRef()
    const penanggungRef = useRef()
    const lokasiRef = useRef()
    const bankRef = useRef()
    const deskripsiRef = useRef()
    const nikRef = useRef()
    const npwpRef = useRef()

    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const [location, setLocation] = useState({ lat: null, lon: null });
    const [destination, setDestination] = useState({ lat: '', lon: '' }); // Destination input state
    const [route, setRoute] = useState([]);
    const [distance, setDistance] = useState(null);
    const [destinationName, setDestinationName] = useState("Enter coordinates to get name");
    const [bank, setBank] = useState(null)

    const styles = {
        // backgroundColor: '#E1F3D8',
        padding: 4
    }

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            no_rekening: noReqRef.current.value,
            nomor_telepon: noTelpRef.current.value,
            role: "lembaga",
            penanggung_jawab: penanggungRef.current.value,
            lokasi: lokasiRef.current.value,
            bank: bank,
            deskripsi: deskripsiRef.current.value,
            latitude: location.lat,
            longitude: location.lon,
            nik: nikRef.current.value,
            npwp: npwpRef.current.value
        }
        axiosClient.post('/signupLembaga', payload)
            .then(({ data }) => {
                return navigate('/login', { state: { message: 'Lembaga Berhasil dibuat, mohon ditunggu untuk disetujui oleh Admin' } })
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })

    }

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error obtaining geolocation:", error);
                    // Fallback ke lokasi manual jika geolocation gagal
                    const jakartaCoords = { lat: -6.2088, lon: 106.8456 };
                    setLocation(jakartaCoords);
                }
            );
        } else {
            // Fallback ke lokasi manual jika geolocation tidak didukung
            const jakartaCoords = { lat: -6.2088, lon: 106.8456 };
            setLocation(jakartaCoords);
        }
    }, []);

    return (
        <div style={styles}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: '#132519' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, borderRadius: 10, width: '1000px' }}>
                            <Typography component="h1" variant="h5">
                                {/* Sign Up Lembaga */}
                            </Typography>
                            {errors && <div className="alert">
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                            }
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={nameRef} placeholder="Nama Organisasi" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={emailRef} type="email" placeholder="Email Address" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={passwordRef} type="password" placeholder="Password" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={penanggungRef} type="" placeholder="Nama Penanggung Jawab" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={deskripsiRef} type="" placeholder="Deskripsi Lembaga" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={nikRef} placeholder="Nomor Induk Kependudukan Penanggung Jawab (NIK)" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={npwpRef} placeholder="Nomor Pokok Wajib Pajak (NPWP)" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={noReqRef} type="number" placeholder="No Rekening" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={lokasiRef} type="" placeholder="Lokasi" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <input ref={noTelpRef} type="number" placeholder="No Telepon" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="bank-label">Bank</InputLabel>
                                            <Select
                                                labelId="bank-label"
                                                id="bank-select"
                                                value={bank}
                                                onChange={(event) => setBank(event.target.value)}
                                                label="Bank"
                                                style={{ height: '50px' }}
                                            >
                                                <MenuItem value="BCA">BCA</MenuItem>
                                                <MenuItem value="Mandiri">Mandiri</MenuItem>
                                                <MenuItem value="BNI">BNI</MenuItem>
                                                <MenuItem value="BRI">BRI</MenuItem>
                                                <MenuItem value="CIMB">CIMB</MenuItem>
                                                <MenuItem value="Panin">Panin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ width: '400px', backgroundColor: '#66AB92' }}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}
