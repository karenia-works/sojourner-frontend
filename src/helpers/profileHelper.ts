import Axios from 'axios'
import config from '@/config'
import { Profile } from '@/models/Room';
async function insertProfile(
    profile: Profile
) {
    let request = await Axios.post(
        config.backend.address + config.backend.ProfileEndpoint,
        profile
    )
    if (request.status < 200 && request.status >= 300)
        throw new Error('insertProfile fail')
}

async function getProfileId(
    id: string
): Promise<Profile> {
    let profile = await Axios.get<Profile>(
        config.backend.address + config.backend.profileEndpoint
    )
    if (profile.status == 200) {
        return profile.data
    }
    else
        throw new Error("can not find profile")
}

async function getProfile(
): Promise<Profile[]> {
    let profiles = await Axios.get<Profile[]>(config.backend.address + config.backend.profileEndpoint)
    if (profiles.status == 200) {
        return profiles.data;
    }
    throw new Error('some thing wrong')
}

async function updateProfile(
    email: string, profile: Profile
) {
    let request = await Axios.post(config.backend.address + config.backend.profileEndpoint(email), profile)
    if (request.status != 200)
        throw new Error('update error')
}