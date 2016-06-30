require('./animatediv.scss')

let container = document.getElementById('container')
let btn = document.getElementById('btn')

btn.onclick = function () {
  if (container.offsetLeft === 0) {
    move(container, {'height': 100, 'opacity': 100}, function () {
      move(container, {'left': -200})
    })
  } else {
    move(container, {'left': 0}, function () {
      move(container, {'height': 300, 'opacity': 20})
    })
  }
}

let timer = null
let isComplete = false

/**
 * 动画函数
 *
 * @param  {Element}   obj       [执行动画的元素]
 * @param  {Object}   attrClass  [执行动画的样式属性]
 * @param  {Function} fn        [动画执行完成后的回调函数]
 */
function move (obj, attrClass, fn) {
  clearInterval(timer)
  timer = setInterval(() => {
    for (let attr in attrClass) {
      let curStyle = getStyle(obj, attr)
      let tagStyle = attrClass[attr]

      if (curStyle === tagStyle) {
        isComplete = true
        continue
      }
      isComplete = false

      let speed = (tagStyle - curStyle) / 20
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

      setStyle(obj, attr, (curStyle + speed))
      console.log(attr, obj.style[attr])
    }

    if (isComplete) {
      clearInterval(timer)
      fn && fn()
    }
  }, 16)
}

/**
 * 获取元素样式
 *
 * @param  {Element} obj  [元素]
 * @param  {String} attr [元素属性]
 * @return {Float}      [元素属性值]
 */
function getStyle (obj, attr) {
  let opacity = attr === 'opacity' ? 100 : 1
  if (obj.currentStyle) {
    return parseFloat(obj.currentStyle[attr]) * opacity
  }
  return parseFloat(getComputedStyle(obj, false)[attr]) * opacity
}

/**
 * 设置元素样式
 *
 * @param {Element} obj   [元素]
 * @param {String} attr  [元素属性]
 * @param {Float} style [元素属性值]
 */
function setStyle (obj, attr, style) {
  if (attr === 'opacity') {
    obj.style[attr] = style / 100.0
  } else {
    obj.style[attr] = style + 'px'
  }
}
