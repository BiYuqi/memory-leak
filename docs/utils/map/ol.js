import GeoJSON from 'ol/format/GeoJSON'
import { Image, Icon, Fill, Stroke, Style } from 'ol/style'

export function readGeoJSON({ data, dataProjection = 4326, featureProjection = 3857 }) {
  return new GeoJSON().readFeatures(data, {
    dataProjection: `EPSG:${dataProjection}`,
    featureProjection: `EPSG:${featureProjection}`
  })
}

// export function setStyle(styles) {
//   const res = {}
//   Object.keys(styles).forEach(s => {
//     if (s.toUpperCase()) {
//
//     }
//   })
//   return new Style()
// }
