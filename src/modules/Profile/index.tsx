import { Header, Divider, Section } from "../../components"
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
      <Section>
        <ProfileAvatar profile={profile.profile}/>            
        <ProfileForm 
          profile={profile.profile}
          address={profile.addresses[0]}
        />
      </Section>
    </>
  )
}