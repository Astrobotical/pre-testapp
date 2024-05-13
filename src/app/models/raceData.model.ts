import { SpeedData } from "./speedData.model";
export class RaceData{
    id: number;
    date : string;
    type : String;
    speedData : SpeedData;
    constructor(id : number, date : string, type : String, speedData : SpeedData){
        this.id = id;
        this.date = date;
        this.type = type;
        this.speedData = speedData;
    }
}