export default{
    template:`
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled':!pagination.has_pre}" @click.prevent="getPage(pagination.current_page-1)">
                    <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item" :class="{'active':pagination.current_page == page}" v-for="(page,i) in pagination.total_pages" @click.prevent="getPage(page)">
                    <a class="page-link" href="#">{{page}}</a>
                </li>
                <li class="page-item" :class="{'disabled':!pagination.has_next}"  @click.prevent="getPage(pagination.current_page+1)">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav> 
    `,
    props:['pagination'],
    methods: {
        getPage(page){
            // console.log(pagination);
            this.$emit('getpage', page)
        }
    },
}