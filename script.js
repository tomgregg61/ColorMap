// ==UserScript==
// @name         Github Heatmap Color
// @namespace    http://tampermonkey.net/
// @version      V1
// @description  Change GitHub contribution graph colours
// @author       You
// @match        https://github.com/*
// @icon         https://github.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    // Your colours go here
    const LEVEL4 = "#483FCD";
    const LEVEL3 = "#6860E2";
    const LEVEL2 = "#8B84F1";
    const LEVEL1 = "#B2ADFB";
    const LEVEL0 = "#161b22";

    function updateColors() {
        // get heat map squares
        const heatBlocks = document.getElementsByClassName("ContributionCalendar-day");

        // get activity blob
        const blobColor = document.getElementsByClassName("js-highlight-blob");

        Array.from(blobColor).forEach(element => {
                                // update fill
                element.setAttribute("stroke", LEVEL3);
        });

        // select all the halloween activity elements
        const halloweenActivityAxes = document.querySelectorAll('.halloween-activity-overview .activity-overview-axis');
        const halloweenActivityPoints = document.querySelectorAll('.halloween-activity-overview .activity-overview-point');

        // select the regular activity elements
        const activityAxes = document.querySelectorAll('.activity-overview-axis');
        const activityPoints = document.querySelectorAll('.activity-overview-point');

        // change stroke color
        const changeStrokeColor = (elements, color) => {
            elements.forEach(element => {
                element.style.stroke = LEVEL1;
            });
        };

        // call function to change color
        changeStrokeColor(halloweenActivityAxes, 'new-color-for-halloween-activity-axis');
        changeStrokeColor(halloweenActivityPoints, 'new-color-for-halloween-activity-point');
        changeStrokeColor(activityAxes, 'new-color-for-activity-axis');
        changeStrokeColor(activityPoints, 'new-color-for-activity-point');


        Array.from(heatBlocks).forEach(element => {
            // get contribution level
            const level = element.getAttribute("data-level");

            // check for contributions
            if (level !== null) {
                const count = parseInt(level);

                // setting newColor based on level of contributions
                let newColor;
                if (count >= 4) {
                    newColor = LEVEL4;
                } else if (count >= 3) {
                    newColor = LEVEL3;
                } else if (count >= 2) {
                    newColor = LEVEL2;
                } else if (count >= 1) {
                    newColor = LEVEL1;
                } else {
                    newColor = LEVEL0;
                }

                // update fill
                element.setAttribute("fill", newColor);

                // update bg-color
                element.style.backgroundColor = newColor;
            }
        });
    }

    // function to wait for graph to load
    function waitForGraph() {
        const graph = document.querySelector(".js-calendar-graph");
        if (graph) {
            updateColors();
        } else {
            setTimeout(waitForGraph, 500);
        }
    }

    // watch for graph
    waitForGraph();

    // mutationObserver to handle dynamic updates
    const observer = new MutationObserver(function(mutations) {
        updateColors();
    });

    // observe document with our parameters
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
