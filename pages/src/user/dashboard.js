import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, useEffect } from "react"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"


const theme = createTheme()

function Dashboard() {

  const router = useRouter()

  const cookies = parseCookies()

  const { data: session } = useSession()

  useEffect(() => {
    if (!session && !cookies?.user) {
      router.push("/src/user/login")
    }
  }, [router])

  return (
    <>
      <Typography component="h1" variant="h5">
        Dashboard
      </Typography>
      <h3>This is secret page</h3>
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

export default Dashboard