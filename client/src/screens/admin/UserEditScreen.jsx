import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

const UserEditScreen = () => {
  const { id: _id } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(_id)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const submitHandler = async e => {
    e.preventDefault()
    try {
      const user = { _id, name, email, isAdmin }
      await updateUser(user)

      toast.success('Updated user successfully.')
      refetch()
      navigate('/admin/user-list')
    } catch (e) {
      toast.error(e?.data.message || e.error)
    }
  }

  return (
    <>
      <Link to="/admin/user-list" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User Details</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholde="Enter the new name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email" className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholde="Enter the new email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="isAdmin" className="my-2">
                <Form.Check
                  type="checkbox"
                  label="isAdmin"
                  checked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="my-2">
                Update User
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
