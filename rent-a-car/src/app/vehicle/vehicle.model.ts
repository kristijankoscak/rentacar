import { CarRental } from "../car-rental/car-rental.model";
import { Image } from "../shared/image.model";

export class Vehicle{
  id:number;
  mark:string;
  model: string;
  modelYear:string;
  manufactureYear: string;
  gears: number;
  color:string;
  gearbox:string;
  status: string;
  power: number;
  type: string;
  price: number;
  fuelType:string;
  gateNumber: number;
  discount:number;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
  carRental: CarRental;
}
