<template v-slot:footer>
    <div  class="footer">
        <div>&copy; 2022 VUE POC </div>
        <div><h1><router-link to="/">Shopping Cart</router-link></h1></div>
    </div>
</template>
 <script>
export default {

}
</script>

<style>
.footer{align-self: flex-end;
    height:6em;
    background-color: #334455;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 30px;
    color: white;
}
.footer h1{
    font: 1.5em sans-serif;
}

</style>