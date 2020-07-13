---
title: 根据撒点坐标自适应地图
date: 2020-07-12
---

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
import { Tile as TileLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import {defaults as defaultControls, Attribution} from 'ol/control';
import { transform, transformExtent } from 'ol/proj'
import bbox from '@turf/bbox'
import { randomPoint } from '@turf/random'
export default {
  name: 'adaptive-map-view',
  data() {
    return {
      map: null
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
    randomPoints() {
      const points = randomPoint(5, {bbox:  [107.284729, 33.325067, 110.586121, 35.233551]})
      const bboxs = bbox(points)
      this.map.getView().fit(transformExtent(bboxs, "EPSG:4326", "EPSG:3857"), {
        duration: 200
      });
    }
  }
}
</script>
```