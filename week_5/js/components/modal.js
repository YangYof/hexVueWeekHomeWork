import {createApp,toRef,onMounted,ref} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js' 

export default{
    // props:['temp-product'],
    template:`
        <div class="modal fade" ref="productModal" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    `,
    setup(props) {
        let productModal = ref(null);
        const openModal = ()=>{
            productModal.show()
        }
        onMounted(()=>{
            productModal = new bootstrap.Modal(productModal.value)
        })
        return{
            productModal,openModal
        }
    }
}