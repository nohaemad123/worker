import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as L from 'leaflet';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import 'leaflet.locatecontrol';


@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrl: './map-popup.component.scss'
})
export class MapPopupComponent implements OnInit, OnDestroy {

  private dialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private http = inject(HttpClient);
  private httpBackend = inject(HttpBackend);
  private httpWithoutInterceptor: HttpClient;

  searchControl: FormControl = new FormControl();
  placesSearchResults: any[] = [];

  data = this.dialogConfig.data;
  address = '';
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      })
    ],
    zoom: 12,
    center: L.latLng(this.data.lat, this.data.lng),
  };
  map: any; // Store the map instance here
  customIcon = L.icon({
    iconUrl: 'assets/icons/location.png', // Path to your custom marker image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });
  markerOptions = {
    draggable: true
  };

  lat: number = 0;
  lng: number = 0;
  marker: any;

  constructor() {
    this.httpWithoutInterceptor = new HttpClient(this.httpBackend);
  }

  onMapReady(mapInstance: L.Map) {
    this.map = mapInstance;
    // ((L.control) as any)
    // .locate({
    //   position: 'topleft',
    //   strings: {
    //     title: 'Show my location',
    //   },
    //   locateOptions: {
    //     enableHighAccuracy: true,
    //   },
    // })
    // .addTo(this.map);
    // Add a draggable marker once the map is ready
    this.marker = L.marker([this.data.lat, this.data.lng], { draggable: true, icon: this.customIcon }).addTo(this.map);

    // Listen to the dragend event of the marker
    this.marker.on('dragend', (event: L.LeafletEvent) => {
      const marker = event.target;
      const position = marker.getLatLng();
      this.lat = position.lat;
      this.lng = position.lng;
      this.getAddressFromCoordinates(position.lat, position.lng);
    });
  }

  getAddressFromCoordinates(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    this.http.get(url).subscribe((response: any) => {
      if (response && response.address) {
        const address = response.display_name;
        this.address = address; // Update the address field in the UI or use it as needed
      }
    }, error => {
      console.error('Error fetching address:', error);
    });
  }

  confirm(): void {
    this.ref.close({ action: 'confirm', data: { lat: this.lat, lng: this.lng, address: this.address } });
  }

  cancel(): void {
    this.ref.close({ action: 'cancel' });
  }

  ngOnInit(): void {
    this.lat = this.data?.lat;
    this.lng = this.data?.lng;
    if (this.data?.lat && this.data?.lng) {
      this.getAddressFromCoordinates(this.data?.lat, this.data?.lng);
    }
    this.initSearch();
  }

  initSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged())
      .subscribe((searchValue: string) => {
        if (searchValue) {
          this.searchForLocation(searchValue);
        }
      })
  }

  locateUser() {
    // Request the user's location
    this.map.locate({ setView: true, maxZoom: 16 });

    // Handle location found
    this.map.on('locationfound', (e: L.LocationEvent) => {
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;

      // Update marker position
      this.marker.setLatLng([this.lat, this.lng]);

      // Get address from coordinates
      this.getAddressFromCoordinates(this.lat, this.lng);
    });

    // Handle location error
    this.map.on('locationerror', (e: any) => {
      console.error('Location error:', e.message);
    });
  }

  searchForLocation(searchValue: string): void {
    // Call the API to get the locations
    const url = `https://us1.locationiq.com/v1/autocomplete?q=${searchValue}&key=pk.a3066da026a102b61f5ed8a070c72f63&accept-language=ar`;
    this.httpWithoutInterceptor.get(url).subscribe((response: any[]) => {
      this.placesSearchResults = response;
    });
    // const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchValue}&key=AIzaSyDFAmZDodY88LS8GCdCiqv_u7NGnFbnM9M&language=ar`;
    // this.http.get(url).subscribe((response: any) => {
    //   this.placesSearchResults = response.predictions.map((place: any) => ({
    //     display_name: place.description,
    //     place_id: place.place_id,
    //   }));
    // });
  }

  openLocation(location: any): void {
    this.lat = location.lat;
    this.lng = location.lon;
    this.marker.setLatLng([this.lat, this.lng]);
    this.map.panTo([this.lat, this.lng]);
    this.searchControl.setValue(location.display_name);
    this.getAddressFromCoordinates(this.lat, this.lng);
  }

  ngOnDestroy(): void {
  }

}
