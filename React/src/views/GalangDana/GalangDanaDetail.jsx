import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios-client"
import { useEffect, useState } from "react"
import { Box, Button, Grid } from "@mui/material"
import LinearDeterminate from "../../components/LinearDeterminate"
import CircularIndeterminate from "../../components/CircularIndeterminate"

export default function GalangDanaDetail() {
    const [detail, setDetail] = useState({})
    const id = useParams()
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/user')
            .then(({ data }) => {
                setRole(data.role)
            })

        axiosClient.get(`/crowdfunding/${id.id}`)
            .then(({ data }) => {
                if(data.crowdfunding === null){
                    return navigate('/')
                }
                setDetail(data.crowdfunding)
                setLoading(false)
            })
            .catch((err)=>{
                return navigate('/')
            })
    }, [])

    useEffect(() => {
      if(detail.status === 0 && role !== 'admin'){
        return navigate('/')
      }
    }, [detail])
    

    let image = `http://localhost:8000${detail.image}`

    const handleApprove = () => {
        axiosClient.post(`/crowdfunding/approve/${id.id}`)
            .then((res) => {
                return navigate('/galangdana/approvepage', { state: { message: res.data } })
            }
            )
    }
    const handleReject = () => {
        axiosClient.post(`/crowdfunding/reject/${id.id}`)
            .then((res) => {
                return navigate('/galangdana/approvepage', { state: { message: res.data } })
            }
            )
    }

    return (
        <>
            {loading && <CircularIndeterminate />}
            {!loading && <Grid>
                <Button variant="contained" sx={{width:'100px', marginLeft:"30px", backgroundColor: '#66AB92'}} onClick={()=>navigate(-1)}>
                    Back
                </Button>
                <Grid container direction={'row'} sx={{ padding: '100px', paddingBottom: '0', paddingTop:'50px' }}>
                    {/* {Left Side} */}
                    
                    <Grid item xs={12} md={6} sx={{ }}>
                        <Box
                            component="img"
                            sx={{
                                height: '400px',
                                width: '400px',
                                borderRadius: '40px',
                                minWidth: '400px',
                            }}
                            src={image}
                        />
                    </Grid>
                    {/* {Right Side} */}
                    <Grid container xs={12} md={6} direction={'column'} rowGap={2} >
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <h1>{detail.title}</h1>
                        </Grid>
                        <Grid item>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <LinearDeterminate progress={detail.progress} />
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <h3>{detail.progress}%</h3>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ justifyContent: 'space-between' }}>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <h2 style={{ fontWeight: 'normal' }}>Dana Terkumpul</h2>
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <h2 style={{ fontWeight: 'normal' }}>Target</h2>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ justifyContent: 'space-between' }}>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <h2>Rp {detail.fund ? detail.fund.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : detail.fund}</h2>
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                                <h2>Rp {detail.target ? detail.target.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : detail.target}</h2>
                            </Grid>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            <h1>Lokasi</h1>
                        </Grid>
                        <Grid item>
                            <h3>{detail.location}</h3>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Bottom */}
                <Grid container direction={'row'} sx={{ padding: '100px', paddingTop: '30px' }} spacing={1}>
                    {/* {Left} */}
                    <Grid container xs={12} md={8} sx={{ display: 'block' }}>
                        <Grid item>
                            <h1>Deskripsi</h1>
                        </Grid>
                        <Grid item>
                            <h3 style={{ fontWeight: 'normal' }}>{detail.description}</h3>
                        </Grid>
                    </Grid>
                    {/* Right */}
                    <Grid container xs={12} md={4} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'self-end' }}>
                        <Grid item >
                            {detail.status === 1 && role!== 'admin' &&
                                <Link to='/galangdana/payment' state={{ detail: detail }}>
                                    <Button variant="contained" style={{ backgroundColor: '#66AB92', width: '200px', height: '50px', fontSize: '18px' }}>
                                        Beri Bantuan
                                    </Button>
                                </Link>}
                            {detail.status === 0 &&
                                <>
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <Button onClick={handleReject} color="error" variant="contained" style={{ width: '200px', height: '50px', fontSize: '18px' }}>
                                                Reject
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={handleApprove} color="success" variant="contained" style={{ backgroundColor: '#66AB92', width: '200px', height: '50px', fontSize: '18px' }}>
                                                Approve
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </>}
                        </Grid>
                    </Grid>

                </Grid>
                </Grid>
                    }
                </>
                )

}