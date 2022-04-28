<template>
    <div v-if="product" class="product pageheight" >     
        <div class="gallery">
            <div class="mainimg">
                <img :src="getImage(product.src)" alt="phone image"/>
            </div>
        </div>
        <div class="product-details">
            <h3 class="text-center">{{product.name}}</h3>
            <p class="description">{{product.description}}</p>
            <p class="description">{{product.features}}</p>
            <div class="text-center" id="rating">
            <star-rating  :max="5" :rating=Number(product.rating)></star-rating>
        </div>
        <h3 class="text-center margten">RS: {{product.price}}</h3>
        <div class="button-container">
            <button class="remove" @click="removeFromCart()">Remove</button>
            <button class="add" @click="addToCart()">Add</button>
        </div>
    </div>
    </div>
</template>
<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import StarRating from 'vue-star-rating'

export default {
name:'ProductDescription',

components:{
     StarRating,
},

 setup(){
    const  store= useStore()
    const route =useRoute()
    console.log(route.params)
    const product = route.params
    const getImageActive=(src)=>{
        var imgsrc=getImage(src)
        console.log(imgsrc)
        
    }
    const getImage=(src)=> './../../images' + src
     return{
        product,
        getImageActive,
        getImage,
        addToCart:()=>store.commit('addToCart',product),
        removeFromCart:()=>store.commit('removeFromCart',product),
        productTotal:computed(()=> store.getters.productQuantity(product)),
        }
    }, 
}
</script>

<style>
        .product{
            width:450px;
            margin: auto;
            padding-top: 30px;
            display: flex;
            justify-content: center;
        }
        .gallery{
            width:220px;
            display:flex;
            justify-content: center;
        }
       
        
        .mainimg img{
            width:220px;
            padding-top: 30px;
        }
    .product-section{
        width:100%;
        height:100vh;
        position:fixed;
        left:0;
        top:0;
        /* background-color:rgba(124, 124, 124, 0.55); */
        z-index:100;
    }
    .product-section.show{
        display:block}
    #rating .vue-star-rating{
        display: block ;
        max-height:40px;
        margin-left: 5px;
    }
    #rating .vue-star-rating-star{
        max-height:40px;
        width: 40px;
    }
    .vue-star-rating-rating-text{
        display: none;
    }
    .product-details .margten{
        margin:15px;
    }
    .product-details{
        display:flex;
        text-align: left;
        flex-direction: column;
        padding-left: 10px;
    }
    .product-details h3{
        margin:0 10px;
    }
    p.description{
        margin:10px;
        line-height: 1.5rem;
    }
    .button-container button{
        width:100px;
        padding:10px;
        border-radius:5px;
        margin:0 5px 50px 5px;
        cursor:pointer;
    }
    .add{
    padding: 10px;
    background-color: rgb(79,160,187);
    border: none;
    color: white;
    font-weight: bold;
    font-size: .8rem;
    border-radius: 5px;
    cursor: pointer;
    }
    .remove{
    padding: 10px;
    background-color:white;
    border: 1px solid rgb(79,160,187);
    color: rgb(79,160,187);
    font-weight: bold;
    font-size: .8rem;
    border-radius: 5px;
    cursor: pointer;
    }
    .add:hover{
        color:brown
    }
    .remove:hover{
        color: brown;
    }
    .add:active{
        border: 1px solid rgb(79,160,187);
    }
    .remove:active{
        border: 1px solid white;
    }
</style>