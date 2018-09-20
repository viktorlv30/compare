"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_x_do_tool_command_1 = require("../e.x.do.tool.command");
const simple_command_processor_abstract_1 = require("../simple.command.processor.abstract");
class GetMouseLocationCommandProcessor extends simple_command_processor_abstract_1.ASimpleCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.GET_MOUSE_LOCATION;
    }
}
exports.GetMouseLocationCommandProcessor = GetMouseLocationCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Lm1vdXNlLmxvY2F0aW9uLmNvbW1hbmQucHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjLXRzL1V0aWwveC51dGlsL3guZG8udG9vbC5jb21tYW5kcy9tb3VzZS9nZXQubW91c2UubG9jYXRpb24uY29tbWFuZC5wcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRUFBeUQ7QUFDekQsNEZBQTZFO0FBTzdFLHNDQUE4QyxTQUFRLDJEQUFpRDtJQUN6RixNQUFNLENBQUMsT0FBd0I7UUFDckMsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLHVDQUFpQixDQUFDLGtCQUFrQixDQUFDO0lBQ2pFLENBQUM7Q0FDSjtBQUpELDRFQUlDIn0=