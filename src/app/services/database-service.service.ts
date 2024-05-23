import { RaceData } from './../models/raceData.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { SpeedData } from '../models/speedData.model';
@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  db!: SQLiteDBConnection ;

  constructor() {
  
    this.initializePlugin();
  }
  async initializePlugin() {
    try {
      const platform = Capacitor.getPlatform();
      if (platform === 'ios' || platform === 'android') {
        console.log('Initializing Capacitor SQLite Plugin');
        this.db = await this.sqlite.createConnection('mydb', false, 'no-encryption', 1, false);
        await this.db.open();
        console.log('Database opened successfully');
        await this.createDatabase();
      } else {
        console.warn('SQLite is not supported on this platform:', platform);
      }
    } catch (error) {
      console.error('Error initializing plugin', error);
    }
  }


  async createDatabase() {
    if (this.sqlite) {
      try {
        //this.db = await this.sqlite.createConnection('my-db', false, 'no-encryption', 1,false);
        await this.db.open();
        console.log('Database created!');

        //Creating the Users table if it does not exist
        await this.db.execute(`
        CREATE TABLE IF NOT EXISTS Users (
          user_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          user_FirstName TEXT,
          user_LastName TEXT,
          user_Email TEXT,
          user_Password TEXT,
          user_Dob TEXT,
          user_Height REAL,
          user_Weight REAL,
          user_YearlyGoal REAL,
          user_Miles REAL
      );
        `);
        //Creating the RaceData table if it does not exist
        await this.db.execute(`
        CREATE TABLE IF NOT EXISTS RaceData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_ID INTEGER,
            date TEXT,
            type TEXT,
            speedData TEXT,
            hasSynced INTEGER DEFAULT 0,
        );
    `);

      } catch (error) {
        console.error('Error creating database', error);
      }
    }
  }

  async addUser(user:User){
    let wasSuccessful = false;
      try {
        console.log('Adding user', user);
        const result = 
        await this.db.run(
          `INSERT INTO Users (user_FirstName, user_LastName, user_Email, user_Password, user_Dob, user_Height, user_Weight, user_YearlyGoal, user_Miles) 
          VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [user.user_FirstName, user.user_LastName, user.user_Email, user.user_Password, user.user_Dob, user.user_Height, user.user_Weight, user.user_YearlyGoal, user.user_Miles]
        );
        
        console.log('Result', result);
        
        if(result.changes!.changes === 1){
          wasSuccessful = true;
        }
        
      } catch (error) {
        console.error('Error adding user', error);
      }
      return wasSuccessful
  }
  async getUserByEmail(Email:String): Promise<User | undefined>{
    if (this.db) {
      try {
        const result = await this.db.query(
          `SELECT * FROM Users WHERE user_Email = ?`,
          [Email]
        );
        if (result.values!.length === 0) {
          console.log('No user found');
        }else{
          const user = result.values![0];
          return new User(user.user_ID, user.user_FirstName, user.user_LastName, user.user_Email, user.user_Password, user.user_Dob, user.user_Height, user.user_Weight,user.user_YearlyGoal,user.user_Miles);
        }
      } catch (error) {
        console.error('Error getting user', error);
      }
    }
    return undefined;
  }
  async getUser(currentUser:User): Promise<User | undefined>{
    if (this.db) {
      try {
        const result = await this.db.query(
          `SELECT * FROM Users WHERE user_Email = ? AND user_Password = ?`,
          [currentUser.user_Email, currentUser.user_Password]
        );
        const getall = await this.db.query(
          `SELECT * FROM Users`
        ); 

        if (result.values!.length === 0) {
          console.log('No user found');
          console.log(getall.values);
        }else{
          const user = result.values![0];
          console.log(user);
          return new User(user.user_ID, user.user_FirstName, user.user_LastName, user.user_Email, user.user_Password, user.user_Dob, user.user_Height, user.user_Weight,user.user_YearlyGoal,user.user_Miles);
        }
      } catch (error) {
        console.error('Error getting user', error);
      }
    }
    return undefined;
  }
  async updateUser(user:User) {
    let tobereturned = false;
    if (this.db) {
      try {
        
       const result = await this.db.run(
          `UPDATE Users SET user_FirstName = ?, user_LastName = ?, user_Email = ?, user_Password = ?, user_Dob = ?, user_Height = ?, user_Weight = ? WHERE user_ID = ?`,
          [user.user_FirstName, user.user_LastName, user.user_Email, user.user_Password, user.user_Dob, user.user_Height, user.user_Weight, user.user_ID]
        );
        if(result.changes!.changes === 1)
          {
            tobereturned = true;
          }
        return tobereturned = true;
      } catch (error) {
        console.error('Error updating user', error);
      }
    }
    return tobereturned;
  }
  async getAllRacesByUser(user:User): Promise<RaceData[]>{
    let tobeReturned : RaceData[] = [];
    if (this.db) {
      try {
        let result : any = await this.db.query(
          `SELECT * FROM RaceData WHERE user_ID = ?`,
          [user.user_ID]
        );
        if (result.values.length === 0) {
          return [];
        }
      
        result.values.map((raceData: any) => {
          tobeReturned.push(
            new RaceData(
              raceData.id, 
              raceData.date, 
              raceData.type,
              SpeedData.fromJson(JSON.parse(raceData.speedData)))
            );
      });
 
        return tobeReturned;

      } catch (error) {
        console.error('Error getting user', error);
      }
    }
    return tobeReturned;
  }
  async addRaceData(raceData:RaceData){
    let wasSuccessful = false;
      try {
        console.log('Adding raceData', raceData);
        const result =
        await this.db.run(
          `INSERT INTO RaceData ( date, type, speedData) 
          VALUES ( ?, ?, ?)`,
          [ raceData.date, raceData.type, JSON.stringify(raceData.speedData)]
        );
        console.log('Result', result);
        if(result.changes!.changes === 1){
          wasSuccessful = true;
        }
      } catch (error) {
        console.error('Error adding raceData', error);
      }
      return wasSuccessful
  }
  async getRaceDataById(id:number): Promise<RaceData | undefined>{
    if (this.db) {
      try {
        const result = await this.db.query(
          `SELECT * FROM RaceData WHERE id = ?`,
          [id]
        );
        if (result.values!.length === 0) {
          console.log('No raceData found');
        }else
        {
          const raceData = result.values![0];
          return new RaceData(raceData.id, raceData.date, raceData.type, SpeedData.fromJson(JSON.parse(raceData.speedData)));
        }
      } catch (error) {
        console.error('Error getting raceData', error);
      } 
    }
    return undefined;
  }

  async closeConnection() {
    if (this.db) {
      await this.db.close();
    }

  }
}