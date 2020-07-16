---
title: 根据撒点坐标自适应地图
date: 2020-07-12
---
## 背景
在日常工作开发中，如果用到了撒点的功能，需求是加入根据列表的不同分别撒点上图, 那么这个时候我们就需要地图
的视图随着不同的点坐标，自适应切换到合适的比例大小.

那么我们如何做到呢？

此处使用Openlayers结合turf.js

- [Openlayers](https://openlayers.org/)不用说了，就是我们开发gis应用的js包
- [turf.js](https://github.com/Turfjs/turf)是一个空间计算工具，很强大

## 效果
<ClientOnly>
<ol-adaptive-map-view />
</ClientOnly>

## 具体实现
```vue
<template>
  <div class="adaptive-map-view common-map-view">
    <div id="map"></div>
    <button class="common-button" @click="randomPoints">随机坐标</button>
  </div>
</template>

<script>
import * as ol from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { OSM } from 'ol/source'
import {defaults as defaultControls } from 'ol/control';
import { transform, transformExtent } from 'ol/proj'
import bbox from '@turf/bbox'
import { randomPoint } from '@turf/random'
import { Image, Icon, Fill, Stroke, Style, Circle } from 'ol/style'

import { readGeoJSON } from '../../../utils/map/ol'
export default {
  name: 'adaptive-map-view',
  data() {
    return {
      map: null,
      layer: null,
      styles: [
        new Style({
          image: new Circle({
            fill: new Fill({
              color: '#F00'
            }),
            radius: 6
          }),
        })
      ]
    }
  },
  mounted() {
    this.map = new ol.Map({
      target: 'map',
      view: new ol.View({
        center: transform([108.971131, 34.330101], "EPSG:4326", "EPSG:3857"),
        zoom: 10
      }),
      controls: defaultControls({ attribution: false }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ]
    })
  },
  methods: {
    removeLayer(layer) {
      if (layer) {
        this.map.removeLayer(layer)
      }
    },
    renderPoints(data) {
      this.removeLayer(this.layer)

      this.layer = new VectorLayer({
        source: new VectorSource({
          features: readGeoJSON({ data })
        }),
        style: this.styles
      })
      this.map.addLayer(this.layer)
    },
    randomPoints() {
      const geojson = randomPoint(10, {bbox:  [107.284729, 33.325067, 110.586121, 35.233551]})
      // 撒点测试
      this.renderPoints(geojson)
      // bbox 根据所有的坐标点生成坐标范围
      const bboxs = bbox(geojson)
      /**
       * Fit the given geometry or extent based on the given map size and border.
       */
      // 调用fit函数 传入转化好坐标的extent
      this.map.getView().fit(transformExtent(bboxs, "EPSG:4326", "EPSG:3857"), {
        duration: 200
      });
    }
  }
}
</script>
```