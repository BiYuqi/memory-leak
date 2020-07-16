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
      const bboxs = bbox(geojson)
      this.map.getView().fit(transformExtent(bboxs, "EPSG:4326", "EPSG:3857"), {
        duration: 200
      });
    }
  }
}
</script>
