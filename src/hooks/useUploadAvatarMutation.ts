import { useMutation } from 'react-query'
import { queryClient } from '../contexts/queryContext'
import { Profile } from '../models'
import { updateProfile, uploadFile } from '../services'

type UploadAvatar = {
  avatar: File;
  profile: Profile;
}

const BUCKET_URL = `https://${process.env.NEXT_PUBLIC_IMAGE_BUCKET_URL}/storage/v1/object/public/`

export const useUploadAvatar = () => useMutation(
  async ({ avatar, profile }: UploadAvatar) => {
    const avatarResponse = await uploadFile(avatar, profile.id)

    if(avatarResponse.error) throw new Error('Error uploading file')

    const updatedProfile: Profile = {
      ...profile,
      avatar: `${BUCKET_URL}${avatarResponse.data.Key}`
    }

    const profileResponse = await updateProfile(updatedProfile)

    if(profileResponse.error) throw new Error('Error updating profile avatar')

    return profileResponse.data
  }, {
    onSuccess: async () => await queryClient.invalidateQueries('profile')
  }
)
