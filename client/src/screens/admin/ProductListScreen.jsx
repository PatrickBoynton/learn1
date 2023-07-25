import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '../../slices/productApiSlice'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'

const ProductListScreen = () => {
  const { data: products, refetch, isLoading, error } = useGetProductsQuery()
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()

  const deleteHandler = () => {}
  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct()
        refetch()
      } catch (e) {
        toast.error(e?.data?.message || e.error)
      }
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col className="text-end">
          <Button className="m-2" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover border responsive className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit /> Edit Product
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen
