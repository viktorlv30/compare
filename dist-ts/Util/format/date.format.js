"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonHelper_1 = require("../../Common/CommonHelper");
class DateFormat {
    setDate(date) {
        this.currentDateTime = date;
        const match = /^([A-Z][a-z]*)\s+([A-Z][a-z]*)\s+(\d{2})\s+(\d{4})\s+(\d{2}):(\d{2}):(\d{2})\s+GMT([+-]\d{4})(?:\s+[(]([A-Z]+)[)])$/.exec(date.toString());
        if (match) {
            this.dayOfWeek = match[1];
            this.month = match[2];
            this.timezoneOffset = match[8];
            this.timezone = match[9];
        }
        else {
            this.timezone = this.timezoneOffset = this.month = this.dayOfWeek = undefined;
        }
    }
    constructor() {
        this.setDate(new Date());
    }
    init(fullString) {
        this.setDate(new Date());
    }
    replace(match, replacer, offset, fullString) {
        switch (replacer) {
            case 'a':
                return this.dayOfWeek;
            case 'A':
                break;
            case 'w':
                return (this.currentDateTime.getDay() - 1).toString(10);
            case 'd':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getDate()).toString(10), 2, '0');
            case 'b':
                return this.month;
            case 'B':
                break;
            case 'm':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getMonth() + 1).toString(10), 2, '0');
            case 'y':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getFullYear() % 100).toString(10), 2, '0');
            case 'Y':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getFullYear()).toString(10), 4, '0');
            case 'H':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getHours()).toString(10), 2, '0');
            case 'I':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getHours() % 12).toString(10), 2, '0');
            case 'p':
                break;
            case 'M':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getMinutes()).toString(10), 2, '0');
            case 'S':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getSeconds()).toString(10), 2, '0');
            case 'f':
                return CommonHelper_1.CommonHelper.PadStart((this.currentDateTime.getMilliseconds() * 1000).toString(10), 6, '0');
            case 'z':
                return this.timezoneOffset;
            case 'Z':
                return this.timezone;
            case 'j':
            case 'U':
            case 'W':
                break;
            case 'c':
                return this.currentDateTime.toLocaleString();
            case 'x':
                return this.currentDateTime.toLocaleDateString();
            case 'X':
                return this.currentDateTime.toLocaleTimeString();
        }
        return undefined;
    }
}
exports.DateFormat = DateFormat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvVXRpbC9mb3JtYXQvZGF0ZS5mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFBdUQ7QUFHdkQ7SUFPVyxPQUFPLENBQW1CLElBQVU7UUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsTUFBTSxLQUFLLEdBQUcscUhBQXFILENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzFKLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQztJQUVEO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLElBQUksQ0FBbUIsVUFBa0I7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLE9BQU8sQ0FBbUIsS0FBYSxFQUFFLFFBQWdCLEVBQUUsTUFBYyxFQUFFLFVBQWtCO1FBQ2hHLFFBQVEsUUFBUSxFQUFFO1lBQ2xCLEtBQUssR0FBRztnQkFDSixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsS0FBSyxHQUFHO2dCQUNKLE1BQU07WUFDVixLQUFLLEdBQUc7Z0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVELEtBQUssR0FBRztnQkFDSixPQUFPLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEYsS0FBSyxHQUFHO2dCQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0QixLQUFLLEdBQUc7Z0JBQ0osTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixPQUFPLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdGLEtBQUssR0FBRztnQkFDSixPQUFPLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xHLEtBQUssR0FBRztnQkFDSixPQUFPLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUYsS0FBSyxHQUFHO2dCQUNKLE9BQU8sMkJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6RixLQUFLLEdBQUc7Z0JBQ0osT0FBTywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5RixLQUFLLEdBQUc7Z0JBQ0osTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixPQUFPLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0YsS0FBSyxHQUFHO2dCQUNKLE9BQU8sMkJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzRixLQUFLLEdBQUc7Z0JBQ0osT0FBTywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2RyxLQUFLLEdBQUc7Z0JBQ0osT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQy9CLEtBQUssR0FBRztnQkFDSixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekIsS0FBSyxHQUFHLENBQUM7WUFDVCxLQUFLLEdBQUcsQ0FBQztZQUNULEtBQUssR0FBRztnQkFDSixNQUFNO1lBQ1YsS0FBSyxHQUFHO2dCQUNKLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNqRCxLQUFLLEdBQUc7Z0JBQ0osT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDckQsS0FBSyxHQUFHO2dCQUNKLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3BEO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBN0VELGdDQTZFQyJ9