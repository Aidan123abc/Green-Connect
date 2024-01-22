'use client'

import { useSession } from 'next-auth/react'

export const User = () => {
  const { data: session } = useSession()
  console.log('Client Session', session?.user?.id)
  return <pre>{JSON.stringify(session?.user?.id)}</pre>
}
