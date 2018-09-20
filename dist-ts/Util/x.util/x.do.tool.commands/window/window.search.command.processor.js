"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_x_do_tool_command_1 = require("../e.x.do.tool.command");
const guarded_command_processor_abstract_1 = require("../guarded.command.processor.abstract");
class WindowSearchCommandProcessor extends guarded_command_processor_abstract_1.AGuardedCommandProcessor {
    _guard(command) {
        return command.code === e_x_do_tool_command_1.X_DO_TOOL_COMMAND.SEARCH;
    }
    _process(command) {
        const result = [command.code, command.all ? '--all' : '--any'];
        const { windowClass, className, maxDepth, onlyVisible, pid, screen, name } = command;
        if (onlyVisible) {
            result.push('--onlyvisible');
        }
        if (typeof maxDepth === 'number' && Number.isSafeInteger(maxDepth) && maxDepth >= 0) {
            result.push('--maxdepth', maxDepth.toString(10));
        }
        if (typeof pid === 'number' && Number.isSafeInteger(pid) && pid >= 0) {
            result.push('--pid', pid.toString(10));
        }
        if (typeof screen === 'number' && Number.isSafeInteger(screen) && screen >= 0) {
            result.push('--screen', screen.toString(10));
        }
        if (name !== undefined) {
            result.push('--name', JSON.stringify(name.source));
        }
        if (windowClass !== undefined) {
            result.push('--class', JSON.stringify(windowClass.source));
        }
        if (className !== undefined) {
            result.push('--classname', JSON.stringify(className.source));
        }
        return result.join(' ');
    }
}
exports.WindowSearchCommandProcessor = WindowSearchCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93LnNlYXJjaC5jb21tYW5kLnByb2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy10cy9VdGlsL3gudXRpbC94LmRvLnRvb2wuY29tbWFuZHMvd2luZG93L3dpbmRvdy5zZWFyY2guY29tbWFuZC5wcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRUFBeUQ7QUFDekQsOEZBQStFO0FBZS9FLGtDQUEwQyxTQUFRLDZEQUE4QztJQUNsRixNQUFNLENBQUMsT0FBd0I7UUFDckMsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLHVDQUFpQixDQUFDLE1BQU0sQ0FBQztJQUNyRCxDQUFDO0lBRVMsUUFBUSxDQUFDLE9BQTZCO1FBQzVDLE1BQU0sTUFBTSxHQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsR0FBRyxPQUFPLENBQUM7UUFDbkYsSUFBSSxXQUFXLEVBQUU7WUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO1lBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDM0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDSjtBQS9CRCxvRUErQkMifQ==