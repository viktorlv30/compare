"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guarded_command_processor_abstract_1 = require("./guarded.command.processor.abstract");
const serialize_window_parameter_1 = require("./serialize.window.parameter");
class ASimpleWindowCommandProcessor extends guarded_command_processor_abstract_1.AGuardedCommandProcessor {
    _process(command) {
        const { code, sync, window } = command;
        const result = [command.code];
        if (sync) {
            result.push('--sync');
        }
        if (window !== undefined) {
            result.push(serialize_window_parameter_1.serializeWindowParameter(window));
        }
        return result.join(' ');
    }
}
exports.ASimpleWindowCommandProcessor = ASimpleWindowCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLndpbmRvdy5jb21tYW5kLmFic3RyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjLXRzL1V0aWwveC51dGlsL3guZG8udG9vbC5jb21tYW5kcy9zaW1wbGUud2luZG93LmNvbW1hbmQuYWJzdHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RkFBOEU7QUFDOUUsNkVBQXNFO0FBUXRFLG1DQUFxSCxTQUFRLDZEQUE4QztJQUM3SixRQUFRLENBQUMsT0FBb0I7UUFDbkMsTUFBTSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksSUFBSSxFQUFFO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QjtRQUNELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLHFEQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7U0FDaEQ7UUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBWkQsc0VBWUMifQ==