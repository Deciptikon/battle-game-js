import { register } from "./registry.js";
import forestClearing from "./forest_clearing/index.js";
import desertDunes from "./desert_dunes/index.js";
import frozenLake from "./frozen_lake/index.js";

[forestClearing, desertDunes, frozenLake].forEach(register);
