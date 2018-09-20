"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function serializeWindowParameter(window) {
    if (typeof window === 'number') {
        if (Number.isSafeInteger(window) && window > 0) {
            return window.toString(10);
        }
        else if (Number.isSafeInteger(window) && window < 0) {
            return '%' + (-window).toString(10);
        }
        else {
            return '%@';
        }
    }
    else {
        return;
    }
}
exports.serializeWindowParameter = serializeWindowParameter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLndpbmRvdy5wYXJhbWV0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMtdHMvVXRpbC94LnV0aWwveC5kby50b29sLmNvbW1hbmRzL3NlcmlhbGl6ZS53aW5kb3cucGFyYW1ldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0NBQXlDLE1BQTBCO0lBQy9ELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQzVCLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QjthQUFNLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtTQUFNO1FBQ0gsT0FBTztLQUNWO0FBQ0wsQ0FBQztBQVpELDREQVlDIn0=