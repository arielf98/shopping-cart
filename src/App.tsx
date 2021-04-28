
import {useState} from 'react'
import {useQuery} from 'react-query'

//components
import Item from './Item/item'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingChartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

//style
import { Wrapper } from './App.styles'

//types
export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number
}

//Api 
const getProducts = async ():Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json()


const App = () =>  {

  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts )
  console.log(data)

  const getTotalItem = () => null 
  const handleAddToCart = (clickedItem: CartItemType) => null 
  const handleRemoveFromCart = () => null
  
  if(isLoading) return <LinearProgress/>
  if(error) return <div> Something Wrong.... </div>

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4} >
              <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
