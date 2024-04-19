import React from 'react'
import ValidateButton from '../components/ValidateButton'
import CsvUpload from '../components/CsvUpload'

function Home() {
  return (
    <>
      <CsvUpload />
      <ValidateButton />
    </>
  )
}

export default Home