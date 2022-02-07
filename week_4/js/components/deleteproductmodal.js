const api_url = 'https://vue3-course-api.hexschool.io/v2';
const api_path ='yofyang';
// let deleteProductModal = {};

export default{
    template:`
    <div class="modal fade" id="deleteProductModal" tabindex="-1" aria-labelledby="deleteProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteProductModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="updateProduct">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    `,
    props:["modalTitle","tempProduct"],
    methods: {
        updateProduct(){
            axios.delete(`${api_url}/api/${api_path}/admin/product/${this.tempProduct.id}`)
                .then(res=>{
                    console.log(res);
                    // productModal.hide();
                })
                .catch(err=>{
                    console.log(err);
                })
            this.$emit('getProducts')
        }
    },
    mounted() {
        // deleteProductModal = new bootstrap.Modal(document.getElementById('deleteProductModal'));
    },
}