import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle/vehicle.model';

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.css']
})
export class CarRentalComponent implements OnInit {
  vehicles: Vehicle[] = [
    {
      id: 1,
      mark: 'BMW',
      model: 'M3',
      model_year: '2017',
      manufacture_year: '2017',
      gears: 6,
      color: 'Black',
      gearbox: 'Manual',
      status: 'nesto',
      power: 110,
      type: 'Limusine',
      price: 53,
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
      id: 1,
      mark: 'BMW',
      model: 'M4',
      model_year: '2017',
      manufacture_year: '2017',
      gears: 6,
      color: 'Gold',
      gearbox: 'Manual',
      status: 'nesto',
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
      id: 1,
      mark: 'BMW',
      model: 'X1',
      model_year: '2015',
      manufacture_year: '2017',
      gears: 6,
      color: 'Black',
      gearbox: 'Manual',
      status: 'nesto',
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
      id: 1,
      mark: 'BMW',
      model: 'M3',
      model_year: '2015',
      manufacture_year: '2016',
      gears: 6,
      color: 'Red',
      gearbox: 'Manual',
      status: 'nesto',
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
      id: 1,
      mark: 'BMW',
      model: 'M3',
      model_year: '2017',
      manufacture_year: '2017',
      gears: 6,
      color: 'Black',
      gearbox: 'Manual',
      status: 'nesto',
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
      id: 1,
      mark: 'BMW',
      model: 'M4',
      model_year: '2019',
      manufacture_year: '2019',
      gears: 6,
      color: 'Gray',
      gearbox: 'Manual',
      status: 'nesto',
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
      id: 1,
      mark: 'BMW',
      model: 'X1',
      model_year: '2017',
      manufacture_year: '2018',
      gears: 6,
      color: 'Blue',
      gearbox: 'Manual',
      status: 'nesto',
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
      id: 1,
      mark: 'BMW',
      model: 'M4',
      model_year: '2017',
      manufacture_year: '2017',
      gears: 6,
      color: 'Gold',
      gearbox: 'Manual',
      status: 'nesto',
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
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
