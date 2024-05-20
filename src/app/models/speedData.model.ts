export class SpeedData {
    speed_ID: number;
    speed_Date: String;
    speed_Time: String;
    speed_Speed: number[];
    speed_Distance: number;
    speed_Duration: String;
    speed_Calories: number;
    speed_HeartRate: number;
    speed_UserID: number;
    constructor(speed_ID: number, speed_Date: String, speed_Time: String, speed_Speed: number[], speed_Distance: number, speed_Duration: String, speed_Calories: number, speed_HeartRate: number, speed_UserID: number){
        this.speed_ID = speed_ID;
        this.speed_Date = speed_Date;
        this.speed_Time = speed_Time;
        this.speed_Speed = speed_Speed;
        this.speed_Distance = speed_Distance;
        this.speed_Duration = speed_Duration;
        this.speed_Calories = speed_Calories;
        this.speed_HeartRate = speed_HeartRate;
        this.speed_UserID = speed_UserID;
    }
   static fromJson(json: any): SpeedData {
        return new SpeedData(
            json.speed_ID,
            json.speed_Date,
            json.speed_Time,
            json.speed_Speed,
            json.speed_Distance,
            json.speed_Duration,
            json.speed_Calories,
            json.speed_HeartRate,
            json.speed_UserID
        );
    }
}