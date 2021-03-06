/*
 * @Author: Caven
 * @Date: 2020-01-13 10:13:53
 * @Last Modified by: Caven
 * @Last Modified time: 2020-02-03 13:44:14
 */
import Cesium from '@/namespace'
import Layer from './Layer'

DC.GeoJsonLayer = class extends Layer {
  constructor(id, url) {
    super(id)
    this._delegate = new Cesium.GeoJsonDataSource(id).load(url)
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.GEOJSON
  }

  _addCallback(viewer) {
    this._viewer = viewer
    this._viewer.delegate.dataSources.add(this._delegate)
    this._state = DC.LayerState.ADDED
  }

  _removeCallback() {
    if (this._viewer) {
      this._cache = {}
      this._delegate.removeAll()
      this._viewer.delegate.dataSources.remove(this._delegate)
      this._state = DC.LayerState.REMOVED
    }
  }

  _createBillboard(entity) {
    if (entity.position && entity.billboard) {
      return DC.Billboard.fromEntity(entity)
    }
  }

  _createPolyline(entity) {
    if (entity.polyline) {
      return DC.Polyline.fromEntity(entity)
    }
  }

  _createPolygon(entity) {
    if (entity.polygon) {
      return DC.Polygon.fromEntity(entity)
    }
  }

  eachOverlay(method, context) {
    if (this._delegate) {
      this._delegate.then(dataSource => {
        let entities = dataSource.entities.values
        entities.forEach(item => {
          method.call(context, item)
        })
      })
      return this
    }
  }

  clear() {
    this._cache = {}
    this._delegate.removeAll()
    this._state = DC.LayerState.CLEARED
    return this
  }

  /**
   *
   */
  toVectorLayer() {
    let layer = new DC.VectorLayer(this._id)
    let self = this
    this.eachOverlay(item => {
      if (item.billboard) {
        layer.addOverlay(self._createBillboard(item))
      } else if (item.polyline) {
        layer.addOverlay(self._createPolyline(item))
      } else if (item.polygon) {
        layer.addOverlay(self._createPolygon(item))
      }
    })
    return layer
  }
}
