import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap'
import { useProfileMutation } from '../slices/usersApiSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)

  const [updateProfile, { isLoading }] = useProfileMutation()

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [userInfo, userInfo.name, userInfo.email])

  const submitHandler = async e => {
    e.preventDefault()
    if (confirmPassword !== password) {
      toast.error("Passwords don't match!")
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap()

        dispatch(setCredentials(res))

        toast.success('Profile updated!')
      } catch (e) {
        toast.error(e?.data?.message || e.error)
      }
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={email}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirm" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <FormControl
              type="password"
              placeholder="Confirm  password"
              value={email}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
          {isLoading && <Loader />}
        </Form>
      </Col>
      <Col md={9}>Column</Col>
    </Row>
  )
}

export default ProfileScreen
