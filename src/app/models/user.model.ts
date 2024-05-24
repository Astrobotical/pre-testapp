export class User {
    user_ID: number;
    user_FirstName: String;
    user_LastName: String;
    user_Email: String;
    user_Password: String;
    user_Dob:String;
    user_Height:number;
    user_Weight:number
    user_YearlyGoal:number;
    user_Miles:number;
    constructor(user_ID: number, user_FirstName: String, user_LastName: String, user_Email: String, user_Password: String, user_Age:String, user_Height:number, user_Weight:number, user_YearlyGoal:number, user_Miles:number){
        this.user_ID = user_ID;
        this.user_FirstName = user_FirstName;
        this.user_LastName = user_LastName;
        this.user_Email = user_Email;
        this.user_Password = user_Password;
        this.user_Dob = user_Age;
        this.user_Height = user_Height;
        this.user_Weight = user_Weight;
        this.user_YearlyGoal = user_YearlyGoal;
        this.user_Miles = user_Miles;
    }
}