import { register } from "./registry.js";
import walnut from "./walnut/index.js";
import leadBullet from "./lead_bullet/index.js";
import flyWing from "./fly_wing/index.js";

[walnut, leadBullet, flyWing].forEach(register);
