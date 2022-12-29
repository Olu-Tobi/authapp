import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from "axios"
import { useEffect, useState } from "react"
import cookie from 'js-cookie'
import { useSession, signIn, getSession } from "next-auth/react"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { GoogleLoginButton } from "react-social-login-buttons"
import { useSelector } from "react-redux"




const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   
    const { user } = useSelector(state => state.user)

  const router = useRouter()
  const cookies = parseCookies()
 

  const { data: session } = useSession()



  useEffect(() => {
   

    if (session) {
      toast.success("Login Success", {
        toastId: "customId"
      })
      router.push("/")
    }

    if (cookies?.user) {
      router.push("/")
    }
  }, [router, session])


    

    const submitHandler = async (e) => {
        e.preventDefault()
       
        

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          }

          const { data } = await axios.post(
            `/api/user/login`,
            { email, password },
            config
          )


          
          toast.success(data.message)
          cookie.set("token", data?.token)
          cookie.set("user", JSON.stringify(data?.user))
          router.push("/")
       
        } catch (error) {
          toast.error(error.response.data.error)
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={submitHandler}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
  
              <Grid
                container
                sx={{
                  mt: 2,
                  mb: 2,
                  border: 'none',
                  borderRadius: 1,
                  borderColor: "grey.400",
                }}
              >
                <GoogleLoginButton onClick={() => signIn('google')} />
              </Grid>
  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, backgroundColor: "secondary.main" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/src/user/forget" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/src/user/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    )

}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}



export default Login