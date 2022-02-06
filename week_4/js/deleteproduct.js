const apiUrl="https://vue3-course-api.hexschool.io/v2";
const apiPath = 'yofyang';

export default{
    template:`
        <div class="modal fade" id="deleteProductModal" tabindex="-1" aria-labelledby="deleteProductModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="deleteProductModalLabel">{{tempProduct.title}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-danger">
                        {{tempProduct.title}}
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="deleteProduct">Save changes</button>
                    </div>
                </div>
            </div>
        </div>  
    `,
    props:["tempProduct"],
    methods: {
        deleteProduct(){
            axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`)
                .then(response=>{
                    console.log(response);
                    this.$emit('deleteProduct')
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    },
}