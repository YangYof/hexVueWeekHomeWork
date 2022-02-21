<template>
  <div>
    <h5 class="mt-5 mb-3">這是後台頁面</h5>
    <router-link class="fs-4" to="/">回到前台首頁</router-link> |
    <router-link class="fs-4" to="/admin/products">後台產品列表</router-link> |
    <router-link class="fs-4" to="/admin/orders">後台訂單列表</router-link>
    <router-view/>
  </div>
</template>
