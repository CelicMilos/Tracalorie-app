class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesProgress();
    this._displayCaloriesRemaining();
  }

  //Public methods/API //

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  //Private methods//

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.querySelector("#calories-total"); //El=element
    totalCaloriesEl.innerHTML = this._totalCalories;
  }
  _displayCaloriesLimit() {
    const totalCaloriesLimit = document.querySelector("#calories-limit");
    totalCaloriesLimit.innerHTML = this._calorieLimit;
  }
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector("#calories-consumed");
    const consumend = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    ); //zbir svih obroka(0-argument odakle total pocinje)
    caloriesConsumedEl.innerHTML = consumend;
  }
  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.querySelector("#calories-burned");
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    ); //zbir svih obroka(0-argument odakle total pocinje)
    caloriesBurnedEl.innerHTML = burned;
  }
  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.querySelector("#calories-remaining");
    const calorieProgressEl = document.querySelector("#calorie-progress");
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;

    if (remaining < 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light",
        "bg-danger",
        "bg-warning"
      );
      calorieProgressEl.classList.remove(
        "bg-success",
        "bg-danger",
        "bg-warning"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      calorieProgressEl.classList.add("bg-danger");
    } else if (remaining >= 0 && remaining <= 100) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light",
        "bg-danger",
        "bg-warning"
      );
      calorieProgressEl.classList.remove(
        "bg-success",
        "bg-danger",
        "bg-warning"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-warning"
      );
      calorieProgressEl.classList.add("bg-warning");
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light",
        "bg-danger",
        "bg-warning"
      );
      calorieProgressEl.classList.remove(
        "bg-success",
        "bg-danger",
        "bg-warning"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
      calorieProgressEl.classList.add("bg-success");
    }
  }
  _displayCaloriesProgress() {
    const calorieProgressEl = document.querySelector("#calorie-progress");
    const persentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(persentage, 100); //Math.min nam,od ponudjenih vrednosti,daje manju
    calorieProgressEl.style.width = `${width}%`;
  }

  //Vanila JS,za razliku do reacta ne renderuje nove podatke automatski
  //pa zato moramo da napavimo metode koji ce to raditi
  //za to sluzi render()
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    //Kad bi se povezali sa bazom(npr. MongoDB) .id bi davala sama baza ali posto je ovo
    // samo frontend app,onda moramo mi
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2); //Isti problem kao i gore
    this.name = name;
    this.calories = calories;
  }
}
class App {
  constructor() {
    this._tracker = new CalorieTracker();
    //Koristimo .bind da bi se .this odnosilo na App a ne na window objekat
    document
      .querySelector("#meal-form")
      .addEventListener("submit", this._newMeal.bind(this));
    document
      .querySelector("#workout-form")
      .addEventListener("submit", this._newWorkout.bind(this));
  }
  _newMeal(e) {
    e.preventDefault();
    const name = document.querySelector("#meal-name");
    const calories = document.querySelector("#meal-calories");

    //Validate input
    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields.");
      return;
    }
    const meal = new Meal(name.value, +calories.value); //+ pretvara string u broj
    this._tracker.addMeal(meal);
    name.value = "";
    calories.value = "";

    //Close collapse diolog
    const collapseMeal = document.querySelector("#collapse-meal");
    const bsCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true,
    });
  }

  _newWorkout(e) {
    e.preventDefault();
    const name = document.querySelector("#workout-name");
    const calories = document.querySelector("#workout-calories");

    //Validate input
    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields.");
      return;
    }
    const workout = new Workout(name.value, +calories.value); //+ pretvara string u broj
    this._tracker.addWorkout(workout);
    name.value = "";
    calories.value = "";

    //Close collapse diolog
    const collapseWorkout = document.querySelector("#collapse-workout");
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }
}
const app = new App();
