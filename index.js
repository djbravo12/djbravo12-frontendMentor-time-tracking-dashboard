"use strict";

const dashboardInfo = document.querySelectorAll(".dashboard-info");
const timelineSelector = document.querySelectorAll(".timeline");

//id of trackers

const dailyTracker = document.querySelector("#daily-tracker");
const weeklyTracker = document.querySelector("#weekly-tracker");
const monthlyTracker = document.querySelector("#monthly-tracker");

// ids of current activity hours
const workCurrentHours = document.querySelector("#work-current-hours");
const playCurrentHours = document.querySelector("#play-current-hours");
const studyCurrentHours = document.querySelector("#study-current-hours");
const exerciseCurrentHours = document.querySelector("#exercise-current-hours");
const socialCurrentHours = document.querySelector("#social-current-hours");
const selfCareCurrentHours = document.querySelector("#selfcare-current-hours");

// ids of previous activity hours
const workPreviousHours = document.querySelector("#work-previous-hours");
const playPreviousHours = document.querySelector("#play-previous-hours");
const studyPreviousHours = document.querySelector("#study-previous-hours");
const exercisePreviousHours = document.querySelector(
  "#exercise-previous-hours"
);
const socialPreviousHours = document.querySelector("#social-previous-hours");
const selfCarePreviousHours = document.querySelector(
  "#selfcare-previous-hours"
);

const currentStatsArray = [
  workCurrentHours,
  playCurrentHours,
  studyCurrentHours,
  exerciseCurrentHours,
  socialCurrentHours,
  selfCareCurrentHours,
];

const previousStatsArray = [
  workPreviousHours,
  playPreviousHours,
  studyPreviousHours,
  exercisePreviousHours,
  socialPreviousHours,
  selfCarePreviousHours,
];

// fetching json data using fetch API
const reponse = await fetch("./data.json");
const data = await reponse.json();

const timelineChange = function (timelilne) {
  timelineSelector.forEach((e) => {
    e.innerText = timelilne;
  });
};

//updating innertext of the stats from the json data
const updatingStats = function (innerTextArray, timelinePeriod, currOrPrev) {
  innerTextArray.forEach((i, index) => {
    i.innerText = `${
      data[index]["timeframes"][`${timelinePeriod}`][`${currOrPrev}`]
    }hrs`;
  });
};


//function for change the stats

dashboardInfo.forEach((e) => {
  e.classList.add("color1");
  e.addEventListener("click", function () {
    switch (e.id) {
      case "daily-tracker":
        updatingStats(currentStatsArray, "daily", "current");
        updatingStats(previousStatsArray, "daily", "previous");
        timelineChange("Yesterday");
        this.classList.toggle("color2");
        monthlyTracker.classList.remove("color2");
        weeklyTracker.classList.remove("color2");

        break;
      case "weekly-tracker":
        updatingStats(currentStatsArray, "weekly", "current");
        updatingStats(previousStatsArray, "weekly", "previous");
        timelineChange("Last Week");
        this.classList.toggle("color2");
        dailyTracker.classList.remove("color2");
        monthlyTracker.classList.remove("color2");
        break;
      case "monthly-tracker":
        updatingStats(currentStatsArray, "monthly", "current");
        updatingStats(previousStatsArray, "monthly", "previous");
        timelineChange("Last Month");
        this.classList.toggle("color2");
        dailyTracker.classList.remove("color2");
        weeklyTracker.classList.remove("color2");
        break;
      default:
        updatingStats(currentStatsArray, "weekly", "current");
        updatingStats(previousStatsArray, "weekly", "previous");
        timelineChange("Last Week");
        dailyTracker.classList.remove("color2");
        monthlyTracker.classList.remove("color2");
        weeklyTracker.classList.remove("color2");
        break;
    }
  });
});
