const apiUrl="https://vue3-course-api.hexschool.io/v2";
const apiPath = 'yofyang';

export default{
    template:`
        <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">{{modalTitle}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-4">
                                <label class="form-label" for="image">主要圖片</label>
                                <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
                                <input type="text" 
                                    ref="image" 
                                    class="form-control" 
                                    id="image" 
                                    name="image"
                                    v-model="tempProduct.imageUrl"
                                    placeholder="請輸入圖片連結">
                                <h2>多圖新增</h2>
                                
                                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                                    <div v-for="(image,i) in tempProduct.imagesUrl">
                                        <input type="text" class="form-control" v-model="tempProduct.imagesUrl[i]" id="images" name="images" placeholder="請輸入圖片連結">
                                        <img :src="tempProduct.imagesUrl[i]" class="img-fluid">
                                    </div>
                                </div>
                                
                                <div class="d-grid">
                                    <input class="btn btn-outline-primary mb-2" type="button" value="新增圖片" @click="tempProduct.imagesUrl.push('')">
                                    <input class="btn btn-outline-danger" type="button" value="刪除最後一張圖片" @click="tempProduct.imagesUrl.pop('')">
                                </div>
                                
                            </div>
                            <div class="col-8">
                                <label for="title" class="form-label">標題</label>
                                <input type="text" v-model="tempProduct.title" class="form-control" name="title" id="title" placeholder="請輸入標題">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="category" class="form-label">分類</label>
                                        <input name="category" v-model="tempProduct.category" type="text" class="form-control" placeholder="請輸入分類">
                                        <label for="unit" class="form-label">單位</label>
                                        <input name="unit" v-model="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
                                    </div>
                                    <div class="col-6">
                                        <label for="origin_price" class="form-label">原價</label>
                                        <input name="origin_price" v-model.number="tempProduct.origin_price" type="text" class="form-control" placeholder="請輸入原價">
                                        <label for="price" class="form-label">售價</label>
                                        <input name="price" v-model.number="tempProduct.price" type="text" class="form-control" placeholder="請輸入售價">
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-12">
                                        <label for="description" class="form-label" >產品描述</label>
                                        <textarea name="description" v-model="tempProduct.description" class="form-control" id="description"></textarea>
                                    </div>
                                    <div class="col-12">
                                        <label for="content" class="form-label">說明內容</label>
                                        <textarea name="content" v-model="tempProduct.content" class="form-control" id="content"></textarea>
                                    </div>
                                </div>
                                <input name="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" type="checkbox" class="form-check-input">
                                <label for="is_enabled" class="form-check-label">是否開啟</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct">{{updateProductBtnText}}</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    props:['tempProduct','modalTitle','updateProductBtnText','isNew'],
    methods: {
        updateProduct(){
            let url=`${apiUrl}/api/${apiPath}/admin/product`;
            let httpMethods = 'post';
            if(this.isNew == false){
                url=`${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
                httpMethods = 'put';
            }
            axios[httpMethods](url,{data:this.tempProduct})
                .then(response=>{
                    // console.log(response);
                    // this.getProducts();
                    this.$emit('get-products')
                    // productModal.hide();
                })
                .catch(error=>{
                    console.log(error);
                })
        },
        // updateProduct(){
        //     this.$emit('updataProduct', this.temProduct);
        // }
    }
}