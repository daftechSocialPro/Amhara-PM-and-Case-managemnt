import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
//import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-showonmap',
  templateUrl: './showonmap.component.html',
  styleUrls: ['./showonmap.component.css']
})
export class ShowonmapComponent {

  @Input() lat !:number
  @Input() lng !:number
  private map!: L.Map;

  constructor(private activeModal:NgbActiveModal) {}

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 17
    });

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                   '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                   'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18
    });

    tileLayer.addTo(this.map);
    const greenIcon = L.icon({
      iconUrl: 'assets/marker-icon-green.png',
      //shadowUrl: 'assets/marker-shadow.png',
    
      iconSize: [41, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    const marker = L.marker([this.lat,this.lng], { icon: greenIcon }).addTo(this.map);
    marker.bindPopup('Progress Location!');
  }
  closeModal(){

        this.activeModal.close()
      }
}


// implements OnInit {
//   constructor(private activeModal:NgbActiveModal){}

//   ngOnInit(): void {
//     // Create a new map centered on New York City
//     const map = L.map('map').setView([40.7128, -74.0060], 13);

//     // Add a tile layer to the map
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//       maxZoom: 18
//     }).addTo(map);

//     // Add a marker to the map
//     L.marker([40.7128, -74.0060]).addTo(map)
//       .bindPopup('New York City')
//       .openPopup();
//   }

//   closeModal(){

//     this.activeModal.close()
//   }
// }