"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_x_do_tool_command_1 = require("../e.x.do.tool.command");
const guarded_command_processor_abstract_1 = require("../guarded.command.processor.abstract");
const serialize_window_parameter_1 = require("../serialize.window.parameter");
class AMouseMoveCommandProcessor extends guarded_command_processor_abstract_1.AGuardedCommandProcessor {
    _guardBase(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_MOVE || command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_MOVE_RELATIVE;
    }
    _guard(command) {
        return this._guardBase(command) && this._guardDerived(command);
    }
    _process(command) {
        const { code, window, screen, polar, clearModifiers, sync } = command;
        const result = [code];
        if (window !== undefined) {
            result.push('--window', serialize_window_parameter_1.serializeWindowParameter(window));
        }
        if (typeof screen === 'number' && Number.isSafeInteger(screen) && screen >= 0) {
            result.push('--screen', screen.toString(10));
        }
        if (polar) {
            result.push('--polar');
        }
        if (clearModifiers) {
            result.push('--clearmodifiers');
        }
        if (sync) {
            result.push('--sync');
        }
        result.push('--', ...this._serializeDerived(command));
        return result.join(' ');
    }
}
class MouseMoveRectangularCommandProcessor extends AMouseMoveCommandProcessor {
    _guardDerived(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_MOVE && !command.polar;
    }
    _serializeDerived(command) {
        return [command.x.toString(10), command.y.toString(10)];
    }
}
exports.MouseMoveRectangularCommandProcessor = MouseMoveRectangularCommandProcessor;
class MouseMovePolarCommandProcessor extends AMouseMoveCommandProcessor {
    _guardDerived(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_MOVE && !!command.polar;
    }
    _serializeDerived(command) {
        return [command.angle.toString(10), command.distance.toString(10)];
    }
}
exports.MouseMovePolarCommandProcessor = MouseMovePolarCommandProcessor;
class MouseMoveRelativeRectangularCommandProcessor extends AMouseMoveCommandProcessor {
    _guardDerived(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_MOVE_RELATIVE && command.window === undefined && !command.polar;
    }
    _serializeDerived(command) {
        return [command.x.toString(10), command.y.toString(10)];
    }
}
exports.MouseMoveRelativeRectangularCommandProcessor = MouseMoveRelativeRectangularCommandProcessor;
class MouseMoveRelativePolarCommandProcessor extends AMouseMoveCommandProcessor {
    _guardDerived(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_MOVE_RELATIVE && command.window === undefined && !!command.polar;
    }
    _serializeDerived(command) {
        return [command.angle.toString(10), command.distance.toString(10)];
    }
}
exports.MouseMoveRelativePolarCommandProcessor = MouseMoveRelativePolarCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2UubW92ZS5jb21tYW5kLnByb2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy10cy9VdGlsL3gudXRpbC94LmRvLnRvb2wuY29tbWFuZHMvbW91c2UvbW91c2UubW92ZS5jb21tYW5kLnByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdFQUF5RDtBQUN6RCw4RkFBK0U7QUFDL0UsOEVBQXVFO0FBNkN2RSxnQ0FBaUYsU0FBUSw2REFBcUM7SUFDaEgsVUFBVSxDQUFDLE9BQXdCO1FBQ3pDLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyx1Q0FBaUIsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyx1Q0FBaUIsQ0FBQyxtQkFBbUIsQ0FBQztJQUNuSCxDQUFDO0lBSVMsTUFBTSxDQUFDLE9BQXdCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFJUyxRQUFRLENBQUMsT0FBb0I7UUFDbkMsTUFBTSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3BFLE1BQU0sTUFBTSxHQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLHFEQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFD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