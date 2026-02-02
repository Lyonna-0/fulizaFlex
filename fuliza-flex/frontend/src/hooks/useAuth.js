import { useEffect, useState } from 'react'
import { useAuthStore } from '../lib/store'
import { getSession } from '../lib/supabase'

export const useAuth = () => {
  const { user, session, loading, setUser, setSession, setLoading } =
    useAuthStore()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await getSession()
        if (data?.session) {
          setSession(data.session)
          // Fetch user data
          const token = localStorage.getItem('auth_token')
          if (token) {
            // Decode token to get user info (simplified)
            setUser({ token })
          }
        }
      } catch (err) {
        console.error('Session check failed:', err)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  return { user, session, loading, setUser }
}
