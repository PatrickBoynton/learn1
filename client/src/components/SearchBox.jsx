import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'

const SearchBox = () => {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || '')

  const submitHandler = e => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
      setKeyword('')
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submitå" variant="outline-success" className="p-2">
        Search
      </Button>
      <Button
        onClick={() => {
          navigate('/')
          setKeyword('')
        }}
        style={{ backgroundColor: 'transparent', border: 'none' }}>
        <FaTimes style={{ backgroundColor: 'transparent', color: 'red' }} />
      </Button>
    </Form>
  )
}

export default SearchBox
