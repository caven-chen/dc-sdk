/*
 * @Author: Caven
 * @Date: 2020-01-21 16:06:14
 * @Last Modified by: Caven
 * @Last Modified time: 2020-01-21 16:12:37
 */

import Cesium from '@/namespace'

const ELEC_URL = 'http://mt{s}.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile'
const IMG_URL = 'http://mt{s}.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
const TER_URL = 'http://mt{s}.google.cn/vt/lyrs=t@131,r@227000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galile'

class GoogleImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    options['url'] = options.style === 'img' ? IMG_URL : options.style === 'ter' ? TER_URL : ELEC_URL
    super(options)
  }
}

export default GoogleImageryProvider
