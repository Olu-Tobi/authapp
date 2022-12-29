import Avatar from "@mui/material/Avatar"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const theme = createTheme()

export default function EmailConfirm() {
  const router = useRouter()

  const { token } = router.query

  //console.log(token)

  useEffect(() => {
    sendToken(token)
  }, [token])

  const sendToken = async (token) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.put(`/api/user/email/${token}`, {}, config)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <VerifiedUserIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
            Email verified.<br/>
            Proceed to login
          </Typography>
          <Box
            component="form"
         
            noValidate
            sx={{ mt: 1 }}
          >
          
          </Box>
        </Box>
      </Container>
    </>
  )
}
