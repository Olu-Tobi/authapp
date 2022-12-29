import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import styled from 'styled-components'
import Link from "next/link"


const BigContainer = styled.div`
width: 85%;
height: 90vh;
box-sizing: unset;
margin: 0 auto;
overflow: hidden;

@media screen and (max-width: 1024px) {
    width: 86%;
}

@media screen and (max-width: 600px) {
    width: 90%;
}

`

const Wrapper = styled.div`
  display: flex;

  @media screen and (max-width: 1024px) {
   flex-direction: column-reverse;
}
  
`

const InnerLeft = styled.div`
flex: 1;
padding: 10rem 0;
position: relative;
@media screen and (max-width: 1024px) {
  padding:  0;
  flex: none;
}

`

const InnerRight = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
padding: 10rem 0;
position: relative;
@media screen and (max-width: 1024px) {
  padding: 5rem 0 0;
  flex: none;
}

@media screen and (max-width: 600px) {
  padding: 3rem 0 0;
}
`

const Heading = styled.h1`
font-size: 3rem;
color: black;
@media screen and (max-width: 600px) {
  font-size: 2.5rem;
}
`

const LeftImg = styled.img`
  position: absolute;
  top: 9rem;
  left: 3rem;

  z-index: -1;
  width: 40rem;
  opacity: 0.2;
  @media screen and (max-width: 1024px) {
    top: 0;
}

@media screen and (max-width: 600px) {
  width: 30rem;
  left: 0;
}
`

const RightImg = styled.img`
@media screen and (max-width: 1024px) {
    width: 15rem;
}
@media screen and (max-width: 600px) {
  width: 12rem;
  
}
`

const Text = styled.p`
font-size: 1.2rem;
color: black;

@media screen and (max-width: 600px) {
  font-size: 1rem;
  text-align: justify;
}
`

const RotateImg = styled.img`
  position: absolute;
  width: 10rem;
  height: 10rem;

    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;

@-moz-keyframes spin { 
    100% { -moz-transform: rotate(360deg); } 
}
@-webkit-keyframes spin { 
    100% { -webkit-transform: rotate(360deg); } 
}
@keyframes spin { 
    100% { 
        -webkit-transform: rotate(360deg); 
        transform:rotate(360deg); 
    } 
  }
  @media screen and (max-width: 1024px) {
    width: 8rem;
    height: 8rem;
    
}
@media screen and (max-width: 600px) {
  width: 6rem;
  height: 6rem;
}
`



export default function Component() {
  const [userState, setUserState] = useState("")

  const router = useRouter()

  const cookies = parseCookies()
  const { data: session } = useSession()

  const user = cookies?.user 
  ? JSON.parse(cookies.user) 
  : session?.user 
  ? session?.user : ""

  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user)
  }, [router, setUserState])

  if(session) {
    return <>

<BigContainer>
       
       <Wrapper>
         <InnerLeft>
         <LeftImg src="https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/undraw_safe_re_kiil.svg?alt=media&token=3f32907a-9759-415d-9a53-6ef7e4246b90"/>
          <Heading>Hi {session.user.name}</Heading>
          <Text>
            This is an Authentication app built with Next JS.<br/>
            Feel free to check checkout the functionalities. You could also fork the repo here.
          </Text>
         </InnerLeft>

         <InnerRight>
         <Link href='https://github.com/Olu-Tobi/authapp' style={{textDecoration:'none', color:'unset'}}><RotateImg src="https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/logo-sm%202.png?alt=media&token=a99d7520-6d6c-4303-9d1d-31b86bedd4d5"/></Link>
          <RightImg src="https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/Group%204.png?alt=media&token=92b0f219-9543-48e3-95e1-77b8521a2fed"/>
         </InnerRight>
       </Wrapper>
     </BigContainer>

      
      
    </>
  }
  else if(userState) {
    return <>
    <BigContainer>
       
       <Wrapper>
         <InnerLeft>
         <LeftImg src="https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/undraw_safe_re_kiil.svg?alt=media&token=3f32907a-9759-415d-9a53-6ef7e4246b90"/>
          <Heading>Hi {userState?.name}</Heading>
          <Text>
          This is an Authentication app built with Next JS.<br/>
            Feel free to check checkout the functionalities. To fork the repo, click the spinning key.
          </Text>
         </InnerLeft>

         <InnerRight>
         <Link href='https://github.com/Olu-Tobi/authapp' style={{textDecoration:'none', color:'unset'}}><RotateImg src="https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/logo-sm%202.png?alt=media&token=a99d7520-6d6c-4303-9d1d-31b86bedd4d5"/></Link>
          <RightImg src="https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/Group%204.png?alt=media&token=92b0f219-9543-48e3-95e1-77b8521a2fed"/>
         </InnerRight>
       </Wrapper>
     </BigContainer>
    </>
  }
  return <>
      <BigContainer>
       
       <Wrapper>
         <InnerLeft>
         <LeftImg src="https://firebasestorage.googleapis.com/v0/b/shop-c8953.appspot.com/o/undraw_safe_re_kiil.svg?alt=media&token=3f32907a-9759-415d-9a53-6ef7e4246b90"/>
          <Heading>Hi!</Heading>
          <Text>
          This is an Authentication app built with Next JS.<br/>
            Feel free to check checkout the functionalities. You can also fork the repo once you login.
          </Text>
         </InnerLeft>

         <InnerRight>
          <RightImg src="https://next-auth.js.org/img/logo/logo-sm.png"/>
         </InnerRight>
       </Wrapper>
     </BigContainer>
  </>
}
