"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_x_do_tool_command_1 = require("../e.x.do.tool.command");
const guarded_command_processor_abstract_1 = require("../guarded.command.processor.abstract");
const serialize_window_parameter_1 = require("../serialize.window.parameter");
class AKeyCommandProcessor extends guarded_command_processor_abstract_1.AGuardedCommandProcessor {
    _process(command) {
        const { code, window, clearModifiers, delay, strokes } = command;
        const result = [code];
        if (window !== undefined) {
            result.push('--window', serialize_window_parameter_1.serializeWindowParameter(window));
        }
        if (clearModifiers) {
            result.push('--clearmodifiers');
        }
        if (typeof delay === 'number' && Number.isSafeInteger(delay) && delay > 0) {
            result.push('--delay', delay.toString(10));
        }
        result.push(...strokes.map((stroke) => JSON.stringify(stroke)));
        return result.join(' ');
    }
}
class KeyCommandProcessor extends AKeyCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.KEY;
    }
}
exports.KeyCommandProcessor = KeyCommandProcessor;
class KeyDownCommandProcessor extends AKeyCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.KEY_DOWN;
    }
}
exports.KeyDownCommandProcessor = KeyDownCommandProcessor;
class KeyUpCommandProcessor extends AKeyCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.KEY_UP;
    }
}
exports.KeyUpCommandProcessor = KeyUpCommandProcessor;
class TypeCommandProcessor extends AKeyCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.TYPE;
    }
}
exports.TypeCommandProcessor = TypeCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMtdHMvVXRpbC94LnV0aWwveC5kby50b29sLmNvbW1hbmRzL2tleWJvYXJkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0VBQXlEO0FBQ3pELDhGQUErRTtBQUMvRSw4RUFBdUU7QUFVdkUsMEJBQTJFLFNBQVEsNkRBQXFDO0lBQzFHLFFBQVEsQ0FBQyxPQUEwQjtRQUN6QyxNQUFNLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxHQUFHLE9BQU8sQ0FBQztRQUMvRCxNQUFNLE1BQU0sR0FBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxxREFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxjQUFjLEVBQUU7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNKO0FBTUQseUJBQWlDLFNBQVEsb0JBQWlDO0lBQzVELE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUNBQWlCLENBQUMsR0FBRyxDQUFDO0lBQ2xELENBQUM7Q0FDSjtBQUpELGtEQUlDO0FBTUQsNkJBQXFDLFNBQVEsb0JBQXFDO0lBQ3BFLE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUNBQWlCLENBQUMsUUFBUSxDQUFDO0lBQ3ZELENBQUM7Q0FDSjtBQUpELDBEQUlDO0FBTUQsMkJBQW1DLFNBQVEsb0JBQW1DO0lBQ2hFLE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUNBQWlCLENBQUMsTUFBTSxDQUFDO0lBQ3JELENBQUM7Q0FDSjtBQUpELHNEQUlDO0FBTUQsMEJBQWtDLFNBQVEsb0JBQWtDO0lBQzlELE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssdUNBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQUpELG9EQUlDIn0=