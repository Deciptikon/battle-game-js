import { register } from "./registry.js";
import cat from "./cat/index.js";
import dog from "./dog/index.js";
import tit from "./tit/index.js";
import hedgehog from "./hedgehog/index.js";

[cat, dog, tit, hedgehog].forEach(register);
