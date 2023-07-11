import { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, FormControl, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = e => {
    e.preventDefault()
    console.log('SUBMIT')
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <FormControl
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}></FormControl>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}></FormControl>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Sign In
        </Button>
        <Row className="py-3">
          New Customer? <Link to="/register">Register</Link>
        </Row>
      </Form>
    </FormContainer>
  )
}
export default LoginScreen
