import { CreateAddress, CreateProfile } from "..";

export type CreateProfileMutation = {
  profile: CreateProfile;
  address: CreateAddress;
}