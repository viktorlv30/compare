"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guarded_command_processor_abstract_1 = require("./guarded.command.processor.abstract");
class ASimpleCommandProcessor extends guarded_command_processor_abstract_1.AGuardedCommandProcessor {
    _process(command) {
        return command.code;
    }
}
exports.ASimpleCommandProcessor = ASimpleCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLmNvbW1hbmQucHJvY2Vzc29yLmFic3RyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjLXRzL1V0aWwveC51dGlsL3guZG8udG9vbC5jb21tYW5kcy9zaW1wbGUuY29tbWFuZC5wcm9jZXNzb3IuYWJzdHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RkFBOEU7QUFHOUUsNkJBQXFHLFNBQVEsNkRBQXFDO0lBQ3BJLFFBQVEsQ0FBQyxPQUFvQjtRQUNuQyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBSkQsMERBSUMifQ==