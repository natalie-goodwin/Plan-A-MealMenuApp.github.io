//Plan-A-Meal: A meal-planning menu app

/*Concept: Create an app that allows users to plan out their 
meals for the week. Users should be able to 
add the day of the week, meal times, and foods for each meal.*/

    
    
//Class 1 of 2 for the meal time

class MealTime {
    constructor(time, food){ //the parameters hold the time for the meal and the food  
        this.time = time;
        this.food = food;
    }

    describe(){ //this line describes the relationship between the parameters
      return `${this.time} includes ${this.food}` 
    }
}

//Class 2 of 2 for the day of the week
class DayOfWeek {
    constructor(day) { // the parameter holds the day of the week
        this.day = day;    
        this.mealTime = []; //this array holds the meal times for the day of the week
    }

    addMealTime(mealTime){  //here I added a way to add meal times and push them into the above array
        if (mealTime instanceof MealTime) {
            this.mealTime.push(mealTime);
        } else {
            throw new Error (`You can only add an instance of meal time. Argument is not a meal time: ${mealTime}`);
        }
    }
    
    describe() { //this line describes the relationship between the day and meal time
        return `${this.day} has ${this.mealTime.length} meal times.`;
    }
}
    

class Menu {
    constructor() { // initializing days of the week
      this.dayOfWeek = []; // array exists to allow for multiple days of the week
      this.selectedDayOfWeek = null; //set equal to null because at the start, no days of the week exist
    } 
     
    start() { //this is the entry point to the application
      let selection = this.showMainMenuOptions(); // here I am showing main menu options
    
      while (selection != 0){ //while loop to hold the menu options that the user will select
        switch (selection) { 
          case '1': 
            this.createDayOfWeek(); 
            break;
          case '2':
            this.viewDayOfWeek();
            break;
          case '3': 
            this.deleteDayOfWeek();
            break;
          case '4':
            this.displayDaysOfWeek();
            break;
            default: 
             
               selection = 0; 
        }
        selection = this.showMainMenuOptions(); 
      }
    
      alert('Goodbye!'); // this will display if the user selects 0  
    }
     
    showMainMenuOptions() { 
    // the user will see these options on the main menu
       return prompt(`   
         0) exit
         1) create new day of the week
         2) view day of the week
         3) delete day of the week
         4) display all days of the week
         `);
    }

    showDayOfWeekMenuOptions(dayOfWeekInfo){ //these are the options for the sub menu
        return prompt(`
        0) back
        1) create meal time
        2) delete meal time
        ------------------------------------------
           ${dayOfWeekInfo}
        `);  
    }

      
    displayDaysOfWeek() { 
        let dayOfWeekString = ''; //this builds a string for all the information about the day of the week
        //iterates through the days of the week
        for (let i = 0; i < this.dayOfWeek.length; i++) {
         dayOfWeekString += i + ') ' + this.dayOfWeek[i].day + '\n';  
        } //creates blank string, iterates through the days and lists the days with an index number 

         alert(dayOfWeekString); //this makes it possible to see all days  
    }

    createDayOfWeek() {
        let day = prompt('Enter day of week:'); // here the user is prompted to enter a day of the week
        this.dayOfWeek.push(new DayOfWeek(day));
        }

    viewDayOfWeek() {
    // I want the user to see the details of a specific day of the week 
        let index = prompt ('Enter the index of the day of the week you wish to view:');
        if (index > -1 && index < this.dayOfWeek.length) {
        /*validate input to avoid crashing and errors; if this was less than 0 or greater than length of day's array, 
        there would be an error*/
        this.selectedDayOfWeek = this.dayOfWeek[index]; 
        let description = 'Day of Week: ' + this.selectedDayOfWeek.day + '\n';
               
        //add the meal times to the days of the week with a for loop to iterate 
        for (let i = 0; i < this.selectedDayOfWeek.mealTime.length; i++) {
        description += i + ') ' + this.selectedDayOfWeek.mealTime[i].time + ' - ' + this.selectedDayOfWeek.mealTime[i].food + '\n';
        }

        let selection = this.showDayOfWeekMenuOptions(description);
        /* this is a sub menu of the main menu; will show the options for what to do when viewing options for creating meals*/ 
         switch (selection) {
            case '1':
             this.createMealTime();
             break; 
            case '2': 
             this.deleteMealTime();
        }
    }
}

    deleteDayOfWeek() { //user can delete the day of the week
        let index = prompt('Enter the index of the day of the week you wish to delete');
        if (index > -1 && index < this.dayOfWeek.length){
        this.dayOfWeek.splice(index, 1);   
        }   
}
    
    createMealTime() {  //user can add a meal time, and foods for the meal
        let time = prompt('Is this breakfast, lunch, dinner, or dessert?');
        let food = prompt('Enter all foods for this meal (note: symbols " - / ; , " are allowed for separating menu items');
        this.selectedDayOfWeek.mealTime.push(new MealTime(time, food));
}

    deleteMealTime() { //users can delete meal time
        let index = prompt('Enter the index of the meal time you wish to delete:');
        if (index > -1 && index < this.selectedDayOfWeek.mealTime.length) {
        this.selectedDayOfWeek.mealTime.splice(index, 1); //will remove one element at the position index}
        }
    }
}

let menu = new Menu(); //this allow the menu to run
menu.start();