// ==UserScript==
// @name         Github Heatmap Color
// @namespace    http://tampermonkey.net/
// @version      2024-10-31
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

    // Function to update colors
    function updateColors() {
        // Get all contribution squares using the correct class name
        const elements = document.getElementsByClassName("ContributionCalendar-day");

        Array.from(elements).forEach(element => {
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
