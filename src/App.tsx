
import {useState} from 'react'
import {useQuery} from 'react-query'

//components
import Item from './Item/item'
import Cart from './Cart/Cart'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingChartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

//style
import { Wrapper, StyledButton } from './App.styles'

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

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts )

  const getTotalItem = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.amount, 0) 

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const itemIncart = prev.find(item => item.id === clickedItem.id)
      
      if(itemIncart){
        return prev.map(item => 
          item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item )
      }

      //first time the item is added
      return [...prev,  {...clickedItem, amount: 1 }]

    })
  } 

  const handleRemoveFromCart = () => null
  
  if(isLoading) return <LinearProgress/>
  if(error) return <div> Something Wrong.... </div>

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose = {()=>setCartOpen(false)} >
        <Cart  
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart} />
      </Drawer>

      <StyledButton onClick = {() => setCartOpen(true)} >
        <Badge badgeContent={ getTotalItem(cartItems) } color='error' >
          <AddShoppingChartIcon/>
        </Badge>
      </StyledButton>

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
