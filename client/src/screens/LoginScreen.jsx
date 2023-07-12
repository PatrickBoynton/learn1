import { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, FormControl, Row } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLoginMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector(state => state.auth)

  const { search } = useLocation()

  const sp = new URLSearchParams(search)

  const redirect = sp.get('redirect')

  useEffect(() => {
    if (userInfo) navigate(redirect)
  }, [userInfo, redirect, navigate])

  const submitHandler = async e => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (e) {
      toast.error(e?.data?.message || e.error)
    }
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

        <Button
          type="submit"
          variant="primary"
          className="my-3"
          disabled={isLoading}>
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        New Customer?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Register
        </Link>
      </Row>
    </FormContainer>
  )
}
export default LoginScreen
