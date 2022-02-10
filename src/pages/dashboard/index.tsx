import Head from 'next/head'
import { AuthWrapper } from "../../components";
import { DashboardModule } from "../../modules";

export default function Dashboard() {       
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AuthWrapper>
        <DashboardModule/>
      </AuthWrapper>
    </>
  )
}
