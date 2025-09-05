import React, { useState } from "react";

export const Utils_auto_height = () => {
    const ah_rows = document.querySelectorAll('.auto_height');
    ah_rows.forEach( row => {
        let ah_items = row.querySelectorAll('.auto_height_item');
        let ah_items_split = row.querySelectorAll('.auto_height_item_split');
        let new_height = 0;
        // Reset
            ah_items.forEach(element => {
                element.style = `min-height: 0`;
            });
            ah_items_split.forEach(element => {
                element.style = `min-height: 0`;
            });
        // Get Height
            ah_items.forEach(element => {
                if( element.clientHeight >= new_height ){
                    new_height = element.clientHeight;
                };
            });
        // Set Height
            ah_items.forEach(element => {
                element.style = `min-height: ${new_height+5}px`;
            });
            ah_items_split.forEach(element => {
                element.style = `min-height: ${(new_height / 2) - 12}px`;
            });
    } );
};

export const Utils_sticky = () => {
    const handleSticky = () => {
        const element = document.querySelector('.sticky');
        const scrollPosition = window.scrollY;
        const shouldSticky = scrollPosition > (window.innerHeight - element.clientHeight) ? true:false;
    
        if(shouldSticky) {
            element.classList.add('is_sticky');
        } else {
            element.classList.remove('is_sticky');
        }
    };
    window.addEventListener("scroll", handleSticky);
};

export const Utils_scrollspy = (sections,updater,offset = 0) => {

    const handleScrollspy = () => {

        let scrollPosition = window.scrollY;
        for( let section of sections ) {
            let el = document.querySelector(`#${section}`);
            if(el){
                let position = el.getBoundingClientRect().top;
                if( scrollPosition >= ( el.getBoundingClientRect().top + scrollPosition - offset ) ) {
                    updater(section);
                };
            };
        };

    };

    window.addEventListener("scroll", handleScrollspy);

};

export function parseContentRecursively(input) {
    if (Array.isArray(input)) {
        return input.map(parseContentRecursively);
    }

    if (typeof input === 'object' && input !== null) {
        const result = {};
        for (const key in input) {
        if (key === 'content' && typeof input[key] === 'string') {
            try {
            result[key] = JSON.parse(input[key]);
            } catch {
            result[key] = input[key];
            }
        } else if (Array.isArray(input[key])) {
            result[key] = input[key].map(parseContentRecursively);
        } else if (typeof input[key] === 'object' && input[key] !== null) {
            result[key] = parseContentRecursively(input[key]);
        } else {
            result[key] = input[key];
        }
        }
        return result;
    }

    return input;
}

export function getInnerObject(obj) {
    const key = Object.keys(obj)[0];
    return obj[key];
}
  