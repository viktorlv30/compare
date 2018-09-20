"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firefox_launcher_abstract_1 = require("./firefox.launcher.abstract");
const Env_1 = require("../../ServerRIK/Env");
if (require.main === module) {
    (new firefox_launcher_abstract_1.FirefoxLauncher(true, 'primary', 'http://127.0.0.1:3000/', Env_1.Env.DEBUG_FIREFOX_PORT_MAIN || NaN)).start();
    (new firefox_launcher_abstract_1.FirefoxLauncher(false, 'secondary', 'http://127.0.0.1:3000/secondary-screen', Env_1.Env.DEBUG_FIREFOX_PORT_SECONDARY || NaN)).start();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWZveC5wcmltYXJ5LmxhdW5jaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhdW5jaGVyL2ZpcmVmb3gucHJpbWFyeS5sYXVuY2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJFQUE4RDtBQUM5RCw2Q0FBMEM7QUFFMUMsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUN6QixDQUFDLElBQUksMkNBQWUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLFNBQUcsQ0FBQyx1QkFBdUIsSUFBSSxHQUFHLENBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQy9HLENBQUMsSUFBSSwyQ0FBZSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsd0NBQXdDLEVBQUUsU0FBRyxDQUFDLDRCQUE0QixJQUFJLEdBQUcsQ0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDMUkifQ==