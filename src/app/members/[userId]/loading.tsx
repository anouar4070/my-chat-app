import { Spinner } from '@heroui/spinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center items-center vertical-center'>
      <Spinner label='Loading...' color='secondary' labelColor='secondary' />
    </div>
  )
}
