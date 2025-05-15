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
    this._displayNewMeal(meal);
    this._render();
  }
  removeMeal(id) {
    //.findIndex provera da li se idijevi slazu,ako se ne slazu vraca vrednist -1
    const index = this._meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      const meal = this._meals[index]; //izabran obrok za brisanje
      this._totalCalories -= meal.calories; //smanjujemo ukpne kalorija
      this._meals.splice(index, 1); //brisemo obrok iz niza
      this._render();
    }
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._displayNewWorkout(workout);
    this._render();
  }
  removeWorkout(id) {
    //.findIndex provera da li se idijevi slazu,ako se ne slazu vraca vrednist -1
    const index = this._workouts.findIndex((workout) => workout.id === id);
    if (index !== -1) {
      const workout = this._workouts[index]; //izabran obrok za brisanje
      this._totalCalories += workout.calories; //smanjujemo ukpne kalorija
      this._workouts.splice(index, 1); //brisemo obrok iz niza
      this._render();
    }
  }
  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    this._displayCaloriesLimit();
    this._render();
  }
  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
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
  _displayNewMeal(meal) {
    const mealsEl = document.querySelector("#meal-items");
    const mealEl = document.createElement("div");
    mealEl.classList.add("card", "my-2");
    mealEl.setAttribute("data-id", meal.id); //postavljamo data atribut,jer ce nam trebati kad brisemo obrko
    mealEl.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    mealsEl.appendChild(mealEl);
  }
  _displayNewWorkout(workout) {
    const workoutsEl = document.querySelector("#workout-items");
    const workoutEl = document.createElement("div");
    workoutEl.classList.add("card", "my-2");
    workoutEl.setAttribute("data-id", workout.id); //postavljamo data atribut,jer ce nam trebati kad brisemo obrko
    workoutEl.innerHTML = `
      
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${workout.name}</h4>
            <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
              ${workout.calories}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
    
    `;
    workoutsEl.appendChild(workoutEl);
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
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .querySelector("#workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
    document
      .querySelector("#meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));
    document
      .querySelector("#workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));
    document
      .querySelector("#filter-meals")
      .addEventListener("keyup", this._filterItems.bind(this, "meal"));
    document
      .querySelector("#filter-workouts")
      .addEventListener("keyup", this._filterItems.bind(this, "workout"));
    document
      .querySelector("#reset")
      .addEventListener("click", this._reset.bind(this));
    document
      .querySelector("#limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
  }
  _newItem(type, e) {
    e.preventDefault();
    const name = document.querySelector(`#${type}-name`);
    const calories = document.querySelector(`#${type}-calories`);

    //Validate input
    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields.");
      return;
    }
    if (type === "meal") {
      const meal = new Meal(name.value, +calories.value); //+ pretvara string u broj
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value); //+ pretvara string u broj
      this._tracker.addWorkout(workout);
    }
    name.value = "";
    calories.value = "";

    //Close collapse diolog
    const collapseItem = document.querySelector(`#collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }
  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      if (confirm("Are you sure?")) {
        const id = e.target.closest(".card").getAttribute("data-id");

        //Brisemo predmet na osnovu tipa(meal ili workout)
        type === "meal"
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        e.target.closest(".card").remove();
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  _reset() {
    this._tracker.reset();
    document.querySelector("#meal-items").innerHTML = "";
    document.querySelector("#workout-items").innerHTML = "";
    document.querySelector("#filter-meals").value = "";
    document.querySelector("#filter-workouts").value = "";
  }
  _setLimit(e) {
    e.preventDefault();
    const limit = document.querySelector("#limit");
    if (limit.value === "") {
      alert("Please add a limit");
      return;
    }
    this._tracker.setLimit(+limit.value);
    limit.value = "";
    //Close the modal
    const modalEl = document.querySelector("#limit-modal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}
const app = new App();
