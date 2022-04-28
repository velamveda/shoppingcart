<template>
  <div class="home">
     <!-- <div class="search-wrapper">
       <form @submit.prevent="filteredList($event,search)">
        <input type="text" name="search" v-model="search" placeholder="Search by brand name" /> 
        <button class="searchsubmit"> Search</button> 
       </form>
    </div>   -->
    <div class="product-card-container">
      <div  v-for="product in products" :key="product.id" :product="product" @click="viewProduct($event)">
        <div class="card">
          <div class="image" @click="handleClick($event,product)" >
            <img :src="getImage(product.src)" alt="phone image"/> 
          </div>
          <div class="card-details">
            <h3 @click="handleClick($event,product)" >{{ product.name }}</h3>
            <p class="description">{{product.features}}</p>
            <h5 class="price">Price: Rs {{ product.price }}</h5>
            <div class="btn-grp">
              <button class="cart btn whitebg"  @click="addToCart(product)">Add to cart</button> 
            </div>
          </div>
        </div> 
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { computed,ref } from 'vue'
import { useStore } from 'vuex'
import { colRef, getDocs, } from './../includes/firebase.js'
import { useRouter} from 'vue-router'

export default {
  name: 'HomeView',
  components: { },
  props:['product'],
  setup() {
    const products= ref([])
    getDocs(colRef).then( (snapshot)=>{
          snapshot.docs.forEach((doc) => {
          products.value.push({...doc.data(), id: doc.id})
        })
      }).catch(err=>{
        console.log(err)
      })
    const search = ref('')
    const product = ref('')
    const router = useRouter()
    const store=useStore();
    const user=computed(() => store.state.user)
    const viewProduct=(prod)=>{
      product.value = prod 
  }
    const handleClick=(_, product)=>{
      console.log('handleclick fn')
      console.log(product)
      router.push({
          name: 'productdescription',
          params: product
      })
    }
  //  const filteredList=(_,search)=>{  
  //     products.value.push(products.value.forEach(product=>{
  //       if(product.name.toLowerCase().includes(search.toLowerCase())) return product
  //     }))
  //  }
    
    return { 
      products, 
      product,
      viewProduct,
      handleClick,
      addToCart:(product)=>{
        console.log("in addcart fn")
        store.commit('addToCart',product)},
      getImage:(src)=> './../images' + src,     
      user,
      filteredList
    }
  }
}
 
</script>
<style>
.search-wrapper{
  padding :15px;
  width:300px;
  margin: auto;
}
.search-wrapper input{
  height:40px;
  font-size: 1rem;
  padding-left: 10px;
}
.product-card-container{
  display:flex;
  flex-wrap: wrap;
  width:80%;
  margin: auto;
}
.card{
    max-width: 250px;
    margin:1%;
    margin: 10px;
    border-radius: 5px;
    padding:10px;
    background-color:rgb(205, 250, 257);
    box-shadow:0 0 5px gray;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 4px #d3d3d3, 0px 0px 4px #d3d3d3;
}
.image, .image img{
width:220px;
height:220px;
padding-top:8px;
transition: all .4s ease;
}
.image:hover img{
  transform: scale(1.2);
}
.card-details{
    padding-top: 30px;
    width:220px;
    text-align: center;
    margin: auto;
}
.price{
    color:gray;
    margin:10px;
}
.btngrp{
  display: flex;
}

.description{
    font-size: .85rem;
}
.text-muted{
    color:gray;
}
.cart{
    padding:10px;
    background-color: rgb(79,160,187);
    border:none;
    color:white;
    font-weight: bold;
    font-size:.8rem;
    border-radius: 5px;
    cursor:pointer;
}
.marleft{
    margin-left: 15px;
}
.whitebg{
  background-color: white;
  border: 1px solid rgb(79,160,187);
  color:rgb(79,160,187);
}
.btn:hover{
  color:saddlebrown;
}
.btn{
  border: 1px solid rgb(79,160,187);
  cursor: pointer;
}
.btn:active{
  border: 1px solid rgb(205, 250, 257);;
}
</style>