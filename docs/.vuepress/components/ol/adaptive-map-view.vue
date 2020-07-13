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
import { points } from '@turf/helpers'
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
      // const pp = points([[107.394592,34.349378], [108.504212,35.233551], [110.003845,35.026893], [110.586121,34.167773], [109.512207,33.718903], [108.4328,33.325067], [107.284729,33.370954]])
      // console.log(bbox(pp))
      const points = randomPoint(5, {bbox:  [107.284729, 33.325067, 110.586121, 35.233551]})
      const bboxs = bbox(points)
      this.map.getView().fit(transformExtent(bboxs, "EPSG:4326", "EPSG:3857"), {
        duration: 200
      });
    }
  }
}
</script>
