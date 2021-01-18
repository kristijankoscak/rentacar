import { Image } from "../shared/image.model";

export class Vehicle{
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
  images: Image[];
}
