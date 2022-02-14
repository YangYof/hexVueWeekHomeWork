const api_url = 'https://vue3-course-api.hexschool.io/v2';
const api_path ='yofyang';
// let deleteProductModal = {};

export default{
    template:`
    <div class="modal fade" ref="deleteModal" id="deleteProductModal" tabindex="-1" aria-labelledby="deleteProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-danger" id="deleteProductModalLabel">{{tempProduct.title}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                確定刪除 <span class="text-danger"> {{tempProduct.title}} </span> ?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" @click="deleteProduct(tempProduct)">確定刪除商品</button>
            </div>
            </div>
        </div>
    </div>
    `,
    props:["modalTitle","tempProduct"],
    data(){
        return{
            modal:null,
        }
    },
    methods: {
        deleteProduct(product){
            axios.delete(`${api_url}/api/${api_path}/admin/product/${product.id}`)
                .then(res=>{
                    console.log(res);
                    this.$emit('getProducts')
                    this.hideModal()
                })
                .catch(err=>{
                    console.log(err);
                })
            
        },
        showModal(){
            this.modal.show();
        },
        hideModal(){
            this.modal.hide();
        }
    },
    mounted() {
        console.log(this.$refs.deleteModal);
        this.modal = new bootstrap.Modal(this.$refs.deleteModal);
    },
}