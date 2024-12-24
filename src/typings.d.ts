// src/typings.d.ts
import 'leaflet';

declare module 'leaflet' {
  namespace Control {
    function locate(options?: any): L.Control;
  }
}
