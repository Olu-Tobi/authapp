import { useSession, signIn, signOut, getSession } from "next-auth/react"

import { Button, Typography } from "@mui/material"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useEffect } from "react"
import styled from 'styled-components';

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`
const ProfileDis = styled.div`
border-radius: 50%;
width: 3rem;
height: 3rem;
background-color: #34e7bd;
display: flex;
align-items: center;
justify-content: center;
color: white;
font-size: 1.5rem;
`

const Typo = styled(Typography)`
  font-size: 1.1rem;
`

const Verified = styled.p`
border-radius: 10px;
color: white;
text-align: center;
margin: 0;
font-size: 0.9rem;
padding: 0.3rem 1rem;

`



const Profile = () => {
  const {isFetching, error, dbUser} = useSelector((state) => state.user)


  const router = useRouter()

  const cookies = parseCookies()

  const { data: session } = useSession()

  useEffect(() => {
    if (!session && !cookies?.user) {
      router.push("/src/user/login")
    }
  }, [router])


  const emailReset = async () => {
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const { data } = await axios.post(
        `/api/user/emailReset`,
        { dbUser },
        config
      )
      toast.success(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProfileDiv>
      <ProfileDis onClick={() => setLaunchProfile(true)}>{dbUser?.name[0].toUpperCase()}</ProfileDis>
      {dbUser && (
        <>
          <Typo component="h1" variant="h5">
            {dbUser?.name}
          </Typo>
          <Typo component="h1" variant="h5">
            {dbUser?.email}
          </Typo>
          <Typo component="h1" variant="h5">
            <Verified style={{background: dbUser?.validEmail === 'Verified' ? '#34e7bd' : '#ff8100'}}>{dbUser?.validEmail}{" "}</Verified>
            {dbUser?.validEmail === "Unverified" && (
              <Button onClick={emailReset}>Verify Email</Button>
            )}
          </Typo>
        </>
      )}
    </ProfileDiv>
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

export default Profile