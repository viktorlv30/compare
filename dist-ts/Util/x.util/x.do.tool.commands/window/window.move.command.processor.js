"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_x_do_tool_command_1 = require("../e.x.do.tool.command");
const guarded_command_processor_abstract_1 = require("../guarded.command.processor.abstract");
const serialize_window_parameter_1 = require("../serialize.window.parameter");
class WindowMoveCommandProcessor extends guarded_command_processor_abstract_1.AGuardedCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_MOVE;
    }
    _process(command) {
        const result = [command.code];
        const { window, sync, relative, x, y } = command;
        if (relative) {
            result.push('--relative');
        }
        if (sync) {
            result.push('--sync');
        }
        if (window !== undefined) {
            result.push(serialize_window_parameter_1.serializeWindowParameter(window));
        }
        result.push(typeof x === 'number' && Number.isSafeInteger(x) && x >= 0 ? x.toString(10) : 'x', typeof y === 'number' && Number.isSafeInteger(y) && y >= 0 ? y.toString(10) : 'y');
        return result.join(' ');
    }
}
exports.WindowMoveCommandProcessor = WindowMoveCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93Lm1vdmUuY29tbWFuZC5wcm9jZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMtdHMvVXRpbC94LnV0aWwveC5kby50b29sLmNvbW1hbmRzL3dpbmRvdy93aW5kb3cubW92ZS5jb21tYW5kLnByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdFQUF5RDtBQUN6RCw4RkFBK0U7QUFDL0UsOEVBQXVFO0FBWXZFLGdDQUF3QyxTQUFRLDZEQUE0QztJQUM5RSxNQUFNLENBQUMsT0FBd0I7UUFDckMsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLHVDQUFpQixDQUFDLFdBQVcsQ0FBQztJQUMxRCxDQUFDO0lBRVMsUUFBUSxDQUFDLE9BQTJCO1FBQzFDLE1BQU0sTUFBTSxHQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEdBQUcsT0FBTyxDQUFDO1FBQy9DLElBQUksUUFBUSxFQUFFO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksSUFBSSxFQUFFO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QjtRQUNELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLHFEQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDakQ7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUNQLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFDakYsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUNwRixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDSjtBQXZCRCxnRUF1QkMifQ==