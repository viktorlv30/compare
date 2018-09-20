"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_x_do_tool_command_1 = require("../e.x.do.tool.command");
const simple_window_command_abstract_1 = require("../simple.window.command.abstract");
var window_search_command_processor_1 = require("./window.search.command.processor");
exports.WindowSearchCommandProcessor = window_search_command_processor_1.WindowSearchCommandProcessor;
var window_move_command_processor_1 = require("./window.move.command.processor");
exports.WindowMoveCommandProcessor = window_move_command_processor_1.WindowMoveCommandProcessor;
var window_resize_command_processor_1 = require("./window.resize.command.processor");
exports.WindowResizeCommandProcessor = window_resize_command_processor_1.WindowResizeCommandProcessor;
class SyncAbleWindowCommandProcessor extends simple_window_command_abstract_1.ASimpleWindowCommandProcessor {
    _guard(command) {
        const { code } = command;
        return code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_FOCUS
            || code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_MAP
            || code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_MINIMIZE
            || code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_UNMAP
            || code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_ACTIVATE;
    }
}
exports.SyncAbleWindowCommandProcessor = SyncAbleWindowCommandProcessor;
class ImmediateWindowCommand extends simple_window_command_abstract_1.ASimpleWindowCommandProcessor {
    _guard(command) {
        const { code } = command;
        return code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_RAISE
            || code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_CLOSE
            || code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_KILL;
    }
}
exports.ImmediateWindowCommand = ImmediateWindowCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMtdHMvVXRpbC94LnV0aWwveC5kby50b29sLmNvbW1hbmRzL3dpbmRvdy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdFQUF5RDtBQUN6RCxzRkFBc0c7QUFHdEcscUZBQXFHO0FBQXZFLHlFQUFBLDRCQUE0QixDQUFBO0FBQzFELGlGQUErRjtBQUFuRSxxRUFBQSwwQkFBMEIsQ0FBQTtBQUN0RCxxRkFBcUc7QUFBdkUseUVBQUEsNEJBQTRCLENBQUE7QUFXMUQsb0NBQTRDLFNBQVEsOERBQXFEO0lBQzNGLE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxLQUFLLHVDQUFpQixDQUFDLFlBQVk7ZUFDdkMsSUFBSSxLQUFLLHVDQUFpQixDQUFDLFVBQVU7ZUFDckMsSUFBSSxLQUFLLHVDQUFpQixDQUFDLGVBQWU7ZUFDMUMsSUFBSSxLQUFLLHVDQUFpQixDQUFDLFlBQVk7ZUFDdkMsSUFBSSxLQUFLLHVDQUFpQixDQUFDLGVBQWUsQ0FDaEQ7SUFDTCxDQUFDO0NBQ0o7QUFWRCx3RUFVQztBQVNELDRCQUFvQyxTQUFRLDhEQUFzRDtJQUNwRixNQUFNLENBQUMsT0FBd0I7UUFDckMsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLE9BQU8sQ0FBQztRQUN2QixPQUFPLElBQUksS0FBSyx1Q0FBaUIsQ0FBQyxZQUFZO2VBQ3ZDLElBQUksS0FBSyx1Q0FBaUIsQ0FBQyxZQUFZO2VBQ3ZDLElBQUksS0FBSyx1Q0FBaUIsQ0FBQyxXQUFXLENBQ3hDO0lBQ1QsQ0FBQztDQUNKO0FBUkQsd0RBUUMifQ==