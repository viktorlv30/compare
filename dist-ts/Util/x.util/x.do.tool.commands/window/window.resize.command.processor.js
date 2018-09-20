"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_x_do_tool_command_1 = require("../e.x.do.tool.command");
const guarded_command_processor_abstract_1 = require("../guarded.command.processor.abstract");
const serialize_window_parameter_1 = require("../serialize.window.parameter");
class WindowResizeCommandProcessor extends guarded_command_processor_abstract_1.AGuardedCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_RESIZE;
    }
    _process(command) {
        const result = [command.code];
        const { window, sync, useHints, width, height } = command;
        if (useHints) {
            result.push('--usehints');
        }
        if (sync) {
            result.push('--sync');
        }
        if (window !== undefined) {
            result.push(serialize_window_parameter_1.serializeWindowParameter(window));
        }
        result.push(width >= 0 ? width.toFixed(10) : ((-width).toFixed(0) + '%'), height >= 0 ? height.toFixed(10) : ((-height).toFixed(0) + '%'));
        return result.join(' ');
    }
}
exports.WindowResizeCommandProcessor = WindowResizeCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LnJlc2l6ZS5jb21tYW5kLnByb2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy10cy9VdGlsL3gudXRpbC94LmRvLnRvb2wuY29tbWFuZHMvd2luZG93L3dpbmRvdy5yZXNpemUuY29tbWFuZC5wcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRUFBeUQ7QUFDekQsOEZBQStFO0FBQy9FLDhFQUF1RTtBQVl2RSxrQ0FBMEMsU0FBUSw2REFBOEM7SUFDbEYsTUFBTSxDQUFDLE9BQXdCO1FBQ3JDLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyx1Q0FBaUIsQ0FBQyxhQUFhLENBQUM7SUFDNUQsQ0FBQztJQUVTLFFBQVEsQ0FBQyxPQUE2QjtRQUM1QyxNQUFNLE1BQU0sR0FBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxNQUFNLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxHQUFHLE9BQU8sQ0FBQztRQUN4RCxJQUFJLFFBQVEsRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0I7UUFDRCxJQUFJLElBQUksRUFBRTtZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekI7UUFDRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxREFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FDUCxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQzVELE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FDbEUsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0o7QUF2QkQsb0VBdUJDIn0=