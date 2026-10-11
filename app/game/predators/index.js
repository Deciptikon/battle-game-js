import { register } from "./registry.js";
import wolf from "./wolf/index.js";
import eagle from "./eagle/index.js";

[wolf, eagle].forEach(register);
