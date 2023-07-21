import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
  const { userInfo } = useSelector(state => state.auth)

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="admin/order-list" />
  )
}

export default AdminRoute
