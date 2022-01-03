<template>
  <div class="about">
  <h1>{{($route.query.type?'Your '+$route.query.type:'')}} not found!</h1>
    <router-link to="/">return</router-link>
  </div>
</template>

<style scoped>
.about{
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a{
  text-decoration: none;
  background: rgb(205, 177, 50);
  padding: 6px;
  border-radius: 4px;
  color: black;
}
img{
  width: 10%;
}
</style>
