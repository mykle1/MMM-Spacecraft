# This module is under construction

## MMM-Spacecraft

* The spacecraft
* Agency
* Capability
* Maiden flight
* Crew capacity
* Pictures
* Description

## Examples

* Pictures without full description. Config option.

![](pix/1.JPG), ![](pix/2.JPG),

![](pix/4.JPG), ![](pix/3.JPG),

* Annotated .css file included for aligning and coloring text and image sizing.

## Installation

* `git clone https://github.com/mykle1/MMM-Spacecraft` into the `~/MagicMirror/modules` directory.

* No API key needed! No dependenices needed! No kidding!


## Config.js entry and options
```
{
  disabled: false,
module: 'MMM-Spacecraft',
position: 'top right',              // Best in left or right region
config: {
    showPix: "Yes",                 // No = No picture
    showDescription: "Yes",         // Yes = full description of mission under picture
    // words: 30,                      // amount of words you want in decscription
    useHeader: false,               // false if you don't want a header
    header: "We have liftoff!",     // Any text you want. useHeader must be true
    maxWidth: "300px",              //
    rotateInterval: 30 * 1000,      // 30 seconds
    }
},
```
