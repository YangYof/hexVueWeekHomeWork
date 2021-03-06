export default{
    props:['pages'],
    template:`
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled':!pages.has_pre}" @click.prevent="getPage(pages.current_page-1)">
                    <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" 
                    :class="{'active':pages.current_page === page}" 
                    v-for="(page, index) in pages.total_pages" 
                    :key="index + 1" @click.prevent="getPage(page)">
                    <a class="page-link" href="#">{{page}}</a>
                </li>
                <li class="page-item" :class="{'disabled':!pages.has_next}" @click.prevent="getPage(pages.current_page+1)">
                    <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    `,
    methods: {
        getPage(page){
            this.$emit('getpage', page)
        }
    }
}