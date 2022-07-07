import * as React from "react"
import { useParams } from 'react-router-dom';
import NotFound from "../NotFound/NotFound";
import ProductView from "../ProductView/ProductView";


export default function ProductDetail() {
  const [product, setProduct] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    let {productId} = useParams()
    axios.get(`https://codepath-store-api.herokuapp.com/store/${productId}`)
    .then((response) => { 
      setLoading(false)       
      if (response.data) {
        setProduct(response.data.product)
      } 
    })
    .catch(function (error) {
      console.log(error)
    });
  }, []);
  return (
    <div className="product-detail">
      {loading && <h1 className="loading">Loading...</h1>}
      {!loading && product ? <ProductView />:<NotFound />}
    </div>
  )
}
