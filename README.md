# MMM-BabyTime
Additional Module for MagicMirror²  https://github.com/alprogs/MMM-BabyTime

## Dependencies
An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)

## Installation
Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/alprogs/MMM-BabyTime
```

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
modules: [
	{
		module: 'MMM-BabyTime',
		position: 'bottom_left',
		config: {
			updateInterval: 0.5 // Minutes    
		},
	},
]
```
