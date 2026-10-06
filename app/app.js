import "./game/heroes/index.js";
import "./game/items/index.js";
import "./game/locations/index.js";

import { init, go, start } from "./game.js";
import { LoadingScene } from "./scenes/loading.js";
import { initState } from "./game/init.js";

const root = document.getElementById("app");
init(root);
initState();
go(new LoadingScene());
start();
