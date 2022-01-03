<template>
    <div class="footer">
        <router-link to="/" class="footer-item">
            <i class="fas fa-home"></i>
            <p>Home</p>
        </router-link>
        <router-link to="/settings" class="footer-item">
            <i class="fas fa-cog"></i>
            <p>Settings</p>
        </router-link>
    </div>    
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name:'Footer'
})
</script>
<style scoped>
.footer{
    width:100%;
    background: rgb(240, 183, 28);
    background: rgb(226, 226, 226);
    color: rgb(129, 129, 129);
    display: flex;
    position: relative;
    justify-content: center;
    height: fit-content;

    box-shadow: rgba(0, 0, 0, 0.329) 2px 0px 10px;

}

a.router-link-exact-active .fas{
    transform: scale(1.8);
    transition: .2s;
}
a.router-link-exact-active .fa-cog{
    animation: cog-rotation 1s;
    animation-delay: 0;
    animation-iteration-count: 2;
}
@keyframes cog-rotation{
    0%{
       transform: rotate(0deg) scale(1.8); 
    }
    100%{
       transform: rotate(360deg) scale(1.8); 
    }
}
.footer-item.router-link-exact-active{

    border-bottom: rgba(0, 0, 0, 0.4) 8px solid;

}

.footer-item{
    width: 60px;
    padding: 5px;
    padding-bottom: 0;
    padding-top: 8px;
    /*color: white;*/
    transition:.2s;

    
    color: inherit;
    text-decoration: none;
    
}
.footer-item:active{
    background: rgba(0, 0, 0, 0.062);
    transition: .5s;
}

.footer-item:active .fas{
    transform:scale(2);
    transition: .5s;

}
.footer-item:active p{
    transform: scale(0.8);
    transition: .5s;

}
.fas{
    transform: scale(1.3);
    transition: .2s;
}

.footer-item p{
    transition: .5s;
    overflow: hidden;
    font-size: 10px;
}
</style>