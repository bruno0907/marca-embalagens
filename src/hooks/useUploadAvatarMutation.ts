import { useMutation } from 'react-query'
import { queryClient } from '../contexts/queryContext'
import { uploadFileService } from '../services/file/uploadFileService'
import { Profile } from '../services/profile/getProfileService'
import { updateProfileService } from '../services/profile/updateProfileService'


type UploadAvatar = {
  avatar: File;
  profile: Profile;
}

const BUCKET_URL = `https://${process.env.NEXT_PUBLIC_IMAGE_BUCKET_URL}/storage/v1/object/public/`

export const useUploadAvatar = () => useMutation(
  async ({ avatar, profile }: UploadAvatar) => {
    const avatarResponse = await uploadFileService(avatar, profile.id)

    if(avatarResponse.error) throw new Error('Error on uploading file')

    const updatedProfile: Profile = {
      ...profile,
      avatar: `${BUCKET_URL}${avatarResponse.data.Key}`
    }

    const profileResponse = await updateProfileService(updatedProfile)

    if(profileResponse.error) throw new Error('Error on updating profile avatar')

    return profileResponse.data
  }, {
    onSuccess: async () => await queryClient.invalidateQueries('profile')
  }
)
