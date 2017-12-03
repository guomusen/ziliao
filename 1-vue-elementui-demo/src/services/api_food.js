import axios from 'axios'
export default {
    /**
     * 获取分页数据
     * @param {页码} page 
     * @param {回调函数} callback 
     */
    getData(page,callback){
        axios.get(`${global.ApiUrl}/food?page=${page}`)
        .then((res)=>{
            callback(res.data)
        })
    },
    /**
     * 保存数据
     * @param {保存数据} data 
     * @param {回调函数} callback 
     */
    save(data,callback){
        axios.post(`${global.ApiUrl}/food/create`,data)
        .then((res)=>{
            callback(res.data)
        })
    },
    /**
     * 根据id更新一条记录
     * @param {ID} id 
     * @param {更新数据} data 
     * @param {回调函数} callback 
     */
    update(id,data,callback){
        axios.post(`${global.ApiUrl}/food/update/${id}`,data)
        .then((res)=>{
            callback(res.data)
        })
    },
    /**
     * 根据ID删除数据
     * @param {ID} id 
     * @param {回调函数} callback 
     */
    deleteById(id,callback){
        axios.post(`${global.ApiUrl}/food/delete/${id}`)
        .then((res)=>{
            callback(res.data)
        })
    },
    getDataById(id,callback){
        axios.get(`${global.ApiUrl}/food/${id}`)
        .then((res)=>{
            callback(res.data)
        })
    }
}