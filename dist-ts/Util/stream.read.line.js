"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadLine {
    static EmitLines(stream) {
        let backlog = '';
        stream.on('data', function (data) {
            backlog += data;
            let n = backlog.indexOf('\n');
            while (~n) {
                stream.emit('line', backlog.substring(0, n));
                backlog = backlog.substring(n + 1);
                n = backlog.indexOf('\n');
            }
        });
        stream.on('end', function () {
            if (backlog) {
                stream.emit('line', backlog);
            }
        });
    }
}
exports.ReadLine = ReadLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLnJlYWQubGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy10cy9VdGlsL3N0cmVhbS5yZWFkLmxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQTtJQUVXLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBNkI7UUFDakQsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBWTtZQUNwQyxPQUFPLElBQUksSUFBSSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUIsT0FBTyxDQUFDLENBQUMsRUFBRTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtZQUNiLElBQUksT0FBTyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFwQkQsNEJBb0JDIn0=