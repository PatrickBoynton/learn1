import { useGetTopProductsQuery } from '../slices/productApiSlice'
import Loader from './Loader'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery()

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products?.map(product => (
        <Carousel.Item key={product.name}>
          <Link to={`/product/${product?._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption>
              <h2>
                {product.name} ${product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
