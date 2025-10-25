"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let options = "G7xPz41mQvR9kT2bF8nLcW3hYdJ6sXaU";
    let optionsLength = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * optionsLength)];
    }
    return ans;
}
