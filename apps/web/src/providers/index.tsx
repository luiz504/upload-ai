'use client'
import { FC, ReactNode } from 'react'
import { SWRConfig } from 'swr'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return <SWRConfig> {children}</SWRConfig>
}
