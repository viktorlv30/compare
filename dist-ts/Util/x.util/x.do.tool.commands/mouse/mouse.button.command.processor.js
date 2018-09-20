"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_x_do_tool_command_1 = require("../e.x.do.tool.command");
const guarded_command_processor_abstract_1 = require("../guarded.command.processor.abstract");
class AMouseButtonCommandProcessor extends guarded_command_processor_abstract_1.AGuardedCommandProcessor {
    _process(command) {
        const { code, window, clearModifiers, delay, repeat, button } = command;
        const result = [code];
        if (typeof window === 'number') {
            if (Number.isSafeInteger(window) && window > 0) {
                result.push('--window', window.toString(10));
            }
            else if (Number.isSafeInteger(window) && window < 0) {
                result.push('--window', '%' + (-window).toString(10));
            }
            else {
                result.push('--window', '%@');
            }
        }
        if (clearModifiers) {
            result.push('--clearmodifiers');
        }
        if (typeof delay === 'number' && Number.isSafeInteger(delay) && delay > 0) {
            result.push('--delay', delay.toString(10));
        }
        if (typeof repeat === 'number' && Number.isSafeInteger(repeat) && repeat > 0) {
            result.push('--repeat', repeat.toString(10));
        }
        result.push(button.toString(10));
        return result.join(' ');
    }
}
class ClickCommandProcessor extends AMouseButtonCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.CLICK;
    }
}
exports.ClickCommandProcessor = ClickCommandProcessor;
class MouseDownCommandProcessor extends AMouseButtonCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_DOWN;
    }
}
exports.MouseDownCommandProcessor = MouseDownCommandProcessor;
class MouseUpCommandProcessor extends AMouseButtonCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_UP;
    }
}
exports.MouseUpCommandProcessor = MouseUpCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2UuYnV0dG9uLmNvbW1hbmQucHJvY2Vzc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjLXRzL1V0aWwveC51dGlsL3guZG8udG9vbC5jb21tYW5kcy9tb3VzZS9tb3VzZS5idXR0b24uY29tbWFuZC5wcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRUFBeUQ7QUFDekQsOEZBQStFO0FBVy9FLGtDQUFxRixTQUFRLDZEQUFxQztJQUNwSCxRQUFRLENBQUMsT0FBb0I7UUFDbkMsTUFBTSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3RFLE1BQU0sTUFBTSxHQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMxRDtpQkFBTTtnQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNqQztTQUNKO1FBQ0QsSUFBSSxjQUFjLEVBQUU7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMxRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBTUQsMkJBQW1DLFNBQVEsNEJBQTJDO0lBQ3hFLE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUNBQWlCLENBQUMsS0FBSyxDQUFDO0lBQ3BELENBQUM7Q0FDSjtBQUpELHNEQUlDO0FBTUQsK0JBQXVDLFNBQVEsNEJBQStDO0lBQ2hGLE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUNBQWlCLENBQUMsVUFBVSxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQUpELDhEQUlDO0FBTUQsNkJBQXFDLFNBQVEsNEJBQTZDO0lBQzVFLE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUNBQWlCLENBQUMsUUFBUSxDQUFDO0lBQ3ZELENBQUM7Q0FDSjtBQUpELDBEQUlDIn0=