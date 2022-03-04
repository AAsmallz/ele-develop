// 自定义吸附指令
const vFixed = {
    mounted(el, binding) {
        /* 
            el: 当前绑定的元素
        */
        var
            _el = el,
            dt = 0,
            st = 0,
            arg = binding.arg || 0,
            tVal = arg/37.5 + 'rem',
            bool, _bool;

        var
            dHtml = document.documentElement,
            dBody = document.body;

        var css = {
            position: 'fixed',
            left: '0',
            top: tVal,
            width: '100%'
        }

        // 设置占位元素，解决置顶吸附时上面超出的部分内容
        var dp = document.createElement('p')
        dp.style.height = el.offsetHeight/37.5 + 'rem'
        dp.style.display = 'none'
        el.after(dp)

        // 1. 获取元素距离顶部的高度dt
        do {
            // 元素相对定位于父级的距离
            dt += _el.offsetTop;
            _el = _el.offsetParent;
        } while (_el)

        // 给window，body, html添加scroll事件
        window.addEventListener('scroll', scrollFn, false)
        dBody.addEventListener('scroll', scrollFn, false)
        dHtml.addEventListener('scroll', scrollFn, false)

        function scrollFn() {
            // 2.获取滚动条的高度st
            st = dHtml.scrollTop || dBody.scrollTop;
            bool = st >= dt-arg
            if (_bool !== bool) {
                // 判断滚动条的状态
                // console.log(bool ? '高度够了' : '高度不够了')
                for (var k in css) {
                    // 设置样式
                    if (bool) {
                        // 添加样式
                        el.style[k] = css[k]
                        dp.style.display = 'block'
                    }
                    else {
                        // 清除样式
                        el.style[k] = ''
                        dp.style.display = 'none'
                    }
                }
                _bool = bool
            }
        }
    }
}

export default vFixed;