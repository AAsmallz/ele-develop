// 首页模块

// 获取getCurrentInstance方法，之后拿取全局的方法，替代this
import {
    getCurrentInstance,
    toRefs,
    reactive,
    onMounted,
    computed
} from "vue";

export default function homeModel(){
    const { proxy } = getCurrentInstance(); //获取全局方法
    const data = reactive({
        show: {side: false},
        // 当前地址
        currentSide: '',
        foodType: null,
        saveSide(val){
            data.currentSide = val.name
        }
    })

    // 拆分数据 - 每页轮播显示10条数据，即10条数据分为一组
    const spliceFood = computed(() => {
        // 获取分类得到数据
        var fooddatas = data.foodType;
        if(fooddatas){
            fooddatas = data.foodType.entries;
            var arr = []; //存放切割的数据
            do{
                arr.push(fooddatas.splice(0,10))
            }while(fooddatas.length)
            return arr
        }
    })
    
    onMounted(()=>{
        // 获取分类数据 - 首页轮播图内容
        proxy.$axios('/foottype').then(res=>{
            data.foodType = res.data
        })
    })
    return {
        spliceFood,
        ...toRefs(data),
    }
}