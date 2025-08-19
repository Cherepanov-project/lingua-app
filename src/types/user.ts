export type UserProfile = {
  userProfile?: {
    created_at?: string
    email?: string
    email_verified?: boolean
    family_name?: string
    given_name?: string
    identities?: [
      {
        provider?: string
        access_token?: string
        expires_in?: number
        user_id?: string
        connection?: string
        isSocial?: boolean
      },
    ]
    name?: string
    nickname?: string
    picture?: string
    updated_at?: string
    user_id?: string
    last_ip?: string
    last_login?: string
    logins_count?: number
  }
}
