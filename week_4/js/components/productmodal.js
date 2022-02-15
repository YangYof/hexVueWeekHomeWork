const api_url = 'https://vue3-course-api.hexschool.io/v2';
const api_path ='yofyang';
// let productModal = {};

export default{
    template:`
        <div class="modal fade" ref="productModal" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">{{modalTitle}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-4">
                                <label for="image" class="form-label">主要圖片</label>
                                <img v-if="tempProduct.imageUrl" :src="tempProduct.imageUrl" class="img-fluid mb-3" alt="mainUpateImage">
                                <input 
                                    type="file" 
                                    class="form-control mb-3" 
                                    name="image" 
                                    ref="updateImage"
                                    @change="updateImg"
                                    placeholder="請輸入圖片連結">
                                <label for="images" class="fs-4 fw-bold mb-3">多圖新增</label>

                                <div class="d-grid" v-if="Array.isArray(tempProduct.imagesUrl)">
                                    <div v-for="(image, index) in tempProduct.imagesUrl" :key="index+1">
                                        <img :src="tempProduct.imagesUrl[index]" class="img-fluid mb-1">
                                        <input type="text" 
                                            class="form-control mb-3"
                                            :value="tempProduct.imagesUrl[index]">
                                    </div>
                                </div>
                                <div class="d-grid">
                                    <input type="text" class="form-control mb-3" ref="inputImgs" placeholder="請輸入圖片連結">
                                    <input type="button" class="btn btn-outline-primary mb-2" @click="updateImgs" value="新增圖片">
                                </div>
                                <div class="d-grid" v-if="tempProduct.imagesUrl.length >= 1">
                                    <input type="button" class="btn btn-outline-danger" @click="tempProduct.imagesUrl.pop('')" value="刪除圖片">
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="row">
                                    <div class="col-12">
                                        <label for="image" class="form-label">標題</label>
                                        <input type="text" v-model="tempProduct.title" class="form-control mb-3" name="image" placeholder="請輸入標題">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <label for="image" class="form-label">分類</label>
                                        <input type="text" v-model="tempProduct.category" class="form-control mb-3" name="image" placeholder="請輸入分類">
                                        <label for="image" class="form-label">單位</label>
                                        <input type="text" v-model="tempProduct.unit"  class="form-control" name="image" placeholder="請輸入單位">
                                    </div>
                                    <div class="col-6">
                                        <label for="origin_price" class="form-label">原價</label>
                                        <input type="text" v-model.number="tempProduct.origin_price" class="form-control mb-3" id="origin_price" placeholder="請輸入原價">
                                        <label for="price" class="form-label">售價</label>
                                        <input type="text" v-model.number="tempProduct.price" class="form-control" id="price" placeholder="請輸入售價">
                                    </div>
                                </div>  
                                <hr>
                                <div class="row">
                                    <div class="col-12">
                                        <label for="description" class="form-label">產品描述</label>
                                        <textarea type="text" v-model="tempProduct.description" class="form-control mb-3" id="description" placeholder="請輸入產品描述"></textarea>
                                    </div>
                                    <div class="col-12">
                                        <label for="content" class="form-label">說明內容</label>
                                        <textarea type="text" v-model="tempProduct.content" class="form-control mb-3" id="content" placeholder="請輸入說明內容"></textarea>
                                    </div>
                                    <div class="col-12">
                                        <label for="content" class="form-label">start</label>
                                        <textarea type="text" v-model="tempProduct.start" class="form-control mb-3" id="content" placeholder="請輸入說明內容"></textarea>
                                    </div>
                                    <div class="col-5">
                                        <div class="form-check">
                                            <input type="checkbox" v-model="tempProduct.is_enabled" :false-value="0" :true-value="1" class="form-check-input">
                                            <label for="isUse" class="form-check-label">是否啟用</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    props:["modalTitle","tempProduct","isNew"],
    data(){
        return{
            modal:null,
        }
    },
    methods: {
        updateProduct(){
            let httpMethods = 'post';
            let url = `${api_url}/api/${api_path}/admin/product`;
            if(!this.isNew){
                httpMethods = 'put'
                url = `${api_url}/api/${api_path}/admin/product/${this.tempProduct.id}`
            }
            axios[httpMethods](url,{data:this.tempProduct})
                .then(res=>{
                    // console.log(res);
                    this.$emit('getProducts');
                    this.hideModal();
                })
                .catch(err=>{
                    alert('請輸入完整產品訊息')
                })
        },
        updateImg(){
            // console.log(this.$refs.updateImage.files[0]);
            const file = this.$refs.updateImage.files[0];
            const formData = new FormData();
            formData.append("file-to-upload",file);
            // /v2/api/{api_path}/admin/upload
            axios.post(`${api_url}/api/${api_path}/admin/upload`,formData)
            .then(res=>{
                // console.log(res);
                this.tempProduct.imageUrl = res.data.imageUrl;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        updateImgs(){
            if(!this.$refs.inputImgs.value){
                return
            }
            this.tempProduct.imagesUrl.push(this.$refs.inputImgs.value)
            this.$refs.inputImgs.value = ''
        },
        hideModal(){
            this.modal.hide();
        },
        showModal(){
            this.modal.show();
        }
    },
    mounted() {
        // console.log(this.$refs.modal);
        this.modal = new bootstrap.Modal(this.$refs.productModal);
    }
}