import { Stack } from "@chakra-ui/react"
import { Header, Divider } from "../../components"
import { Address, Profile } from "../../models"
import { ProfileAvatar, ProfileForm } from "./components"

type Props = {
  profile: {
    profile: Profile;
    addresses: Address[]
  }
}

export const ProfileModule = ({ profile }: Props) => {
  return (
    <>
    <Header title="Perfil" />        
    <Divider />
    <Stack direction={['column', 'column', 'column', 'row']} spacing={6} align="flex-start" maxW="1140px" m="auto">
      <ProfileAvatar profile={profile.profile}/>            
      <ProfileForm 
        profile={profile.profile}
        address={profile.addresses[0]}
      />
    </Stack>
    </>
  )
}