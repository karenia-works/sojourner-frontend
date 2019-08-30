import Axios from 'axios'
import config from '@/config'
import { Profile } from '@/models/Room'
async function insertProfile(profile: Profile, header: any) {
  let request = await Axios.post(
    config.backend.address + config.backend.ProfileEndpoint,
    profile,
    { headers: header }
  )
  if (request.status < 200 && request.status >= 300)
    throw new Error('insertProfile fail')
}

async function getProfileId(id: string, header: any): Promise<Profile> {
  let profile = await Axios.get<Profile>(
    config.backend.address + config.backend.profileEndpoint(id),
    { headers: header }
  )
  if (profile.status == 200) {
    return profile.data
  } else throw new Error('can not find profile')
}

async function getProfile(header: any): Promise<Profile[]> {
  let profiles = await Axios.get<Profile[]>(
    config.backend.address + config.backend.profileEndpoint,
    { headers: header }
  )
  if (profiles.status == 200) {
    return profiles.data
  }
  throw new Error('some thing wrong')
}

async function getMyProfile(header: any): Promise<Profile[]> {
  let profiles = await Axios.get<Profile[]>(
    config.backend.address + 'profile/me',
    { headers: header }
  )
  if (profiles.status == 200) {
    return profiles.data
  }
  throw new Error('some thing wrong')
}

async function updateProfile(email: string, profile: Profile, header: any) {
  let request = await Axios.post(
    config.backend.address + config.backend.profileEndpoint(email),
    profile,
    { headers: header }
  )
  if (request.status != 200) throw new Error('update error')
}

export { insertProfile, getProfile, getProfileId, updateProfile, getMyProfile }
