import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {


  vehicles: Vehicle[] = [
    {
      make:'BMW',
      model: 'M3',
      modelYear:'2017',
      manufactureYear: '2017',
      speedsNumber: 6,
      color: 'Black',
      transmissionType: 'Manual',
      power: 110,
      price: 53,
      type: 'Limusine',
      coverImage: 'https://collectingcars.imgix.net/images/2020/09/cover-66.jpg',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    },
    {
      make:'BMW',
      model: 'M4',
      modelYear:'2017',
      manufactureYear: '2017',
      speedsNumber: 6,
      color: 'Gold',
      transmissionType: 'Manual',
      power: 110,
      price: 65,
      type: 'Coupe',
      coverImage: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/common/topics/magazine-article-pool/2019/m-portraits-7/bmw-m4-coupe-m-potraits-davs0-ai-03.jpg.asset.1560350141062.jpg',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    },
    {
      make:'BMW',
      model: 'X1',
      modelYear:'2015',
      manufactureYear: '2017',
      speedsNumber: 6,
      color: 'Black',
      transmissionType: 'Manual',
      power: 150,
      price: 73,
      type: 'Jeep',
      coverImage: 'https://content.jdmagicbox.com/quickquotes/images_main/bmw-x1-m-sport-sdrive-20d-black-sapphire-102055210-zj0vx.png',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    },
    {
      make:'BMW',
      model: 'M3',
      modelYear:'2015',
      manufactureYear: '2016',
      speedsNumber: 6,
      color: 'Red',
      transmissionType: 'Manual',
      power: 100,
      price: 50,
      type: 'Limusine',
      coverImage: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/common/topics/magazine-article-pool/2019/m-portraits-7/bmw-m4-coupe-m-potraits-davs0-ai-03.jpg.asset.1560350141062.jpg',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    },
    {
      make:'BMW',
      model: 'M3',
      modelYear:'2017',
      manufactureYear: '2017',
      speedsNumber: 6,
      color: 'Black',
      transmissionType: 'Manual',
      power: 110,
      price: 53,
      type: 'Limusine',
      coverImage: 'https://collectingcars.imgix.net/images/2020/09/cover-66.jpg',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    },
    {
      make:'BMW',
      model: 'M4',
      modelYear:'2019',
      manufactureYear: '2019',
      speedsNumber: 6,
      color: 'Gray',
      transmissionType: 'Manual',
      power: 140,
      price: 89,
      type: 'Coupe',
      coverImage: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/common/topics/magazine-article-pool/2019/m-portraits-7/bmw-m4-coupe-m-potraits-davs0-ai-03.jpg.asset.1560350141062.jpg',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    },
    {
      make:'BMW',
      model: 'X1',
      modelYear:'2017',
      manufactureYear: '2018',
      speedsNumber: 6,
      color: 'Blue',
      transmissionType: 'Manual',
      power: 150,
      price: 85,
      type: 'Jeep',
      coverImage: 'https://content.jdmagicbox.com/quickquotes/images_main/bmw-x1-m-sport-sdrive-20d-black-sapphire-102055210-zj0vx.png',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    },
    {
      make:'BMW',
      model: 'M4',
      modelYear:'2017',
      manufactureYear: '2017',
      speedsNumber: 6,
      color: 'Gold',
      transmissionType: 'Manual',
      power: 110,
      price: 65,
      type: 'Coupe',
      coverImage: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/common/topics/magazine-article-pool/2019/m-portraits-7/bmw-m4-coupe-m-potraits-davs0-ai-03.jpg.asset.1560350141062.jpg',
      otherImages: [
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg',
        'https://autostart.24sata.hr/media/img/3a/5b/b8d27dcd43379946a255.jpeg'
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
