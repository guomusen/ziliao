// 引入axios模块
import axios from 'axios'
// 把所有的food_type请求都封装到这个文件中
export default {
    /**
     * 根据页码获取分类数据
     * @param {页码} page 
     * @param {回调函数} callback 
     */
    getData(page,callback){
        axios.get(`${global.ApiUrl}/food_type?page=${page}`)
        .then((res)=>{
            // then 成功回调
            callback(res.data)
        })
        .catch((err)=>{
            // catch 错误回调
            console.log(err)
        })
    },
    /**
     * 根据id获取一条分类数据
     * @param {id} id 
     * @param {回调函数} callback 
     */
    getDataById(id,callback){
        axios.get(`${global.ApiUrl}/food_type/${id}`)
        .then((res)=>{
            callback(res.data)
        })
    },
    /**
     * 新增分类信息
     * @param {新增数据} data 
     * @param {回调函数} callback 
     */
    save(data,callback){
        axios.post(`${global.ApiUrl}/food_type/create`,data)
        .then((res)=>{
            callback(res.data)
        })
    },
    /**
     * 根据ID删除分类数据
     * @param {ID} id 
     * @param {回调函数} callback 
     */
    deleteById(id,callback){
        axios.post(`${global.ApiUrl}/food_type/delete/${id}`)
        .then((res)=>{
            callback(res.data)
        })
    },
    /**
     * 根据id修改分类数据
     * @param {ID} id 
     * @param {修改数据} data 
     * @param {回调函数} callback 
     */
    update(id,data,callback){
        axios.post(`${global.ApiUrl}/food_type/update/${id}`,data)
        .then((res)=>{
            callback(res.data)
        })
    },
    /**
     * 获取所有的分类信息
     * @param {回调函数} callback 
     */
    getAllTypes(callback){
        axios.get(`${global.ApiUrl}/food_type/all_type`)
        .then((res)=>{
            callback(res.data)
        })
    }
}