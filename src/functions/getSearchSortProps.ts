type SEARCH_SORT = {
    s_namelike: string,
    o_name: string,
    o_created_at: string
}

/**
 * 検索 & ソートのパラメータ取得用関数
 * @param key 
 * @param searchValue 
 * @returns 
 */
const getSearchSortProps = (key: string, searchValue: string = '') => {
    let props: SEARCH_SORT;

    switch(key) {
        case 'old':
            props = {
                s_namelike: '',
                o_name: '',
                o_created_at: 'asc'
            }
            break;
        case 'new':
            props = {
                s_namelike: '',
                o_name: '',
                o_created_at: 'desc'
            }
            break;
        case 'name_asc':
            props = {
                s_namelike: '',
                o_name: 'asc',
                o_created_at: ''
            }
            break;
        case 'name_desc':
            props = {
                s_namelike: '',
                o_name: 'desc',
                o_created_at: ''
            }
            break;
        default:
            props = {
                s_namelike: key,
                o_name: '',
                o_created_at: ''
            }
            break;
    }

    if(searchValue) props.s_namelike = searchValue;

    return props;
}

export default getSearchSortProps
