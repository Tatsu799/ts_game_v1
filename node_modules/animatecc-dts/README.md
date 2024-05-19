animatecc-dts
===

Commandline tool to generate TypeScript type definitions from Adobe Animate HTML5 export.

_Adobe Animate CC (or CS6 with the CreateJS Toolkit) allows
you to publish animated assets for use with the CreateJS suite of open source JS libraries to create rich,
interactive experiences for HTML5._

**Installation:**

    npm install -g animatecc-dts

**Usage:**

    animatecc-dts libs/*.js
    animatecc-dts libs/*.js --namespace egret
    animatecc-dts libs/*.js --namespace PIXI

Adobe Animate HTML5 available bridges:
---

- [CreateJS](https://github.com/CreateJS/EaselJS) (default)
- [PIXI](https://github.com/pixi/pixi.js) ([PixiFlash](https://github.com/CloudKidStudio/PixiFlash) or [pixi-animate](https://github.com/jiborobot/pixi-animate/))
- [egret-core](https://github.com/egret-labs/egret-core) ([egret-animate](https://github.com/endel/egret-animate))

Node.js API
------

Can be used directly in your node.js application through this API:

```javascript
var fs = require("fs");
var animatecc = require('animatecc-dts');

var animation_data = fs.readFileSync('animation-lib.js');
var data = animatecc.generate(animation_data);
fs.writeFile('animation-lib.d.ts', data);
```

License
---

MIT
