import {get} from "@/api/helpers";

const getSeller = get('/api/seller');
const getGoods = get('/api/goods');

export {
    getSeller,
    getGoods
}
