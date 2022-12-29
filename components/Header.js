
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSession, signOut } from "next-auth/react"
import { parseCookies } from 'nookies';
import Link from "next/link"
import cookie from 'js-cookie'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../redux/apiCall/apiCall';
import styled from 'styled-components';
import Profile from '../pages/src/user/profile'
import CloseIcon from '@mui/icons-material/Close';

const NewLink = styled(Link)`
  text-decoration: none;
  color: white;
`

const ProfileContainer = styled.div`
    width: 20rem;
    position: absolute;
    background: white;
   height: 90vh;
   z-index: 1;
   padding-top: 2rem;
   border-radius: 10px;
   box-shadow: 0 5px 7px 0 grey;
`

const ProfileDis = styled.div`
border-radius: 50%;
width: 2.5rem;
height: 2.5rem;
background-color: #34e7bd;
display: flex;
align-items: center;
justify-content: center;
color: white;
`

const Btn = styled(Button)`
 color: #19857b;
 margin-left: 1rem;
 margin-top: 1rem;
 border: 1px solid grey;
`

const Hr = styled.hr`
border: none;
border-top: 1px solid #e7e5e5;


`

export default function ButtonAppBar() {

  const [userState, setUserState] = useState("")
  const [launchProfile, setLaunchProfile] = useState(false)

    const router = useRouter()

    const cookies = parseCookies()
    const { data: session } = useSession()
    const dispatch = useDispatch()
    // const {isFetching, error, dbUser} = useSelector((state) => state.dbUser)
    // console.log('header', dbUser)

    const user = cookies?.user 
    ? JSON.parse(cookies.user) 
    : session?.user 
    ? session?.user : ""

    useEffect(() => {
      session ? setUserState(session.user) : setUserState(user)
      
      if(user){
        dispatch(loadUser(user.email, user))
        //console.log(user)
      }
    }, [router, setUserState])
  

    const logoutHandler = async () => {
      setLaunchProfile(false)
        if (session) {
            signOut()
        }
        cookie.remove('token')
        cookie.remove('user')
    }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userState ? <ProfileDis onClick={() => setLaunchProfile(true)}>{userState?.name[0].toUpperCase()}</ProfileDis> : 'Auth'}
          </Typography>

          {userState ? (
            <>
            <NewLink href='/src/user/login'>
              <Button color="inherit" onClick={logoutHandler}>Logout</Button>
            </NewLink>
          </>
          ) : (
          <>
            <NewLink href='/src/user/register'>
            <Button color="inherit">Register</Button>
          </NewLink>
          <NewLink href='/src/user/login'>
            <Button color="inherit">Login</Button>
          </NewLink>
          </>)
          }
          
          
        </Toolbar>
      </AppBar>
    </Box>

    {
      launchProfile && 
      (<ProfileContainer>
      <CloseIcon onClick={() => setLaunchProfile(false)} style={{marginLeft: '1rem', fontSize:'2rem'}}/>
      <Profile/>
      <Hr/>
      <NewLink href='/src/user/login'>
              <Btn color="inherit" onClick={logoutHandler}>Logout</Btn>
          </NewLink>
    </ProfileContainer>)
    }
    </>
  );
}