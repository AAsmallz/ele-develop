// 城市模块数据的预处理

// 获取getCurrentInstance方法，之后拿取全局的方法，替代this
import {
    getCurrentInstance,
    toRefs,
    reactive,
    onMounted,
    computed
} from "vue";

export default function cityModel() {
    /*
        vue2.x 通过在vue原型挂载axios，可以在组件实例中通过this.$axios进行访问
        vue3.x 中没有this，通过getCurrentInstance方法获取$axios
        注意：getCurrentInstance()方法，是用来获取当前的实例的，通过上下文ctx来获取当前的方法，但是在打包之后则无法获取全局挂载的方法，也就是说如果是上线项目则需要将ctx换成proxy去获取方法。[推荐直接使用proxy]
    */
    const {
        proxy
    } = getCurrentInstance();
    // 定义响应式数据对象
    const data = reactive({
        cityList: null,
        searchStr: '',
        currentCity: '',
        show: {city: false},
        selectCity(val){
            // 选择完城市时关闭城市选择列表
            data.show.city = false
            // 选择完城市时清空输入的城市
            data.searchStr = ''
            data.currentCity = val.name
            // 选择完城市后，进行传递到地址选择和主页中
            proxy.$emit('shangSide', val)
        }
    });
    // 城市数据的预处理，按照属性pinyin开头字母进行城市划分
    const cityName = computed(()=>{
        // 获取数据
        const citys = data.cityList
        // 初始化一个容器对象
        var cityList = {}
        // 存首字母
        var initial
        if(citys){
            for(var item of citys){
                initial = item.pinyin[0].toUpperCase()
                if(initial in cityList){
                    cityList[initial].push(item)
                }
                else {
                    // 初始化首字母为一个数组
                    // 类似cityList.initial = {...item}
                    cityList[initial] = [item]
                }
            }   
        }
        return cityList
    })
    // 城市数据的模糊查询
    const citySearch = computed(()=>{
        // 声明一个空的数据
        var arr = []
        // 声明一个全局匹配
        var reg
        // 获取城市列表数据和用户输入查询的城市
        var citys = data.cityList
        var searchStr = data.searchStr
        // 没有输入数据的情况，需要手动给定形式，否则报错undefined无法迭代显示到页面
        if(!citys || !searchStr) return []

        // 1-详细匹配(遍历数组一一对应匹配)
        // // 循环数据，使用数据中的label的值进行判断
        // for(var city of citys){
        //     // searchStr输入值与label的值进行匹配
        //     if( city.label.includes(searchStr)){
        //         arr.push(city)
        //     } 
        // }

        // 2-模糊匹配(通过正则的方式进行匹配)
        searchStr = searchStr.replace(/.{0}/g, '.*');
        for( var city of citys ){
            // 声明一个全局匹配，忽略大小写
            reg = new RegExp(searchStr, 'gi')
            // 判断输入的值是否可以匹配城市的label数据
            if(reg.test(city.label)){
                arr.push(city)
            }
        }
        return arr
    })

    // 在组件渲染之前拿到数据
    onMounted(()=>{
        proxy.$axios("/citylist").then((res) => {
            data.cityList = res.data;
        });
    })
    // 在setup中返回一个对象供页面使用
    // 在这个对象中可以包含响应式的数据，也可以包含事件处理函数
    return {
        cityName,
        citySearch,
        // 将data上的每个属性，都转化为ref形式的响应式数据
        // 因为ES6扩展运算符，会取消双向数据绑定的特性,所以需要使用toRefs(),转为响应式数据
        ...toRefs(data),
    };
}