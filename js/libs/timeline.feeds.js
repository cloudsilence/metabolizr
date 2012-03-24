var TLConfigText = {};
TLConfigText['basic_am'] = "am";
TLConfigText['basic_pm'] = "pm";
TLConfigText['basic_Noon'] = "Noon";
TLConfigText['basic_By'] = "By";
TLConfigText['basic_weekDays'] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
TLConfigText['basic_shortWeekDays'] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
TLConfigText['basic_months'] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
TLConfigText['basic_shortMonths'] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
TLConfigText['basic_daySuffixes'] = ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th"];
TLConfigText['verifier_invaldiDate_message'] = "Not a valid date";
TLConfigText['category_defaultTitle'] = "Event";
TLConfigText['storyDefault_headline'] = "New story 1";
TLConfigText['storyDefault_intro'] = "Enter story info here";
TLConfigText['contentPanel_Read_more_text'] = "Find out more";
TLConfigText['contentPanel_Play_video'] = "Play video";
TLConfigText['contentPanel_Play_audio'] = "Play audio";
TLConfigText['contentPanel_View_on'] = "View on";
TLConfigText['contentPanel_Close_video'] = "Close video";
TLConfigText['contentPanel_Close_audio'] = "Close audio";
TLConfigText['flickrImageSelector_title'] = "Image finder";
TLConfigText['flickrImageSelector_intro'] = 'If you do not already have a Flickr account, we recommend that you sign up <a href="http://www.flickr.com/">here</a>. Flickr is the best way of sharing photos on the web and the best way of using your photos on Tiki-Toki.';
TLConfigText['flickrImageSelector_option1Title'] = "Find images by search term";
TLConfigText['flickrImageSelector_option1Text'] = "Choose this option if you want to use images created by others under the Creative Commons license."
TLConfigText['flickrImageSelector_option1Label'] = "Enter search term";
TLConfigText['flickrImageSelector_option1Message'] = "Images filtered by";
TLConfigText['flickrImageSelector_option2Title'] = "Find my images";
TLConfigText['flickrImageSelector_option2Text'] = "Choose this option to find images you have uploaded to Flickr.";
TLConfigText['flickrImageSelector_option2Label'] = "Enter Flickr username";
TLConfigText['flickrImageSelector_option2Message'] = "Images filtered by user";
TLConfigText['flickrImageSelector_Photo_credit'] = "Photo credit";
TLConfigText['flickrImageSelector_Expand'] = "Expand";
TLConfigText['signup_Enter_class_code'] = "Enter class code";
TLConfigText['signup_Username_exists'] = "Username already taken. Try another";
TLConfigText['signup_Email_taken'] = "Email already used. Try another";
TLConfigText['signup_Class_accounts_full'] = "Class accounts full. Speak to teacher";
TLConfigText['signup_Incorrect_class_code'] = "Incorrect class code";
TLConfigText['loginPopdown_incorrectLogin_message'] = "Incorrect login. Please try again";
TLConfigText['loginPopdown_Email_not_in_database'] = "Email not in database";
TLConfigText['groupEditLogin_logout_message'] = "You're already logged in. Log out first.";
TLConfigText['groupEditLogin_loginError_message'] = "Incorrect secret code. Please try again";
TLConfigText['marker_media_Enter_meda_source_here'] = "Enter media source here";
TLConfigText['marker_moreButton_text'] = "More"; (function($){
    var types = ['DOMMouseScroll', 'mousewheel'];
    $.event.special.mousewheel = 
    {
        setup : function(){
            if(this.addEventListener){
                for(var i = types.length; i;){
                    this.addEventListener(types[ -- i], handler, false);
                }
            }
            else{
                this.onmousewheel = handler;
            }
        },
        teardown : function(){
            if(this.removeEventListener){
                for(var i = types.length; i;){
                    this.removeEventListener(types[ -- i], handler, false);
                }
            }
            else{
                this.onmousewheel = null;
            }
        }
    };
    $.fn.extend({
        mousewheel : function(fn){
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
        unmousewheel : function(fn){
            return this.unbind("mousewheel", fn);
        }
    });
    function handler(event){
        var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
        if(event.wheelDelta){
            delta = event.wheelDelta / 120;
        }
        if(event.detail){
            delta = -event.detail / 3;
        }
        deltaY = delta;
        if(orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS){
            deltaY = 0;
            deltaX = -1 * delta;
        }
        if(orgEvent.wheelDeltaY !== undefined){
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if(orgEvent.wheelDeltaX !== undefined){
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }
        args.unshift(event, delta, deltaX, deltaY);
        return $.event.handle.apply(this, args);
    }
})(jQuery);

var AJKAjaxController = function(dataObj){
    self.loginController = "";
    return this;
};
AJKAjaxController.prototype = 
{
    init : function(){
        var self = this;
        return self;
    },
    request : function(dataObj){
        var self = this;
        var action = dataObj.action;
        var vars = dataObj.vars;
        var callback = dataObj.callback;
        var method = dataObj.method;
        var alwaysAllow = dataObj.alwaysAllow;
        if(method == "get" || alwaysAllow || self.loginController.user.loggedIn){
            if( ! vars.userId && self.loginController.user.loggedIn){
                vars.userId = self.loginController.user.id;
            }
            var rFunc = (method == "post") ? $.post : $.get;
            rFunc(action, vars, function(data){
                if((typeof data) != "object" && data == "verify-code-mismatch"){
                    AJKHelpers.deleteCookie({
                        name : self.loginController.userCookieName
                    });
                    location.reload(true);
                }
                else if((typeof data) == "object" && $(data).find("userNotValid").length > 0){
                    window.location.reload();
                }
                else if(callback){
                    callback(data);
                }
            });
        }
        else{}
    }
};
Date.CultureInfo = 
{
    name : "en-GB",
    englishName : "English (United Kingdom)",
    nativeName : "English (United Kingdom)",
    dayNames : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames : ["S", "M", "T", "W", "T", "F", "S"],
    monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbreviatedMonthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    amDesignator : "AM",
    pmDesignator : "PM",
    firstDayOfWeek : 1,
    twoDigitYearMax : 2029,
    dateElementOrder : "dmy",
    formatPatterns : 
    {
        shortDate : "dd/MM/yyyy",
        longDate : "dd MMMM yyyy",
        shortTime : "HH:mm",
        longTime : "HH:mm:ss",
        fullDateTime : "dd MMMM yyyy HH:mm:ss",
        sortableDateTime : "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime : "yyyy-MM-dd HH:mm:ssZ",
        rfc1123 : "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay : "dd MMMM",
        yearMonth : "MMMM yyyy"
    },
    regexPatterns : 
    {
        jan : /^jan(uary)?/i,
        feb : /^feb(ruary)?/i,
        mar : /^mar(ch)?/i,
        apr : /^apr(il)?/i,
        may : /^may/i,
        jun : /^jun(e)?/i,
        jul : /^jul(y)?/i,
        aug : /^aug(ust)?/i,
        sep : /^sep(t(ember)?)?/i,
        oct : /^oct(ober)?/i,
        nov : /^nov(ember)?/i,
        dec : /^dec(ember)?/i,
        sun : /^su(n(day)?)?/i,
        mon : /^mo(n(day)?)?/i,
        tue : /^tu(e(s(day)?)?)?/i,
        wed : /^we(d(nesday)?)?/i,
        thu : /^th(u(r(s(day)?)?)?)?/i,
        fri : /^fr(i(day)?)?/i,
        sat : /^sa(t(urday)?)?/i,
        future : /^next/i,
        past : /^last|past|prev(ious)?/i,
        add : /^(\+|aft(er)?|from|hence)/i,
        subtract : /^(\-|bef(ore)?|ago)/i,
        yesterday : /^yes(terday)?/i,
        today : /^t(od(ay)?)?/i,
        tomorrow : /^tom(orrow)?/i,
        now : /^n(ow)?/i,
        millisecond : /^ms|milli(second)?s?/i,
        second : /^sec(ond)?s?/i,
        minute : /^mn|min(ute)?s?/i,
        hour : /^h(our)?s?/i,
        week : /^w(eek)?s?/i,
        month : /^m(onth)?s?/i,
        day : /^d(ay)?s?/i,
        year : /^y(ear)?s?/i,
        shortMeridian : /^(a|p)/i,
        longMeridian : /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone : /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
        ordinalSuffix : /^\s*(st|nd|rd|th)/i,
        timeContext : /^\s*(\:|a(?!u|p)|p)/i
    },
    timezones : [{
        name : "UTC",
        offset : "-000"
    }, 
    {
        name : "GMT",
        offset : "-000"
    }, 
    {
        name : "EST",
        offset : "-0500"
    }, 
    {
        name : "EDT",
        offset : "-0400"
    }, 
    {
        name : "CST",
        offset : "-0600"
    }, 
    {
        name : "CDT",
        offset : "-0500"
    }, 
    {
        name : "MST",
        offset : "-0700"
    }, 
    {
        name : "MDT",
        offset : "-0600"
    }, 
    {
        name : "PST",
        offset : "-0800"
    }, 
    {
        name : "PDT",
        offset : "-0700"
    }]
}; (function(){
    var $D = Date, $P = $D.prototype, $C = $D.CultureInfo, p = function(s, l){
        if( ! l){
            l = 2;
        }
        return("000" + s).slice(l * -1);
    };
    $P.clearTime = function(){
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    };
    $P.setTimeToNow = function(){
        var n = new Date();
        this.setHours(n.getHours());
        this.setMinutes(n.getMinutes());
        this.setSeconds(n.getSeconds());
        this.setMilliseconds(n.getMilliseconds());
        return this;
    };
    $D.today = function(){
        return new Date().clearTime();
    };
    $D.compare = function(date1, date2){
        if(isNaN(date1) || isNaN(date2)){
            throw new Error(date1 + " - " + date2);
        }
        else if(date1 instanceof Date && date2 instanceof Date){
            return(date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
        }
        else{
            throw new TypeError(date1 + " - " + date2);
        }
    };
    $D.equals = function(date1, date2){
        return(date1.compareTo(date2) === 0);
    };
    $D.getDayNumberFromName = function(name){
        var n = $C.dayNames, m = $C.abbreviatedDayNames, o = $C.shortestDayNames, s = name.toLowerCase();
        for(var i = 0; i < n.length; i ++ ){
            if(n[i].toLowerCase() == s || m[i].toLowerCase() == s || o[i].toLowerCase() == s){
                return i;
            }
        }
        return - 1;
    };
    $D.getMonthNumberFromName = function(name){
        var n = $C.monthNames, m = $C.abbreviatedMonthNames, s = name.toLowerCase();
        for(var i = 0; i < n.length; i ++ ){
            if(n[i].toLowerCase() == s || m[i].toLowerCase() == s){
                return i;
            }
        }
        return - 1;
    };
    $D.isLeapYear = function(year){
        return((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };
    $D.getDaysInMonth = function(year, month){
        return[31, ($D.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };
    $D.getTimezoneAbbreviation = function(offset){
        var z = $C.timezones, p;
        for(var i = 0; i < z.length; i ++ ){
            if(z[i].offset === offset){
                return z[i].name;
            }
        }
        return null;
    };
    $D.getTimezoneOffset = function(name){
        var z = $C.timezones, p;
        for(var i = 0; i < z.length; i ++ ){
            if(z[i].name === name.toUpperCase()){
                return z[i].offset;
            }
        }
        return null;
    };
    $P.clone = function(){
        return new Date(this.getTime());
    };
    $P.compareTo = function(date){
        return Date.compare(this, date);
    };
    $P.equals = function(date){
        return Date.equals(this, date || new Date());
    };
    $P.between = function(start, end){
        return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
    };
    $P.isAfter = function(date){
        return this.compareTo(date || new Date()) === 1;
    };
    $P.isBefore = function(date){
        return(this.compareTo(date || new Date()) === -1);
    };
    $P.isToday = function(){
        return this.isSameDay(new Date());
    };
    $P.isSameDay = function(date){
        return this.clone().clearTime().equals(date.clone().clearTime());
    };
    $P.addMilliseconds = function(value){
        this.setMilliseconds(this.getMilliseconds() + value);
        return this;
    };
    $P.addSeconds = function(value){
        return this.addMilliseconds(value * 1000);
    };
    $P.addMinutes = function(value){
        return this.addMilliseconds(value * 60000);
    };
    $P.addHours = function(value){
        return this.addMilliseconds(value * 3600000);
    };
    $P.addDays = function(value){
        this.setDate(this.getDate() + value);
        return this;
    };
    $P.addWeeks = function(value){
        return this.addDays(value * 7);
    };
    $P.addMonths = function(value){
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));
        return this;
    };
    $P.addYears = function(value){
        return this.addMonths(value * 12);
    };
    $P.add = function(config){
        if(typeof config == "number"){
            this._orient = config;
            return this;
        }
        var x = config;
        if(x.milliseconds){
            this.addMilliseconds(x.milliseconds);
        }
        if(x.seconds){
            this.addSeconds(x.seconds);
        }
        if(x.minutes){
            this.addMinutes(x.minutes);
        }
        if(x.hours){
            this.addHours(x.hours);
        }
        if(x.weeks){
            this.addWeeks(x.weeks);
        }
        if(x.months){
            this.addMonths(x.months);
        }
        if(x.years){
            this.addYears(x.years);
        }
        if(x.days){
            this.addDays(x.days);
        }
        return this;
    };
    var $y,
    $m,
    $d;
    $P.getWeek = function(){
        var a,
        b,
        c,
        d,
        e,
        f,
        g,
        n,
        s,
        w;
        $y = ( ! $y) ? this.getFullYear() : $y;
        $m = ( ! $m) ? this.getMonth() + 1 : $m;
        $d = ( ! $d) ? this.getDate() : $d;
        if($m <= 2){
            a = $y - 1;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = 0;
            f = $d - 1 + (31 * ($m - 1));
        }
        else{
            a = $y;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = s + 1;
            f = $d + ((153 * ($m - 3) + 2) / 5) + 58 + s;
        }
        g = (a + b) % 7;
        d = (f + g - e) % 7;
        n = (f + 3 - d) | 0;
        if(n < 0){
            w = 53 - ((g - s) / 5 | 0);
        }
        else if(n > 364 + s){
            w = 1;
        }
        else{
            w = (n / 7 | 0) + 1;
        }
        $y = $m = $d = null;
        return w;
    };
    $P.getISOWeek = function(){
        $y = this.getUTCFullYear();
        $m = this.getUTCMonth() + 1;
        $d = this.getUTCDate();
        return p(this.getWeek());
    };
    $P.setWeek = function(n){
        return this.moveToDayOfWeek(1).addWeeks(n - this.getWeek());
    };
    $D._validate = function(n, min, max, name){
        if(typeof n == "undefined"){
            return false;
        }
        else if(typeof n != "number"){
            throw new TypeError(n + " is not a Number.");
        }
        else if(n < min || n > max){
            throw new RangeError(n + " is not a valid value for " + name + ".");
        }
        return true;
    };
    $D.validateMillisecond = function(value){
        return $D._validate(value, 0, 999, "millisecond");
    };
    $D.validateSecond = function(value){
        return $D._validate(value, 0, 59, "second");
    };
    $D.validateMinute = function(value){
        return $D._validate(value, 0, 59, "minute");
    };
    $D.validateHour = function(value){
        return $D._validate(value, 0, 23, "hour");
    };
    $D.validateDay = function(value, year, month){
        return $D._validate(value, 1, $D.getDaysInMonth(year, month), "day");
    };
    $D.validateMonth = function(value){
        return $D._validate(value, 0, 11, "month");
    };
    $D.validateYear = function(value){
        return $D._validate(value, -99999, 99999, "year");
    };
    $P.set = function(config){
        if($D.validateMillisecond(config.millisecond)){
            this.addMilliseconds(config.millisecond - this.getMilliseconds());
        }
        if($D.validateSecond(config.second)){
            this.addSeconds(config.second - this.getSeconds());
        }
        if($D.validateMinute(config.minute)){
            this.addMinutes(config.minute - this.getMinutes());
        }
        if($D.validateHour(config.hour)){
            this.addHours(config.hour - this.getHours());
        }
        if($D.validateMonth(config.month)){
            this.addMonths(config.month - this.getMonth());
        }
        if($D.validateYear(config.year)){
            this.addYears(config.year - this.getFullYear());
        }
        if($D.validateDay(config.day, this.getFullYear(), this.getMonth())){
            this.addDays(config.day - this.getDate());
        }
        if(config.timezone){
            this.setTimezone(config.timezone);
        }
        if(config.timezoneOffset){
            this.setTimezoneOffset(config.timezoneOffset);
        }
        if(config.week && $D._validate(config.week, 0, 53, "week")){
            this.setWeek(config.week);
        }
        return this;
    };
    $P.moveToFirstDayOfMonth = function(){
        return this.set({
            day : 1
        });
    };
    $P.moveToLastDayOfMonth = function(){
        return this.set({
            day : $D.getDaysInMonth(this.getFullYear(), this.getMonth())
        });
    };
    $P.moveToNthOccurrence = function(dayOfWeek, occurrence){
        var shift = 0;
        if(occurrence > 0){
            shift = occurrence - 1;
        }
        else if(occurrence === -1){
            this.moveToLastDayOfMonth();
            if(this.getDay() !== dayOfWeek){
                this.moveToDayOfWeek(dayOfWeek, -1);
            }
            return this;
        }
        return this.moveToFirstDayOfMonth().addDays( - 1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
    };
    $P.moveToDayOfWeek = function(dayOfWeek, orient){
        var diff = (dayOfWeek - this.getDay() + 7 * (orient || +1)) % 7;
        return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
    };
    $P.moveToMonth = function(month, orient){
        var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
        return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
    };
    $P.getOrdinalNumber = function(){
        return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
    };
    $P.getTimezone = function(){
        return $D.getTimezoneAbbreviation(this.getUTCOffset());
    };
    $P.setTimezoneOffset = function(offset){
        var here = this.getTimezoneOffset(), there = Number(offset) * -6 / 10;
        return this.addMinutes(there - here);
    };
    $P.setTimezone = function(offset){
        return this.setTimezoneOffset($D.getTimezoneOffset(offset));
    };
    $P.hasDaylightSavingTime = function(){
        return(Date.today().set({
            month : 0,
            day : 1
        }).getTimezoneOffset() !== Date.today().set({
            month : 6,
            day : 1
        }).getTimezoneOffset());
    };
    $P.isDaylightSavingTime = function(){
        return(this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({
            month : 6,
            day : 1
        }).getTimezoneOffset());
    };
    $P.getUTCOffset = function(){
        var n = this.getTimezoneOffset() * -10 / 6, r;
        if(n < 0){
            r = (n - 10000).toString();
            return r.charAt(0) + r.substr(2);
        }
        else{
            r = (n + 10000).toString();
            return "+" + r.substr(1);
        }
    };
    $P.getElapsed = function(date){
        return(date || new Date()) - this;
    };
    if( ! $P.toISOString){
        $P.toISOString = function(){
            function f(n){
                return n < 10 ? '0' + n : n;
            }
            return '"' + this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z"';
        };
    }
    $P._toString = $P.toString;
    $P.toString = function(format){
        var x = this;
        if(format && format.length == 1){
            var c = $C.formatPatterns;
            x.t = x.toString;
            switch(format){
                case "d" : 
                    return x.t(c.shortDate);
                case "D" : 
                    return x.t(c.longDate);
                case "F" : 
                    return x.t(c.fullDateTime);
                case "m" : 
                    return x.t(c.monthDay);
                case "r" : 
                    return x.t(c.rfc1123);
                case "s" : 
                    return x.t(c.sortableDateTime);
                case "t" : 
                    return x.t(c.shortTime);
                case "T" : 
                    return x.t(c.longTime);
                case "u" : 
                    return x.t(c.universalSortableDateTime);
                case "y" : 
                    return x.t(c.yearMonth);
            }
        }
        var ord = function(n){
            switch(n * 1){
                case 1 : 
                case 21 : 
                case 31 : 
                    return "st";
                case 2 : 
                case 22 : 
                    return "nd";
                case 3 : 
                case 23 : 
                    return "rd";
                default : 
                    return "th";
            }
        };
        return format ? format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, function(m){
            if(m.charAt(0) === "\\"){
                return m.replace("\\", "");
            }
            x.h = x.getHours;
            switch(m){
                case "hh" : 
                    return p(x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12));
                case "h" : 
                    return x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12);
                case "HH" : 
                    return p(x.h());
                case "H" : 
                    return x.h();
                case "mm" : 
                    return p(x.getMinutes());
                case "m" : 
                    return x.getMinutes();
                case "ss" : 
                    return p(x.getSeconds());
                case "s" : 
                    return x.getSeconds();
                case "yyyyy" : 
                    return p(x.getFullYear());
                case "yyyy" : 
                    return p(x.getFullYear(), 4);
                case "yy" : 
                    return p(x.getFullYear());
                case "dddd" : 
                    return $C.dayNames[x.getDay()];
                case "ddd" : 
                    return $C.abbreviatedDayNames[x.getDay()];
                case "dd" : 
                    return p(x.getDate());
                case "d" : 
                    return x.getDate();
                case "MMMM" : 
                    return $C.monthNames[x.getMonth()];
                case "MMM" : 
                    return $C.abbreviatedMonthNames[x.getMonth()];
                case "MM" : 
                    return p((x.getMonth() + 1));
                case "M" : 
                    return x.getMonth() + 1;
                case "t" : 
                    return x.h() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);
                case "tt" : 
                    return x.h() < 12 ? $C.amDesignator : $C.pmDesignator;
                case "S" : 
                    return ord(x.getDate());
                default : 
                    return m;
            }
        }) : this._toString();
    };
} ()); (function(){
    var $D = Date, $P = $D.prototype, $C = $D.CultureInfo, $N = Number.prototype;
    $P._orient = +1;
    $P._nth = null;
    $P._is = false;
    $P._same = false;
    $P._isSecond = false;
    $N._dateElement = "day";
    $P.next = function(){
        this._orient = +1;
        return this;
    };
    $D.next = function(){
        return $D.today().next();
    };
    $P.last = $P.prev = $P.previous = function(){
        this._orient = -1;
        return this;
    };
    $D.last = $D.prev = $D.previous = function(){
        return $D.today().last();
    };
    $P.is = function(){
        this._is = true;
        return this;
    };
    $P.same = function(){
        this._same = true;
        this._isSecond = false;
        return this;
    };
    $P.today = function(){
        return this.same().day();
    };
    $P.weekday = function(){
        if(this._is){
            this._is = false;
            return( ! this.is().sat() && !this.is().sun());
        }
        return false;
    };
    $P.at = function(time){
        return(typeof time === "string") ? $D.parse(this.toString("d") + " " + time) : this.set(time);
    };
    $N.fromNow = $N.after = function(date){
        var c = {};
        c[this._dateElement] = this;
        return(( ! date) ? new Date() : date.clone()).add(c);
    };
    $N.ago = $N.before = function(date){
        var c = {};
        c[this._dateElement] = this * -1;
        return(( ! date) ? new Date() : date.clone()).add(c);
    };
    var dx = ("sunday monday tuesday wednesday thursday friday saturday").split(/\s/), mx = ("january february march april may june july august september october november december").split(/\s/), px = ("Millisecond Second Minute Hour Day Week Month Year").split(/\s/), pxf = ("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/), nth = ("final first second third fourth fifth").split(/\s/), de;
    $P.toObject = function(){
        var o = {};
        for(var i = 0; i < px.length; i ++ ){
            o[px[i].toLowerCase()] = this["get" + pxf[i]]();
        }
        return o;
    };
    $D.fromObject = function(config){
        config.week = null;
        return Date.today().set(config);
    };
    var df = function(n){
        return function(){
            if(this._is){
                this._is = false;
                return this.getDay() == n;
            }
            if(this._nth !== null){
                if(this._isSecond){
                    this.addSeconds(this._orient * -1);
                }
                this._isSecond = false;
                var ntemp = this._nth;
                this._nth = null;
                var temp = this.clone().moveToLastDayOfMonth();
                this.moveToNthOccurrence(n, ntemp);
                if(this > temp){
                    throw new RangeError($D.getDayName(n) + " does not occur " + ntemp + " times in the month of " + $D.getMonthName(temp.getMonth()) + " " + temp.getFullYear() + ".");
                }
                return this;
            }
            return this.moveToDayOfWeek(n, this._orient);
        };
    };
    var sdf = function(n){
        return function(){
            var t = $D.today(), shift = n - t.getDay();
            if(n === 0 && $C.firstDayOfWeek === 1 && t.getDay() !== 0){
                shift = shift + 7;
            }
            return t.addDays(shift);
        };
    };
    for(var i = 0; i < dx.length; i ++ ){
        $D[dx[i].toUpperCase()] = $D[dx[i].toUpperCase().substring(0, 3)] = i;
        $D[dx[i]] = $D[dx[i].substring(0, 3)] = sdf(i);
        $P[dx[i]] = $P[dx[i].substring(0, 3)] = df(i);
    }
    var mf = function(n){
        return function(){
            if(this._is){
                this._is = false;
                return this.getMonth() === n;
            }
            return this.moveToMonth(n, this._orient);
        };
    };
    var smf = function(n){
        return function(){
            return $D.today().set({
                month : n,
                day : 1
            });
        };
    };
    for(var j = 0; j < mx.length; j ++ ){
        $D[mx[j].toUpperCase()] = $D[mx[j].toUpperCase().substring(0, 3)] = j;
        $D[mx[j]] = $D[mx[j].substring(0, 3)] = smf(j);
        $P[mx[j]] = $P[mx[j].substring(0, 3)] = mf(j);
    }
    var ef = function(j){
        return function(){
            if(this._isSecond){
                this._isSecond = false;
                return this;
            }
            if(this._same){
                this._same = this._is = false;
                var o1 = this.toObject(), o2 = (arguments[0] || new Date()).toObject(), v = "", k = j.toLowerCase();
                for(var m = (px.length - 1); m > -1; m -- ){
                    v = px[m].toLowerCase();
                    if(o1[v] != o2[v]){
                        return false;
                    }
                    if(k == v){
                        break;
                    }
                }
                return true;
            }
            if(j.substring(j.length - 1) != "s"){
                j += "s";
            }
            return this["add" + j](this._orient);
        };
    };
    var nf = function(n){
        return function(){
            this._dateElement = n;
            return this;
        };
    };
    for(var k = 0; k < px.length; k ++ ){
        de = px[k].toLowerCase();
        $P[de] = $P[de + "s"] = ef(px[k]);
        $N[de] = $N[de + "s"] = nf(de);
    }
    $P._ss = ef("Second");
    var nthfn = function(n){
        return function(dayOfWeek){
            if(this._same){
                return this._ss(arguments[0]);
            }
            if(dayOfWeek || dayOfWeek === 0){
                return this.moveToNthOccurrence(dayOfWeek, n);
            }
            this._nth = n;
            if(n === 2 && (dayOfWeek === undefined || dayOfWeek === null)){
                this._isSecond = true;
                return this.addSeconds(this._orient);
            }
            return this;
        };
    };
    for(var l = 0; l < nth.length; l ++ ){
        $P[nth[l]] = (l === 0) ? nthfn( - 1) : nthfn(l);
    }
} ()); (function(){
    Date.Parsing = 
    {
        Exception : function(s){
            this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
        }
    };
    var $P = Date.Parsing;
    var _ = $P.Operators = 
    {
        rtoken : function(r){
            return function(s){
                var mx = s.match(r);
                if(mx){
                    return([mx[0], s.substring(mx[0].length)]);
                }
                else{
                    throw new $P.Exception(s);
                }
            };
        },
        token : function(s){
            return function(s){
                return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
            };
        },
        stoken : function(s){
            return _.rtoken(new RegExp("^" + s));
        },
        until : function(p){
            return function(s){
                var qx = [], rx = null;
                while(s.length){
                    try{
                        rx = p.call(this, s);
                    }
                    catch(e){
                        qx.push(rx[0]);
                        s = rx[1];
                        continue;
                    }
                    break;
                }
                return[qx, s];
            };
        },
        many : function(p){
            return function(s){
                var rx = [], r = null;
                while(s.length){
                    try{
                        r = p.call(this, s);
                    }
                    catch(e){
                        return[rx, s];
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return[rx, s];
            };
        },
        optional : function(p){
            return function(s){
                var r = null;
                try{
                    r = p.call(this, s);
                }
                catch(e){
                    return[null, s];
                }
                return[r[0], r[1]];
            };
        },
        not : function(p){
            return function(s){
                try{
                    p.call(this, s);
                }
                catch(e){
                    return[null, s];
                }
                throw new $P.Exception(s);
            };
        },
        ignore : function(p){
            return p ? function(s){
                var r = null;
                r = p.call(this, s);
                return[null, r[1]];
            } : null;
        },
        product : function(){
            var px = arguments[0], qx = Array.prototype.slice.call(arguments, 1), rx = [];
            for(var i = 0; i < px.length; i ++ ){
                rx.push(_.each(px[i], qx));
            }
            return rx;
        },
        cache : function(rule){
            var cache = {}, r = null;
            return function(s){
                try{
                    r = cache[s] = (cache[s] || rule.call(this, s));
                }
                catch(e){
                    r = cache[s] = e;
                }
                if(r instanceof $P.Exception){
                    throw r;
                }
                else{
                    return r;
                }
            };
        },
        any : function(){
            var px = arguments;
            return function(s){
                var r = null;
                for(var i = 0; i < px.length; i ++ ){
                    if(px[i] == null){
                        continue;
                    }
                    try{
                        r = (px[i].call(this, s));
                    }
                    catch(e){
                        r = null;
                    }
                    if(r){
                        return r;
                    }
                }
                throw new $P.Exception(s);
            };
        },
        each : function(){
            var px = arguments;
            return function(s){
                var rx = [], r = null;
                for(var i = 0; i < px.length; i ++ ){
                    if(px[i] == null){
                        continue;
                    }
                    try{
                        r = (px[i].call(this, s));
                    }
                    catch(e){
                        throw new $P.Exception(s);
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return[rx, s];
            };
        },
        all : function(){
            var px = arguments, _ = _;
            return _.each(_.optional(px));
        },
        sequence : function(px, d, c){
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            if(px.length == 1){
                return px[0];
            }
            return function(s){
                var r = null, q = null;
                var rx = [];
                for(var i = 0; i < px.length; i ++ ){
                    try{
                        r = px[i].call(this, s);
                    }
                    catch(e){
                        break;
                    }
                    rx.push(r[0]);
                    try{
                        q = d.call(this, r[1]);
                    }
                    catch(ex){
                        q = null;
                        break;
                    }
                    s = q[1];
                }
                if( ! r){
                    throw new $P.Exception(s);
                }
                if(q){
                    throw new $P.Exception(q[1]);
                }
                if(c){
                    try{
                        r = c.call(this, r[1]);
                    }
                    catch(ey){
                        throw new $P.Exception(r[1]);
                    }
                }
                return[rx, (r ? r[1] : s)];
            };
        },
        between : function(d1, p, d2){
            d2 = d2 || d1;
            var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
            return function(s){
                var rx = _fn.call(this, s);
                return[[rx[0][0], r[0][2]], rx[1]];
            };
        },
        list : function(p, d, c){
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return(p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice( - 1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)));
        },
        set : function(px, d, c){
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return function(s){
                var r = null, p = null, q = null, rx = null, best = [[], s], last = false;
                for(var i = 0; i < px.length; i ++ ){
                    q = null;
                    p = null;
                    r = null;
                    last = (px.length == 1);
                    try{
                        r = px[i].call(this, s);
                    }
                    catch(e){
                        continue;
                    }
                    rx = [[r[0]], r[1]];
                    if(r[1].length > 0 && !last){
                        try{
                            q = d.call(this, r[1]);
                        }
                        catch(ex){
                            last = true;
                        }
                    }
                    else{
                        last = true;
                    }
                    if( ! last && q[1].length === 0){
                        last = true;
                    }
                    if( ! last){
                        var qx = [];
                        for(var j = 0; j < px.length; j ++ ){
                            if(i != j){
                                qx.push(px[j]);
                            }
                        }
                        p = _.set(qx, d).call(this, q[1]);
                        if(p[0].length > 0){
                            rx[0] = rx[0].concat(p[0]);
                            rx[1] = p[1];
                        }
                    }
                    if(rx[1].length < best[1].length){
                        best = rx;
                    }
                    if(best[1].length === 0){
                        break;
                    }
                }
                if(best[0].length === 0){
                    return best;
                }
                if(c){
                    try{
                        q = c.call(this, best[1]);
                    }
                    catch(ey){
                        throw new $P.Exception(best[1]);
                    }
                    best[1] = q[1];
                }
                return best;
            };
        },
        forward : function(gr, fname){
            return function(s){
                return gr[fname].call(this, s);
            };
        },
        replace : function(rule, repl){
            return function(s){
                var r = rule.call(this, s);
                return[repl, r[1]];
            };
        },
        process : function(rule, fn){
            return function(s){
                var r = rule.call(this, s);
                return[fn.call(this, r[0]), r[1]];
            };
        },
        min : function(min, rule){
            return function(s){
                var rx = rule.call(this, s);
                if(rx[0].length < min){
                    throw new $P.Exception(s);
                }
                return rx;
            };
        }
    };
    var _generator = function(op){
        return function(){
            var args = null, rx = [];
            if(arguments.length > 1){
                args = Array.prototype.slice.call(arguments);
            }
            else if(arguments[0]
                instanceof Array){
                args = arguments[0];
            }
            if(args){
                for(var i = 0, px = args.shift(); i < px.length; i ++ ){
                    args.unshift(px[i]);
                    rx.push(op.apply(null, args));
                    args.shift();
                    return rx;
                }
            }
            else{
                return op.apply(null, arguments);
            }
        };
    };
    var gx = "optional not ignore cache".split(/\s/);
    for(var i = 0; i < gx.length; i ++ ){
        _[gx[i]] = _generator(_[gx[i]]);
    }
    var _vector = function(op){
        return function(){
            if(arguments[0]
                instanceof Array){
                return op.apply(null, arguments[0]);
            }
            else{
                return op.apply(null, arguments);
            }
        };
    };
    var vx = "each any all".split(/\s/);
    for(var j = 0; j < vx.length; j ++ ){
        _[vx[j]] = _vector(_[vx[j]]);
    }
} ()); (function(){
    var $D = Date, $P = $D.prototype, $C = $D.CultureInfo;
    var flattenAndCompact = function(ax){
        var rx = [];
        for(var i = 0; i < ax.length; i ++ ){
            if(ax[i]
                instanceof Array){
                rx = rx.concat(flattenAndCompact(ax[i]));
            }
            else{
                if(ax[i]){
                    rx.push(ax[i]);
                }
            }
        }
        return rx;
    };
    $D.Grammar = {};
    $D.Translator = 
    {
        hour : function(s){
            return function(){
                this.hour = Number(s);
            };
        },
        minute : function(s){
            return function(){
                this.minute = Number(s);
            };
        },
        second : function(s){
            return function(){
                this.second = Number(s);
            };
        },
        meridian : function(s){
            return function(){
                this.meridian = s.slice(0, 1).toLowerCase();
            };
        },
        timezone : function(s){
            return function(){
                var n = s.replace(/[^\d\+\-]/g, "");
                if(n.length){
                    this.timezoneOffset = Number(n);
                }
                else{
                    this.timezone = s.toLowerCase();
                }
            };
        },
        day : function(x){
            var s = x[0];
            return function(){
                this.day = Number(s.match(/\d+/)[0]);
            };
        },
        month : function(s){
            return function(){
                this.month = (s.length == 3) ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s) / 4 : Number(s) - 1;
            };
        },
        year : function(s){
            return function(){
                var n = Number(s);
                this.year = ((s.length > 2) ? n : (n + (((n + 2000) < $C.twoDigitYearMax) ? 2000 : 1900)));
            };
        },
        rday : function(s){
            return function(){
                switch(s){
                    case "yesterday" : 
                        this.days = -1;
                        break;
                    case "tomorrow" : 
                        this.days = 1;
                        break;
                    case "today" : 
                        this.days = 0;
                        break;
                    case "now" : 
                        this.days = 0;
                        this.now = true;
                        break;
                }
            };
        },
        finishExact : function(x){
            x = (x instanceof Array) ? x : [x];
            for(var i = 0; i < x.length; i ++ ){
                if(x[i]){
                    x[i].call(this);
                }
            }
            var now = new Date();
            if((this.hour || this.minute) && ( ! this.month && !this.year && !this.day)){
                this.day = now.getDate();
            }
            if( ! this.year){
                this.year = now.getFullYear();
            }
            if( ! this.month && this.month !== 0){
                this.month = now.getMonth();
            }
            if( ! this.day){
                this.day = 1;
            }
            if( ! this.hour){
                this.hour = 0;
            }
            if( ! this.minute){
                this.minute = 0;
            }
            if( ! this.second){
                this.second = 0;
            }
            if(this.meridian && this.hour){
                if(this.meridian == "p" && this.hour < 12){
                    this.hour = this.hour + 12;
                }
                else if(this.meridian == "a" && this.hour == 12){
                    this.hour = 0;
                }
            }
            if(this.day > $D.getDaysInMonth(this.year, this.month)){
                throw new RangeError(this.day + " is not a valid value for days.");
            }
            var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
            if(this.timezone){
                r.set({
                    timezone : this.timezone
                });
            }
            else if(this.timezoneOffset){
                r.set({
                    timezoneOffset : this.timezoneOffset
                });
            }
            return r;
        },
        finish : function(x){
            x = (x instanceof Array) ? flattenAndCompact(x) : [x];
            if(x.length === 0){
                return null;
            }
            for(var i = 0; i < x.length; i ++ ){
                if(typeof x[i] == "function"){
                    x[i].call(this);
                }
            }
            var today = $D.today();
            if(this.now && !this.unit && !this.operator){
                return new Date();
            }
            else if(this.now){
                today = new Date();
            }
            var expression = !!(this.days && this.days !== null || this.orient || this.operator);
            var gap,
            mod,
            orient;
            orient = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
            if( ! this.now && "hour minute second".indexOf(this.unit) != -1){
                today.setTimeToNow();
            }
            if(this.month || this.month === 0){
                if("year day hour minute second".indexOf(this.unit) != -1){
                    this.value = this.month + 1;
                    this.month = null;
                    expression = true;
                }
            }
            if( ! expression && this.weekday && !this.day && !this.days){
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if( ! this.month){
                    this.month = temp.getMonth();
                }
                this.year = temp.getFullYear();
            }
            if(expression && this.weekday && this.unit != "month"){
                this.unit = "day";
                gap = ($D.getDayNumberFromName(this.weekday) - today.getDay());
                mod = 7;
                this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
            }
            if(this.month && this.unit == "day" && this.operator){
                this.value = (this.month + 1);
                this.month = null;
            }
            if(this.value != null && this.month != null && this.year != null){
                this.day = this.value * 1;
            }
            if(this.month && !this.day && this.value){
                today.set({
                    day : this.value * 1
                });
                if( ! expression){
                    this.day = this.value * 1;
                }
            }
            if( ! this.month && this.value && this.unit == "month" && !this.now){
                this.month = this.value;
                expression = true;
            }
            if(expression && (this.month || this.month === 0) && this.unit != "year"){
                this.unit = "month";
                gap = (this.month - today.getMonth());
                mod = 12;
                this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
                this.month = null;
            }
            if( ! this.unit){
                this.unit = "day";
            }
            if( ! this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null){
                this[this.unit + "s"] = this[this.unit + "s"] + ((this.operator == "add") ? 1 : -1) + (this.value || 0) * orient;
            }
            else if(this[this.unit + "s"] == null || this.operator != null){
                if( ! this.value){
                    this.value = 1;
                }
                this[this.unit + "s"] = this.value * orient;
            }
            if(this.meridian && this.hour){
                if(this.meridian == "p" && this.hour < 12){
                    this.hour = this.hour + 12;
                }
                else if(this.meridian == "a" && this.hour == 12){
                    this.hour = 0;
                }
            }
            if(this.weekday && !this.day && !this.days){
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if(temp.getMonth() !== today.getMonth()){
                    this.month = temp.getMonth();
                }
            }
            if((this.month || this.month === 0) && !this.day){
                this.day = 1;
            }
            if( ! this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month){
                return Date.today().setWeek(this.value);
            }
            if(expression && this.timezone && this.day && this.days){
                this.day = this.days;
            }
            return(expression) ? today.add(this) : today.set(this);
        }
    };
    var _ = $D.Parsing.Operators, g = $D.Grammar, t = $D.Translator, _fn;
    g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
    g.timePartDelimiter = _.stoken(":");
    g.whiteSpace = _.rtoken(/^\s*/);
    g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);
    var _C = {};
    g.ctoken = function(keys){
        var fn = _C[keys];
        if( ! fn){
            var c = $C.regexPatterns;
            var kx = keys.split(/\s+/), px = [];
            for(var i = 0; i < kx.length; i ++ ){
                px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
            }
            fn = _C[keys] = _.any.apply(null, px);
        }
        return fn;
    };
    g.ctoken2 = function(key){
        return _.rtoken($C.regexPatterns[key]);
    };
    g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
    g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
    g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
    g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
    g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
    g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
    g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
    g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
    g.hms = _.cache(_.sequence([g.H, g.m, g.s], g.timePartDelimiter));
    g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
    g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
    g.z = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zz = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
    g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
    g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
    g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function(s){
        return function(){
            this.weekday = s;
        };
    }));
    g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
    g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
    g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
    g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
    g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
    g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
    g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
    g.yyyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d\d)/), t.year));
    _fn = function(){
        return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
    };
    g.day = _fn(g.d, g.dd);
    g.month = _fn(g.M, g.MMM);
    g.year = _fn(g.yyyyy, g.yyyy, g.yy);
    g.orientation = _.process(g.ctoken("past future"), function(s){
        return function(){
            this.orient = s;
        };
    });
    g.operator = _.process(g.ctoken("add subtract"), function(s){
        return function(){
            this.operator = s;
        };
    });
    g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
    g.unit = _.process(g.ctoken("second minute hour day week month year"), function(s){
        return function(){
            this.unit = s;
        };
    });
    g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function(s){
        return function(){
            this.value = s.replace(/\D/g, "");
        };
    });
    g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);
    _fn = function(){
        return _.set(arguments, g.datePartDelimiter);
    };
    g.mdy = _fn(g.ddd, g.month, g.day, g.year);
    g.ymd = _fn(g.ddd, g.year, g.month, g.day);
    g.dmy = _fn(g.ddd, g.day, g.month, g.year);
    g.date = function(s){
        return((g[$C.dateElementOrder] || g.mdy).call(this, s));
    };
    g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function(fmt){
        if(g[fmt]){
            return g[fmt];
        }
        else{
            throw $D.Parsing.Exception(fmt);
        }
    }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function(s){
        return _.ignore(_.stoken(s));
    }))), function(rules){
        return _.process(_.each.apply(null, rules), t.finishExact);
    });
    var _F = {};
    var _get = function(f){
        return _F[f] = (_F[f] || g.format(f)[0]);
    };
    g.formats = function(fx){
        if(fx instanceof Array){
            var rx = [];
            for(var i = 0; i < fx.length; i ++ ){
                rx.push(_get(fx[i]));
            }
            return _.any.apply(null, rx);
        }
        else{
            return _get(fx);
        }
    };
    g._formats = g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-ddTHH:mm:ssz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mmZ", "yyyy-MM-ddTHH:mmz", "yyyy-MM-ddTHH:mm", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "MMddyyyy", "ddMMyyyy", "Mddyyyy", "ddMyyyy", "Mdyyyy", "dMyyyy", "yyyyy", "yyyy", "Mdyy", "dMyy", "d"]);
    g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);
    g.start = function(s){
        try{
            var r = g._formats.call({}, s);
            if(r[1].length === 0){
                return r;
            }
        }
        catch(e){}
        return g._start.call({}, s);
    };
    $D._parse = $D.parse;
    $D.parse = function(s){
        var r = null;
        if( ! s){
            return null;
        }
        if(s instanceof Date){
            return s;
        }
        try{
            r = $D.Grammar.start.call({}, s.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
        }
        catch(e){
            return null;
        }
        return((r[1].length === 0) ? r[0] : null);
    };
    $D.getParseFunction = function(fx){
        var fn = $D.Grammar.formats(fx);
        return function(s){
            var r = null;
            try{
                r = fn.call({}, s);
            }
            catch(e){
                return null;
            }
            return((r[1].length === 0) ? r[0] : null);
        };
    };
    $D.parseExact = function(s, fx){
        return $D.getParseFunction(fx)(s);
    };
} ());
try{
    document.execCommand("BackgroundImageCache", false, true);
}
catch(err){}
if( ! Array.prototype.indexOf){
    Array.prototype.indexOf = function(value, start) {
        var arrayLength = this.length;
        var start = (!start) ? 0 : start;
        for (var i = start; i < arrayLength; i++) {
            if (this[i] == value) {
                return i;
            }
        }
        return -1;
    };
}
Date.parseOrig = Date.parse;
Date.parse = function(input) {
    if (typeof input === "string") {
        input = input.replace("ad", "").replace("AD", "");
        if (input.toLowerCase().indexOf("bc") != -1) {
            input = input.replace("bc", "").replace("BC", "");
            var aDate = Date.parseOrig(input);
            if (!aDate) {
                return aDate;
            }
            aDate.setFullYear(-aDate.getFullYear());
            return aDate;
        }
        else {
            return Date.parseOrig(input);
        }
    }
    else {
        return Date.parseOrig(input);
    }
};
var AJKHelpers =
{
    getTimelineImageUrl: function (data) {
        var imageSrc = data.src;
        if (!imageSrc) {
            return data.emptyImage || "/assets/ui/empty-image.gif";
        }
        var emptyImage = (data.emptyImage) ? data.emptyImage : theTLSettings.flickrReplacementImage;
        if (imageSrc.indexOf("flickr.com") != -1) {
            var altPath = theTLMainController.timeline.altFlickrImageUrl;
            if (altPath && altPath.indexOf("http://") != -1) {
                var imageUrlSplit = imageSrc.split("index-2.html");
                var newImageSrc = altPath + imageUrlSplit[imageUrlSplit.length - 1];
                return newImageSrc;
            }
            else {
                return emptyImage;
            }
        }
        else {
            return imageSrc;
        }
    },
    isFlickrImage: function (data) {
        return (data.src.indexOf("flickr.com") != -1 && !theTLMainController.timeline.altFlickrImageUrl);
    },
    getFKRPhotoPageFromImageSrc: function (data) {
        var imgSplit = data.src.split("index-2.html");
        var lastBit = imgSplit[imgSplit.length - 1];
        if (lastBit) {
            fkrId = lastBit.split("_")[0];
            return "http://flickr.com/photo.gne?id=" + fkrId;
        }
        return "http://flickr.com";
    },
    convertNumToXDecimalPlaces: function (data) {
        var num = data.num;
        var cnvInt = data.x * 10;
        return parseInt(num * cnvInt) / cnvInt;
    },
    stringRepeat: function (data) {
        var aString = data.aString;
        var multiplier = data.multiplier;
        return new Array(multiplier + 1).join(aString);
    },
    convertHexColourToRGB: function (data) {
        var hexColour = data.hexColour;
        var cutHex = function (h) {
            return (h.charAt(0) == "#") ? h.substring(1, 7) : h
        }
        var hexToR = function (h) {
            return parseInt((cutHex(h)).substring(0, 2), 16)
        }
        var hexToG = function (h) {
            return parseInt((cutHex(h)).substring(2, 4), 16)
        }
        var hexToB = function (h) {
            return parseInt((cutHex(h)).substring(4, 6), 16)
        }
        return {
            r: hexToR(hexColour),
            g: hexToG(hexColour),
            b: hexToB(hexColour)
        };
    },
    generateAudioEmbedHTML: function (data) {
        var self = this;
        var audioSrc = data.src;
        var type = data.type;
        var audioId = data.audioId;
        if (type == "skoletube") {
            audioSrc = "http://www.skoletube.dk/flvideo/" + AJKHelpers.decode_base64(audioId) + ".mp3";
        }
        var insertHTML = AJKHelpers.generateJWPlayerVideoEmbedHTML({
            videoUrl: audioSrc
        });
        return insertHTML;
    },
    generateVideoEmbedHTML: function (data) {
        var self = this;
        var vidSrc = data.src;
        var type = data.type;
        type = (type) ? type : "file";
        var width = data.width;
        var height = data.height;
        var videoId = data.videoId;
        var colour = data.colour;
        var autoplay = (data.autoplay) ? 1 : 0;
        var insertHTML = "";
        switch (type) {
            case "vimeo":
                if ($.browser.msie && $.browser.version < 9) {
                    insertHTML += '<embed src="http://vimeo.com/moogaloop.swf?clip_id=' + videoId + '&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=' + colour + '&amp;fullscreen=1&amp;autoplay=' + autoplay + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="' + width + '" height="' + height + '">';
                    insertHTML += '</embed>';
                }
                else {
                    insertHTML += '<object width="' + width + '" height="' + height + '">';
                    insertHTML += '<param name="allowfullscreen" value="true" />';
                    insertHTML += '<param name="allowscriptaccess" value="always" />';
                    insertHTML += '<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=' + videoId + '&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=' + colour + '&amp;fullscreen=1&amp;autoplay=' + autoplay + '" />';
                    insertHTML += '<embed src="http://vimeo.com/moogaloop.swf?clip_id=' + videoId + '&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=' + colour + '&amp;fullscreen=1&amp;autoplay=' + autoplay + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="' + width + '" height="' + height + '">';
                    insertHTML += '</embed>';
                    insertHTML += '</object>';
                }
                break;
            case "youtube":
                if ($.browser.msie && $.browser.version < 9) {
                    insertHTML = '<embed src="http://www.youtube.com/v/' + videoId + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="' + width + '" height="' + height + '"></embed>';
                }
                else {
                    insertHTML = '<object width="' + width + '" height="' + height + '"><param name="movie" value="http://www.youtube.com/v/' + videoId + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + videoId + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="' + width + '" height="' + height + '"></embed></object>';
                }
                break;
            case "skoletube":
                var vidUrl = "http://www.skoletube.dk/flvideo/" + AJKHelpers.decode_base64(videoId) + ".mp4";
                insertHTML += AJKHelpers.generateJWPlayerVideoEmbedHTML({
                    videoUrl: vidUrl
                });
                break;
            case "file":
                insertHTML = AJKHelpers.generateJWPlayerVideoEmbedHTML({
                    videoUrl: vidSrc
                });
                break;
        }
        insertHTML = (insertHTML) ? insertHTML : '<div></div>';
        return insertHTML;
    },
    generateJWPlayerVideoEmbedHTML: function (data) {
        var vidUrl = data.videoUrl;
        var insertHTML = "";
        if ($.browser.msie && $.browser.version < 9) {
            insertHTML += '<embed  type="application/x-shockwave-flash" id="player2" name="player2" src="/assets/jw-player/player.swf"  width="100%"  height="100%" allowscriptaccess="always"  allowfullscreen="true" flashvars="file=' + vidUrl + '&autostart=true"  />';
        }
        else {
            insertHTML += '<object id="player" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" name="player" width="100%" height="100%">';
            insertHTML += '<param name="movie" value="swf/player.swf" />';
            insertHTML += '<param name="allowfullscreen" value="true" />';
            insertHTML += '<param name="allowscriptaccess" value="always" />';
            insertHTML += '<param name="flashvars" value="file=' + vidUrl + '&autostart=true" /> ';
            insertHTML += '<embed  type="application/x-shockwave-flash" id="player2" name="player2" src="/assets/jw-player/player.swf"  width="100%"  height="100%" allowscriptaccess="always"  allowfullscreen="true" flashvars="file=' + vidUrl + '&autostart=true"  />';
            insertHTML += '</object>';
        }
        return insertHTML;
    },
    getImageSize: function (data) {
        var imageUrl = data.imageUrl;
        var anImage = new Image();
        anImage.src = imageUrl;
        return {
            width: anImage.width,
            height: anImage.height
        }
    },
    sizeImageToFitInBoxOfSize: function (data) {
        var domImage = data.domImage;
        var boxSize = data.boxSize;
        var imageSize = data.imageSize;
        var returnScaledImageSize = data.returnScaledImageSize;
        var imageOffset = data.imageOffset;
        if (imageOffset && typeof imageOffset.x == "undefined") {
            var newImageOffset = {};
            var splitVal = imageOffset.split(",");
            newImageOffset.x = (splitVal[0]) ? parseFloat(splitVal[0]) : 0;
            newImageOffset.y = (splitVal[1]) ? parseFloat(splitVal[1]) : 0;
            imageOffset = newImageOffset;
        }
        if (!imageSize) {
            imageSize =
            {
                width: $(domImage).width(),
                height: $(domImage).height()
            }
        }
        var adjustedDimensions =
        {
            height: 0,
            width: 0,
            xOffset: 0,
            yOffset: 0
        }
        if (imageSize.width / imageSize.height > boxSize.width / boxSize.height) {
            adjustedDimensions.height = boxSize.height;
            adjustedDimensions.width = Math.round(adjustedDimensions.height / imageSize.height * imageSize.width);
            adjustedDimensions.xOffset = -Math.round((adjustedDimensions.width - boxSize.width) / 2);
            adjustedDimensions.yOffset = 0;
        }
        else {
            adjustedDimensions.width = boxSize.width;
            adjustedDimensions.height = Math.round(adjustedDimensions.width / imageSize.width * imageSize.height);
            adjustedDimensions.yOffset = -Math.round((adjustedDimensions.height - boxSize.height) / 2);
            adjustedDimensions.xOffset = 0;
        }
        var adjustedAgainDimensions =
        {
            width: adjustedDimensions.width,
            height: adjustedDimensions.height,
            yOffset: adjustedDimensions.yOffset,
            xOffset: adjustedDimensions.xOffset
        }
        if (imageOffset) {
            var possXOffset = adjustedAgainDimensions.width - boxSize.width;
            adjustedAgainDimensions.xOffset = (-possXOffset / 2 + possXOffset / 2 * -imageOffset.x);
            var possYOffset = adjustedAgainDimensions.height - boxSize.height;
            adjustedAgainDimensions.yOffset = (-possYOffset / 2 + possYOffset / 2 * -imageOffset.y);
        }
        $(domImage).css({
            width: adjustedAgainDimensions.width + "px",
            height: adjustedAgainDimensions.height + "px",
            left: adjustedAgainDimensions.xOffset + "px",
            top: adjustedAgainDimensions.yOffset + "px"
        });
        if (returnScaledImageSize) {
            return adjustedDimensions;
        }
    },
    customCreateClickableLinks: function (data) {
        var aString = data.aString;
        var extra = (data.extra) ? data.extra : "";
        var myRegex = /\[(.*)\]\((.*)\)/gim
        return aString.replace(myRegex, function () {
            return '<a ' + extra + ' href="' + RegExp.$2 + '">' + RegExp.$1.replace(/-/g, " ") + '</a>'
        });
    },
    createClickableLinks: function (data) {
        var aString = data.aString;
        return aString.replace(/(ftp|http|https|file):\/\/[\S]+(\b|$)/gim, '<a href="$&">$&</a>').replace(/([^\/])(www[\S]+(\b|$))/gim, '$1<a href="http://$2/">$2</a>');
    },
    getMousePos: function (data) {
        var event = data.event;
        xPos = yPos = false;
        if (document.layers) {
            xPos = event.x;
            yPos = event.y;
        }
        else if (document.all) {
            xPos = window.event.clientX;
            yPos = window.event.clientY;
        }
        else if (document.getElementById) {
            xPos = event.clientX;
            yPos = event.clientY;
        }
        return {
            x: xPos,
            y: yPos
        };
    },
    getSelfOrFirstParantOfClass: function (data) {
        var currentDomEl = data.domEl;
        var className = data.className;
        while (currentDomEl) {
            if ($(currentDomEl).hasClass(className)) {
                return currentDomEl;
            }
            currentDomEl = $(currentDomEl).parent()[0];
        }
        return false;
    },
    generateRandomDate: function (data) {
        var startDate = data.startDate;
        var endDate = data.endDate;
        var diff = endDate.getTime() - startDate.getTime();
        var randNum = Math.floor(Math.random() * diff);
        var retDate = new Date();
        retDate.setTime(startDate.getTime() + randNum);
        return retDate;
    },
    getEmptyDate: function () {
        var date = new Date();
        date.setTime(0);
        return date;
    },
    cloneDate: function (data) {
        var retDate = new Date();
        retDate.setTime(data.date.getTime());
        return retDate;
    },
    getFirstDayOfYearDateForDate: function (data) {
        var aDate = new Date(data.date.getTime());
        aDate.setDate(1);
        aDate.setMonth(0);
        aDate.setHours(0);
        aDate.setMinutes(0);
        aDate.setSeconds(0);
        aDate.setMilliseconds(0);
        return aDate;
    },
    getFirstDayOfMonthDateForDate: function (data) {
        var aDate = new Date(data.date.getTime());
        aDate.setDate(1);
        aDate.setHours(0);
        aDate.setMinutes(0);
        aDate.setSeconds(0);
        aDate.setMilliseconds(0);
        return aDate;
    },
    numberOfDaysInMonth: function (data) {
        var aDate = data.aDate;
        var year = aDate.getFullYear();
        var month = aDate.getMonth();
        var tmpStartDate = this.getEmptyDate();
        tmpStartDate.setFullYear(year);
        tmpStartDate.setMonth(month);
        tmpStartDate.setDate(1);
        var nextMonth = (month == 11) ? 0 : month + 1;
        var nextYear = (month == 11) ? year + 1 : year;
        var tmpEndDate = this.getEmptyDate();
        tmpEndDate.setFullYear(nextYear);
        tmpEndDate.setMonth(nextMonth);
        tmpEndDate.setDate(1);
        var numDays = Math.round((tmpEndDate.getTime() - tmpStartDate.getTime()) / this.dateOneDayInMS);
        return numDays;
    },
    waitForId: function (data) {
        var anObject = data.anObject;
        var callback = data.callback;
        var checkForId = function () {
            if (anObject.id == "awaiting") {
                var thisFunc = arguments.callee;
                setTimeout(function () {
                    thisFunc();
                }, 100);
            }
            else if (callback) {
                callback();
            }
        }
        checkForId();
    },
    cloneObj: function (data) {
        var obj = data.obj
        if (obj == null || typeof (obj) != 'object') {
            return obj;
        }
        var temp = new obj.constructor();
        for (var key in obj) {
            temp[key] = this.cloneObj({
                obj: obj[key]
            });
        }
        return temp;
    },
    jiggleDomEl: function (data) {
        var domEl = data.domEl;
        var displacementFactor = data.displacementFactor;
        var leftOffset = ($(domEl).css("left") && $(domEl).css("left") != "auto") ? parseInt($(domEl).css("left")) : 0;
        var position = $(domEl).css("position");
        if (position != "absolute") {
            $(domEl).css({
                position: "relative"
            });
        }
        var numRadians = 16;
        var steps = 25;
        for (var counter = 0; counter <= numRadians; counter += 0.2) {
            (function () {
                var lOffset = leftOffset + Math.cos(counter) * displacementFactor;
                var delay = parseInt(counter * steps);
                setTimeout(function () {
                    $(domEl).css({
                        left: lOffset
                    });
                    if (Math.abs(delay - (numRadians * steps)) < 5) {
                        $(domEl).css({
                            position: position,
                            left: leftOffset
                        });
                    }
                }, delay);
            } ());
        }
    },
    flashDomEl: function (data) {
        var domEl = data.domEl;
        var numRadians = (data.numRadians) ? data.numRadians : 12;
        var steps = 50;
        for (var counter = 0; counter <= numRadians; counter += 0.2) {
            (function () {
                var opacity = Math.cos(counter);
                var delay = parseInt(counter * steps);
                setTimeout(function () {
                    $(domEl).css({
                        opacity: 0.3 + 0.7 * opacity
                    });
                    if (Math.abs(delay - (numRadians * steps)) < 5) {
                        $(domEl).css({
                            opacity: 1
                        });
                    }
                }, delay);
            } ());
        }
    },
    isEmail: function (data) {
        var self = this;
        var aString = data.aString;
        return aString.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    },
    cancelSelectionOnDomEl: function (data) {
        var domEl = data.domEl;
        domEl.onselectstart = function () {
            return false;
        };
        domEl.unselectable = "on";
        domEl.style.MozUserSelect = "none";
    },
    getCoordsOfDomEl: function (data) {
        var domEl = data.domEl;
        var xPos = yPos = 0;
        if (domEl.offsetParent) {
            xPos = domEl.offsetLeft;
            yPos = domEl.offsetTop;
            while (domEl = domEl.offsetParent) {
                xPos += domEl.offsetLeft;
                yPos += domEl.offsetTop;
            }
        }
        return {
            x: xPos,
            y: yPos
        };
    },
    get4CoordsOfDomEl: function (data) {
        var domEl = data.domEl;
        var coords = this.getCoordsOfDomEl(data);
        coords.x2 = coords.x + $(domEl).width();
        coords.y2 = coords.y + $(domEl).height();
        return coords;
    },
    calculateDomElHeight: function (data) {
        var self;
        var domEl = data.domEl;
        var height = $(domEl).height()
        height += parseInt($(domEl).css("marginTop"));
        height + parseInt($(domEl).css("marginBottom"));
        return height;
    },
    getNowDate: function () {
        return new Date();
    },
    trimArray: function (data) {
        var anArray = data.anArray;
        var limit = (anArray.length < data.limit) ? anArray.length : data.limit;
        var counter = 0;
        var retArray = new Array();
        while (counter < limit) {
            retArray.push(anArray[counter++]);
        }
        return retArray;
    },
    dateFromMySQLDate: function (data) {
        var dateString = data.dateString;
        if (!dateString || dateString == "undefined") {
            return false;
        }
        var isBC = (dateString.indexOf("BC") != -1);
        dateString = dateString.replace(" BC", "").replace("BC", "")
        var dateAllArray = dateString.split(" ");
        var dateArray = dateAllArray[0].split("-");
        var timeArray = dateAllArray[1].split(":");
        var date = this.getEmptyDate();
        date.setDate(parseInt(dateArray[2], 10));
        date.setMonth(parseInt(dateArray[1], 10) - 1);
        if (isBC) {
            date.setFullYear(-parseInt(dateArray[0], 10));
        }
        else {
            date.setFullYear(parseInt(dateArray[0], 10));
        }
        date.setHours(parseInt(timeArray[0], 10));
        date.setMinutes(parseInt(timeArray[1], 10));
        date.setSeconds(parseInt(timeArray[2], 10));
        return date;
    },
    dateWeekDayArray: TLConfigText['basic_weekDays'],
    dateWeekDayShortArray: TLConfigText['basic_shortWeekDays'],
    dateMonthsArray: TLConfigText['basic_months'],
    dateMonthsShortArray: TLConfigText['basic_shortMonths'],
    dateDaySuffixArray: TLConfigText['basic_daySuffixes'],
    dateOneHourInMS: 1000 * 60 * 60,
    dateOneDayInMS: 1000 * 60 * 60 * 24,
    dateOneYearInMS: 1000 * 60 * 60 * 24 * 365.2425,
    baseLangDateWeekDayArray: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    baseLangDateWeekDayShortArray: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    baseLangDateMonthsArray: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    baseLangDateMonthsShortArray: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    baseLangDateDaySuffixArray: ["st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th"],
    prettyDateFromMySQLDate: function (data) {
        var jsDate = this.dateFromMySQLDate({
            dateString: data.dateString
        });
        return this.prettyDateFromDate({
            date: jsDate
        });
    },
    formatDate: function (data) {
        var date = data.date;
        var formatString = data.formatString;
        var prefix = (data.language && data.language == "base") ? "baseLangDate" : "date";
        formatString = formatString.replace(/Summer/, "SuXXer");
        formatString = formatString.replace(/summer/, "suXXer");
        formatString = formatString.replace(/YYYY/g, AJKHelpers.formatFullYearForDate({
            date: date
        }));
        formatString = formatString.replace(/MMMM/g, this[prefix + "MonthsArray"][date.getMonth()]);
        formatString = formatString.replace(/MMM/g, this[prefix + "MonthsShortArray"][date.getMonth()]);
        formatString = formatString.replace(/MM/g, this.doubleDigitNum({
            num: date.getMonth() + 1
        }));
        formatString = formatString.replace(/DD/g, this.doubleDigitNum({
            num: date.getDate()
        }));
        formatString = formatString.replace(/dd/g, date.getDate());
        formatString = formatString.replace(/nn/g, this[prefix + "DaySuffixArray"][date.getDate() - 1]);
        formatString = formatString.replace(/HH/g, this.doubleDigitNum({
            num: date.getHours()
        }));
        formatString = formatString.replace(/mm/g, this.doubleDigitNum({
            num: date.getMinutes()
        }));
        formatString = formatString.replace(/ss/g, this.doubleDigitNum({
            num: date.getSeconds()
        }));
        formatString = formatString.replace(/WKD/g, this[prefix + "WeekDayArray"][date.getDay()]);
        formatString = formatString.replace(/wkd/g, this[prefix + "WeekDayShortArray"][date.getDay()]);
        formatString = formatString.replace(/SuXXer/, "Summer");
        formatString = formatString.replace(/suXXer/, "summer");
        return formatString;
    },
    formatFullYearForDate: function (data) {
        var date = data.date;
        var yearString = AJKHelpers.quadrupleDigitNum({
            num: date.getFullYear()
        });
        if (date.getFullYear() < 0) {
            yearString += " BC";
        }
        return yearString;
    },
    prettyDateFromDate: function (data) {
        var jsDate = data.date;
        var smallDate = data.smallDate;
        var fullMonth = data.fullMonth;
        var monthStringArray = (fullMonth) ? this.dateMonthsArray : this.dateMonthsShortArray;
        var x = jsDate.getYear();
        var y = x % 100;
        y += (y < 38) ? 2000 : 1900;
        var year = y;
        if (smallDate) {
            return jsDate.getDate() + "/" + (jsDate.getMonth() + 1) + "/" + year.toString().substring(2, 4);
        }
        else {
            return jsDate.getDate() + this.dateDaySuffixArray[jsDate.getDate() - 1] + " " + monthStringArray[jsDate.getMonth()] + " " + year;
        }
    },
    prettyTimeFromDate: function (data) {
        var jsDate = data.date;
        var amOrPm = (jsDate.getHours() > 11) ? TLConfigText['basic_pm'] : TLConfigText['basic_am'];
        var hour = jsDate.getHours() % 12;
        hour = (hour == 0) ? 12 : hour;
        var minutes = jsDate.getMinutes();
        return hour + ":" + this.doubleDigitNum({
            num: minutes
        }) + amOrPm;
    },
    prettyTimeFromMySQLDate: function (data) {
        var jsDate = this.dateFromMySQLDate({
            dateString: data.dateString
        });
        return this.prettyTimeFromDate({
            date: jsDate
        });
    },
    doubleDigitNum: function (data) {
        var num = Math.abs(parseInt(data.num));
        if (num == 0) {
            return "00";
        }
        else if (num < 10) {
            return "0" + num;
        }
        else {
            return num;
        }
    },
    quadrupleDigitNum: function (data) {
        var num = Math.abs(parseInt(data.num));
        if (num == 0) {
            return "0000";
        }
        else if (num < 10) {
            return "000" + num;
        }
        else if (num < 100) {
            return "00" + num;
        }
        else if (num < 1000) {
            return "0" + num;
        }
        else {
            return num;
        }
    },
    deleteCookie: function (data) {
        var name = data.name;
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    },
    setCookie: function (data) {
        var name = data.name;
        var value = data.value;
        var expires = data.expires;
        var path = (data.path) ? data.path : "/";
        var domain = data.domain;
        var secure = data.secure;
        var today = new Date();
        today.setTime(today.getTime());
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));
        document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "");
    },
    getCookie: function (data) {
        var name = data.name;
        var start = document.cookie.indexOf(name + "=");
        var len = start + name.length + 1;
        if ((!start) && (name != document.cookie.substring(0, name.length))) {
            return null;
        }
        if (start == -1) {
            return null;
        }
        var end = document.cookie.indexOf(";", len);
        if (end == -1) {
            end = document.cookie.length;
        }
        return unescape(document.cookie.substring(len, end));
    },
    removeItemFromArray: function (data) {
        var item = data.item;
        var anArray = data.anArray;
        var itemIndex = anArray.indexOf(item);
        while (itemIndex != -1) {
            anArray.splice(itemIndex, 1);
            itemIndex = anArray.indexOf(item);
        }
        return anArray;
    },
    isItemInArray: function (data) {
        var item = data.item;
        var anArray = data.anArray;
        for (var counter = 0; counter < anArray.length; counter++) {
            if (anArray[counter] == item) {
                return true;
            }
        }
        return false;
    },
    cloneArray: function (data) {
        var anArray = data.anArray;
        var returnArray = new Array();
        for (var counter = 0; counter < anArray.length; counter++) {
            returnArray.push(anArray[counter]);
        }
        return returnArray;
    },
    scrollbarWidth: function () {
        document.body.style.overflow = 'hidden';
        var width = document.body.clientWidth;
        document.body.style.overflow = 'scroll';
        width -= document.body.clientWidth;
        if (!width)
            width = document.body.offsetWidth - document.body.clientWidth;
        document.body.style.overflow = '';
        return width;
    },
    decode_base64: function (s) {
        var e = {}, i,
        k,
        v = [], r = "", w = String.fromCharCode;
        var n = [[65, 91], [97, 123], [48, 58], [47, 48], [43, 44]];
        for (z in n) {
            for (i = n[z][0]; i < n[z][1]; i++) {
                v.push(w(i));
            }
        }
        for (i = 0; i < 64; i++) {
            e[v[i]] = i;
        }
        for (i = 0; i < s.length; i += 72) {
            var b = 0, c,
            x,
            l = 0, o = s.substring(i, i + 72);
            for (x = 0; x < o.length; x++) {
                c = e[o.charAt(x)];
                b = (b << 6) + c;
                l += 6;
                while (l >= 8) {
                    r += w((b >>> (l -= 8)) % 256);
                }
            }
        }
        return r;
    },
    extend: function (subClass, superClass) {
        var F = function () { };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superClass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    },
    clipToMaxCharWords: function (data) {
        var aString = data.aString;
        var maxChars = data.maxChars;
        if (aString.length <= maxChars) {
            return aString;
        }
        var wordarray = aString.split(" ");
        var numwords = wordarray.length;
        var newstring = "";
        var laststring = "";
        for (var counter = 0; counter < numwords; counter++) {
            laststring = newstring
            if (counter != 0) {
                newstring += (" " + wordarray[counter]);
            }
            else {
                newstring += wordarray[counter];
            }
            if (newstring.length > maxChars) {
                return (laststring + "...");
            }
        }
        return newstring;
    },
    viewportSize: function () {
        var myWidth = 0, myHeight = 0;
        if (typeof (window.innerWidth) == 'number') {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        }
        else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        }
        else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        return {
            width: myWidth,
            height: myHeight
        }
    },
    decipherQueryResult: function (data) {
        return data.queryResult;
    },
    adjustColour: function (data) {
        var colour = data.colour;
        var adjust = data.adjust;
        var num = parseInt(colour, 16);
        var r = parseInt((num >> 16) * adjust);
        var b = parseInt(((num >> 8) & 0x00FF) * adjust);
        var g = parseInt((num & 0x0000FF) * adjust);
        r = (r < 0) ? 0 : (r > 255) ? 255 : r;
        b = (b < 0) ? 0 : (b > 255) ? 255 : b;
        g = (g < 0) ? 0 : (g > 255) ? 255 : g;
        var newColor = g | (b << 8) | (r << 16);
        newColor = newColor.toString(16);
        for (var counter = 6 - newColor.length; counter > 0; counter--) {
            newColor = "0" + newColor;
        }
        return newColor;
    }
}
var AJKImageLoader = function(data){
    var self = this;
    self.loadCallback = data.loadCallback;
    self.imageUrl = data.imageUrl;
    self.imageHasLoaded = false;
}
AJKImageLoader.prototype =
    {
        init: function() {
            var self = this;
            var anImage = new Image();
            anImage.src = self.imageUrl;
            if (anImage.complete) {
                if (self.loadCallback) {
                    self.loadCallback({
                            image: anImage
                        });
                }
            }
            else {
                $(anImage).load(function() {
                    if (self.loadCallback && !self.imageHasLoaded) {
                        self.loadCallback({
                                image: anImage
                            });
                    }
                    self.imageHasLoaded = true;
                });
            }
            return self;
        }
    };
var AJKImageGallery = function(data) {
    var self = this;
    self.domRootEl = data.domRootEl;
    self.imageInfoFunction = data.imageInfoFunction;
    self.domImageStorage = $(self.domRootEl).find(".ak-gallery-image-storage").get()[0];
    self.domImages = "";
    self.numImages = "";
    self.createImageInfoHTML = data.createImageInfoHTML;
    self.imageWasSelected = data.imageWasSelected;
    self.createDomImage = data.createDomImage;
    self.buttonHideClass = data.buttonHideClass;
    self.domNextButton = data.domNextButton;
    self.domPrevButton = data.domPrevButton;
    self.images = new Array();
    self.gallerySize =
        {
            width: $(this.domRootEl).width(),
            height: $(this.domRootEl).height()
        };
    self.domStageHolder = data.domStageHolder;
    self.domStage = data.domStage;
    self.selectedImageIndex = 0;
    self.previousImage = false;
    self.transition = AJKImageTransitions.makeTransition({
            transition: (data.transition || "SimpleSwitch")
        });
    self.currentlyAnimating = false;
    self.imageHolderHTML = data.imageHolderHTML;
    self.thumbBlockSize = data.thumbBlockSize;
    self.domThumbsHolder = data.domThumbsHolder;
    self.domThumbsStage = data.domThumbsStage;
    self.createThumbBlockFunc = data.createThumbBlockFunc;
    self.galleryThumbsController = "";
    self.selectedThumbClass = data.selectedThumbClass;
    self.domThumbNextButton = data.domThumbNextButton;
    self.domThumbPrevButton = data.domThumbPrevButton;
    self.resizeCallbackFunc = data.resizeCallbackFunc;
    self.thumbsShowing = true;
    self.animatingClass = "tl-gallery-animating";
    return self;
};
AJKImageGallery.prototype = 
{
    init : function(){
        var self = this;
        $(self.domStageHolder).css({
            width : self.gallerySize.width + "px",
            height : self.gallerySize.height + "px"
        });
        $(self.domStage).css({
            width : self.gallerySize.width + "px",
            height : self.gallerySize.height + "px"
        });
        $(self.domNextButton).click(function(){
            self.displayNextImage();
            return false;
        });
        $(self.domPrevButton).click(function(){
            self.displayPrevImage();
            return false;
        });
        if(self.domThumbsHolder){
            self.galleryThumbsController = new AJKGalleryThumbsController({
                domRoot : self.domThumbsHolder,
                domStage : self.domThumbsStage,
                thumbBlockSize : self.thumbBlockSize,
                createThumbBlockFunc : self.createThumbBlockFunc,
                controller : self,
                selectedThumbClass : self.selectedThumbClass,
                domThumbNextButton : self.domThumbNextButton,
                domThumbPrevButton : self.domThumbPrevButton
            }).init();
        }
        self.transition.init({
            domStage : self.domStage,
            displaySize : self.gallerySize
        });
        return self;
    },
    reset : function(){
        var self = this;
        $(self.domStage).empty();
        self.images = new Array();
        self.domImages = new Array();
        self.numImages = 0;
        self.selectedImageIndex = 0;
        self.previousImage = false;
        self.currentlyAnimating = false;
    },
    loadWithImages : function(data){
        var self = this;
        var clearTransition = data.clearTransition;
        var originalImages = data.images;
        if(clearTransition){
            self.transition.previousImage = false;
        }
        self.reset();
        var counter = 0;
        self.numImages = originalImages.length;
        if(self.numImages < 2){
            $(self.domNextButton).addClass(self.buttonHideClass);
            $(self.domPrevButton).addClass(self.buttonHideClass);
        }
        else{
            $(self.domNextButton).removeClass(self.buttonHideClass);
            $(self.domPrevButton).removeClass(self.buttonHideClass);
        }
        $.each(originalImages, function(){
            var imageInfoHTML = self.createImageInfoHTML({
                image : this
            });
            var aDomImage = self.createDomImage({
                image : this
            });
            var imageOffset = this.thumbPosition;
            self.domImages.push(aDomImage);
            var anImage = new AJKImage({
                gallery : self,
                displaySize : self.gallerySize,
                domImage : aDomImage,
                imageInfoFunction : self.imageInfoFunction,
                imageInfoHTML : imageInfoHTML,
                imageHolderHTML : self.imageHolderHTML,
                index : counter ++, imageOffset : imageOffset
            }).init();
            $(aDomImage).addClass("image-item");
            $(self.domImageStorage).prepend(anImage.html);
            self.images.push(anImage);
        });
        self.galleryThumbsController.loadWithImages({
            images : self.images
        });
        self.displayImageForIndex({
            index : 0
        });
    },
    hideThumbs : function(){
        var self = this;
        if(self.thumbsShowing){
            self.thumbsShowing = false;
            $(self.domThumbsHolder).addClass("tl-g-thumb-holder-invisible");
        }
    },
    showThumbs : function(){
        var self = this;
        if( ! self.thumbsShowing){
            self.thumbsShowing = true;
            $(self.domThumbsHolder).removeClass("tl-g-thumb-holder-invisible");
        }
    },
    displayImageForIndex : function(data){
        var self = this;
        var index = data.index;
        var direction = data.direction;
        self.selectedImageIndex = index;
        if(self.galleryThumbsController){
            self.galleryThumbsController.imageAtIndexWasClicked({
                imageIndex : index
            });
        };
        self.currentlyAnimating = true;
        $(self.domRootEl).addClass(self.animatingClass);
        self.transition.showImage({
            anImage : self.images[index],
            direction : direction,
            callback : function(){
                $(self.domRootEl).removeClass(self.animatingClass);
                self.currentlyAnimating = false;
            }
        });
        self.previousImage = self.images[index];
        if(self.imageWasSelected){
            self.imageWasSelected({
                anImage : self.previousImage
            });
        }
    },
    displayNextImage : function(){
        var self = this;
        if(self.currentlyAnimating){
            return false;
        }
        newIndex = (self.selectedImageIndex >= (self.numImages - 1)) ? 0 : self.selectedImageIndex + 1;
        self.displayImageForIndex({
            index : newIndex,
            direction : "forward"
        });
    },
    displayPrevImage : function(){
        var self = this;
        if(self.currentlyAnimating){
            return false;
        }
        newIndex = (self.selectedImageIndex >= 1) ? self.selectedImageIndex - 1 : (self.numImages - 1);
        self.displayImageForIndex({
            index : newIndex,
            direction : "backward"
        });
    },
    updateSizeTo : function(data){
        var self = this;
        var size = data.size;
        self.gallerySize = size;
        $(self.domRootEl).css({
            height : size.adjustmentHeight
        });
        $(self.domStageHolder).css({
            height : size.height,
            width : size.width
        });
        $.each(self.images, function(){
            this.resizeTo({
                size : size
            });
        });
        self.transition.updateDisplaySize({
            size : size
        });
        if(self.resizeCallbackFunc){
            self.resizeCallbackFunc({
                newSize : size
            });
        }
    }
}
var AJKGalleryThumbsController = function(data){
    var self = this;
    self.domRoot = data.domRoot;
    self.domStage = data.domStage;
    self.thumbBlockSize = data.thumbBlockSize;
    self.createThumbBlockFunc = data.createThumbBlockFunc;
    self.images = "";
    self.controller = data.controller;
    self.viewportWidth = $(self.domRoot).width();
    self.selectedThumb = 0;
    self.domThumbs = new Array();
    self.thumbClass = "ajk-gallery-thumb-block";
    self.selectedThumbClass = data.selectedThumbClass;
    self.domThumbNextButton = data.domThumbNextButton;
    self.domThumbPrevButton = data.domThumbPrevButton;
    self.stageWidth = 0;
    self.numItems = 0;
    self.stageWidth = 0;
    self.numVisibleItems = 0;
    self.leftMostItem = 0;
    self.currentlyAnimating = false;
}
AJKGalleryThumbsController.prototype = 
{
    init : function(){
        var self = this;
        $(self.domStage).click(function(e){
            var thumbBlock = AJKHelpers.getSelfOrFirstParantOfClass({
                domEl : e.target,
                className : self.thumbClass
            });
            if(thumbBlock){
                var thumbIndex = parseInt($(thumbBlock).attr("thumbIndex"));
                self.thumbAtIndexWasClicked({
                    thumbIndex : thumbIndex
                });
            }
        });
        $(self.domThumbNextButton).click(function(){
            self.scrollToLeftMostItemIndex({
                itemIndex : (self.leftMostItem + self.numVisibleItems)
            });
            return false;
        });
        $(self.domThumbPrevButton).click(function(){
            self.scrollToLeftMostItemIndex({
                itemIndex : (self.leftMostItem - self.numVisibleItems)
            });
            return false;
        });
        return self;
    },
    reset : function(){
        var self = this;
        $(self.domStage).empty();
        self.selectedThumb = 0;
        self.domThumbs = new Array();
        self.numItems = 0;
        self.leftMostItem = 0;
        $(self.domStage).css({
            left : 0
        });
    },
    loadWithImages : function(data){
        var self = this;
        self.images = data.images;
        self.reset();
        var thumbCounter = 0;
        self.updateCarouselValues();
        self.updateControls();
        $(self.domStage).css({
            width : self.images.length * (self.thumbBlockSize.width + 5)
        });
        $.each(self.images, function(){
            var thisImage = this;
            var domThumbImage = $(this.domImage).clone().get()[0];
            var aDomThumb = self.createThumbBlockFunc({
                domImage : domThumbImage
            });
            $(aDomThumb).attr("thumbIndex", thumbCounter);
            $(aDomThumb).addClass(self.thumbClass);
            self.domThumbs.push(aDomThumb);
            $(self.domStage).append(aDomThumb);
            new AJKImageLoader({
                imageUrl : $(domThumbImage).attr("src"),
                loadCallback : function(){
                    AJKHelpers.sizeImageToFitInBoxOfSize({
                        domImage : domThumbImage,
                        boxSize : self.thumbBlockSize,
                        imageOffset : thisImage.imageOffset
                    });
                    $(domThumbImage).css({
                        opacity : 1
                    });
                }
            }).init();
            thumbCounter ++ ;
        });
        $(self.domThumbs[self.selectedThumb]).addClass(self.selectedThumbClass);
    },
    updateCarouselValues : function(){
        var self = this;
        self.numItems = self.images.length;
        self.stageWidth = (self.thumbBlockSize.width + self.thumbBlockSize.widthPadding) * self.numItems;
        self.numVisibleItems = parseInt(self.viewportWidth / self.thumbBlockSize.width);
    },
    scrollToLeftMostItemIndex : function(data){
        var self = this;
        if(self.currentlyAnimating){
            return;
        }
        var prevLeftMostItem = self.leftMostItem;
        self.currentlyAnimating = true;
        var itemIndex = data.itemIndex;
        itemIndex = (itemIndex >= (self.numItems - self.numVisibleItems)) ? self.numItems - self.numVisibleItems : itemIndex;
        itemIndex = (itemIndex < 0) ? 0 : itemIndex;
        self.leftMostItem = itemIndex;
        var distance = Math.abs(self.leftMostItem - prevLeftMostItem);
        var animSpeed = distance * 200;
        $(self.domStage).animate({
            left : -(self.thumbBlockSize.width + self.thumbBlockSize.widthPadding) * self.leftMostItem
        }, animSpeed, function(){
            self.currentlyAnimating = false;
        });
        self.updateControls();
    },
    updateControls : function(){
        var self = this;
        if(self.leftMostItem == 0){
            $(self.domThumbPrevButton).css({
                display : "none"
            });
        }
        else{
            $(self.domThumbPrevButton).css({
                display : "block"
            });
        }
        if(self.leftMostItem + self.numVisibleItems < self.numItems){
            $(self.domThumbNextButton).css({
                display : "block"
            });
        }
        else{
            $(self.domThumbNextButton).css({
                display : "none"
            });
        }
    },
    imageAtIndexWasClicked : function(data){
        var self = this;
        var imageIndex = data.imageIndex;
        $(self.domThumbs[self.selectedThumb]).removeClass(self.selectedThumbClass);
        $(self.domThumbs[imageIndex]).addClass(self.selectedThumbClass);
        self.selectedThumb = imageIndex;
    },
    thumbAtIndexWasClicked : function(data){
        var self = this;
        var thumbIndex = data.thumbIndex;
        if(thumbIndex == self.selectedThumb || self.controller.currentlyAnimating){
            return;
        }
        var direction = (thumbIndex > self.selectedThumb) ? "forward" : "backward";
        self.controller.displayImageForIndex({
            index : thumbIndex,
            direction : direction
        });
        $(self.domThumbs[self.selectedThumb]).removeClass(self.selectedThumbClass);
        $(self.domThumbs[thumbIndex]).addClass(self.selectedThumbClass);
        self.selectedThumb = thumbIndex;
    }
}
var AJKImage = function(data){
    this.gallery = data.gallery;
    this.displaySize = data.displaySize;
    this.domImage = data.domImage;
    this.imageInfoHTML = data.imageInfoHTML;
    this.imageInfoFunction = data.imageInfoFunction;
    this.domPhotoCredit = "";
    this.index = data.index;
    this.imageHolderHTML = data.imageHolderHTML;
    this.imageOffset = data.imageOffset;
    this.size = 
    {
        width : 0,
        height : 0
    }
    this.adjustedDimensions = 
    {
        width : 0,
        height : 0,
        xOffset : 0,
        yOffset : 0
    }
    this.domHolder = $(this.imageHolderHTML).get()[0];
    this.html = this.domHolder;
    this.loaded = false;
    return this;
}
AJKImage.prototype = 
{
    init : function(){
        var self = this;
        $(this.domHolder).css({
            width : this.displaySize.width,
            height : this.displaySize.height
        });
        $(self.domHolder).append(self.domImage);
        new AJKImageLoader({
            imageUrl : $(self.domImage).attr("src"),
            loadCallback : function(){
                setTimeout(function(){
                    self.size = 
                    {
                        width : $(self.domImage).width(),
                        height : $(self.domImage).height()
                    }
                    self.fitInBoxOfSize({
                        boxSize : 
                        {
                            width : self.displaySize.width,
                            height : self.displaySize.height
                        }
                    });
                    $(self.domImage).css({
                        opacity : 1
                    });
                });
            }
        }).init();
        $(self.domHolder).append(self.imageInfoHTML);
        return this;
    },
    fitInBoxOfSize : function(data){
        var self = this;
        var boxSize = data.boxSize;
        AJKHelpers.sizeImageToFitInBoxOfSize({
            domImage : self.domImage,
            boxSize : boxSize,
            imageSize : 
            {
                width : self.size.width,
                height : self.size.height
            },
            imageOffset : self.imageOffset
        })
    },
    removeFromDom : function(){
        var self = this;
        $(self.domHolder).remove();
    },
    resizeTo : function(data){
        var self = this;
        self.displaySize = data.size;
        self.fitInBoxOfSize({
            boxSize : self.displaySize
        });
        $(self.html).css({
            width : self.displaySize.width,
            height : self.displaySize.height
        });
    }
}
var AJKImageTransitions = 
{
    makeTransition : function(data){
        return new this[data.transition];
    }
}
AJKImageTransitions.SimpleSwitch = function(){};
AJKImageTransitions.SimpleSwitch.prototype = 
{
    init : function(data){
        var self = this;
        self.domStage = data.domStage;
        self.displaySize = data.displaySize;
        self.previousImage = false;
    },
    showImage : function(data){
        var self = this;
        self.direction = data.direction
        var callback = data.callback;
        var anImage = data.anImage;
        if( ! self.previousImage){
            self.displayFirstImage({
                anImage : anImage,
                callback : function(){
                    callback();
                }
            });
            return;
        }
        self.initialiseAndPlaceNewImage({
            anImage : anImage
        });
        setTimeout(function(){
            self.doTransition({
                anImage : anImage,
                callback : function(){
                    if(self.previousImage){
                        self.previousImage.removeFromDom();
                    }
                    self.previousImage = anImage;
                    callback();
                }
            });
        }, 1);
    },
    initialiseAndPlaceNewImage : function(data){
        var self = this;
        $(self.domStage).append(data.anImage.html);
    },
    doTransition : function(data){
        data.callback();
    },
    displayFirstImage : function(data){
        var self = this;
        var anImage = data.anImage;
        var callback = data.callback;
        $(self.domStage).append(anImage.html);
        self.previousImage = anImage;
        callback();
    },
    updateDisplaySize : function(data){
        var self = this;
        self.displaySize = data.size;
    }
}
AJKImageTransitions.FadeIn = function(){
    AJKImageTransitions.FadeIn.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.FadeIn, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.FadeIn.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    $(anImage.html).css({
        opacity : 0
    });
    $(self.domStage).append(anImage.html);
}
AJKImageTransitions.FadeIn.prototype.doTransition = function(data){
    var anImage = data.anImage;
    var callback = data.callback;
    $(anImage.html).animate({
        opacity : 1
    }, 500, function(){
        callback();
    });
}
AJKImageTransitions.CarouselHorizontal = function(){
    AJKImageTransitions.CarouselHorizontal.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.CarouselHorizontal, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.CarouselHorizontal.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    self.displayOffset = (self.direction == "backward") ? -self.displaySize.width : self.displaySize.width;
    $(anImage.html).css({
        left : self.displayOffset + "px"
    });
    $(self.domStage).append(anImage.html);
}
AJKImageTransitions.CarouselHorizontal.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var timer = Math.abs(self.displaySize.width / 2);
    $(self.domStage).animate({
        left : -self.displayOffset + "px"
    }, timer, function(){
        $(anImage.html).css({
            left : 0
        });
        $(self.domStage).css({
            left : 0
        });
        callback();
    });
}
AJKImageTransitions.CameraShutter = function(){
    AJKImageTransitions.CameraShutter.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.CameraShutter, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.CameraShutter.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    $(anImage.html).css({
        opacity : 0
    });
    $(self.domStage).append(anImage.html);
    self.shutterTop = $('<div class="ak-image-gallery-camera-shutter"></div>').get()[0];
    self.shutterBottom = $('<div class="ak-image-gallery-camera-shutter"></div>').get()[0];
    $(self.shutterTop).css({
        top : 0,
        left : 0,
        height : 0,
        width : self.displaySize.width,
        opacity : 0
    });
    $(self.shutterBottom).css({
        bottom : 0,
        left : 0,
        height : 0,
        width : self.displaySize.width,
        opacity : 0
    });
    $(self.domStage).append(self.shutterTop);
    $(self.domStage).append(self.shutterBottom);
}
AJKImageTransitions.CameraShutter.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var animates1 = new Array();
    var animates2 = new Array();
    animates1.push({
        element : self.shutterTop,
        elStyles : [{
            elStyle : "height",
            endVal : self.displaySize.height / 2 + 1
        }, 
        {
            elStyle : "opacity",
            endVal : 1
        }]
    });
    animates1.push({
        element : self.shutterBottom,
        elStyles : [{
            elStyle : "height",
            endVal : self.displaySize.height / 2 + 1
        }, 
        {
            elStyle : "opacity",
            endVal : 1
        }]
    });
    var closeShutterAnimation = new CustomAnimation(animates1, 200, 20, function(){
        $(anImage.html).css({
            opacity : 1
        });
        setTimeout(function(){
            animates2.push({
                element : self.shutterTop,
                elStyles : [{
                    elStyle : "height",
                    endVal : 0
                }]
            });
            animates2.push({
                element : self.shutterBottom,
                elStyles : [{
                    elStyle : "height",
                    endVal : 0
                }]
            });
            var openShutterAnimation = new CustomAnimation(animates2, 200, 20, function(){
                $(self.shutterTop).remove();
                $(self.shutterBottom).remove();
                callback();
            });
            openShutterAnimation.startAnimation();
        }, 200);
    });
    closeShutterAnimation.startAnimation();
}
AJKImageTransitions.Squares = function(){
    AJKImageTransitions.Squares.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.Squares, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.Squares.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    $(anImage.html).css({
        opacity : 0
    });
    self.previousImage.removeFromDom();
    $(self.domStage).append(anImage.html);
    self.squareCols = Math.round(self.displaySize.width / 100) || 1;
    self.squareRows = Math.round(self.displaySize.height / 100) || 1;
    self.squareSize = 
    {
        width : Math.ceil(self.displaySize.width / self.squareCols),
        height : Math.ceil(self.displaySize.height / self.squareRows)
    }
    var createSquareAtRowColWithImage = function(data){
        var row = data.row;
        var col = data.col;
        var srcImage = data.srcImage;
        var startingOpacity = data.startingOpacity;
        var domSquare = $('<div class="ak-image-gallery-square"></div>').get()[0];
        $(domSquare).css({
            width : self.squareSize.width,
            height : self.squareSize.height,
            top : self.squareSize.height * row,
            left : self.squareSize.width * col,
            opacity : startingOpacity
        });
        var domImage = $(srcImage.html).clone();
        $(domImage).css({
            opacity : 1,
            left : -self.squareSize.width * col,
            top : -self.squareSize.height * row
        });
        $(domSquare).append(domImage);
        return domSquare;
    }
    self.domSquares = new Array();
    for(var row = 0; row < self.squareRows; row ++ ){
        for(var col = 0; col < self.squareCols; col ++ ){
            var domSquare = createSquareAtRowColWithImage({
                row : row,
                col : col,
                srcImage : self.previousImage,
                startingOpacity : 1
            });
            self.domSquares.push(domSquare);
            $(self.domStage).append(domSquare);
        }
    }
}
AJKImageTransitions.Squares.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var timerInc = parseInt(1000 / (self.squareRows * self.squareCols));
    var callback = data.callback;
    $(anImage.html).css({
        opacity : 1
    });
    for(var row = 0; row < self.squareRows; row ++ ){
        for(var col = 0; col < self.squareCols; col ++ ){ (function(){
                var delay = col * timerInc + row * timerInc / 3 * self.squareCols;
                var domSquare = self.domSquares[(row * self.squareCols) + col];
                var lastRow = (col == (self.squareCols - 1) && row == (self.squareRows - 1)) ? true : false;
                setTimeout(function(){
                    $(domSquare).animate({
                        opacity : 0
                    }, 400, function(){
                        $(this).remove();
                    });
                    if(lastRow){
                        callback();
                    }
                }, delay);
            })();
        }
    }
}
AJKImageTransitions.SquaresFadeInAndOut = function(){
    AJKImageTransitions.SquaresFadeInAndOut.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.SquaresFadeInAndOut, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.SquaresFadeInAndOut.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    $(anImage.html).css({
        opacity : 0
    });
    self.previousImage.removeFromDom();
    $(self.domStage).append(anImage.html);
    self.squareCols = Math.round(self.displaySize.width / 100) || 1;
    self.squareRows = Math.round(self.displaySize.height / 100) || 1;
    self.squareSize = 
    {
        width : Math.ceil(self.displaySize.width / self.squareCols),
        height : Math.ceil(self.displaySize.height / self.squareRows)
    }
    var createSquareAtRowColWithImage = function(data){
        var row = data.row;
        var col = data.col;
        var srcImage = data.srcImage;
        var startingOpacity = data.startingOpacity;
        var scale = (data.scale) ? data.scale : 1;
        var domSquare = $('<div class="ak-image-gallery-square"></div>').get()[0];
        $(domSquare).css({
            width : (self.squareSize.width * scale),
            height : (self.squareSize.height * scale),
            top : (self.squareSize.height * row) + (self.squareSize.height * (1 - scale)),
            left : (self.squareSize.width * col) + (self.squareSize.height * (1 - scale)),
            opacity : startingOpacity
        });
        var domImage = $(srcImage.html).clone();
        $(domImage).css({
            opacity : 1,
            left : -self.squareSize.width * col,
            top : -self.squareSize.height * row
        });
        $(domSquare).append(domImage);
        return {
            dom : domSquare,
            yOffset : self.squareSize.height * row,
            xOffset : self.squareSize.width * col
        }
    }
    self.squares = new Array();
    self.newSquares = new Array();
    for(var row = 0; row < self.squareRows; row ++ ){
        for(var col = 0; col < self.squareCols; col ++ ){
            var aSquare = createSquareAtRowColWithImage({
                row : row,
                col : col,
                srcImage : self.previousImage,
                startingOpacity : 1
            });
            self.squares.push(aSquare);
            $(self.domStage).append(aSquare.dom);
            var aNewSquare = createSquareAtRowColWithImage({
                row : row,
                col : col,
                srcImage : anImage,
                startingOpacity : 0
            });
            self.newSquares.push(aNewSquare);
            $(self.domStage).append(aNewSquare.dom);
        }
    }
}
AJKImageTransitions.SquaresFadeInAndOut.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var timerInc = 50;
    var callback = data.callback;
    $(anImage.html).css({
        opacity : 0
    });
    for(var row = 0; row < self.squareRows; row ++ ){
        for(var col = 0; col < self.squareCols; col ++ ){ (function(){
                var delay = col * timerInc + row * timerInc / 3 * self.squareCols;
                var aSquare = self.squares[(row * self.squareCols) + col];
                var aNewSquare = self.newSquares[(row * self.squareCols) + col];
                var lastRow = (col == (self.squareCols - 1) && row == (self.squareRows - 1)) ? true : false;
                setTimeout(function(){
                    $(aSquare.dom).animate({
                        opacity : 0
                    }, 500, function(){
                        $(this).remove();
                    });
                }, delay);
                setTimeout(function(){
                    $(aNewSquare.dom).animate({
                        opacity : 1
                    }, 500, function(){
                        if(lastRow){
                            $(anImage.html).css({
                                opacity : 1
                            });
                            $.each(self.newSquares, function(){
                                $(this.dom).remove();
                            });
                            callback();
                        }
                    });
                }, delay + 900);
            })();
        }
    }
}
AJKImageTransitions.SplitAndFadeIn = function(){
    AJKImageTransitions.SplitAndFadeIn.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.SplitAndFadeIn, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.SplitAndFadeIn.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    $(anImage.html).css({
        opacity : 0
    });
    $(self.domStage).append(anImage.html);
    self.splitterLeft = $('<div class="ak-image-gallery-splitter"></div>').get()[0];
    self.splitterRight = $('<div class="ak-image-gallery-splitter"></div>').get()[0];
    $(self.splitterLeft).css({
        top : 0,
        left : 0,
        height : self.displaySize.height,
        width : self.displaySize.width / 2 + 1
    });
    $(self.splitterRight).css({
        top : 0,
        left : self.displaySize.width / 2,
        height : self.displaySize.height,
        width : self.displaySize.width / 2 + 1
    });
    $(self.splitterLeft).append($(self.previousImage.html).clone());
    var rightHTML = $(self.previousImage.html).clone();
    $(rightHTML).css({
        left : -self.displaySize.width / 2
    });
    $(self.splitterRight).append(rightHTML);
    self.previousImage.removeFromDom();
    $(self.domStage).append(self.splitterLeft);
    $(self.domStage).append(self.splitterRight);
}
AJKImageTransitions.SplitAndFadeIn.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var animates1 = new Array();
    var animates2 = new Array();
    animates1.push({
        element : self.splitterLeft,
        elStyles : [{
            elStyle : "left",
            endVal : -self.displaySize.width / 2
        }]
    });
    animates1.push({
        element : self.splitterRight,
        elStyles : [{
            elStyle : "left",
            endVal : self.displaySize.width
        }]
    });
    animates1.push({
        element : anImage.html,
        elStyles : [{
            elStyle : "opacity",
            endVal : 1
        }]
    });
    var splitterAnimation = new CustomAnimation(animates1, 500, 50, function(){
        $(anImage.html).css({
            opacity : 1
        });
        $(self.splitterLeft).remove();
        $(self.splitterRight).remove();
        callback();
    });
    splitterAnimation.startAnimation();
}
AJKImageTransitions.SplitAndFadeOut = function(){
    AJKImageTransitions.SplitAndFadeOut.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.SplitAndFadeOut, AJKImageTransitions.SplitAndFadeIn);
AJKImageTransitions.SplitAndFadeOut.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var animates1 = new Array();
    var animates2 = new Array();
    $(anImage.html).css({
        opacity : 1
    });
    animates1.push({
        element : self.splitterLeft,
        elStyles : [{
            elStyle : "left",
            endVal : -self.displaySize.width / 2
        }, 
        {
            elStyle : "opacity",
            endVal : 0
        }]
    });
    animates1.push({
        element : self.splitterRight,
        elStyles : [{
            elStyle : "left",
            endVal : self.displaySize.width
        }, 
        {
            elStyle : "opacity",
            endVal : 0
        }]
    });
    var splitterAnimation = new CustomAnimation(animates1, 500, 50, function(){
        $(anImage.html).css({
            opacity : 1
        });
        $(self.splitterLeft).remove();
        $(self.splitterRight).remove();
        callback();
    });
    splitterAnimation.startAnimation();
}
AJKImageTransitions.SplitAndFadeInAndOut = function(){
    AJKImageTransitions.SplitAndFadeInAndOut.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.SplitAndFadeInAndOut, AJKImageTransitions.SplitAndFadeIn);
AJKImageTransitions.SplitAndFadeInAndOut.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var animates1 = new Array();
    var animates2 = new Array();
    animates1.push({
        element : self.splitterLeft,
        elStyles : [{
            elStyle : "left",
            endVal : -self.displaySize.width / 2
        }, 
        {
            elStyle : "opacity",
            endVal : 0
        }]
    });
    animates1.push({
        element : self.splitterRight,
        elStyles : [{
            elStyle : "left",
            endVal : self.displaySize.width
        }, 
        {
            elStyle : "opacity",
            endVal : 0
        }]
    });
    animates1.push({
        element : anImage.html,
        elStyles : [{
            elStyle : "opacity",
            endVal : 1
        }]
    });
    var splitterAnimation = new CustomAnimation(animates1, 500, 50, function(){
        $(anImage.html).css({
            opacity : 1
        });
        $(self.splitterLeft).remove();
        $(self.splitterRight).remove();
        callback();
    });
    splitterAnimation.startAnimation();
}
AJKImageTransitions.SplitInFourAndFadeIn = function(){
    AJKImageTransitions.SplitAndFadeIn.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.SplitInFourAndFadeIn, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.SplitInFourAndFadeIn.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    $(anImage.html).css({
        opacity : 0
    });
    $(self.domStage).append(anImage.html);
    var xAdjuster = ((anImage.adjustedDimensions.xOffset % 2) == 0) ? 0 : 1;
    var yAdjuster = ((anImage.adjustedDimensions.yOffset % 2) == 0) ? 0 : 1;
    self.splitterTopLeft = $('<div class="ak-image-gallery-splitter"></div>').get()[0];
    self.splitterTopRight = $('<div class="ak-image-gallery-splitter"></div>').get()[0];
    self.splitterBottomLeft = $('<div class="ak-image-gallery-splitter"></div>').get()[0];
    self.splitterBottomRight = $('<div class="ak-image-gallery-splitter"></div>').get()[0];
    $(self.splitterTopLeft).css({
        top : 0,
        left : 0,
        height : self.displaySize.height / 2,
        width : self.displaySize.width / 2
    });
    $(self.splitterTopRight).css({
        top : 0,
        left : self.displaySize.width / 2,
        height : self.displaySize.height / 2,
        width : Math.ceil(self.displaySize.width / 2)
    });
    $(self.splitterBottomLeft).css({
        top : self.displaySize.height / 2,
        left : 0,
        height : self.displaySize.height / 2 + (1 - yAdjuster),
        width : Math.ceil(self.displaySize.width / 2)
    });
    $(self.splitterBottomRight).css({
        top : self.displaySize.height / 2,
        left : self.displaySize.width / 2,
        height : self.displaySize.height / 2 + (1 - yAdjuster),
        width : Math.ceil(self.displaySize.width / 2)
    });
    $(self.splitterTopLeft).append($(self.previousImage.html).clone());
    var topRightHTML = $(self.previousImage.html).clone();
    $(topRightHTML).css({
        left : -self.displaySize.width / 2
    });
    $(self.splitterTopRight).append(topRightHTML);
    var bottomLeftHTML = $(self.previousImage.html).clone();
    $(bottomLeftHTML).css({
        top : -self.displaySize.height / 2
    });
    $(self.splitterBottomLeft).append(bottomLeftHTML);
    var bottomRightHTML = $(self.previousImage.html).clone();
    $(bottomRightHTML).css({
        left : -self.displaySize.width / 2 + xAdjuster,
        top : -self.displaySize.height / 2 + yAdjuster
    });
    $(self.splitterBottomRight).append(bottomRightHTML);
    self.previousImage.removeFromDom();
    $(self.domStage).append(self.splitterTopLeft);
    $(self.domStage).append(self.splitterTopRight);
    $(self.domStage).append(self.splitterBottomLeft);
    $(self.domStage).append(self.splitterBottomRight);
}
AJKImageTransitions.SplitInFourAndFadeIn.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var animates1 = new Array();
    animates1.push({
        element : self.splitterTopLeft,
        elStyles : [{
            elStyle : "left",
            endVal : -self.displaySize.width / 2
        }, 
        {
            elStyle : "top",
            endVal : -self.displaySize.height / 2
        }]
    });
    animates1.push({
        element : self.splitterTopRight,
        elStyles : [{
            elStyle : "left",
            endVal : self.displaySize.width
        }, 
        {
            elStyle : "top",
            endVal : -self.displaySize.height / 2
        }]
    });
    animates1.push({
        element : self.splitterBottomLeft,
        elStyles : [{
            elStyle : "left",
            endVal : -self.displaySize.width / 2
        }, 
        {
            elStyle : "top",
            endVal : self.displaySize.height
        }]
    });
    animates1.push({
        element : self.splitterBottomRight,
        elStyles : [{
            elStyle : "left",
            endVal : self.displaySize.width
        }, 
        {
            elStyle : "top",
            endVal : self.displaySize.height
        }]
    });
    animates1.push({
        element : anImage.html,
        elStyles : [{
            elStyle : "opacity",
            endVal : 1
        }]
    });
    var splitterAnimation = new CustomAnimation(animates1, 500, 50, function(){
        $(anImage.html).css({
            opacity : 1
        });
        $(self.splitterTopLeft).remove();
        $(self.splitterTopRight).remove();
        $(self.splitterBottomLeft).remove();
        $(self.splitterBottomRight).remove();
        callback();
    });
    splitterAnimation.startAnimation();
}
AJKImageTransitions.SplitInFourAndFadeInAndOut = function(){
    AJKImageTransitions.SplitInFourAndFadeInAndOut.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.SplitInFourAndFadeInAndOut, AJKImageTransitions.SplitInFourAndFadeIn);
AJKImageTransitions.SplitInFourAndFadeInAndOut.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var animates1 = new Array();
    animates1.push({
        element : self.splitterTopLeft,
        elStyles : [{
            elStyle : "left",
            endVal : -self.displaySize.width / 2
        }, 
        {
            elStyle : "top",
            endVal : -self.displaySize.height / 2
        }, 
        {
            elStyle : "opacity",
            endVal : 0
        }]
    });
    animates1.push({
        element : self.splitterTopRight,
        elStyles : [{
            elStyle : "left",
            endVal : self.displaySize.width
        }, 
        {
            elStyle : "top",
            endVal : -self.displaySize.height / 2
        }, 
        {
            elStyle : "opacity",
            endVal : 0
        }]
    });
    animates1.push({
        element : self.splitterBottomLeft,
        elStyles : [{
            elStyle : "left",
            endVal : -self.displaySize.width / 2
        }, 
        {
            elStyle : "top",
            endVal : self.displaySize.height
        }, 
        {
            elStyle : "opacity",
            endVal : 0
        }]
    });
    animates1.push({
        element : self.splitterBottomRight,
        elStyles : [{
            elStyle : "left",
            endVal : self.displaySize.width
        }, 
        {
            elStyle : "top",
            endVal : self.displaySize.height
        }, 
        {
            elStyle : "opacity",
            endVal : 0
        }]
    });
    animates1.push({
        element : anImage.html,
        elStyles : [{
            elStyle : "opacity",
            endVal : 1
        }]
    });
    var splitterAnimation = new CustomAnimation(animates1, 500, 50, function(){
        $(anImage.html).css({
            opacity : 1
        });
        $(self.splitterTopLeft).remove();
        $(self.splitterTopRight).remove();
        $(self.splitterBottomLeft).remove();
        $(self.splitterBottomRight).remove();
        callback();
    });
    splitterAnimation.startAnimation();
}
AJKImageTransitions.ZoomOut = function(){
    AJKImageTransitions.ZoomOut.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.ZoomOut, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.ZoomOut.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    $(anImage.html).css({
        opacity : 1
    });
    $(self.domStage).append(anImage.html);
    $(self.domStage).append(self.previousImage.html);
}
AJKImageTransitions.ZoomOut.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var animates1 = new Array();
    var prevImage = self.previousImage;
    var zoomVal = 2;
    var finalXOffset = -((prevImage.adjustedDimensions.width * zoomVal) - self.displaySize.width) / 2;
    var finalYOffset = -((prevImage.adjustedDimensions.height * zoomVal) - self.displaySize.height) / 2;
    animates1.push({
        element : prevImage.domImage,
        elStyles : [{
            elStyle : "left",
            endVal : finalXOffset
        }, 
        {
            elStyle : "top",
            endVal : finalYOffset
        }, 
        {
            elStyle : "width",
            endVal : prevImage.adjustedDimensions.width * zoomVal
        }, 
        {
            elStyle : "height",
            endVal : prevImage.adjustedDimensions.height * zoomVal
        }]
    });
    animates1.push({
        element : prevImage.html,
        elStyles : [{
            elStyle : "opacity",
            endVal : 0
        }]
    });
    var zoomAnimation = new CustomAnimation(animates1, 500, 50, function(){
        $(anImage.html).css({
            opacity : 1
        });
        self.previousImage.removeFromDom();
        $(self.previousImage.domImage).css({
            left : prevImage.adjustedDimensions.xOffset,
            top : prevImage.adjustedDimensions.yOffset,
            width : prevImage.adjustedDimensions.width,
            height : prevImage.adjustedDimensions.height
        });
        callback();
    });
    zoomAnimation.startAnimation();
}
AJKImageTransitions.ZoomOutAndZoomIn = function(){
    AJKImageTransitions.ZoomOutAndZoomIn.superClass.constructor.call(this);
}
AJKHelpers.extend(AJKImageTransitions.ZoomOutAndZoomIn, AJKImageTransitions.SimpleSwitch);
AJKImageTransitions.ZoomOutAndZoomIn.prototype.initialiseAndPlaceNewImage = function(data){
    var self = this;
    var anImage = data.anImage;
    self.zoomVal = 1.1;
    var startXOffset = -((anImage.adjustedDimensions.width * self.zoomVal) - self.displaySize.width) / 2;
    var startYOffset = -((anImage.adjustedDimensions.height * self.zoomVal) - self.displaySize.height) / 2;
    $(anImage.domImage).css({
        left : startXOffset,
        top : startYOffset,
        width : anImage.adjustedDimensions.width * self.zoomVal,
        height : anImage.adjustedDimensions.height * self.zoomVal,
        opacity : 1
    });
    $(anImage.html).css({
        opacity : 0
    });
    $(self.domStage).append(anImage.html);
    $(self.domStage).append(self.previousImage.html);
}
AJKImageTransitions.ZoomOutAndZoomIn.prototype.doTransition = function(data){
    var self = this;
    var anImage = data.anImage;
    var callback = data.callback;
    var animates1 = new Array();
    var prevImage = self.previousImage;
    var zoomVal = self.zoomVal;
    var finalXOffset = -((prevImage.adjustedDimensions.width * zoomVal) - self.displaySize.width) / 2;
    var finalYOffset = -((prevImage.adjustedDimensions.height * zoomVal) - self.displaySize.height) / 2;
    animates1.push({
        element : prevImage.domImage,
        elStyles : [{
            elStyle : "left",
            endVal : finalXOffset
        }, 
        {
            elStyle : "top",
            endVal : finalYOffset
        }, 
        {
            elStyle : "width",
            endVal : prevImage.adjustedDimensions.width * zoomVal
        }, 
        {
            elStyle : "height",
            endVal : prevImage.adjustedDimensions.height * zoomVal
        }]
    });
    animates1.push({
        element : anImage.domImage,
        elStyles : [{
            elStyle : "left",
            endVal : anImage.adjustedDimensions.xOffset
        }, 
        {
            elStyle : "top",
            endVal : anImage.adjustedDimensions.yOffset
        }, 
        {
            elStyle : "width",
            endVal : anImage.adjustedDimensions.width
        }, 
        {
            elStyle : "height",
            endVal : anImage.adjustedDimensions.height
        }]
    });
    animates1.push({
        element : prevImage.html,
        elStyles : [{
            elStyle : "opacity",
            endVal : 0
        }]
    });
    animates1.push({
        element : anImage.html,
        elStyles : [{
            elStyle : "opacity",
            endVal : 1
        }]
    });
    var zoomAnimation = new CustomAnimation(animates1, 500, 50, function(){
        $(anImage.html).css({
            opacity : 1
        });
        self.previousImage.removeFromDom();
        $(self.previousImage.domImage).css({
            left : prevImage.adjustedDimensions.xOffset,
            top : prevImage.adjustedDimensions.yOffset,
            width : prevImage.adjustedDimensions.width,
            height : prevImage.adjustedDimensions.height
        });
        callback();
    });
    zoomAnimation.startAnimation();
}
var AJKWindowResizeEvent = function(){
    var self = this;
    self.observers = new Array();
    self.lastWindowSize = 
    {
        width : 0,
        height : 0
    };
    self.domBody = $("body").get()[0];
    self.scrollBarsHidden = false;
    self.showScrollBarTimer = "";
}
AJKWindowResizeEvent.prototype = 
{
    init : function(){
        var self = this;
        var viewportSize = AJKHelpers.viewportSize();
        self.lastWindowSize.width = viewportSize.width;
        self.lastWindowSize.height = viewportSize.height;
        $(window).resize(function(){
            self.informObservers();
            self.hideScrollBars();
        });
        return self;
    },
    hideScrollBars : function(){
        var self = this;
        if( ! self.scrollBarsHidden){
            $(self.domBody).addClass("tl-overflow-hidden");
            self.scrollBarsHidden = true;
        }
        if(self.showScrollBarTimer){
            clearTimeout(self.showScrollBarTimer);
        }
        self.showScrollBarTimer = setTimeout(function(){
            $(self.domBody).removeClass("tl-overflow-hidden");
            self.scrollBarsHidden = false;
        }, 200);
    },
    informObservers : function(){
        var self = this;
        var informFunc = function(){
            var viewportSize = AJKHelpers.viewportSize();
            viewportSize.width = (viewportSize.width) ? viewportSize.width : 1;
            viewportSize.height = (viewportSize.height) ? viewportSize.height : 1;
            if( ! (viewportSize.width == self.lastWindowSize.width && viewportSize.height == self.lastWindowSize.height)){
                self.lastWindowSize.width = viewportSize.width;
                self.lastWindowSize.height = viewportSize.height;
                $.each(self.observers, function(){
                    this.windowDidResize({
                        newSize : viewportSize
                    });
                });
            }
        }
        if($.browser.msie){
            setTimeout(function(){
                informFunc();
            }, 500);
        }
        else{
            informFunc();
        }
    },
    registerAsObserver : function(dataObj){
        var self = this;
        var observer = dataObj.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        })
        self.observers.push(observer);
    },
    removeAsObserver : function(dataObj){
        var self = this;
        var observer = dataObj.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        })
    }
}
var AJKMouseMoveEvent = function(){
    this.observers = new Array();
    this.active = false;
    this.observersOfType = new Array();
    return this;
}
AJKMouseMoveEvent.prototype = 
{
    init : function(){
        var self = this;
        return self;
    },
    startEvent : function(){
        var self = this;
        $(document).bind("mousemove", function(e){
            e.preventDefault();
            var mousePos = self.getMousePos({
                event : e
            });
            self.informObserversOfMouseMove({
                coords : mousePos
            });
            return false;
        }).bind("mouseup", function(e){
            var mousePos = self.getMousePos({
                event : e
            });
            self.informObserversOfMouseUp({
                coords : mousePos
            });
        });
        self.active = true;
    },
    getMousePos : function(dataObj){
        var self = this;
        var event = dataObj.event;
        xPos = yPos = false;
        if(document.layers){
            xPos = event.x;
            yPos = event.y;
        }
        else if(document.all){
            xPos = window.event.clientX;
            yPos = window.event.clientY;
        }
        else if(document.getElementById){
            xPos = event.clientX;
            yPos = event.clientY;
        }
        return {
            x : xPos,
            y : yPos
        };
    },
    endEvent : function(){
        var self = this;
        $(document).unbind("mousemove");
        self.active = false;
    },
    informObserversOfMouseMove : function(dataObj){
        var self = this;
        var coords = dataObj.coords;
        $.each(self.observers, function(){
            this.mouseDidMove({
                coords : coords
            });
        });
    },
    informObserversOfMouseUp : function(dataObj){
        var self = this;
        var coords = dataObj.coords;
        $.each(self.observers, function(){
            this.mouseDidUp({
                coords : coords
            });
        });
    },
    registerAsObserver : function(dataObj){
        var self = this;
        var observer = dataObj.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        })
        self.observers.push(observer);
        if( ! self.active){
            self.startEvent();
        }
    },
    removeAsObserver : function(dataObj){
        var self = this;
        var observer = dataObj.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        });
        if(self.observers.length == 0){
            self.endEvent();
        }
    },
    registerAsObserverOfType : function(dataObj){
        var self = this;
        var observer = dataObj.observer;
        var type = dataObj.type;
        if( ! self.observersOfType[type]){
            self.observersOfType[type] = new Array();
        }
        else{
            self.observersOfType[type] = AJKHelpers.removeItemFromArray({
                anArray : self.observersOfType[type],
                item : observer
            });
        }
        self.observersOfType[type].push(observer);
    },
    removeAsObserverOfType : function(dataObj){
        var self = this;
        var observer = dataObj.observer;
        var type = dataObj.type;
        if(self.observersOfType[type]){
            self.observersOfType[type] = AJKHelpers.removeItemFromArray({
                anArray : self.observersOfType[type],
                item : observer
            });
        }
    }
}
var AJKWindowBlurEvent = function(){
    var self = this;
    self.observers = new Array();
    self.domBody = $("body").get()[0];
    self.postMessageAvailable = (window.postMessage) ? true : false;
}
AJKWindowBlurEvent.prototype = 
{
    init : function(){
        var self = this;
        return self;
    },
    startEvent : function(){
        var self = this;
        if( ! self.postMessageAvailable){
            $(self.domBody).bind("mouseleave", function(){
                self.informObserversOfBlur();
            });
        }
        else{
            $(window).bind("blue", function(){
                self.informObserversOfBlur();
            });
        }
    },
    endEvent : function(){
        var self = this;
        if( ! self.postMessageAvailable){
            $(self.domBody).unbind("mouseleave");
        }
        else{
            $(window).unbind("blur");
        }
    },
    informObserversOfBlur : function(){
        var self = this;
        $.each(self.observers, function(){
            if(this.windowDidBlur){
                this.windowDidBlur();
            }
        });
    },
    registerAsObserver : function(dataObj){
        var self = this;
        var observer = dataObj.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        })
        self.observers.push(observer);
        if( ! self.active){
            self.startEvent();
        }
    },
    removeAsObserver : function(dataObj){
        var self = this;
        var observer = dataObj.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        });
        if(self.observers.length == 0){
            self.endEvent();
        }
    }
}
var AJKDraggable = function(dataObj){
    this.domDragEl = dataObj.domDragEl;
    this.clone = dataObj.clone;
    this.limitFunc = dataObj.limitFunc;
    this.dragDidStartFunc = dataObj.dragDidStartFunc;
    this.dragDidEndFunc = dataObj.dragDidEndFunc;
    this.limits = "";
    this.offsetInEl = 
    {
        x : 0,
        y : 0
    };
    this.localStartCoords = 
    {
        x : 0,
        y : 0
    };
    this.startMousePos = 
    {
        x : 0,
        y : 0
    };
    this.domDraggable = "";
    this.mouseMoveFunc = dataObj.mouseMoveFunc;
    this.type = dataObj.type;
    this.data = (dataObj.data) ? (dataObj.data) : "";
    this.owner = (dataObj.owner) ? (dataObj.owner) : "";
    this.cloneClass = dataObj.cloneClass;
    this.savedCoords = "";
}
AJKDraggable.cancelClick = false;
AJKDraggable.prototype = 
{
    init : function(){
        var self = this;
        $(self.domDragEl).mousedown(function(e){
            self.initiateDrag({
                event : e
            });
        });
        return self;
    },
    kill : function(){
        var self = this;
        $(self.domDragEl).unbind();
        theAJKMouseMoveEvent.removeAsObserver({
            observer : self
        });
        theAJKWindowBlurEvent.removeAsObserver({
            observer : self
        });
    },
    initiateDrag : function(dataObj){
        var self = this;
        var event = dataObj.event;
        self.currentlyDragging = true;
        self.domDraggable = (self.clone) ? $(this.domDragEl).clone().get()[0] : this.domDragEl;
        if(self.cloneClass){
            $(self.domDraggable).addClass(self.cloneClass);
        }
        $(self.domDraggable).addClass("rt-draggable");
        AJKHelpers.cancelSelectionOnDomEl({
            domEl : self.domDraggable
        });
        self.startMousePos = theAJKMouseMoveEvent.getMousePos({
            event : event
        });
        self.savedCoords = self.startMousePos;
        var itemPos = AJKHelpers.getCoordsOfDomEl({
            domEl : self.domDragEl
        });
        self.offsetInEl = 
        {
            x : self.startMousePos.x - itemPos.x,
            y : self.startMousePos.y - itemPos.y
        };
        if(self.type && theAJKMouseMoveEvent.observersOfType[self.type]){
            $.each(theAJKMouseMoveEvent.observersOfType[self.type], function(){
                if(this.dragDidStart){
                    this.dragDidStart({
                        coords : self.startMousePos,
                        data : self.data
                    });
                }
            });
        }
        if(self.clone){
            $(self.domDraggable).css({
                width : $(this.domDragEl).width(),
                left : itemPos.x,
                top : itemPos.y,
                position : "fixed",
                opacity : 0.7
            });
            $("body").append(self.domDraggable);
        }
        self.localStartCoords = 
        {
            x : parseInt($(self.domDraggable).css("left")),
            y : parseInt($(self.domDraggable).css("top"))
        }
        self.limits = (self.limitFunc) ? self.limitFunc() : "";
        theAJKMouseMoveEvent.registerAsObserver({
            observer : self
        });
        theAJKWindowBlurEvent.registerAsObserver({
            observer : self
        });
        if(self.dragDidStartFunc){
            self.dragDidStartFunc();
        }
    },
    windowDidBlur : function(){
        var self = this;
        self.mouseDidUp({
            coords : self.savedCoords
        });
    },
    endDrag : function(dataObj){
        var self = this;
        var coords = dataObj.coords;
        var useStandardDragEndAnimation = dataObj.useStandardDragEndAnimation;
        theAJKMouseMoveEvent.removeAsObserver({
            observer : self
        });
        theAJKWindowBlurEvent.removeAsObserver({
            observer : self
        });
        if(this.clone){
            if(useStandardDragEndAnimation){
                var distance = (self.localStartCoords.x - coords.x) * (self.localStartCoords.x - coords.x);
                distance += (self.localStartCoords.y - coords.y) * (self.localStartCoords.y - coords.y)
                var duration = parseInt(Math.sqrt(parseInt(distance))) * 1.5;
                duration = (duration < 250) ? 250 : duration;
                duration = (duration > 500) ? 500 : duration;
                $(self.domDraggable).animate({
                    left : self.localStartCoords.x,
                    top : self.localStartCoords.y
                }, duration, function(){
                    $(this).removeClass("rt-draggable");
                    $(this).remove();
                });
            }
            else{
                $(self.domDraggable).animate({
                    opacity : 0
                }, 400, function(){
                    $(this).remove();
                });
            }
        }
        if(self.dragDidEndFunc){
            self.dragDidEndFunc();
        }
    },
    mouseDidUp : function(dataObj){
        var self = this;
        var coords = dataObj.coords;
        var useStandardDragEndAnimation = true;
        if(self.type && theAJKMouseMoveEvent.observersOfType[self.type]){
            $.each(theAJKMouseMoveEvent.observersOfType[self.type], function(){
                if(this.dragDidEnd && this.dragDidEnd({
                    coords : coords,
                    data : self.data,
                    owner : self.owner,
                    type : self.type
                })){
                    useStandardDragEndAnimation = false;
                }
            });
        }
        self.endDrag({
            useStandardDragEndAnimation : useStandardDragEndAnimation,
            coords : coords
        });
        setTimeout(function(){
            AJKDraggable.cancelClick = false;
        }, 1);
    },
    mouseDidMove : function(dataObj){
        var self = this;
        var newMouseCoords = dataObj.coords;
        AJKDraggable.cancelClick = true;
        var newPos = 
        {
            x : newMouseCoords.x - self.startMousePos.x + self.localStartCoords.x,
            y : newMouseCoords.y - self.startMousePos.y + self.localStartCoords.y
        }
        if(self.limits){
            if(self.limits.maxX >= self.limits.minX){
                newPos.x = (newPos.x < self.limits.minX) ? self.limits.minX : newPos.x;
                newPos.x = (newPos.x > self.limits.maxX) ? self.limits.maxX : newPos.x;
            }
            else{
                newPos.x = (newPos.x > self.limits.minX) ? self.limits.minX : newPos.x;
                newPos.x = (newPos.x < self.limits.maxX) ? self.limits.maxX : newPos.x;
            }
            if(self.limits.maxY >= self.limits.minY){
                newPos.y = (newPos.y < self.limits.minY) ? self.limits.minY : newPos.y;
                newPos.y = (newPos.y > self.limits.maxY) ? self.limits.maxY : newPos.y;
            }
            else{
                newPos.y = (newPos.y > self.limits.minY) ? self.limits.minY : newPos.y;
                newPos.y = (newPos.y < self.limits.maxY) ? self.limits.maxY : newPos.y;
            }
        }
        self.savedCoords = newMouseCoords;
        var timeoutTime = ($.browser.msie) ? 10 : 0;
        setTimeout(function(){
            $(self.domDraggable).css({
                top : newPos.y,
                left : newPos.x
            });
            if(self.mouseMoveFunc){
                self.mouseMoveFunc({
                    dragElPos : newPos
                });
            }
            if(self.type && theAJKMouseMoveEvent.observersOfType[self.type]){
                $.each(theAJKMouseMoveEvent.observersOfType[self.type], function(){
                    if(this.dragDidMove){
                        this.dragDidMove({
                            coords : newMouseCoords,
                            data : self.data
                        });
                    }
                });
            }
        }, timeoutTime);
    }
}
var AJKMouseScrollEvent = function(data){
    this.observers = new Array();
    this.active = false;
    this.observersOfType = new Array();
    this.preventCallback = false;
    this.disableScrollPropagation = data.disableScrollPropagation;
    return this;
}
AJKMouseScrollEvent.prototype = 
{
    init : function(){
        var self = this;
        $("body").mousewheel(function(event, delta){
            self.informObserversOfScroll({
                delta : delta
            });
            if(self.disableScrollPropagation){
                return false;
            }
        });
        return self;
    },
    informObserversOfScroll : function(data){
        var self = this;
        var delta = data.delta;
        delta = (delta > 1) ? 1 : delta;
        delta = (delta < -1) ? -1 : delta;
        $.each(self.observers, function(){
            if(((this.onlyMouseScrollIfAlone && self.observers.length == 1) || !this.onlyMouseScrollIfAlone) && this.mouseDidScroll && !self.preventCallback){
                this.mouseDidScroll({
                    delta : delta
                });
            }
        });
    },
    registerAsObserver : function(data){
        var self = this;
        var observer = data.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        })
        self.observers.push(observer);
        self.preventCallback = false;
    },
    removeAsObserver : function(data){
        var self = this;
        var observer = data.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        });
        if(self.observers.length == 1){
            this.preventCallback = true;
            setTimeout(function(){
                self.preventCallback = false;
            }, 500);
        }
    }
}
var TLSettings = function(){
    var self = this;
    self.observers = new Array();
    self.currentDate = new Date();
    self.visibleStartDate = "";
    self.visibleEndDate = "";
    self.visibleDateRange = "";
    self.windowSize = AJKHelpers.viewportSize();
    self.animateTime = 1000;
    self.onlyMouseScrollIfAlone = true;
    self.lastSelectedStory = "";
    self.flickrApiKey = "1eed7e0b716c8554acfe67108c57952e";
    self.flickrReplacementImage = "gif/flickr-r2.gif";
}
TLSettings.prototype = 
{
    sliderDraggerMinWidth : 36,
    init : function(){
        var self = this;
        theAJKWindowResizeEvent.registerAsObserver({
            observer : self
        });
        theAJKMouseScrollEvent.registerAsObserver({
            observer : self
        });
        return self;
    },
    limitDateToRange : function(data){
        var self = this;
        var aDate = data.aDate;
        aDate = (aDate.getTime() < self.visibleStartDate.getTime()) ? self.visibleStartDate : aDate;
        aDate = (aDate.getTime() > self.visibleEndDate.getTime()) ? self.visibleEndDate : aDate;
        return aDate;
    },
    mouseDidScroll : function(data){
        var self = this;
        var delta = -data.delta;
        var dateRange = self.visibleEndDate.getTime() - self.visibleStartDate.getTime();
        var change = delta / 50 * dateRange / 2;
        var newDate = new Date(self.currentDate.getTime() + change);
        newDate = self.limitDateToRange({
            aDate : newDate
        });
        if($.browser.msie){
            setTimeout(function(){
                self.setCurrentDate({
                    date : newDate
                });
            }, 50);
        }
        else{
            setTimeout(function(){
                self.setCurrentDate({
                    date : newDate
                });
            }, 1);
        }
        self.lastSelectedStory = "";
    },
    windowDidResize : function(data){
        var self = this;
        self.windowSize = data.newSize;
    },
    setCurrentDate : function(data){
        var self = this;
        var date = data.date;
        var extraInfo = data.extraInfo;
        self.currentDate = new Date(date.getTime());
        if(self.observers["currentDate"]){
            $.each(self.observers["currentDate"], function(){
                if(this.currentDateWasUpdatedTo){
                    this.currentDateWasUpdatedTo({
                        date : self.currentDate,
                        extraInfo : extraInfo
                    });
                }
            });
        }
    },
    ensureCurrentDateIsWithinVisibleRange : function(){
        var self = this;
        self.currentDate = self.limitDateToRange({
            aDate : self.currentDate
        });
    },
    timeInfo : 
    {
        start : "",
        end : "",
        msecs : "",
        secs : "",
        mins : "",
        hours : "",
        days : "",
        months : "",
        years : "",
        decades : ""
    },
    registerAsObserver : function(data){
        var self = this;
        var type = data.type;
        var observer = data.observer;
        if( ! self.observers[type]){
            self.observers[type] = new Array();
        }
        self.observers[type] = AJKHelpers.removeItemFromArray({
            anArray : self.observers[type],
            item : observer
        })
        self.observers[type].push(observer);
    },
    removeAsObserver : function(data){
        var self = this;
        var type = data.type;
        var observer = data.observer;
        if(self.observers[type]){
            self.observers[type] = AJKHelpers.removeItemFromArray({
                anArray : self.observers[type],
                item : observer
            });
        }
    }
}
var TLSliderController = function(data){
    var self = this;
    self.items = data.items;
    self.startDate = data.startDate;
    self.endDate = data.endDate;
    self.dateRange = this.endDate.getTime() - this.startDate.getTime();
    self.getStageWidth = data.getStageWidth;
    self.timeline = data.timeline;
    self.width = theTLSettings.windowSize.width;
    self.scaleToSliderWidthRatio = 1.5;
    self.sliderScaleWidth = this.width * this.scaleToSliderWidthRatio;
    self.scaleLeftOffset = 0;
    self.numSectionsPerScale = 30;
    self.sliderScaleSectionWidth = this.sliderScaleWidth / this.numSectionsPerScale;
    self.sliderScaleFirstSectionPosition = 0;
    self.scaleTimesTextHasBeenDisplayed
    self.displayTimeEveryXScales = 3;
    self.scaleTimeTextHolderWidth = 100;
    self.domRoot = $("#tl-slider-holder").get()[0];
    self.domScaleTimesHolder = $("#tl-slider-scale-times-holder").get()[0];
    self.domMarkersHolder = $("#tl-slider-markers-holder").get()[0];
    self.domDragger = $("#tl-slider-dragger").get()[0];
    self.domScale = $("#tl-slider-scale").get()[0];
    self.domScaleCanvas = $("#tl-slider-scale canvas").get()[0];
    self.scaleCanvas = "";
    self.markerHeight = 15;
    self.markerHeightVariation = 10;
    self.dragger = "";
    self.currentlyAnimating = false;
    self.storyWhoseToolTipIsOpen = "";
    self.domMarkerPointsHolder = "";
}
TLSliderController.prototype = 
{
    init : function(){
        var self = this;
        theAJKWindowResizeEvent.registerAsObserver({
            observer : self
        });
        theTLSettings.registerAsObserver({
            type : "currentDate",
            observer : self
        });
        self.setUpScale();
        self.initialiseDragger();
        self.calibrateScale();
        setTimeout(function(){
            $(self.domRoot).css({
                visibility : "visible"
            });
        }, 1);
        return self;
    },
    destroy : function(){
        var self = this;
        theAJKWindowResizeEvent.removeAsObserver({
            observer : self
        });
        theTLSettings.removeAsObserver({
            type : "currentDate",
            observer : self
        });
        self.dragger.kill();
        $(self.domScale).unbind();
        $(self.domMarkerPointsHolder).remove();
    },
    calibrateScale : function(){
        var self = this;
        var vStartDate = self.startDate.getTime() + (0.5 * self.dragger.width) / self.sliderScaleWidth * self.dateRange;
        var vEndDate = self.startDate.getTime() + (self.sliderScaleWidth - (0.5 * self.dragger.width)) / self.sliderScaleWidth * self.dateRange;
        theTLSettings.visibleStartDate = new Date(vStartDate);
        theTLSettings.visibleEndDate = new Date(vEndDate);
        theTLSettings.visibleDateRange = theTLSettings.visibleEndDate - theTLSettings.visibleStartDate;
        theTLSettings.ensureCurrentDateIsWithinVisibleRange();
    },
    initialiseDragger : function(){
        var self = this;
        self.dragger = new TLSliderDragger({
            domEl : self.domDragger,
            getStageWidth : self.getStageWidth,
            getSliderWidth : function(){
                return self.width;
            },
            getSliderScaleWidth : function(){
                return self.sliderScaleWidth;
            },
            dragCallback : function(data){
                var xPos = data.xPos;
                var dateFraction = (self.width > self.dragger.width) ? xPos / (self.width - self.dragger.width) : 0;
                var newDate = new Date(theTLSettings.visibleStartDate.getTime() + dateFraction * theTLSettings.visibleDateRange);
                theTLSettings.setCurrentDate({
                    date : newDate
                });
            }
        }).init();
    },
    currentDateWasUpdatedTo : function(data){
        var self = this;
        var currentDate = data.date;
        var animate = (data.extraInfo) ? data.extraInfo.animate : false;
        self.setScalePositionForDate({
            date : currentDate,
            animate : animate
        });
        self.setDraggerPositionForDate({
            date : currentDate,
            animate : animate
        });
    },
    setDraggerPositionForDate : function(data){
        var self = this;
        var date = data.date;
        var animate = data.animate;
        var dateFraction = (date.getTime() - theTLSettings.visibleStartDate.getTime()) / theTLSettings.visibleDateRange;
        var xPos = dateFraction * (self.width - self.dragger.width);
        self.dragger.setLeftPosition({
            pos : xPos,
            animate : animate
        });
    },
    setScalePositionForDate : function(data){
        var self = this;
        var date = data.date;
        var fraction = (date.getTime() - theTLSettings.visibleStartDate.getTime()) / theTLSettings.visibleDateRange;
        self.scaleLeftOffset = -parseInt(fraction * (self.sliderScaleWidth - self.width));
        var animate = data.animate;
        var animTime = (animate) ? theTLSettings.animateTime : 0;
        $(self.domScale).stop().animate({
            left : self.scaleLeftOffset
        }, animTime);
    },
    convertDateToFraction : function(data){
        var self = this;
        var aDate = data.date;
        return(aDate.getTime() - self.startDate.getTime()) / self.dateRange;
    },
    convertFractionToDate : function(data){
        var self = this;
        var fraction = data.fraction;
        var newDate = new Date();
        newDate.setTime(self.startDate.getTime() + self.dateRange * fraction);
        return newDate;
    },
    setUpScale : function(){
        var self = this;
        if(self.getStageWidth() / self.width < 3){
            self.scaleToSliderWidthRatio = 1;
        }
        self.sliderScaleWidth = self.width * self.scaleToSliderWidthRatio;
        $(self.domScale).width(self.sliderScaleWidth);
        self.scaleCanvas = self.domScaleCanvas.getContext('2d');
        self.displayCanvasScale();
        self.displayMarkers();
        $(self.domScale).click(function(e){
            if(self.storyWhoseToolTipIsOpen){
                self.storyWhoseToolTipIsOpen.hideToolTip();
                self.storyWhoseToolTipIsOpen = "";
            }
            if(self.currentlyAnimating){
                return false;
            }
            self.currentlyAnimating = true;
            var clickLeftOffset = AJKHelpers.getMousePos({
                event : e
            }).x;
            var scaleOffset = clickLeftOffset - self.scaleLeftOffset;
            var fraction = (scaleOffset) / self.sliderScaleWidth;
            var newDate = self.convertFractionToDate({
                fraction : fraction
            });
            newDate = theTLSettings.limitDateToRange({
                aDate : newDate
            });
            theTLSettings.setCurrentDate({
                date : newDate,
                extraInfo : 
                {
                    animate : true
                }
            });
            setTimeout(function(){
                self.currentlyAnimating = false;
            }, theTLSettings.aminateSpeed + 5);
            return false;
        }).mouseover(function(e){
            var domSliderMarker = AJKHelpers.getSelfOrFirstParantOfClass({
                domEl : e.target,
                className : "tl-s-marker"
            });
            if(domSliderMarker){
                var key = $(domSliderMarker).attr("markerKey");
                var relatedStory = theTLMainController.markersByKey[key];
                if( ! self.dragger.beingDragged){
                    self.storyWhoseToolTipIsOpen = relatedStory;
                    relatedStory.showToolTip({
                        sliderScaleWidth : self.sliderScaleWidth,
                        scaleLeftOffset : self.scaleLeftOffset,
                        sliderWidth : self.width
                    });
                }
            }
        }).mouseout(function(e){
            var domSliderMarker = AJKHelpers.getSelfOrFirstParantOfClass({
                domEl : e.target,
                className : "tl-s-marker"
            });
            if(domSliderMarker){
                var key = $(domSliderMarker).attr("markerKey");
                var relatedStory = theTLMainController.markersByKey[key];
                relatedStory.hideToolTip();
                self.storyWhoseToolTipIsOpen = "";
            }
        });
    },
    displayMarkers : function(){
        var self = this;
        var domDiv = $("<div></div>").get()[0];
        self.domMarkerPointsHolder = domDiv;
        $.each(self.items, function(){
            var domPoint = self.createDomPointForMarker({
                marker : this
            });
            $(domDiv).append(domPoint);
        });
        $(self.domMarkersHolder).append(domDiv);
    },
    replacePointOfMarker : function(data){
        var self = this;
        var marker = data.marker;
        $(marker.domSliderPoint).remove();
        var domPoint = self.createDomPointForMarker({
            marker : marker
        });
        $(self.domMarkerPointsHolder).append(domPoint);
    },
    addPointToScale : function(data){
        var self = this;
        var marker = data.marker;
        var domMarker = self.createDomPointForMarker({
            marker : marker
        });
        $(self.domMarkerPointsHolder).append(domMarker);
    },
    createDomPointForMarker : function(data){
        var self = this;
        var marker = data.marker;
        var isLine = ((marker.startDate.getTime() != marker.endDate.getTime()) && self.timeline.viewType == "duration") ? true : false;
        if(isLine){
            var insertHTML = '<div class="tl-s-marker tl-s-marker-line" markerKey="' + marker.markerKey + '" style="background-color:#' + marker.category.colour + ';"></div>';
            var domMarker = $(insertHTML).get()[0];
        }
        else if($.browser.msie){
            var insertHTML = '<div class="tl-s-ie-marker tl-s-marker" markerKey="' + marker.markerKey + '">';
            insertHTML += '<div style="background-color:#' + marker.category.colour + ';" class="tl-s-ie-marker-vertical"></div>';
            insertHTML += '<div style="background-color:#' + marker.category.colour + ';" class="tl-s-ie-marker-horizontal"></div>';
            insertHTML += '</div>';
            var domMarker = $(insertHTML).get()[0];
        }
        else{
            var domMarker = $('<canvas width="15" height="15" class="tl-s-marker" markerKey="' + marker.markerKey + '"></canvas>').get()[0];
            var ctx = domMarker.getContext('2d');
            var rgbColour = AJKHelpers.convertHexColourToRGB({
                hexColour : marker.category.colour
            });
            var rgbText = 'rgba(' + rgbColour.r + ',' + rgbColour.g + ',' + rgbColour.b + ',0)'
            var radgrad = ctx.createRadialGradient(7.5, 7.5, 0, 7.5, 7.5, 6);
            radgrad.addColorStop(0, "#" + marker.category.colour);
            radgrad.addColorStop(0.95, rgbText);
            ctx.fillStyle = radgrad;
            ctx.fillRect(0, 0, 15, 15);
        }
        if(isLine){
            var leftOffset = marker.leftOffset / self.getStageWidth() * 100;
            var lineWidth = marker.durationBarWidth / self.getStageWidth() * 100;
        }
        else if(self.timeline.markerSpacing == "equal"){
            var leftOffset = marker.leftOffset / self.getStageWidth() * 100;
        }
        else{
            var leftOffset = self.getLeftOffsetPercentForDate({
                date : marker.startDate
            });
        }
        if(isLine){
            var topOffset = parseInt(self.markerHeightVariation + self.markerHeight - 5) - parseInt(marker.verticalPos / 10 * (self.markerHeightVariation + self.markerHeight - 5));
        }
        else if(self.timeline.viewType == "duration" || self.timeline.markerSpacing == "top-to-bottom"){
            var topOffset = parseInt(self.markerHeight / 2) + self.markerHeightVariation - parseInt(marker.verticalPos / 10 * self.markerHeightVariation);
        }
        else{
            var topOffset = parseInt(self.markerHeight / 2) + Math.floor(Math.random() * self.markerHeightVariation);
        }
        $(domMarker).css({
            left : leftOffset + "%",
            top : topOffset + "px"
        });
        if(isLine){
            $(domMarker).css({
                width : lineWidth + "%"
            });
        }
        marker.setSliderPointPosition({
            position : 
            {
                left : leftOffset,
                top : topOffset
            }
        });
        marker.setDomSliderPoint({
            domEl : domMarker
        });
        marker.setDomTooltipDomContainer({
            domEl : self.domRoot
        });
        return domMarker;
    },
    getLeftOffsetPercentForDate : function(data){
        var self = this;
        var date = data.date;
        var startTimeNum = self.startDate.getTime();
        var diff = self.endDate.getTime() - startTimeNum;
        var leftOffset = (date.getTime() - startTimeNum) / diff * 100;
        return leftOffset;
    },
    displayCanvasScale : function(){
        var self = this;
        var generateYearScales = function(data){
            var yearsPerSection = data.yearsPerSection;
            self.sliderScaleSectionWidth = self.sliderScaleWidth / (theTLSettings.timeInfo.years) * yearsPerSection;
            var yearRounding = (self.timeline.markerSpacing == "equal") ? 1 : yearsPerSection;
            var tempDate = AJKHelpers.getEmptyDate();
            tempDate.setTime(theTLSettings.timeInfo.start.getTime());
            tempDate = AJKHelpers.getFirstDayOfYearDateForDate({
                date : tempDate
            });
            var tmpFullYear = tempDate.getFullYear();
            if(tmpFullYear >= 0){
                tempDate.setFullYear(tmpFullYear - (tmpFullYear % yearsPerSection));
            }
            else{
                tempDate.setFullYear( - (Math.abs(tmpFullYear) + yearsPerSection - (Math.abs(tmpFullYear) % yearsPerSection)));
            }
            self.sliderScaleFirstSectionPosition = self.convertDateToFraction({
                date : tempDate
            }) * self.sliderScaleWidth;
            self.sliderScaleOffsetAdjust = 0;
            self.sliderScaleSectionPts = (yearsPerSection < 5) ? 24 : 20;
            self.scaleDateFormaterMain = function(data){
                var aDate = data.date;
                var fullYear = aDate.getFullYear();
                if(aDate.getMonth() == 11){
                    aDate.setMonth(0);
                    aDate.setFullYear( ++ fullYear);
                }
                var inc = (fullYear > 0) ? 1 : -1;
                if(yearRounding >= 2){
                    fullYear = parseInt((fullYear + inc) / yearRounding) * yearRounding;
                }
                aDate.setFullYear(fullYear);
                if(self.timeline.sliderDateFormat != "auto"){
                    return AJKHelpers.formatDate({
                        date : aDate,
                        formatString : self.timeline.sliderDateFormat
                    });
                }
                else{
                    return AJKHelpers.formatFullYearForDate({
                        date : aDate
                    });
                }
            }
        }
        var generateMonthScales = function(data){
            var monthsPerSection = data.monthsPerSection;
            self.sliderScaleSectionWidth = self.sliderScaleWidth / (theTLSettings.timeInfo.months) * monthsPerSection;
            var tempDate = AJKHelpers.getEmptyDate();
            tempDate.setTime(theTLSettings.timeInfo.start.getTime());
            tempDate = AJKHelpers.getFirstDayOfMonthDateForDate({
                date : tempDate
            });
            tempDate.setMonth(0);
            self.sliderScaleFirstSectionPosition = self.convertDateToFraction({
                date : tempDate
            }) * self.sliderScaleWidth;
            self.sliderScaleOffsetAdjust = (theTLSettings.timeInfo.years < 1) ? 10 : 8;
            self.sliderScaleSectionPts = (theTLSettings.timeInfo.years > 0.8) ? 16 : 30;
            self.scaleDateFormaterMain = function(data){
                var aDate = data.date;
                if(self.timeline.sliderDateFormat != "auto"){
                    return AJKHelpers.formatDate({
                        date : aDate,
                        formatString : self.timeline.sliderDateFormat
                    });
                }
                if(self.timeline.markerSpacing == "equal"){
                    return aDate.getDate() + " " + AJKHelpers.dateMonthsShortArray[aDate.getMonth()];
                }
                else if( ! aDate.getMonth()){
                    return AJKHelpers.dateMonthsShortArray[aDate.getMonth()] + " " + aDate.getFullYear();
                }
                else{
                    return AJKHelpers.dateMonthsShortArray[aDate.getMonth()];
                }
            }
        }
        var generateDayScales = function(data){
            var daysPerSection = data.daysPerSection;
            self.sliderScaleSectionWidth = self.sliderScaleWidth / (theTLSettings.timeInfo.days) * daysPerSection;
            var tempDate = AJKHelpers.getEmptyDate();
            tempDate.setTime(theTLSettings.timeInfo.start.getTime());
            tempDate.setHours(0);
            tempDate.setMinutes(0);
            tempDate.setSeconds(0);
            self.sliderScaleFirstSectionPosition = self.convertDateToFraction({
                date : tempDate
            }) * self.sliderScaleWidth;
            self.sliderScaleOffsetAdjust = 0;
            self.sliderScaleSectionPts = 24;
            self.scaleDateFormaterMain = function(data){
                var aDate = data.date;
                if(self.timeline.sliderDateFormat != "auto"){
                    return AJKHelpers.formatDate({
                        date : aDate,
                        formatString : self.timeline.sliderDateFormat
                    });
                }
                if( ! aDate.getHours() || daysPerSection >= 1){
                    if(aDate.getHours() > 20 && self.timeline.markerSpacing != "equal"){
                        aDate.setTime(aDate.getTime() + AJKHelpers.dateOneDayInMS);
                        aDate.setHours(0);
                    }
                    return aDate.getDate() + " " + AJKHelpers.dateMonthsShortArray[aDate.getMonth()] + " " + aDate.getFullYear();
                }
                else{
                    return AJKHelpers.formatDate({
                        date : aDate,
                        formatString : "HH:00"
                    });
                }
            }
        }
        var generateHourScales = function(data){
            var hoursPerSection = data.hoursPerSection;
            self.sliderScaleSectionWidth = self.sliderScaleWidth / (theTLSettings.timeInfo.hours) * hoursPerSection;
            var tempDate = AJKHelpers.getEmptyDate();
            tempDate.setTime(theTLSettings.timeInfo.start.getTime());
            tempDate.setMinutes(0);
            tempDate.setSeconds(0);
            tempDate.setMilliseconds(0);
            self.sliderScaleFirstSectionPosition = self.convertDateToFraction({
                date : tempDate
            }) * self.sliderScaleWidth;
            self.sliderScaleOffsetAdjust = 0;
            self.sliderScaleSectionPts = 24;
            self.scaleDateFormaterMain = function(data){
                var aDate = data.date;
                if(self.timeline.sliderDateFormat != "auto"){
                    return AJKHelpers.formatDate({
                        date : aDate,
                        formatString : self.timeline.sliderDateFormat
                    });
                }
                if(aDate.getHours() == 0 && aDate.getMinutes() == 0){
                    return aDate.getDate() + " " + AJKHelpers.dateMonthsShortArray[aDate.getMonth()] + " " + aDate.getFullYear();
                }
                else{
                    return AJKHelpers.formatDate({
                        date : aDate,
                        formatString : "HH:mm"
                    });
                }
            }
        }
        var scaleExpansionArray = [1, 2, 5, 10];
        if(theTLSettings.timeInfo.years > 150){
            var yearsPerSection = Math.round(theTLSettings.timeInfo.years / 10);
            if(yearsPerSection >= 100){
                yearsPerSection = parseInt(yearsPerSection / 100) * 100;
            }
            if(yearsPerSection >= 50){
                yearsPerSection = parseInt(yearsPerSection / 50) * 50;
            }
            if(yearsPerSection >= 25){
                yearsPerSection = parseInt(yearsPerSection / 25) * 25;
            }
            else{
                yearsPerSection = parseInt(yearsPerSection / 10) * 10;
            }
            generateYearScales({
                yearsPerSection : yearsPerSection
            });
        }
        else if(theTLSettings.timeInfo.years > 75){
            generateYearScales({
                yearsPerSection : 10
            });
        }
        else if(theTLSettings.timeInfo.years > 30){
            generateYearScales({
                yearsPerSection : 5
            });
        }
        else if(theTLSettings.timeInfo.years > 15){
            generateYearScales({
                yearsPerSection : 2
            });
        }
        else if(theTLSettings.timeInfo.years > 4){
            generateYearScales({
                yearsPerSection : 1
            });
        }
        else if(theTLSettings.timeInfo.years > 2){
            generateMonthScales({
                monthsPerSection : 3
            });
        }
        else if(theTLSettings.timeInfo.years > 1.5){
            generateMonthScales({
                monthsPerSection : 2
            });
        }
        else if(theTLSettings.timeInfo.years > 0.5){
            generateMonthScales({
                monthsPerSection : 1
            });
        }
        else if(theTLSettings.timeInfo.years > 0.25){
            generateDayScales({
                daysPerSection : 12
            });
        }
        else if(theTLSettings.timeInfo.years > 0.125){
            generateDayScales({
                daysPerSection : 8
            });
        }
        else if(theTLSettings.timeInfo.years > 0.075){
            generateDayScales({
                daysPerSection : 4
            });
        }
        else if(theTLSettings.timeInfo.years > 0.05){
            generateDayScales({
                daysPerSection : 2
            });
        }
        else if(theTLSettings.timeInfo.years > 0.025){
            generateDayScales({
                daysPerSection : 2
            });
        }
        else if(theTLSettings.timeInfo.years > 0.01){
            generateDayScales({
                daysPerSection : 1
            });
        }
        else if(theTLSettings.timeInfo.years > 0.005){
            generateDayScales({
                daysPerSection : 0.5
            });
        }
        else if(theTLSettings.timeInfo.years > 0.001){
            generateDayScales({
                daysPerSection : 0.125
            });
        }
        else if(theTLSettings.timeInfo.hours > 5){
            generateHourScales({
                hoursPerSection : 1
            });
        }
        else if(theTLSettings.timeInfo.hours > 2){
            generateHourScales({
                hoursPerSection : 0.5
            });
        }
        else if(theTLSettings.timeInfo.hours > 1){
            generateHourScales({
                hoursPerSection : 0.125
            });
        }
        else{
            generateHourScales({
                hoursPerSection : 0.0625
            });
        }
        $(self.domScaleCanvas).css({
            backgroundColor : "#" + self.timeline.sliderBackgroundColour
        });
        $(theTLMainController.domMainHolder).css({
            backgroundColor : "#" + self.timeline.sliderBackgroundColour
        });
        $("html").css({
            backgroundColor : "#" + self.timeline.sliderBackgroundColour
        });
        $(self.domScaleCanvas).width(self.sliderScaleWidth);
        var canvasHeight = $(self.domScaleCanvas).height();
        $(self.domScaleCanvas).attr("height", canvasHeight);
        $(self.domScaleCanvas).attr("width", self.sliderScaleWidth);
        setTimeout(function(){
            self.dragger.updateColour({
                colour : self.timeline.sliderDraggerColour
            });
        }, 1);
        if($.browser.msie && theTLMainController && theTLMainController.minimumLayout){
            canvasHeight = 40;
        }
        var rgbDetails = AJKHelpers.convertHexColourToRGB({
            hexColour : self.timeline.sliderDetailsColour
        });
        self.scaleCanvas.fillStyle = "rgb(" + rgbDetails.r + "," + rgbDetails.g + "," + rgbDetails.b + ")";
        $(self.domRoot).css({
            borderBottomColor : "#" + self.timeline.sliderDetailsColour,
            borderTopColor : "#" + self.timeline.sliderDetailsColour
        });
        var counter = 0;
        var smallLineWidth = (self.sliderScaleSectionWidth < 0) ? 1 : 2;
        var bigLineWidth = (self.sliderScaleSectionWidth < 0) ? 1 : 2;
        if( ! self.scaleTimesTextHasBeenDisplayed){
            var domDiv = $("<div></div>").get()[0];
        }
        for(var offset = self.sliderScaleFirstSectionPosition; offset < (self.sliderScaleWidth + 50); offset += self.sliderScaleSectionWidth / self.sliderScaleSectionPts){
            if(counter % self.sliderScaleSectionPts == 0){
                self.scaleCanvas.fillRect(offset, canvasHeight - 14, bigLineWidth, 13);
                self.scaleCanvas.fillRect(offset, 0, bigLineWidth, 5);
                if( ! self.scaleTimesTextHasBeenDisplayed){
                    var aDate = AJKHelpers.getEmptyDate();
                    if(self.timeline.markerSpacing == "equal" && self.items.length > 0){
                        var datePos = (offset + self.sliderScaleOffsetAdjust) / self.sliderScaleWidth;
                        var aDate = self.getEquallySpacedDateForOffset({
                            offset : datePos
                        });
                    }
                    else{
                        aDate.setTime(theTLSettings.timeInfo.start.getTime() + Math.round((offset + self.sliderScaleOffsetAdjust) / self.sliderScaleWidth * theTLSettings.timeInfo.msecs));
                    }
                    var domTimer = $('<h5 style="color: #' + self.timeline.sliderTextColour + '">' + self.scaleDateFormaterMain({
                        date : aDate
                    }) + "</h5>").get()[0];
                    $(domTimer).css({
                        left : offset / self.sliderScaleWidth * 100 + "%"
                    });
                    $(domDiv).append(domTimer);
                }
            }
            else if(counter % (self.sliderScaleSectionPts / 2) == 0){
                self.scaleCanvas.fillRect(offset, canvasHeight - 11, smallLineWidth, 10);
            }
            else{
                self.scaleCanvas.fillRect(offset, canvasHeight - 8, smallLineWidth, 7);
            }
            counter ++ ;
        }
        if( ! self.scaleTimesTextHasBeenDisplayed){
            $(this.domScaleTimesHolder).empty().append(domDiv);
        }
        self.scaleTimesTextHasBeenDisplayed = true;
    },
    getEquallySpacedDateForOffset : function(data){
        var self = this;
        var offset = data.offset;
        var retDate = new Date();
        if(offset > 0){
            var numItems = self.items.length;
            var viewStageWidth = self.getStageWidth();
            var posAlongStage = offset * viewStageWidth;
            var lastFoundItem = false;
            for(var counter = 0; counter < numItems; counter ++ ){
                var thisItem = self.items[counter];
                if(posAlongStage < thisItem.leftOffset){
                    lastFoundItem = thisItem;
                    break;
                }
            }
            if(lastFoundItem){
                var prevItem = self.items[lastFoundItem.orderIndex - 1];
                if(prevItem){
                    var prevItemTime = prevItem.startDate.getTime();
                    var retDateTime = prevItemTime + (lastFoundItem.startDate.getTime() - prevItemTime) * ((posAlongStage - prevItem.leftOffset) / (lastFoundItem.leftOffset - prevItem.leftOffset));
                    retDate.setTime(retDateTime);
                }
                else{
                    var prevItemTime = theTLSettings.timeInfo.start.getTime();
                    var retDateTime = prevItemTime + (lastFoundItem.startDate.getTime() - prevItemTime) * ((posAlongStage - 0) / (lastFoundItem.leftOffset - 0));
                    retDate.setTime(retDateTime);
                }
            }
            else{
                var prevItem = self.items[self.items.length - 1];
                var nextItemTime = theTLSettings.timeInfo.end.getTime();
                var prevItemTime = prevItem.startDate.getTime();
                var retDateTime = prevItemTime + (nextItemTime - prevItemTime) * ((posAlongStage - prevItem.leftOffset) / (viewStageWidth - prevItem.leftOffset));
                retDate.setTime(retDateTime);
            }
        }
        return retDate;
    },
    windowDidResize : function(data){
        var self = this;
        self.width = data.newSize.width;
        if(self.getStageWidth() / self.width < 3){
            self.scaleToSliderWidthRatio = 1;
        }
        self.sliderScaleWidth = self.width * self.scaleToSliderWidthRatio;
        $(self.domScale).width(self.sliderScaleWidth);
        self.sliderScaleWidth = self.width * self.scaleToSliderWidthRatio;
        self.sliderScaleSectionWidth = self.sliderScaleWidth / this.numSectionsPerScale;
        self.displayCanvasScale();
        self.dragger.updateDraggerSize();
        self.calibrateScale();
        self.setScalePositionForDate({
            date : theTLSettings.currentDate
        });
        self.setDraggerPositionForDate({
            date : theTLSettings.currentDate
        });
    }
}
var TLSliderDragger = function(data){
    var self = this;
    self.domEl = data.domEl;
    self.domInner = $(data.domEl).find(".tlsd-inner").get()[0];
    self.domInnerInner = $(data.domEl).find(".tlsd-inner-inner").get()[0];
    self.getStageWidth = data.getStageWidth;
    self.getSliderWidth = data.getSliderWidth;
    self.getSliderScaleWidth = data.getSliderScaleWidth;
    self.width = 0;
    self.minWidth = theTLSettings.sliderDraggerMinWidth;
    self.dragCallback = data.dragCallback;
    self.padding = 15;
    self.beingDragged = false;
    self.draggable = "";
}
TLSliderDragger.prototype = 
{
    init : function(){
        var self = this;
        self.updateDraggerSize();
        var draggerTop = parseInt($(self.domEl).css("top"));
        self.draggable = new AJKDraggable({
            domDragEl : self.domEl,
            limitFunc : function(){
                var limit = 
                {
                    minX : 0,
                    maxX : self.getSliderWidth() - self.width,
                    minY : draggerTop,
                    maxY : draggerTop
                }
                return limit;
            },
            mouseMoveFunc : function(data){
                self.draggedToLeftPos(data);
            },
            dragDidStartFunc : function(){
                self.beingDragged = true;
                theTLSettings.lastSelectedStory = "";
            },
            dragDidEndFunc : function(){
                self.beingDragged = false;
            }
        }).init();
        return self;
    },
    updateColour : function(data){
        var self = this;
        var colour = "#" + data.colour;
        $(self.domInner).css({
            borderColor : colour
        });
        $(self.domInner).find(".tlsd-corner").css({
            backgroundColor : colour
        });
    },
    kill : function(){
        var self = this;
        self.draggable.kill();
    },
    draggedToLeftPos : function(data){
        var self = this;
        var dragElPos = data.dragElPos;
        self.dragCallback({
            xPos : dragElPos.x
        });
    },
    updateDraggerSize : function(){
        var self = this;
        self.width = parseInt(theTLSettings.windowSize.width / self.getStageWidth() * self.getSliderScaleWidth());
        self.width = parseInt(self.width / 2) * 2 + self.padding * 2;
        self.width = (self.width > self.minWidth) ? self.width : self.minWidth;
        self.width = (self.width > self.getSliderScaleWidth()) ? self.getSliderScaleWidth() : self.width;
        $(self.domEl).css({
            width : self.width
        });
        $(self.domInner).css({
            width : self.width - 24
        });
    },
    setLeftPosition : function(data){
        var self = this;
        var pos = data.pos;
        var animate = data.animate;
        var animSpeed = (animate) ? theTLSettings.animateTime : 0;
        $(self.domEl).stop().animate({
            left : pos
        }, animSpeed);
    }
}
var TLTranslation = [];
var TLMainController = function(dataObj){
    var self = this;
    self.sliderController = "";
    self.originalStartDate = "";
    self.originalEndDate = "";
    self.startDate = "";
    self.endDate = "";
    self.domMainHolder = $("#tl-container").get()[0];
    self.domStageHolder = $("#tl-stage-holder").get()[0];
    self.domFixedStageContent = $(self.domStageHolder).find(".tl-stage-fixed-position-content").get()[0], self.domContentHolder = $("#tl-content-holder").get()[0];
    self.selectedView = "";
    self.domDateDisplayer = $("#tl-stage-date-displayer").get()[0];
    this.domSliderHolder = $("#tl-slider-holder").get()[0];
    self.domImagePreloader = $("#tl-image-preloader").get()[0];
    self.domTimelineHeader = $("#tl-header").get()[0];
    self.domTimelineTitle = $("#tl-header .tl-main-title").get()[0];
    self.domMainPhotoCredit = $("#tl-stage-main-photo-credit").get()[0];
    self.pageSizeClass = "";
    self.markers = new Array();
    self.markersByKey = new Array();
    self.markerKeyText = "tl-marker-id-";
    self.markerKeyInc = 1;
    self.markersById = new Array();
    self.userCookieName = "TLUSERCOOKIE";
    self.secretUserCookieName = "TLSECRETUSERCOOKIE";
    self.cookieSeparator = "-?#-";
    self.loginPanelController = "";
    self.user = 
    {
        loggedIn : false,
        id : "",
        username : "",
        verifyCode : "",
        timelines : new Array(),
        timelinesByKey : new Array(),
        accountType : ""
    }
    self.adminController = "";
    if(TLSingleTimelineLicense){
        $(self.domMainHolder).find(".tl-timeline-info p.tl-ah-about-text").text(TLTimelineData.aboutText);
    }
    self.viewTypes = [];
    self.viewTypes[0] = "standard";
    self.viewTypes[1] = "category-band";
    self.viewTypes[2] = "color-category-stories";
    self.viewTypes[3] = "duration";
    self.timeline = 
    {
        id : TLTimelineData.id,
        showAdBlock : TLTimelineData.showAdBlock,
        storySpacingType : TLTimelineData.storySpacing,
        markerSpacing : TLViewController.markerSpacingView[TLTimelineData.storySpacing].type,
        equalMarkerSpacing : TLViewController.markerSpacingView[TLTimelineData.storySpacing].markerSpacing,
        markerSpacingObj : TLViewController.markerSpacingView[TLTimelineData.storySpacing],
        equalSpacingMinWidth : 3000,
        viewTypeValue : TLTimelineData.viewType,
        viewType : (TLTimelineData.viewType) ? self.viewTypes[TLTimelineData.viewType] : self.viewTypes[0],
        showTitleBlock : TLTimelineData.showTitleBlock,
        initialEqualMarkerLeftPadding : 500,
        initialEqualMarkerTotalPadding : 750,
        equalMarkerLeftPadding : 500,
        equalMarkerTotalPadding : 750,
        homePage : TLTimelineData.homePage,
        host : TLTimelineData.host,
        startDate : AJKHelpers.dateFromMySQLDate({
            dateString : TLTimelineData.startDate
        }),
        endDate : AJKHelpers.dateFromMySQLDate({
            dateString : TLTimelineData.endDate
        }),
        markersByKey : self.markersByKey,
        markersById : self.markersById,
        markers : self.markers,
        title : TLTimelineData.title,
        authorName : TLTimelineData.authorName,
        mainColour : TLTimelineData.mainColour,
        zoom : TLTimelineData.zoom,
        savedZoom : TLTimelineData.zoom,
        categories : (TLTimelineData.categories) ? TLTimelineData.categories : new Array(),
        categoriesByKey : new Array(),
        introText : TLTimelineData.introText,
        aboutText : $(self.domMainHolder).find(".tl-timeline-info p.tl-ah-about-text").html().replace(/;xNLx;/g, "\n"),
        introImage : TLTimelineData.introImage,
        backgroundImage : TLTimelineData.backgroundImage,
        introImageCredit : TLTimelineData.introImageCredit,
        backgroundColour : (TLTimelineData.backgroundColour) ? TLTimelineData.backgroundColour : "1a1a1a",
        backgroundImageCredit : TLTimelineData.backgroundImageCredit,
        feed : TLTimelineData.feed,
        embed : (TLSingleTimelineLicense) ? "true" : TLTimelineData.embed,
        embedHash : TLTimelineData.embedHash,
        secret : (TLSingleTimelineLicense) ? "false" : TLTimelineData.secret,
        public : TLTimelineData.public,
        dontDisplayIntroPanel : TLTimelineData.dontDisplayIntroPanel,
        openReadMoreLinks : TLTimelineData.openReadMoreLinks,
        storyDateStatus : TLTimelineData.storyDateStatus,
        storyDateFormat : TLTimelineData.storyDateFormat,
        topDateFormat : TLTimelineData.topDateFormat,
        sliderDateFormat : TLTimelineData.sliderDateFormat,
        urlFriendlyTitle : TLTimelineData.urlFriendlyTitle,
        originalTitle : TLTimelineData.title,
        language : TLTimelineData.language,
        displayStripes : TLTimelineData.displayStripes,
        htmlFormatting : TLTimelineData.htmlFormatting,
        initialFocus : (TLTimelineData.initialFocus) ? TLTimelineData.initialFocus : "first",
        feeds : (TLTimelineData.feeds) ? TLTimelineData.feeds : [],
        storyImageAutoCrop : 1,
        sliderBackgroundColour : TLTimelineData.sliderBackgroundColour,
        sliderTextColour : TLTimelineData.sliderTextColour,
        sliderDetailsColour : TLTimelineData.sliderDetailsColour,
        sliderDraggerColour : TLTimelineData.sliderDraggerColour,
        headerBackgroundColour : TLTimelineData.headerBackgroundColour,
        headerTextColour : TLTimelineData.headerTextColour,
        showGroupAuthorNames : TLTimelineData.showGroupAuthorNames,
        durHeadlineColour : TLTimelineData.durHeadlineColour,
        cssFile : TLTimelineData.cssFile,
        altFlickrImageUrl : TLTimelineData.altFlickrImageUrl
    }
    self.isHomePage = TLTimelineData.homePage;
    self.contentPanelController = "";
    self.timelineBackgroundImage = TLTimelineData.backgroundImage;
    self.domTimelineBackgroundImage = "";
    self.categoriesKeyPrefix = "tl-category-key-";
    self.aboutTimelineStory = "";
    self.secretLoginController = "";
    self.minimumLayoutHeight = 430;
    self.minimumLayoutHeight2 = 350;
    self.minimumLayout = false;
    self.defaultCategory = 
    {
        autoGenerated : true,
        title : TLConfigText['category_defaultTitle'],
        colour : self.timeline.mainColour || "bd7997",
        id : "default",
        key : self.categoriesKeyPrefix + "default"
    };
    self.feedController = "";
    self.initialFeedsLoaded = false;
    self.defaultAudioImage = "gif/default-audio-image.gif";
    self.autoCropOffClass = "tl-story-image-auto-crop-off";
    self.domAdBlock = "";
    self.domAdBlockHeight = 0;
    self.hideStripesClass = "tl-hide-scale-stripes";
}
TLMainController.prototype = 
{
    init : function(){
        var self = this;
        self.initBrowserStyles();
        if(self.timeline.language != "english"){
            self.initLanguage();
        }
        if(self.timeline.showAdBlock == "true"){
            self.domAdBlock = $("#tl-advert-block").get()[0];
            self.domAdBlockHeight = $(self.domAdBlock).height();
        }
        self.customiseHeader();
        if( ! self.timeline.displayStripes){
            $(self.domMainHolder).addClass(self.hideStripesClass);
        }
        if( ! self.timeline.storyImageAutoCrop){
            $(self.domMainHolder).addClass(self.autoCropOffClass);
        }
        if( ! TLSingleTimelineLicense && self.timeline.embed == "false" && !self.isHomePage && window.top && window.top != window.self){
            window.top.location = window.self.location.href;
            return;
        }
        if(TLSingleTimelineLicense){
            $(self.domTimelineTitle).text(self.timeline.title);
        }
        if(self.timeline.embed == "true"){
            if( ! self.timeline.showTitleBlock){
                $(self.domMainHolder).addClass("tl-container-hide-header");
            }
        }
        $(self.domStageHolder).css({
            backgroundColor : "#" + self.timeline.backgroundColour
        });
        theAJKWindowResizeEvent.registerAsObserver({
            observer : self
        });
        self.initialiseCategories();
        if(typeof TLFeedController != "undefined"){
            self.feedController = new TLFeedController({
                controller : self,
                feeds : self.timeline.feeds,
                feedsLoadedCallback : function(){
                    if(self.timeline.feeds.length > 0){
                        self.refreshTimelineAfterFeedChange();
                        self.setupInitialDate();
                    }
                    self.initialFeedsLoaded = true;
                }
            }).init();
        }
        theAJKAjaxController.loginController = self;
        $(self.domMainPhotoCredit).html(self.getBGImageCredit());
        $(self.domSliderHolder).mousedown(function(){
            self.hideContentPanelIfVisible();
            return false;
        });
        self.initialiseBackgroundImage();
        self.contentPanelController = new TLContentPanelController({
            domRoot : self.domContentHolder,
            mainController : self
        }).init();
        if($.browser.msie){
            setTimeout(function(){
                self.resizeContent({
                    newSize : AJKHelpers.viewportSize()
                });
            });
        }
        else{
            self.resizeContent({
                newSize : AJKHelpers.viewportSize()
            });
        }
        var isUserLoggedIn = $(self.domMainHolder).find(".tl-data-userId").text();
        var isSecretUserLoggedIn = $(self.domMainHolder).find(".tl-data-secret-userId").text();
        if(isSecretUserLoggedIn && self.timeline.embed != "true"){
            self.loadUserCookie({
                cookieName : self.secretUserCookieName
            });
            self.user.secretUser = true;
            setTimeout(function(){
                self.launchAdmin();
            }, 1);
        }
        else if(isUserLoggedIn && self.timeline.embed != "true"){
            AJKHelpers.deleteCookie({
                name : self.secretUserCookieName
            });
            self.loadUserCookie();
            setTimeout(function(){
                self.launchAdmin();
            }, 1);
        }
        self.initialisePopDownPanels();
        $.each(TLTimelineData.stories, function(){
            self.createMarker({
                id : this.id,
                ownerId : this.ownerId,
                ownerName : this.ownerName,
                startDate : AJKHelpers.dateFromMySQLDate({
                    dateString : this.startDate
                }),
                headline : this.title,
                introText : this.text,
                media : this.media,
                endDate : AJKHelpers.dateFromMySQLDate({
                    dateString : this.endDate
                }),
                category : self.timeline.categoriesByKey[self.categoriesKeyPrefix + this.category],
                externalLink : this.externalLink,
                fullText : this.fullText,
                dateFormat : this.dateFormat
            });
        });
        self.sortMarkersList();
        self.initialiseView();
        self.initialiseSlider();
        self.selectedView.generateMinMaxStagePositionsFromVisibleDates();
        self.setupInitialDate();
        $(self.domTimelineHeader).css({
            visibility : "visible"
        });
        $(self.domMainHolder).find(".menu-item-logged-in a").click(function(){
            self.logUserOut();
            return false;
        });
        var introImage = self.timeline.introImage;
        var storyImages = (introImage) ? [{
            src : introImage,
            type : "Image",
            caption : self.timeline.introImageCredit,
            id : "noId"
        }] : [{
            id : "noId",
            src : "",
            caption : "",
            type : "Image"
        }];
        self.aboutTimelineStory = 
        {
            isTimelineIntro : true,
            headline : self.timeline.title,
            fullText : self.timeline.aboutText,
            clippedContentIntroText : self.timeline.introText,
            images : storyImages,
            videos : [],
            audio : [],
            category : 
            {
                colour : "ffffff"
            }
        }
        if( ! self.timeline.dontDisplayIntroPanel){
            if( ! (self.timeline.homePage && isUserLoggedIn)){
                setTimeout(function(){
                    self.contentPanelController.displayForStory({
                        story : self.aboutTimelineStory
                    });
                }, 1);
            }
        }
        if(self.timeline.homePage && !isUserLoggedIn){
            setTimeout(function(){
                $("#pop-down-panel-sign-up-menu-item").click();
            }, 1);
        }
        $(self.domMainHolder).find("#menu-item-about-this-timeline").click(function(){
            self.contentPanelController.displayForStory({
                story : self.aboutTimelineStory
            });
            return false;
        });
        self.secretLoginController = new TLSecretLoginController({
            mainController : self,
            initialShow : (self.timeline.secret == "true" && !self.user.secretUser)
        }).init();
        theAJKKeyEvent.registerAsObserver({
            observer : self
        });
        self.updateShowAuthor();
        self.initDurationTextColourStyle();
        return self;
    },
    getBGImageCredit : function(){
        var self = this;
        var ret = self.timeline.backgroundImageCredit;
        if(self.timelineBackgroundImage && self.timelineBackgroundImage.indexOf("flickr.com") != -1){
            ret = (ret) ? ret + " - " : "Background Photo: ";
            ret += '<a target="_blank" href="' + AJKHelpers.getFKRPhotoPageFromImageSrc({
                src : self.timelineBackgroundImage
            }) + '">View on Flickr</a>';
        }
        return ret;
    },
    initDurationTextColourStyle : function(){
        var self = this;
        if(self.domDurStyles){
            $(self.domDurStyles).remove();
        }
        self.domDurStyles = $('<style id="tl-duration-story-text-style" type="text/css"> .tl-sb-duration-story .tl-sb-headline, .tl-sb-duration-story .tl-sb-date { color: #' + self.timeline.durHeadlineColour + ' !important; } .tl-sb-duration-story .tl-sb-image-gallery { border-color: #' + self.timeline.durHeadlineColour + ' !important; } </style>').get();
        $("head").append(self.domDurStyles);
    },
    initBrowserStyles : function(){
        var self = this;
        var browserClass = "browser-type-";
        browserClass += ($.browser.mozilla) ? "firefox" : "";
        browserClass += ($.browser.opera) ? "opera" : "";
        browserClass += ($.browser.webkit) ? "webkit" : "";
        browserClass += ($.browser.isIE9) ? "ie9" : "";
        $(self.domMainHolder).addClass(browserClass);
    },
    updateShowAuthor : function(){
        var self = this;
        if(self.timeline.showGroupAuthorNames == 1){
            $(self.domMainHolder).removeClass("tl-ch-author-hide");
        }
        else{
            $(self.domMainHolder).addClass("tl-ch-author-hide");
        }
    },
    customiseHeader : function(){
        var self = this;
        $(self.domTimelineHeader).css({
            backgroundColor : "#" + self.timeline.headerBackgroundColour
        });
        $(self.domTimelineTitle).css({
            color : "#" + self.timeline.headerTextColour
        });
        $(self.domTimelineHeader).find(".main-menu a").css({
            color : "#" + self.timeline.headerTextColour
        });
    },
    initLanguage : function(){
        var self = this;
        var trans = TLTranslation[self.timeline.language];
        if(trans){
            AJKHelpers.dateMonthsShortArray = trans.shortMonths;
            AJKHelpers.dateMonthsArray = trans.months;
            AJKHelpers.dateDaySuffixArray = trans.daySuffixes;
            TLConfigText['contentPanel_Read_more_text'] = trans.findOutMore;
            TLConfigText['marker_moreButton_text'] = trans.more;
            TLConfigText['basic_By'] = trans.by
            TLConfigText['contentPanel_Play_video'] = trans.playVideo;
            TLConfigText['contentPanel_Play_audio'] = trans.playAudio;
            TLConfigText['contentPanel_Close_video'] = trans.closeVideo;
            TLConfigText['contentPanel_Close_audio'] = trans.closeAudio;
            $(self.domMainHolder).addClass("tl-language-" + self.timeline.language);
            if(self.timeline.embed == "true"){
                $("#menu-item-about-this-timeline").text(trans.aboutThisTimeline);
            }
            setTimeout(function(){
                self.contentPanelController.storyIndexText = trans.stories;
                $(self.contentPanelController.domReadMoreButton).text(trans.findOutMore);
                $(self.contentPanelController.domMediaSelectors[0]).find("em").text(trans.images);
                $(self.contentPanelController.domMediaSelectors[1]).find("em").text(trans.videos);
                $(self.contentPanelController.domMediaSelectors[2]).find("em").text(trans.audio);
                self.contentPanelController.defaultReadMoreButtonText = TLConfigText['contentPanel_Read_more_text'];
            }, 1);
            $("#tl-ch-start-timeline-button").text(trans["continue"]);
        }
    },
    refreshTimelineAfterFeedChange : function(){
        var self = this;
        self.sortMarkersList();
        if(self.markers.length > 0){
            self.timeline.startDate = new Date(self.markers[0].startDate.getTime());
            self.timeline.endDate = new Date(self.markers[self.markers.length - 1].startDate.getTime());
        }
        else{
            self.timeline.startDate = AJKHelpers.dateFromMySQLDate({
                dateString : TLTimelineData.startDate
            });
            self.timeline.endDate = AJKHelpers.dateFromMySQLDate({
                dateString : TLTimelineData.endDate
            });
        }
        self.timeline.zoom = self.timeline.savedZoom;
        self.updateViewsWithNewDateRangeAndZoom({
            zoom : self.timeline.zoom
        });
        self.flushSize();
        if(self.adminController && !self.user.secretUser){
            self.adminController.storyListController.resetWithNewListItems({
                listItems : self.timeline.markers
            });
            self.adminController.refreshTimelineZoomSelector()
        }
    },
    keyEventTookPlace : function(data){
        var self = this;
        var key = data.key;
        var mode = data.mode;
        if(key == 39 && mode == "keyup"){
            self.animateToStory({
                direction : "next"
            });
        }
        else if(key == 37 && mode == "keyup"){
            self.animateToStory({
                direction : "previous"
            });
        }
    },
    animateToStory : function(data){
        var self = this;
        var direction = data.direction;
        if(self.contentPanelController.panelVisible){
            if(direction == "next" && self.contentPanelController.nextStory && self.contentPanelController.selectedStory.extraInfoLoaded){
                if( ! self.contentPanelController.lastStoryReached){
                    self.focusMarker({
                        marker : self.contentPanelController.nextStory
                    });
                    self.contentPanelController.displayForStory({
                        story : self.contentPanelController.nextStory
                    });
                }
            }
            else if(direction == "previous" && self.contentPanelController.prevStory && self.contentPanelController.selectedStory.extraInfoLoaded){
                self.focusMarker({
                    marker : self.contentPanelController.prevStory
                });
                self.contentPanelController.displayForStory({
                    story : self.contentPanelController.prevStory
                });
            }
            return false;
        }
        if(self.sliderController.dragger.beingDragged){
            return false;
        }
        if(theTLSettings.lastSelectedStory){
            var nextStory = self.markers[theTLSettings.lastSelectedStory.orderIndex + 1];
            var prevStory = self.markers[theTLSettings.lastSelectedStory.orderIndex - 1];
        }
        else{
            if(self.timeline.markerSpacing == "equal"){
                var nearestMarkerIndex = self.selectedView.getClosestMarkerIndexToDate({
                    date : theTLSettings.currentDate
                });
                if(nearestMarkerIndex < 0){
                    var nextStory = self.markers[0];
                    var prevStory = false;
                }
                else if( ! self.markers[nearestMarkerIndex]){
                    var nextStory = false;
                    var prevStory = self.markers[self.markers.length - 1];
                }
                else{
                    var nextStory = self.markers[nearestMarkerIndex + 1];
                    var prevStory = self.markers[nearestMarkerIndex - 1];
                }
            }
            else{
                var counter = 0;
                var storyFound = false;
                while(self.markers[counter] && !storyFound){
                    if(self.markers[counter].startDate.getTime() == theTLSettings.currentDate.getTime()){
                        var nextStory = self.markers[counter + 1];
                        var prevStory = self.markers[counter - 1];
                        storyFound = true;
                    }
                    else if(self.markers[counter].startDate.getTime() > theTLSettings.currentDate.getTime()){
                        var nextStory = self.markers[counter];
                        var prevStory = self.markers[counter - 1];
                        storyFound = true;
                    }
                    else{
                        counter ++ ;
                    }
                }
            }
        }
        if(direction == "next" && nextStory){
            self.focusMarker({
                marker : nextStory
            });
            self.lastKeyboardSelectedStory = nextStory;
        }
        else if(direction == "previous" && prevStory){
            self.focusMarker({
                marker : prevStory
            });
            self.lastKeyboardSelectedStory = prevStory;
        }
    },
    setupInitialDate : function(){
        var self = this;
        var initialStartTime = "";
        var initialStartMarker = "";
        var numMarkers = self.markers.length;
        if(self.timeline.initialFocus == "today"){
            initialStartTime = new Date();
        }
        else if(numMarkers > 0){
            if(self.timeline.initialFocus == "first"){
                initialStartMarker = self.markers[0];
                initialStartTime = self.markers[0].startDate.getTime();
            }
            else if(self.timeline.initialFocus == "last"){
                initialStartMarker = self.markers[numMarkers - 1];
                initialStartTime = self.markers[numMarkers - 1].startDate.getTime();
            }
            else{
                var focusMarker = self.markersById[self.markerKeyText + self.timeline.initialFocus];
                initialStartMarker = (focusMarker) ? focusMarker : self.markers[0];
                initialStartTime = (focusMarker) ? focusMarker.startDate.getTime() : self.markers[0].startDate.getTime();
                if( ! focusMarker){
                    self.timeline.initialFocus = "first";
                }
            }
        }
        else{
            initialStartTime = self.originalStartDate.getTime();
        }
        if(self.timeline.id == 43){
            initialStartTime = self.markers[0].startDate.getTime() + 270000000;
            theTLSettings.setCurrentDate({
                date : new Date(initialStartTime)
            });
        }
        else if(initialStartMarker){
            self.focusMarker({
                marker : initialStartMarker,
                instantly : true
            });
        }
        else{
            var aDate = AJKHelpers.getEmptyDate();
            aDate.setTime(initialStartTime);
            aDate = theTLSettings.limitDateToRange({
                aDate : aDate
            });
            theTLSettings.setCurrentDate({
                date : aDate
            });
        }
    },
    initialiseView : function(){
        var self = this;
        self.originalStartDate = self.timeline.startDate;
        self.originalEndDate = self.timeline.endDate;
        var minDate = self.originalStartDate.getTime();
        var maxDate = self.originalEndDate.getTime();
        if( ! self.timeline.zoom || !TLViewController.isASuitableScaleForDateRange({
            scaleName : self.timeline.zoom,
            startDate : self.originalStartDate,
            endDate : self.originalEndDate
        })){
            var bestScale = TLViewController.getBestZoomForDateRange({
                startDate : self.originalStartDate,
                endDate : self.originalEndDate
            });
            self.timeline.zoom = bestScale.name;
        }
        var adjustTime = 400 / TLViewController.viewScaleSettings[self.timeline.zoom].getStageWidthRatio();
        var edgePadding = 0.05;
        var diff = maxDate - minDate;
        self.startDate = AJKHelpers.getEmptyDate();
        self.startDate.setTime(minDate - (diff * edgePadding) - adjustTime);
        self.endDate = AJKHelpers.getEmptyDate();
        self.endDate.setTime(maxDate + (diff * edgePadding) + adjustTime);
        self.initialiseTimeInfo();
        self.selectedView = new TLViewController({
            items : self.markers,
            domEl : $(self.domStageHolder).find(".tl-stage").get()[0],
            startDate : self.startDate,
            endDate : self.endDate,
            originalStartDate : self.originalStartDate,
            scaleColour : self.timeline.mainColour,
            zoom : self.timeline.zoom,
            domDateDisplayer : self.domDateDisplayer,
            timeline : self.timeline
        });
        self.selectedView.init();
    },
    initialiseSlider : function(){
        var self = this;
        self.sliderController = new TLSliderController({
            items : self.markers,
            startDate : self.startDate,
            endDate : self.endDate,
            timeline : self.timeline,
            getStageWidth : function(){
                return self.selectedView.width;
            }
        }).init();
    },
    updateViewsWithNewDateRangeAndZoom : function(data){
        var self = this;
        var zoom = data.zoom;
        if(zoom){
            self.timeline.zoom = zoom;
        }
        if(self.timeline.markerSpacing == "equal"){
            $.each(self.markers, function(){
                this.initialHorizAdjustment = 0;
                this.horizAdjustment = 0;
                this.numCloseMarkers = 0;
                this.sizeClass = "";
                this.vSize = "normal";
            });
        }
        self.selectedView.destroy();
        self.initialiseView();
        if(self.timeline.markerSpacing != "equal"){
            self.selectedView.refreshDisplayMarkers();
        }
        self.selectedView.generateMinMaxStagePositionsFromVisibleDates();
        self.updateSlider();
        theTLSettings.setCurrentDate({
            date : theTLSettings.currentDate
        });
        self.updateMarkersImageSize();
    },
    updateSlider : function(){
        var self = this;
        self.sliderController.destroy();
        self.initialiseSlider();
    },
    hideContentPanelIfVisible : function(){
        var self = this;
        if(self.contentPanelController.panelVisible){
            self.contentPanelController.hide();
        }
    },
    initialiseBackgroundImage : function(){
        var self = this;
        if(self.domTimelineBackgroundImage){
            $(self.domTimelineBackgroundImage).remove();
        }
        var bgImageSrc = (self.timelineBackgroundImage) ? self.timelineBackgroundImage : "/assets/ui/empty-image.gif";
        bgImageSrc = AJKHelpers.getTimelineImageUrl({
            src : bgImageSrc,
            emptyImage : "/assets/ui/empty-image.gif"
        });
        self.domTimelineBackgroundImage = $('<img src="' + bgImageSrc + '" alt="" id="tl-stage-image" />').get()[0];
        new AJKImageLoader({
            imageUrl : bgImageSrc,
            loadCallback : function(data){
                var theImage = data.theImage;
                $(self.domStageHolder).prepend(self.domTimelineBackgroundImage);
                self.flushSize();
            }
        }).init();
        if( ! self.timelineBackgroundImage){
            self.flushSize();
        }
    },
    initialiseCategories : function(){
        var self = this;
        var counter = 0;
        $.each(self.timeline.categories, function(){
            self.initialiseCategory({
                category : this
            });
        });
    },
    initialiseCategory : function(data){
        var self = this;
        var category = data.category;
        category.key = self.categoriesKeyPrefix + category.id;
        self.timeline.categoriesByKey[category.key] = category;
        if( ! category.colour){
            category.colour = (self.timeline.mainColour) ? self.timeline.mainColour : "aaaaaa";
        }
    },
    sortCategories : function(){
        var self = this;
        self.timeline.categories.sort(function(a, b){
            if(a.autoGenerated){
                return 1;
            }
            else if(b.autoGenerated){
                return - 1;
            }
            return(a.title < b.title) ? -1 : 1;
        });
    },
    getNextStory : function(data){
        var self = this;
        var story = data.story;
        var orderIndex = story.orderIndex;
        var nextStory = self.markers[orderIndex + 1];
        return(self.markers[orderIndex + 1])
    },
    getPrevStory : function(data){
        var self = this;
        var story = data.story;
        var orderIndex = story.orderIndex;
        return((orderIndex - 1) >= 0) ? self.markers[orderIndex - 1] : false;
    },
    getNumStories : function(data){
        var self = this;
        return self.markers.length;
    },
    initialisePopDownPanels : function(){
        var self = this;
        self.loginPanelController = new TLLoginPanelController({
            domRootEl : $("#ajk-pop-down-panel-login").get()[0],
            buttonPopupId : "ajk-pop-down-panel-login",
            controller : self
        }).init();
        new TLSignupPanelController({
            domRootEl : $("#ajk-pop-down-panel-sign-up").get()[0],
            buttonPopupId : "ajk-pop-down-panel-sign-up",
            controller : self
        }).init();
    },
    initialiseTimeInfo : function(){
        var self = this;
        theTLSettings.timeInfo.start = self.startDate;
        theTLSettings.timeInfo.end = self.endDate;
        theTLSettings.timeInfo.msecs = self.endDate.getTime() - self.startDate.getTime();
        theTLSettings.timeInfo.secs = theTLSettings.timeInfo.msecs / 1000;
        theTLSettings.timeInfo.mins = theTLSettings.timeInfo.secs / 60;
        theTLSettings.timeInfo.hours = theTLSettings.timeInfo.mins / 60;
        theTLSettings.timeInfo.days = theTLSettings.timeInfo.hours / 24;
        theTLSettings.timeInfo.months = theTLSettings.timeInfo.days / 30.41;
        theTLSettings.timeInfo.years = theTLSettings.timeInfo.msecs / AJKHelpers.dateOneYearInMS;
        theTLSettings.timeInfo.decades = theTLSettings.timeInfo.years / 10;
        var markerDateFormat = "";
        if(theTLSettings.timeInfo.years > 1000){
            markerDateFormat = "YYYY";
        }
        if(theTLSettings.timeInfo.years > 100){
            markerDateFormat = "MMMM YYYY";
        }
        else if(theTLSettings.timeInfo.days > 50){
            markerDateFormat = "ddnn MMMM YYYY";
        }
        else{
            markerDateFormat = "ddnn MMMM YYYY HH:mm";
        }
        theTLSettings.timeInfo.markerDisplayDateFormat = markerDateFormat;
    },
    flushSize : function(){
        var self = this;
        self.windowDidResize({
            newSize : 
            {
                width : theTLSettings.windowSize.width,
                height : theTLSettings.windowSize.height
            }
        });
    },
    windowDidResize : function(dataObj){
        var self = this;
        var newSize = dataObj.newSize;
        self.resizeContent({
            newSize : newSize
        });
    },
    resizeContent : function(dataObj){
        var self = this;
        var newSize = dataObj.newSize;
        newSize.height = newSize.height - self.domAdBlockHeight;
        newSize.height = (newSize.height < 100) ? 100 : newSize.height;
        var extraHeight = 0;
        if(newSize.height < self.minimumLayoutHeight && !self.isHomePage){
            $(self.domMainHolder).addClass("tl-container-minimum-layout");
            extraHeight += 35;
            extraHeight += 12;
            self.minimumLayout = true;
        }
        else{
            $(self.domMainHolder).removeClass("tl-container-minimum-layout");
            self.minimumLayout = false;
            extraHeight = (self.timeline.showTitleBlock || self.timeline.embed == "false") ? extraHeight : extraHeight + 35;
        }
        if(newSize.height < self.minimumLayoutHeight2 && !self.isHomePage){
            $(self.domMainHolder).addClass("tl-container-minimum-layout-2");
        }
        else{
            $(self.domMainHolder).removeClass("tl-container-minimum-layout-2");
        }
        $(self.domStageHolder).css({
            height : newSize.height - 100 + extraHeight
        });
        self.updatePageSizeClass({
            height : newSize.height + extraHeight
        });
        AJKHelpers.sizeImageToFitInBoxOfSize({
            domImage : self.domTimelineBackgroundImage,
            boxSize : 
            {
                width : newSize.width,
                height : newSize.height - 100 + extraHeight
            }
        });
    },
    getNumCategories : function(){
        var self = this;
        return(self.selectedView) ? self.selectedView.categoryBands.length : self.timeline.categories.length;
    },
    updatePageSizeClass : function(data){
        var self = this;
        var pageheight = data.height;
        if(self.timeline.viewType == "category-band"){
            var numCats = self.getNumCategories();
            var pageSize = "category-normal";
            if(self.timeline.markerSpacing == "top-to-bottom"){
                pageSize = "category-normal";
            }
            else if(pageheight / numCats > 350){
                pageSize = "category-very-large";
            }
            else if(pageheight / numCats > 240){
                pageSize = "category-large";
            }
        }
        else{
            var pageSize = "normal";
            if(pageheight < 480){
                pageSize = "very-low";
            }
            else if(pageheight < 560 || (self.timeline.markerSpacing == "top-to-bottom" && self.timeline.viewType != "duration")){
                pageSize = "low";
            }
            else if(pageheight < 600){
                pageSize = "medium";
            }
        }
        var newPageClass = "tl-page-size-" + pageSize + "-height";
        if(pageSize == "very-low"){
            newPageClass = "tl-page-size-very-low-height tl-page-size-low-height";
        }
        if( ! self.timeline.storyImageAutoCrop && (pageSize == "normal" || pageSize == "category-very-large")){
            $(self.domMainHolder).removeClass(self.autoCropOffClass).addClass(self.autoCropOffClass);
        }
        else if( ! self.timeline.storyImageAutoCrop){
            $(self.domMainHolder).removeClass(self.autoCropOffClass)
        }
        if(self.pageSizeClass != newPageClass){
            $(self.domStageHolder).removeClass(self.pageSizeClass);
            $(self.domStageHolder).addClass(newPageClass);
            self.pageSizeClass = newPageClass;
            self.updateMarkersImageSize();
        }
    },
    updateMarkersImageSize : function(){
        var self = this;
        if($.browser.msie || $.browser.opera){
            setTimeout(function(){
                $.each(self.markers, function(){
                    this.positionDisplayImageInContainer();
                });
            }, 1);
        }
        else{
            $.each(self.markers, function(){
                this.positionDisplayImageInContainer();
            });
        }
    },
    logUserOut : function(){
        var self = this;
        self.deleteUserCookies();
        window.location.reload(true);
    },
    deleteUserCookies : function(){
        var self = this;
        if(self.user.secretUser){
            AJKHelpers.deleteCookie({
                name : self.secretUserCookieName
            });
        }
        else{
            AJKHelpers.deleteCookie({
                name : self.userCookieName
            });
            AJKHelpers.deleteCookie({
                name : self.secretUserCookieName
            });
        }
    },
    logUserIn : function(data){
        var self = this;
        self.deleteUserCookies();
        self.user.loggedIn = true;
        self.user.id = data.userId;
        self.user.username = data.username;
        self.user.verifyCode = data.verifyCode;
        self.saveUserCookie();
        window.location = "index-2.html";
    },
    logSecretUserIn : function(data){
        var self = this;
        self.user.secretUser = true;
        self.deleteUserCookies();
        self.user.loggedIn = true;
        self.user.id = data.userId;
        self.user.username = data.username;
        self.user.verifyCode = data.verifyCode;
        self.saveUserCookie({
            expires : "now",
            cookieName : self.secretUserCookieName
        });
        window.location.reload();
    },
    saveUserCookie : function(data){
        var self = this;
        var cookieName = (data && data.cookieName) ? data.cookieName : self.userCookieName;
        var expires = (data && data.expires) ? data.expires : 30;
        expires = (data && data.expires && data.expires == "now") ? 0 : expires;
        var cookieString = self.user.id + self.cookieSeparator;
        cookieString += self.user.username + self.cookieSeparator;
        cookieString += self.user.verifyCode + self.cookieSeparator;
        AJKHelpers.setCookie({
            name : cookieName,
            value : cookieString,
            expires : expires
        });
    },
    loadUserCookie : function(data){
        var self = this;
        var cookieName = (data && data.cookieName) ? data.cookieName : self.userCookieName;
        var cookieData = AJKHelpers.getCookie({
            name : cookieName
        });
        if(cookieData){
            cookieDataSplit = cookieData.split(self.cookieSeparator);
            self.user.id = cookieDataSplit[0];
            self.user.username = cookieDataSplit[1];
            self.user.verifyCode = cookieDataSplit[2];
            self.user.loggedIn = true;
            return true;
        }
    },
    loadTimeline : function(data){
        var self = this;
        var timeline = data.timeline;
        window.location = "/timeline/entry/" + timeline.id + "/" + timeline.urlFriendlyTitle + "/";
    },
    focusMarker : function(data){
        var self = this;
        var marker = data.marker;
        var instantly = data.instantly
        var aDate = "";
        theTLSettings.lastSelectedStory = marker;
        if(self.timeline.markerSpacing == "equal"){
            aDate = self.selectedView.getDateFromLeftOffset({
                leftOffset : marker.leftOffset
            });
        }
        else{
            aDate = marker.startDate;
        }
        aDate = theTLSettings.limitDateToRange({
            aDate : aDate
        });
        theTLSettings.setCurrentDate({
            date : aDate,
            extraInfo : 
            {
                animate : !instantly
            }
        });
    },
    createMarker : function(data){
        var self = this;
        var markerKey = self.markerKeyText + self.markerKeyInc;
        var markerIdKey = self.markerKeyText + data.id;
        var category = (data.category) ? data.category : "";
        var fullText = data.fullText;
        var dateFormat = (data.dateFormat) ? data.dateFormat : "auto";
        category = (category) ? category : self.defaultCategory;
        if(category.autoGenerated && !self.timeline.categoriesByKey[category.key]){
            self.timeline.categories.push(category);
            self.timeline.categoriesByKey[category.key] = category;
        }
        var aMarker = new TLMarker({
            id : data.id,
            ownerId : data.ownerId,
            ownerName : data.ownerName,
            startDate : data.startDate,
            endDate : data.endDate,
            category : category,
            markerKey : markerKey,
            headline : data.headline,
            introText : data.introText,
            media : data.media,
            mainController : self,
            externalLink : data.externalLink,
            fullText : fullText,
            dateFormat : dateFormat
        }).init();
        self.markers.push(aMarker);
        self.markersByKey[markerKey] = aMarker;
        self.markersById[markerIdKey] = aMarker;
        self.markerKeyInc ++ ;
        return aMarker;
    },
    addNewCategory : function(data){
        var self = this;
        var category = data.category;
        self.timeline.categories.push(category);
        self.initialiseCategory({
            category : category
        });
        self.sortCategories();
    },
    sortMarkersList : function(){
        var self = this;
        self.markers.sort(function(a, b){
            return(a.startDate.getTime() > b.startDate.getTime()) ? 1 : -1;
        });
        var counter = 0;
        $.each(self.markers, function(){
            this.orderIndex = counter ++ ;
        });
        if(self.timeline.viewType == "category-band"){
            self.sortMarkersByCategoryList();
        }
    },
    sortMarkersByCategoryList : function(){
        var self = this;
        self.markersByCategory = [];
        $.each(self.markers, function(){
            var thisMarker = this;
            if( ! self.markersByCategory[thisMarker.category.key]){
                self.markersByCategory[thisMarker.category.key] = 
                {
                    numItems : 0,
                    markers : []
                };
            }
            self.markersByCategory[thisMarker.category.key].markers.push(thisMarker);
            thisMarker.categoryIndex = self.markersByCategory[thisMarker.category.key].numItems;
            thisMarker.categoryIndex = self.markersByCategory[thisMarker.category.key].numItems ++ ;
        });
    }
}
var TLViewController = function(data){
    var self = this;
    self.items = data.items;
    self.timeline = data.timeline;
    self.domEl = data.domEl;
    self.zoom = data.zoom;
    self.timeline = data.timeline;
    self.currentViewType = self.timeline.viewType;
    self.type = self.zoom;
    self.domDateDisplayer = data.domDateDisplayer;
    self.originalStartDate = data.originalStartDate;
    self.startDate = data.startDate;
    self.endDate = data.endDate;
    self.dateRange = this.endDate.getTime() - this.startDate.getTime();
    self.scaleColour = data.scaleColour;
    self.viewScaleBlocks = new Array();
    self.domViewBlocksHolder = "";
    self.width = 0;
    self.stageDraggedFunc = data.stageDraggedFunc;
    self.stageLeftOffset = "";
    self.realStageLeftOffset = "";
    self.animationTimeout = "";
    self.currentlyAnimating = false;
    self.viewScaleSettings = new Array();
    self.minStagePos = 0;
    self.maxStagePos = 0;
    self.domStageStoryHolder = "";
    self.minIdealStorySeparation = (self.timeline.viewType == "category-band") ? 200 : 327;
    self.availableScales = new Array();
    self.availableScalesByName = new Array();
    self.draggableObj = "";
    self.displayDate = "";
    self.easeTimeoutTime = 50;
    self.easingFraction = 2;
    self.categoryBands = [];
    self.categoryBandsByKey = [];
}
TLViewController.markerSpacingView = [{
    type : "standard",
    markerSpacing : 0,
    categoryViewMarkerSpacing : 0
}, 
{
    type : "equal",
    markerSpacing : 352,
    categoryViewMarkerSpacing : 238
}, 
{
    type : "equal",
    markerSpacing : 176,
    categoryViewMarkerSpacing : 300
}, 
{
    type : "top-to-bottom",
    rows : 3
}, 
{
    type : "top-to-bottom",
    rows : 4
}, 
{
    type : "top-to-bottom",
    rows : 5
}, 
{
    type : "top-to-bottom",
    rows : 6
}, 
{
    type : "top-to-bottom",
    rows : 7
}, 
{
    type : "top-to-bottom",
    rows : 8
}, 
{
    type : "top-to-bottom",
    rows : 9
}, 
{
    type : "top-to-bottom",
    rows : 10
}]
TLViewController.isASuitableScaleForDateRange = function(data){
    var scaleName = data.scaleName;
    var startDate = data.startDate;
    var endDate = data.endDate;
    var availableScales = TLViewController.getAvailableScalesForDateRange({
        startDate : startDate,
        endDate : endDate
    });
    var matchFound = false;
    $.each(availableScales, function(){
        if(this.name == scaleName){
            matchFound = true;
        }
    });
    return matchFound;
}
TLViewController.getBestZoomForDateRange = function(data){
    var startDate = data.startDate;
    var endDate = data.endDate;
    var availableScales = TLViewController.getAvailableScalesForDateRange({
        startDate : startDate,
        endDate : endDate
    });
    var idealWidth = 30000;
    var scaleClosestToIdealWidth = "";
    $.each(availableScales, function(){
        var scaleWidth = (endDate.getTime() - startDate.getTime()) * this.object.getStageWidthRatio();
        var distanceFromIdeal = Math.abs(scaleWidth - idealWidth);
        if( ! scaleClosestToIdealWidth || (distanceFromIdeal < scaleClosestToIdealWidth.distanceFromIdeal)){
            scaleClosestToIdealWidth = this;
            scaleClosestToIdealWidth.distanceFromIdeal = distanceFromIdeal;
        }
    });
    return scaleClosestToIdealWidth;
}
TLViewController.getAvailableScalesForDateRange = function(data){
    var startDate = data.startDate;
    var endDate = data.endDate;
    var scale = "";
    var availableScales = new Array();
    var availableScalesByName = new Array();
    var allScales = new Array();
    for(scale in TLViewController.viewScaleSettings){
        var thisScale = TLViewController.viewScaleSettings[scale];
        if(scale != "indexOf"){
            var scaleWidth = (endDate.getTime() - startDate.getTime()) * thisScale.getStageWidthRatio();
            var minWidth = 2000;
            var maxWidth = 500000;
            var scaleInfoObj = 
            {
                name : scale,
                width : scaleWidth,
                object : thisScale
            }
            if(scaleWidth <= maxWidth && scaleWidth >= minWidth){
                availableScales.push(scaleInfoObj);
                availableScalesByName[scaleInfoObj.name] = scaleInfoObj;
            }
            allScales.push(scaleInfoObj);
        }
    }
    availableScales.sort(function(a, b){
        return(a.width > b.width) ? 1 : (a.width == b.width) ? 0 : -1;
    });
    if(availableScales.length == 0){
        var smallestScale = "hour-1-mins-large";
        var largestScale = "millenium-small-century";
        largestScale.name = "millenium-small-century";
        if(endDate.getTime() - startDate.getTime() < AJKHelpers.dateOneDayInMS){
            var aScale = 
            {
                name : smallestScale,
                width : 1,
                object : TLViewController.viewScaleSettings[smallestScale]
            }
        }
        else{
            var aScale = 
            {
                name : largestScale,
                width : 1,
                object : TLViewController.viewScaleSettings[largestScale]
            }
        }
        availableScales.push(aScale);
    }
    return availableScales;
}
TLViewController.prototype = 
{
    init : function(){
        var self = this;
        theTLSettings.registerAsObserver({
            type : "currentDate",
            observer : self
        });
        $(self.domEl).addClass("tl-stage-view-" + self.currentViewType);
        if(self.currentViewType == "duration"){
            $(self.domEl).addClass("tl-stage-view-color-category-stories");
        }
        if(self.timeline.viewType == "category-band"){
            self.timeline.equalMarkerSpacing = TLViewController.markerSpacingView[self.timeline.storySpacingType].categoryViewMarkerSpacing;
        }
        else{
            self.timeline.equalMarkerSpacing = TLViewController.markerSpacingView[self.timeline.storySpacingType].markerSpacing;
        }
        $(theTLMainController.domFixedStageContent).find(".tl-view-category-band-label").remove();
        self.easeTimeoutTime = ($.browser.msie || $.browser.isChrome) ? 75 : 50;
        self.easeTimeoutTime = ($.browser.mozilla && !$.browser.isMac) ? 125 : self.easeTimeoutTime;
        self.easingFraction = ($.browser.msie || $.browser.isChrome) ? 1.75 : 2;
        self.easingFraction = ($.browser.mozilla && !$.browser.isMac) ? 1.5 : self.easingFraction;
        theAJKWindowResizeEvent.registerAsObserver({
            observer : self
        });
        self.availableScales = TLViewController.getAvailableScalesForDateRange({
            startDate : theTLSettings.timeInfo.start,
            endDate : theTLSettings.timeInfo.end
        });
        $(self.domEl).addClass("tl-stage-" + self.type);
        $(self.domEl).addClass("tl-stage-view-" + self.currentViewType);
        if(self.timeline.markerSpacing == "equal"){
            self.timeline.equalMarkerLeftPadding = self.timeline.initialEqualMarkerLeftPadding * self.items.length / 140 * self.timeline.equalMarkerSpacing / 176;
            self.timeline.equalMarkerTotalPadding = self.timeline.initialEqualMarkerTotalPadding * self.items.length / 140 * self.timeline.equalMarkerSpacing / 176;
            self.timeline.equalMarkerLeftPadding = (self.timeline.equalMarkerLeftPadding < 500) ? 500 : self.timeline.equalMarkerLeftPadding;
            self.timeline.equalMarkerTotalPadding = (self.timeline.equalMarkerTotalPadding < 750) ? 750 : self.timeline.equalMarkerTotalPadding;
            self.width = self.timeline.equalMarkerTotalPadding + self.items.length * self.timeline.equalMarkerSpacing;
            self.width = (self.width < self.timeline.equalSpacingMinWidth) ? self.timeline.equalSpacingMinWidth : self.width;
        }
        else{
            self.width = (theTLSettings.timeInfo.end.getTime() - theTLSettings.timeInfo.start.getTime()) * TLViewController.viewScaleSettings[self.type].getStageWidthRatio();
        }
        $(self.domEl).empty();
        if(self.timeline.viewType == "category-band"){
            self.createCategoryBands();
        }
        else{
            self.createViewScaleBlocks();
        }
        self.displayMarkers();
        self.initialiseViewDrag();
        $(self.domEl).click(function(e){
            var domStoryBlock = AJKHelpers.getSelfOrFirstParantOfClass({
                domEl : e.target,
                className : "tl-story-block"
            });
            if(domStoryBlock){
                var key = $(domStoryBlock).attr("markerKey");
                var clickedStoryBlock = theTLMainController.markersByKey[key];
                if($(e.target).hasClass("ig-inner-image-mask") && clickedStoryBlock.isFlickrImage){
                    if( ! AJKDraggable.cancelClick){
                        var flickrImagePage = AJKHelpers.getFKRPhotoPageFromImageSrc({
                            src : clickedStoryBlock.displayImage.src
                        });
                        window.open(flickrImagePage);
                    }
                }
                else if($(e.target).hasClass("tl-sb-more-button") || theTLMainController.timeline.viewType == "duration"){
                    clickedStoryBlock.showExtraInfo();
                }
                else{
                    theTLMainController.hideContentPanelIfVisible();
                }
            }
            else{
                theTLMainController.hideContentPanelIfVisible();
            }
            return false;
        }).mouseover(function(e){
            var domImageGalleryBlock = AJKHelpers.getSelfOrFirstParantOfClass({
                domEl : e.target,
                className : "tl-story-block"
            });
            if(domImageGalleryBlock){
                var key = $(domImageGalleryBlock).attr("markerKey");
                var relatedStory = theTLMainController.markersByKey[key];
                relatedStory.focus();
            }
        }).mouseout(function(e){
            var domImageGalleryBlock = AJKHelpers.getSelfOrFirstParantOfClass({
                domEl : e.target,
                className : "tl-story-block"
            });
            if(domImageGalleryBlock){
                var key = $(domImageGalleryBlock).attr("markerKey");
                var relTarg = e.relatedTarget || e.toElement;
                var toStoryBlock = AJKHelpers.getSelfOrFirstParantOfClass({
                    domEl : relTarg,
                    className : "tl-story-block"
                });
                var toKey = (toStoryBlock) ? $(toStoryBlock).attr("markerKey") : "";
                if( ! toStoryBlock || toKey != key){
                    var relatedStory = theTLMainController.markersByKey[key];
                    relatedStory.unfocus();
                }
            }
        });
        self.windowDidResize({
            NewSize : AJKHelpers.viewportSize()
        });
        return self;
    },
    getEquallySpacedOffsetForDate : function(data){
        var self = this;
        var aDate = data.aDate;
        var numItems = self.items.length;
        var lastFoundItem = false;
        var offset = 0;
        for(var counter = 0; counter < numItems; counter ++ ){
            var thisItem = self.items[counter];
            if(aDate.getTime() <= thisItem.startDate.getTime()){
                lastFoundItem = thisItem;
                break
            }
        }
        if(lastFoundItem){
            var prevItem = self.items[lastFoundItem.orderIndex - 1];
            if(prevItem){
                if(lastFoundItem.startDate.getTime() != prevItem.startDate.getTime()){
                    var extra = (lastFoundItem.leftOffset - prevItem.leftOffset) * (aDate.getTime() - prevItem.startDate.getTime()) / (lastFoundItem.startDate.getTime() - prevItem.startDate.getTime());
                }
                else{
                    extra = 0;
                }
                offset = prevItem.leftOffset + extra;
            }
            else{
                offset = -1;
            }
        }
        else{
            lastFoundItem = self.items[self.items.length - 1];
            var viewStageWidth = self.width;
            if(lastFoundItem.startDate.getTime() != self.endDate.getTime()){
                var extra = (viewStageWidth - lastFoundItem.leftOffset) * (aDate.getTime() - lastFoundItem.startDate.getTime()) / (self.endDate.getTime() - lastFoundItem.startDate.getTime());
            }
            else{
                extra = 0;
            }
            offset = lastFoundItem.leftOffset + extra;
        }
        return offset;
    },
    createCategoryBands : function(){
        var self = this;
        var spaceRemaining = 100;
        var itemsRemaining = self.timeline.categories.length;
        var ourCategories = self.timeline.categories;
        if(self.timeline.categoriesByKey["tl-category-key-default"] && !theTLMainController.markersByCategory["tl-category-key-default"]){
            itemsRemaining -- ;
        }
        if(self.timeline.categories.length == 0){
            ourCategories = [theTLMainController.defaultCategory];
            itemsRemaining = 1;
        }
        itemsRemaining = (itemsRemaining) ? itemsRemaining : 1;
        $.each(ourCategories, function(){
            if(this.autoGenerated && theTLMainController.markersByCategory[this.key] && theTLMainController.markersByCategory[this.key].markers.length == 0){
                return;
            }
            var bandPercentHeight = Math.round(spaceRemaining / itemsRemaining);
            var bandTop = 100 - spaceRemaining;
            spaceRemaining -= bandPercentHeight;
            itemsRemaining -- ;
            var aCatBand = new TLViewCategoryBand({
                category : this,
                height : bandPercentHeight,
                top : bandTop,
                width : self.width
            }).init();
            self.categoryBands.push(aCatBand);
            self.categoryBandsByKey[this.key] = aCatBand;
            $(self.domEl).prepend(aCatBand.domRoot);
            $(theTLMainController.domFixedStageContent).prepend(aCatBand.domLabel);
        });
    },
    displayMarkers : function(){
        var self = this;
        var domDiv = $('<div class="tl-stage-story-holder"></div>').get()[0];
        self.domStageStoryHolder = domDiv;
        var startTimeNum = self.startDate.getTime();
        $.each(self.items, function(){
            if(self.timeline.markerSpacing == "equal"){
                this.leftOffset = self.timeline.equalMarkerLeftPadding + (this.orderIndex * self.timeline.equalMarkerSpacing);
            }
            else{
                this.leftOffset = -self.getLeftOffsetForDate({
                    date : this.startDate
                });
            }
        });
        self.generateMarkerSizeAndPositions();
        self.adjustMarkerPositions();
        $.each(self.items, function(){
            var domMarker = this.generateDom();
            if(self.timeline.viewType == "category-band"){
                if(self.categoryBandsByKey[this.category.key]){
                    $(self.categoryBandsByKey[this.category.key].domRoot).prepend(domMarker);
                }
            }
            else{
                if(self.timeline.viewType == "duration"){
                    $(domDiv).append(domMarker);
                }
                else{
                    $(domDiv).prepend(domMarker);
                }
            }
        });
        if(self.timeline.viewType != "category-band"){
            $(self.domEl).append(domDiv);
        }
    },
    destroy : function(){
        var self = this;
        $(self.domStageStoryHolder).remove();
        $(self.domViewBlocksHolder).remove();
        $(self.domEl).removeClass("tl-stage-" + self.type);
        $(self.domEl).removeClass("tl-stage-view-" + self.currentViewType);
        if(self.currentViewType == "duration"){
            $(self.domEl).removeClass("tl-stage-view-color-category-stories");
        }
        $(self.domEl).unbind();
        self.draggableObj.kill();
        theTLSettings.removeAsObserver({
            type : "currentDate",
            observer : self
        });
        theAJKWindowResizeEvent.removeAsObserver({
            observer : self
        });
    },
    addNewMarkerToStage : function(data){
        var self = this;
        var marker = data.marker;
        marker.leftOffset = -self.getLeftOffsetForDate({
            date : marker.startDate
        });
        self.generateMarkerSizeAndPositions();
        var domMarker = marker.generateDom();
        $(self.domStageStoryHolder).prepend(domMarker);
        self.refreshDisplayMarkers();
        theTLMainController.updateMarkersImageSize();
    },
    markerWasDeleted : function(){
        var self = this;
        self.generateMarkerSizeAndPositions();
        self.refreshDisplayMarkers();
        theTLMainController.updateMarkersImageSize();
    },
    refreshDisplayMarkers : function(){
        var self = this;
        $.each(self.items, function(){
            this.initialHorizAdjustment = 0;
            this.horizAdjustment = 0;
            this.numCloseMarkers = 0;
            this.sizeClass = "";
            this.vSize = "normal";
            this.leftOffset = -self.getLeftOffsetForDate({
                date : this.startDate
            });
        });
        self.generateMarkerSizeAndPositions();
        self.adjustMarkerPositions();
        $.each(self.items, function(){
            this.refreshPositionAndSize();
        });
    },
    adjustMarkerPositions : function(){
        var self = this;
        if(self.timeline.viewType == "duration" || self.timeline.markerSpacing == "top-to-bottom"){
            $.each(self.items, function(){
                this.horizAdjustment = 0;
            });
            return;
        }
        var itemIndex = 0;
        var verticalPos = 0;
        var maxVerticalPos = 10;
        var minIdealStorySeparation = [];
        minIdealStorySeparation["normal"] = 327;
        minIdealStorySeparation["small"] = 327;
        minIdealStorySeparation["very-small"] = 327;
        minIdealStorySeparation["tiny"] = 327;
        minIdealStorySeparation["miniature"] = 175;
        minIdealStorySeparation["category-normal"] = 238;
        minIdealStorySeparation["category-small"] = 175;
        var minAdjust = [];
        var maxAdjust = [];
        minAdjust["normal"] = -132;
        maxAdjust["normal"] = 130;
        minAdjust["small"] = -132;
        maxAdjust["small"] = 130;
        minAdjust["very-small"] = -132;
        maxAdjust["very-small"] = 130;
        minAdjust["tiny"] = -132;
        maxAdjust["tiny"] = 130;
        minAdjust["miniature"] = -56;
        maxAdjust["miniature"] = 54;
        minAdjust["category-small"] = -56;
        maxAdjust["category-small"] = 54;
        minAdjust["category-normal"] = -86;
        maxAdjust["category-normal"] = 84;
        var getItemOfSimilarVerticalPosition = function(data){
            var anItem = data.anItem;
            var itemIndex = (self.timeline.viewType == "category-band") ? anItem.categoryIndex : data.itemIndex;
            var verticalPos = data.verticalPos;
            var compareItem = "";
            var direction = data.direction;
            var compareList = (self.timeline.viewType == "category-band") ? theTLMainController.markersByCategory[anItem.category.key].markers : self.items;
            var compareLimit = 2;
            compareLimit = (anItem.vSize == "normal" || anItem.vSize == "category-normal") ? 10 : compareLimit;
            while(compareItem = compareList[itemIndex += direction]){
                if(Math.abs(compareItem.verticalPos - anItem.verticalPos) <= compareLimit || compareItem.vSize == "normal"){
                    return compareItem;
                }
            }
            return false;
        }
        $.each(self.items, function(){
            var nextItem = getItemOfSimilarVerticalPosition({
                anItem : this,
                itemIndex : itemIndex,
                verticalPos : this.verticalPos,
                direction : 1
            });
            var previousItem = getItemOfSimilarVerticalPosition({
                anItem : this,
                itemIndex : itemIndex,
                verticalPos : this.verticalPos,
                direction : -1
            });
            var adjustmentAmount = 0;
            var currentItemAdjustedPos = this.leftOffset + this.horizAdjustment;
            var nextItemAdjustedPos = nextItem.leftOffset + nextItem.horizAdjustment;
            var previousItemAdjustedPos = previousItem.leftOffset + previousItem.horizAdjustment;
            var nextItemClose = false;
            var prevItemClose = false;
            if(nextItem && (nextItemAdjustedPos - currentItemAdjustedPos < minIdealStorySeparation[this.vSize])){
                adjustmentAmount = (nextItemAdjustedPos - currentItemAdjustedPos - minIdealStorySeparation[this.vSize]);
                adjustmentAmount = (adjustmentAmount < minAdjust[this.vSize]) ? minAdjust[this.vSize] : adjustmentAmount;
                nextItemClose = true;
            }
            else if(previousItem && (currentItemAdjustedPos - previousItemAdjustedPos < minIdealStorySeparation[previousItem.vSize])){
                adjustmentAmount = (currentItemAdjustedPos - previousItemAdjustedPos + minIdealStorySeparation[previousItem.vSize]);
                adjustmentAmount = (adjustmentAmount > maxAdjust[this.vSize]) ? maxAdjust[this.vSize] : adjustmentAmount;
                prevItemClose = true;
            }
            if(nextItemClose && !prevItemClose){
                adjustmentAmount = minAdjust[this.vSize];
                if(previousItem){
                    adjustmentAmount = (previousItemAdjustedPos - currentItemAdjustedPos + minIdealStorySeparation[previousItem.vSize]);
                    adjustmentAmount = (adjustmentAmount < minAdjust[this.vSize]) ? minAdjust[this.vSize] : adjustmentAmount;
                    adjustmentAmount = (adjustmentAmount > maxAdjust[this.vSize]) ? maxAdjust[this.vSize] : adjustmentAmount;
                }
            }
            this.horizAdjustment = adjustmentAmount;
            itemIndex ++ ;
        });
    },
    generateMarkerSizeAndPositions : function(){
        var self = this;
        var rowLastDate = [];
        if(self.timeline.viewType == "duration" || self.timeline.markerSpacing == "top-to-bottom"){
            var numRows = (self.timeline.viewType == "duration" && self.timeline.markerSpacing != "top-to-bottom") ? 5 : self.timeline.markerSpacingObj.rows;
            var maxVerticalPos = (self.timeline.viewType == "duration") ? 10 : 9.2;
            var rowCounter = numRows - 1;
            $.each(self.items, function(){
                if(self.timeline.viewType == "duration" && this.startDate.getTime() < this.endDate.getTime()){
                    var currentRow = rowCounter, inc = 0;
                    while(rowLastDate[currentRow] && rowLastDate[currentRow] > this.startDate.getTime() && inc ++ <numRows){
                        if( -- currentRow < 0){
                            currentRow = numRows - 1;
                        }
                    }
                    if(inc == numRows){
                        this.setVerticalPos({
                            pos : rowCounter / numRows * maxVerticalPos
                        });
                        rowLastDate[rowCounter] = this.endDate.getTime();
                    }
                    else{
                        this.setVerticalPos({
                            pos : currentRow / numRows * maxVerticalPos
                        });
                        rowLastDate[currentRow] = this.endDate.getTime();
                        if(currentRow != rowCounter){
                            rowCounter ++ ;
                        }
                    }
                }
                else{
                    this.setVerticalPos({
                        pos : rowCounter / numRows * maxVerticalPos
                    });
                }
                if(self.timeline.viewType == "duration"){
                    this.generateDurationSizeData();
                }
                else{
                    this.generateSizeData();
                }
                if( -- rowCounter < 0){
                    rowCounter = numRows - 1;
                }
            });
            return;
        }
        var itemIndex = 0;
        var verticalPos = 0;
        var maxVerticalPos = 10;
        $.each(self.items, function(){
            this.numCloseMarkers = 0;
        });
        $.each(self.items, function(){
            var compareIndex = (self.timeline.viewType == "category-band") ? this.categoryIndex + 1 : itemIndex + 1;
            var compareList = (self.timeline.viewType == "category-band") ? theTLMainController.markersByCategory[this.category.key].markers : self.items;
            while(compareList[compareIndex] && (compareList[compareIndex].leftOffset + compareList[compareIndex].horizAdjustment) - (this.leftOffset + this.horizAdjustment) < self.minIdealStorySeparation){
                this.numCloseMarkers ++ ;
                compareList[compareIndex].numCloseMarkers ++ ;
                compareIndex ++ ;
            }
            this.generateSizeData();
            if(self.timeline.viewType == "category-band"){
                if(this.vSize == "category-normal"){
                    verticalPos = 0;
                    this.setVerticalPos({
                        pos : 0
                    });
                }
                else{
                    verticalPos = (verticalPos > 6) ? 0 : verticalPos;
                    this.setVerticalPos({
                        pos : verticalPos
                    });
                    verticalPos += 4.2;
                }
            }
            else if(this.vSize == "normal"){
                verticalPos = 0;
                this.setVerticalPos({
                    pos : 0
                });
            }
            else if(this.vSize == "small"){
                verticalPos = (verticalPos > 6) ? 0 : verticalPos;
                this.setVerticalPos({
                    pos : verticalPos
                });
                verticalPos += 5;
            }
            else if(this.vSize == "very-small"){
                verticalPos = (verticalPos > 7) ? 0 : verticalPos;
                this.setVerticalPos({
                    pos : verticalPos
                });
                verticalPos += 4;
            }
            else if(this.vSize == "tiny"){
                verticalPos = (verticalPos > 7.5) ? 0 : verticalPos;
                this.setVerticalPos({
                    pos : verticalPos
                });
                verticalPos += 2.5;
            }
            else if(this.vSize == "miniature"){
                verticalPos = (verticalPos > 7.5) ? 0 : verticalPos;
                this.setVerticalPos({
                    pos : verticalPos
                });
                verticalPos += 2.5;
            }
            itemIndex ++ ;
        });
    },
    generateMinMaxStagePositionsFromVisibleDates : function(){
        var self = this;
        self.minStagePos = self.getCentredLeftOffsetForDate({
            date : theTLSettings.visibleStartDate
        });
        self.maxStagePos = self.getCentredLeftOffsetForDate({
            date : theTLSettings.visibleEndDate
        });
    },
    initialiseViewDrag : function(){
        var self = this;
        self.draggableObj = new AJKDraggable({
            domDragEl : self.domEl,
            limitFunc : function(){
                var limit = 
                {
                    minX : self.minStagePos,
                    maxX : self.maxStagePos,
                    minY : 0,
                    maxY : 0
                }
                return limit;
            },
            mouseMoveFunc : function(data){
                var leftOffset = -data.dragElPos.x;
                self.stageLeftOffset = -leftOffset;
                self.realStageLeftOffset = self.stageLeftOffset;
                var fraction = (leftOffset + 0.5 * theTLSettings.windowSize.width) / self.width;
                var aDate = AJKHelpers.getEmptyDate();
                aDate.setTime(self.startDate.getTime() + fraction * self.dateRange);
                theTLSettings.setCurrentDate({
                    date : aDate
                });
            },
            dragDidStartFunc : function(){
                theTLSettings.lastSelectedStory = "";
            }
        }).init();
    },
    createViewScaleBlocks : function(){
        var self = this;
        var aDiv = $("<div></div>").get()[0];
        self.domViewBlocksHolder = aDiv;
        if(self.timeline.markerSpacing == "equal"){
            var insertHTML = '<div style="background: url(/assets/ui/stage/zebra-' + self.timeline.equalMarkerSpacing + 'px.png) ' + parseInt(self.timeline.equalMarkerLeftPadding - 0.5 * self.timeline.equalMarkerSpacing) + 'px 0; width: ' + self.width + 'px;" class="scale-block">';
            insertHTML += '<div style="background: url(/assets/ui/stage/standard-scale-' + self.timeline.equalMarkerSpacing + 'px-segments.png) ' + parseInt(self.timeline.equalMarkerLeftPadding - 0.5 * self.timeline.equalMarkerSpacing) + 'px bottom repeat-x;" class="index">';
            for(var counter = 0; counter < self.items.length; counter ++ ){
                var thisMarker = self.items[counter];
                var offset = self.timeline.equalMarkerLeftPadding + (counter * self.timeline.equalMarkerSpacing);
                insertHTML += '<div style="left: ' + offset + 'px" class="scale-block-label"><span id="tl-marker-equal-spacing-date-displayer-' + thisMarker.id + '">' + thisMarker.formatDisplayDate({
                    startDateOnly : true
                }) + '</span></div>'
            }
            insertHTML += '</div>';
            insertHTML += '<div class="content"></div>';
            insertHTML += '</div>';
            $(aDiv).append(insertHTML);
        }
        else{
            var thisBlockStartDate = TLViewController.viewScaleSettings[self.type].getFirstBlockStartDateFromDate({
                date : self.startDate
            });
            var counter = 0;
            while(thisBlockStartDate.getTime() < self.endDate.getTime() && counter < 5000){
                var thisBlockDateRange = TLViewController.viewScaleSettings[self.type].getDateRangeInMS({
                    blockStartDate : thisBlockStartDate
                });
                var aViewScaleBlock = new TLViewScaleBlock({
                    type : self.type,
                    leftOffset : -self.getLeftOffsetForDate({
                        date : thisBlockStartDate
                    }),
                    width : self.getWidthOfDateRange({
                        dateRange : thisBlockDateRange
                    }),
                    text : TLViewController.viewScaleSettings[self.type].getTextForDate({
                        date : thisBlockStartDate
                    }),
                    colour : self.scaleColour,
                    viewScale : TLViewController.viewScaleSettings[self.type],
                    controller : self,
                    index : counter
                }).init();
                if(TLViewController.viewScaleSettings[self.type].adjustDomBlock){
                    TLViewController.viewScaleSettings[self.type].adjustDomBlock({
                        domBlock : aViewScaleBlock.domEl,
                        date : thisBlockStartDate
                    });
                }
                self.viewScaleBlocks.push(aViewScaleBlock);
                $(aDiv).append(aViewScaleBlock.domEl);
                thisBlockStartDate.setTime(thisBlockStartDate.getTime() + thisBlockDateRange);
                counter ++ ;
            }
        }
        $(self.domEl).css({
            width : self.width
        }).append(aDiv);
    },
    currentDateWasUpdatedTo : function(data){
        var self = this;
        var currentDate = data.date;
        var animate = (data.extraInfo) ? data.extraInfo.animate : false;
        if(animate){
            self.animateViewToDate({
                date : currentDate,
                speed : theTLSettings.animateTime
            });
        }
        else{
            self.slideViewToDate({
                date : currentDate
            });
        }
        self.updateDisplayDate({
            date : currentDate
        });
    },
    getClosestMarkerIndexToDate : function(data){
        var self = this;
        var aDate = data.date;
        var centreStagePos = (aDate.getTime() - self.startDate.getTime()) / (self.endDate.getTime() - self.startDate.getTime()) * self.width + 0.5 * self.timeline.equalMarkerSpacing;
        var nearestMarker = parseInt((centreStagePos - self.timeline.equalMarkerLeftPadding) / self.timeline.equalMarkerSpacing);
        return nearestMarker;
    },
    getEqualSpacingDateFromStandardDate : function(data){
        var self = this;
        var aDate = data.aDate;
        var nearestMarker = self.getClosestMarkerIndexToDate({
            date : aDate
        });
        if(nearestMarker < 0){
            aDate = self.startDate;
        }
        else if(self.items[nearestMarker]){
            aDate = self.items[nearestMarker].startDate;
        }
        else{
            aDate = self.endDate;
        }
        return aDate;
    },
    updateDisplayDate : function(data){
        var self = this;
        var aDate = data.date;
        var format = TLViewController.viewScaleSettings[self.type].displayDateFormat;
        format = ( ! format) ? "ddnn MMMM YYYY HH:00" : format;
        format = (self.timeline.topDateFormat != "auto") ? self.timeline.topDateFormat : format;
        if(self.timeline.markerSpacing == "equal"){
            aDate = self.getEqualSpacingDateFromStandardDate({
                aDate : aDate
            });
        }
        var displayDate = AJKHelpers.formatDate({
            date : aDate,
            formatString : format
        });
        if(displayDate != self.displayDate){
            $(self.domDateDisplayer).text(displayDate);
            self.displayDate = displayDate;
        }
        if(self.displayDate){
            $(self.domDateDisplayer).css({
                display : "block"
            });
        }
        else{
            $(self.domDateDisplayer).css({
                display : "none"
            });
        }
    },
    slideViewToDate : function(data){
        var self = this;
        var date = data.date;
        var instantly = data.instantly;
        self.stageLeftOffset = self.getCentredLeftOffsetForDate({
            date : date
        });
        if(( ! self.realStageLeftOffset && self.realStageLeftOffset !== 0) || instantly){
            self.realStageLeftOffset = self.stageLeftOffset;
        }
        self.startStageEasing();
    },
    animateViewToDate : function(data){
        var self = this;
        var date = data.date;
        var speed = (data.speed) ? data.speed : 500;
        self.currentlyAnimating = true;
        self.stageLeftOffset = self.getCentredLeftOffsetForDate({
            date : date
        });
        self.realStageLeftOffset = self.stageLeftOffset;
        $(self.domEl).stop().animate({
            left : self.stageLeftOffset
        }, speed, function(){
            self.currentlyAnimating = false
        });
    },
    getCentredLeftOffsetForDate : function(data){
        var self = this;
        var date = data.date;
        var offset = (date.getTime() - self.startDate.getTime()) / self.dateRange * self.width;
        offset = offset - 0.5 * theTLSettings.windowSize.width;
        return - offset;
    },
    getLeftOffsetForDate : function(data){
        var self = this;
        var date = data.date;
        var offset = (date.getTime() - self.startDate.getTime()) / self.dateRange * self.width;
        return - Math.round(offset);
    },
    getDateFromLeftOffset : function(data){
        var self = this;
        var leftOffset = data.leftOffset;
        var dateInMS = Math.round((leftOffset * self.dateRange / self.width) + self.startDate.getTime());
        var aDate = new Date();
        aDate.setTime(dateInMS);
        return aDate;
    },
    getWidthOfDateRange : function(data){
        var self = this;
        var dateRange = data.dateRange;
        return Math.round(self.width * dateRange / self.dateRange);
    },
    startStageEasing : function(){
        var self = this;
        if( ! self.animationTimeout){ (function(){
                if(self.currentlyAnimating){
                    return;
                }
                self.realStageLeftOffset += (self.stageLeftOffset - self.realStageLeftOffset) / self.easingFraction;
                $(self.domEl).css({
                    left : self.realStageLeftOffset
                });
                if(parseInt(self.stageLeftOffset - self.realStageLeftOffset) != 0){
                    var thisFunc = arguments.callee;
                    self.animationTimeout = setTimeout(function(){
                        thisFunc();
                    }, self.easeTimeoutTime);
                }
                else{
                    self.animationTimeout = "";
                }
            })();
        }
    },
    windowDidResize : function(data){
        var self = this;
        setTimeout(function(){
            self.slideViewToDate({
                date : theTLSettings.currentDate,
                instantly : true
            });
            self.generateMinMaxStagePositionsFromVisibleDates();
        }, 1);
    },
    updateScaleColour : function(data){
        var self = this;
        var colour = data.colour;
        $.each(self.viewScaleBlocks, function(){
            this.updateScaleColour(data);
        });
    }
}
var TLViewCategoryBand = function(data){
    var self = this;
    self.category = data.category;
    self.height = data.height;
    self.top = data.top;
    self.width = data.width;
    self.domRoot = "";
    self.domLabel = "";
}
TLViewCategoryBand.prototype = 
{
    init : function(){
        var self = this;
        self.generateDom();
        return self;
    },
    generateDom : function(){
        var self = this;
        var highlightColor = ($.browser.msie) ? AJKHelpers.adjustColour({
            colour : self.category.colour,
            adjust : 1.2
        }) : self.category.colour;
        var insertHTML = '<div class="tl-view-category-band" style="width: ' + self.width + 'px; border-color: #' + highlightColor + '; height: ' + self.height + '%; top: ' + self.top + '%;">';
        insertHTML += '<div class="tl-vcb-scale"></div>';
        insertHTML += '<div style="background-color: #' + self.category.colour + ';" class="tl-vcb-inner"></div>';
        insertHTML += '</div>';
        self.domRoot = $(insertHTML).get()[0];
        var categoryTitle = AJKHelpers.clipToMaxCharWords({
            aString : self.category.title,
            maxChars : 30
        });
        if($.browser.msie){
            var ieWidth = 30000;
            while(ieWidth < self.width){
                $(self.domRoot).append('<div style="left: ' + ieWidth + 'px; background-color: #' + self.category.colour + ';" class="tl-vcb-inner"></div>');
                ieWidth += 30000;
            }
        }
        var insertHTML = '<div class="tl-view-category-band-label" style="top: ' + (self.height + self.top) + '%;"><h4 style="background-color: #' + highlightColor + ';">' + categoryTitle + '</h4></div>';
        self.domLabel = $(insertHTML).get()[0];
    },
    refreshFromCategory : function(){
        var self = this;
        $(self.domLabel).find("h4").css({
            backgroundColor : "#" + self.category.colour
        }).text(self.category.title);
        $(self.domRoot).css({
            borderColor : "#" + self.category.colour
        });
        $(self.domRoot).find(".tl-vcb-inner").css({
            backgroundColor : "#" + self.category.colour
        });
    }
}
var TLViewScaleBlock = function(data){
    var self = this;
    self.type = data.type;
    self.viewScale = data.viewScale;
    self.numItems = (self.viewScale.numItems) ? self.viewScale.numItems : 1;
    self.index = data.index;
    self.domEl = "";
    self.width = data.width;
    self.text = data.text;
    self.leftOffset = data.leftOffset;
    self.colour = data.colour;
    self.domColourBlock;
    self.itemWidth = self.width / self.numItems;
    self.controller = data.controller;
    self.scaleGraphic = self.viewScale.segmentWidth ? '/assets/ui/stage/standard-scale-' + self.viewScale.segmentWidth + 'px-segments.png' : '/assets/ui/stage/scale-' + self.type + '.png';
    self.foreignScaleGraphic = self.viewScale.segmentWidth ? '/assets/ui/stage/standard-scale-' + self.viewScale.segmentWidth + 'px-segments.png' : '/assets/ui/stage/foreign/scale-' + self.type + '.png';
}
TLViewScaleBlock.prototype = 
{
    init : function(){
        var self = this;
        var viewScaleExtraClass = " scale-block-" + self.type;
        var lang = theTLMainController.timeline.language;
        var scaleGraphic = (lang && lang != "english") ? self.foreignScaleGraphic : self.scaleGraphic;
        var posClass = (self.index % 2) ? " scale-block-odd" : "";
        var blockStyle = (self.viewScale.segmentWidth) ? 'style="background: url(/assets/ui/stage/zebra-' + self.viewScale.segmentWidth + 'px.png)"' : "";
        var insertHTML = '<div ' + blockStyle + 'class="scale-block ' + viewScaleExtraClass + posClass + '">';
        var backgroundStyle = (self.viewScale.segmentWidth) ? "none" : 'url(' + scaleGraphic + ') left bottom repeat-x';
        insertHTML += '<div style="background: ' + backgroundStyle + ';" class="index"><h4>' + self.text + '</h4>';
        for(var counter = 1; counter < self.numItems; counter ++ ){
            var offset = counter * self.itemWidth;
            var itemPos = Math.round(offset + 0.5 * self.itemWidth);
            var itemDate = self.controller.getDateFromLeftOffset({
                leftOffset : self.leftOffset + offset + 0.0005 * self.itemWidth
            });
            if(self.viewScale.segmentWidth){
                insertHTML += '<div style="left: ' + (counter * self.viewScale.segmentWidth) + 'px; width: ' + (self.viewScale.segmentWidth - 2) + 'px;" class="scale-block-label-v2"><span>' + self.viewScale.getTextForDate({
                    date : itemDate,
                    subItem : true
                }) + '</span></div>'
            }
            else{
                insertHTML += '<div style="left: ' + itemPos + 'px" class="scale-block-label"><span>' + self.viewScale.getTextForDate({
                    date : itemDate,
                    subItem : true
                }) + '</span></div>'
            }
        }
        insertHTML += '</div>';
        insertHTML += '<div class="content"></div>';
        insertHTML += '</div>';
        self.domEl = $(insertHTML).get()[0];
        $(self.domEl).css({
            width : self.width,
            left : self.leftOffset
        });
        self.domColourBlock = $(self.domEl).find("h4").get()[0];
        $(self.domColourBlock).css({
            background : "#" + self.colour
        });
        if(self.numItems > 1 && self.viewScale.segmentWidth){
            $(self.domColourBlock).css({
                left : 2,
                width : self.viewScale.segmentWidth - 4
            });
        }
        if(self.viewScale.segmentWidth && (self.numItems % 2) && (self.index % 2)){
            $(self.domEl).css({
                backgroundPosition : -Math.max(self.itemWidth) + "px bottom"
            });
        }
        return self;
    },
    setLeftPosition : function(data){
        var self = this;
        var position = data.position;
        $(self.domEl).css({
            left : position
        });
    },
    updateScaleColour : function(data){
        var self = this;
        self.colour = data.colour;
        $(self.domColourBlock).css({
            background : "#" + self.colour
        });
    }
}
TLViewController.viewScaleSettings = new Array();
TLViewController.viewScaleSettings["hour-5-mins-medium"] = 
{
    getStageWidthRatio : function(){
        return 768 / AJKHelpers.dateOneHourInMS;
    },
    getFirstBlockStartDateFromDate : function(data){
        var aDate = data.date;
        var retDate = new Date(aDate.getTime());
        retDate.setMinutes(0);
        retDate.setSeconds(0);
        retDate.setMilliseconds(0);
        return retDate;
    },
    getDateRangeInMS : function(data){
        var blockStartDate = data.blockStartDate;
        var retDate = new Date(blockStartDate.getTime() + AJKHelpers.dateOneHourInMS);
        retDate.setMinutes(0);
        retDate.setSeconds(0);
        retDate.setMilliseconds(0);
        return retDate.getTime() - blockStartDate.getTime();
    },
    getTextForDate : function(data){
        var aDate = data.date;
        var minutes = aDate.getMinutes();
        var hour = aDate.getHours();
        var lang = theTLMainController.timeline.language;
        var mornAft = TLConfigText['basic_am'];
        if(lang && lang != "english"){
            mornAft = "";
        }
        else{
            if(hour > 12){
                hour -= 12;
                mornAft = TLConfigText['basic_pm'];
            }
            else if(hour == 12 && minutes > 0){
                mornAft = TLConfigText['basic_pm'];
            }
        }
        if(this.roundMinutes){
            minutes = parseInt((minutes + this.roundMinutes / 5) / this.roundMinutes) * this.roundMinutes;
        }
        if(minutes == 0 && hour == 12 && !(lang && lang != "english")){
            return TLConfigText['basic_Noon'];
        }
        else if(minutes == 0 && hour == 0){
            return aDate.getDate() + " " + AJKHelpers.dateMonthsShortArray[aDate.getMonth()];
        }
        else{
            return hour + ":" + AJKHelpers.doubleDigitNum({
                num : minutes
            }) + mornAft;
        }
    },
    displayDateFormat : "ddnn MMMM YYYY HH:mm",
    numItems : 12,
    segmentWidth : 64,
    roundMinutes : 5
}
TLViewController.viewScaleSettings["hour-10-mins-medium"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["hour-5-mins-medium"]
});
TLViewController.viewScaleSettings["hour-10-mins-medium"].getStageWidthRatio = function(){
    return 384 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["hour-10-mins-medium"].numItems = 6;
TLViewController.viewScaleSettings["hour-10-mins-medium"].segmentWidth = 64;
TLViewController.viewScaleSettings["hour-10-mins-medium"].roundMinutes = 10;
TLViewController.viewScaleSettings["hour-15-mins-medium"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["hour-5-mins-medium"]
});
TLViewController.viewScaleSettings["hour-15-mins-medium"].getStageWidthRatio = function(){
    return 256 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["hour-15-mins-medium"].numItems = 4;
TLViewController.viewScaleSettings["hour-15-mins-medium"].segmentWidth = 64;
TLViewController.viewScaleSettings["hour-15-mins-medium"].roundMinutes = 5;
TLViewController.viewScaleSettings["hour-5-mins-large"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["hour-5-mins-medium"]
});
TLViewController.viewScaleSettings["hour-5-mins-large"].getStageWidthRatio = function(){
    return 1536 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["hour-5-mins-large"].numItems = 12;
TLViewController.viewScaleSettings["hour-5-mins-large"].segmentWidth = 128;
TLViewController.viewScaleSettings["hour-5-mins-large"].roundMinutes = 5;
TLViewController.viewScaleSettings["hour-5-mins-very-large"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["hour-5-mins-medium"]
});
TLViewController.viewScaleSettings["hour-5-mins-very-large"].getStageWidthRatio = function(){
    return 3072 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["hour-5-mins-very-large"].numItems = 12;
TLViewController.viewScaleSettings["hour-5-mins-very-large"].segmentWidth = 256;
TLViewController.viewScaleSettings["hour-5-mins-very-large"].roundMinutes = 5;
TLViewController.viewScaleSettings["hour-1-mins-small"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["hour-5-mins-medium"]
});
TLViewController.viewScaleSettings["hour-1-mins-small"].getStageWidthRatio = function(){
    return 3840 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["hour-1-mins-small"].numItems = 60;
TLViewController.viewScaleSettings["hour-1-mins-small"].segmentWidth = 64;
TLViewController.viewScaleSettings["hour-1-mins-small"].roundMinutes = 1;
TLViewController.viewScaleSettings["hour-1-mins-medium"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["hour-5-mins-medium"]
});
TLViewController.viewScaleSettings["hour-1-mins-medium"].getStageWidthRatio = function(){
    return 7680 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["hour-1-mins-medium"].numItems = 60;
TLViewController.viewScaleSettings["hour-1-mins-medium"].segmentWidth = 128;
TLViewController.viewScaleSettings["hour-1-mins-medium"].roundMinutes = 1;
TLViewController.viewScaleSettings["hour-1-mins-large"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["hour-5-mins-medium"]
});
TLViewController.viewScaleSettings["hour-1-mins-large"].getStageWidthRatio = function(){
    return 15360 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["hour-1-mins-large"].numItems = 60;
TLViewController.viewScaleSettings["hour-1-mins-large"].segmentWidth = 256;
TLViewController.viewScaleSettings["hour-1-mins-large"].roundMinutes = 1;
TLViewController.viewScaleSettings["day-medium-hour"] = 
{
    getStageWidthRatio : function(){
        return 64 / AJKHelpers.dateOneHourInMS;
    },
    getFirstBlockStartDateFromDate : function(data){
        var aDate = data.date;
        var retDate = new Date(aDate.getTime());
        retDate.setHours(0);
        retDate.setMinutes(0);
        retDate.setSeconds(0);
        return retDate;
    },
    getDateRangeInMS : function(data){
        var blockStartDate = data.blockStartDate;
        var retDate = new Date(blockStartDate.getTime() + AJKHelpers.dateOneDayInMS);
        retDate.setMinutes(0);
        retDate.setSeconds(0);
        return retDate.getTime() - blockStartDate.getTime();
    },
    getTextForDate : function(data){
        var aDate = data.date;
        if(aDate.getHours() > 20){
            aDate.setTime(aDate.getTime() + AJKHelpers.dateOneDayInMS);
            aDate.setHours(0);
        }
        return aDate.getDate() + " " + AJKHelpers.dateMonthsShortArray[aDate.getMonth()];
    }
}
TLViewController.viewScaleSettings["day-large-hour"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["day-medium-hour"]
});
TLViewController.viewScaleSettings["day-large-hour"].getStageWidthRatio = function(){
    return 128 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["day-small-hour"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["day-medium-hour"]
});
TLViewController.viewScaleSettings["day-small-hour"].getStageWidthRatio = function(){
    return 32 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["day-tiny-hour"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["day-medium-hour"]
});
TLViewController.viewScaleSettings["day-tiny-hour"].getStageWidthRatio = function(){
    return 16 / AJKHelpers.dateOneHourInMS;
}
TLViewController.viewScaleSettings["day-tincy-hour"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["day-medium-hour"]
});
TLViewController.viewScaleSettings["day-tincy-hour"].getStageWidthRatio = function(){
    return 256 / AJKHelpers.dateOneDayInMS;
}
TLViewController.viewScaleSettings["month-small-day"] = 
{
    getStageWidthRatio : function(){
        return 64 / AJKHelpers.dateOneDayInMS;
    },
    getFirstBlockStartDateFromDate : function(data){
        var aDate = data.date;
        var retDate = new Date(aDate.getTime());
        retDate.setDate(1);
        retDate.setHours(0);
        retDate.setMinutes(0);
        retDate.setSeconds(0);
        return retDate;
    },
    getDateRangeInMS : function(data){
        var blockStartDate = data.blockStartDate;
        var retDate = new Date(blockStartDate.getTime());
        var sMonth = blockStartDate.getMonth();
        var sYear = blockStartDate.getFullYear();
        if(sMonth == 11){
            sMonth = 0;
            sYear ++ ;
        }
        else{
            sMonth ++ ;
        }
        retDate.setMonth(sMonth);
        retDate.setFullYear(sYear);
        return retDate.getTime() - blockStartDate.getTime();
    },
    getTextForDate : function(data){
        var aDate = data.date;
        return AJKHelpers.dateMonthsShortArray[aDate.getMonth()] + " '" + AJKHelpers.doubleDigitNum({
            num : aDate.getFullYear() % 100
        });
    },
    displayDateFormat : "ddnn MMMM YYYY",
    offsetNextZebra : false,
    offsetWidth : 64,
    adjustDomBlock : function(data){
        var domBlock = data.domBlock;
        var date = data.date;
        if(this.offsetNextZebra){
            $(domBlock).css({
                backgroundPosition : "-" + (this.offsetWidth + 1) + "px  0"
            });
        }
        var numberOfDaysInMonth = AJKHelpers.numberOfDaysInMonth({
            aDate : date
        });
        if(numberOfDaysInMonth % 2){
            this.offsetNextZebra = !this.offsetNextZebra;
        }
    }
}
TLViewController.viewScaleSettings["month-medium-day"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["month-small-day"]
});
TLViewController.viewScaleSettings["month-medium-day"].offsetWidth = 128;
TLViewController.viewScaleSettings["month-medium-day"].getStageWidthRatio = function(){
    return 128 / AJKHelpers.dateOneDayInMS;
}
TLViewController.viewScaleSettings["month-tiny-day"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["month-small-day"]
});
TLViewController.viewScaleSettings["month-tiny-day"].offsetWidth = 21;
TLViewController.viewScaleSettings["month-tiny-day"].getStageWidthRatio = function(){
    return 21 / AJKHelpers.dateOneDayInMS;
}
TLViewController.viewScaleSettings["month-tincy-day"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["month-small-day"]
});
TLViewController.viewScaleSettings["month-tincy-day"].offsetWidth = 0;
TLViewController.viewScaleSettings["month-tincy-day"].getStageWidthRatio = function(){
    return 12.8 / AJKHelpers.dateOneDayInMS;
}
TLViewController.viewScaleSettings["year-medium-month"] = 
{
    getStageWidthRatio : function(){
        return 768 / AJKHelpers.dateOneYearInMS;
    },
    getFirstBlockStartDateFromDate : function(data){
        var aDate = data.date;
        var retDate = new Date(aDate.getTime());
        retDate.setMonth(0);
        retDate.setDate(1);
        retDate.setHours(0);
        retDate.setMinutes(1);
        retDate.setSeconds(0);
        return retDate;
    },
    getDateRangeInMS : function(data){
        var blockStartDate = data.blockStartDate;
        var retDate = new Date(blockStartDate.getTime());
        retDate.setFullYear(blockStartDate.getFullYear() + 1);
        return retDate.getTime() - blockStartDate.getTime();
    },
    getTextForDate : function(data){
        var self = this;
        var aDate = data.date;
        if(data.subItem){
            var newDate = new Date();
            newDate.setTime(aDate.getTime() + (AJKHelpers.dateOneDayInMS * 2));
            var formatString = (self.segmentWidth < 128) ? "MMM" : (self.segmentWidth < 256) ? "MMMM" : "MMMM YYYY";
            return AJKHelpers.formatDate({
                date : newDate,
                formatString : formatString
            });
        }
        else{
            return AJKHelpers.formatFullYearForDate({
                date : aDate
            });
        }
    },
    displayDateFormat : "MMMM YYYY",
    numItems : 12,
    segmentWidth : 64
}
TLViewController.viewScaleSettings["year-very-large-month"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["year-medium-month"]
});
TLViewController.viewScaleSettings["year-very-large-month"].getStageWidthRatio = function(){
    return 3072 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["year-very-large-month"].segmentWidth = 256;
TLViewController.viewScaleSettings["year-large-month"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["year-medium-month"]
});
TLViewController.viewScaleSettings["year-large-month"].getStageWidthRatio = function(){
    return 1536 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["year-large-month"].segmentWidth = 128;
TLViewController.viewScaleSettings["year-small-month"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["year-medium-month"]
});
TLViewController.viewScaleSettings["year-small-month"].getStageWidthRatio = function(){
    return 384 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["year-small-month"].numItems = 6;
TLViewController.viewScaleSettings["year-tiny-month"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["year-medium-month"]
});
TLViewController.viewScaleSettings["year-tiny-month"].getStageWidthRatio = function(){
    return 252 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["year-tiny-month"].numItems = 4;
TLViewController.viewScaleSettings["year-tiny-month"].segmentWidth = 64;
TLViewController.viewScaleSettings["decade-medium-year"] = 
{
    getStageWidthRatio : function(){
        return 64 / AJKHelpers.dateOneYearInMS;
    },
    getFirstBlockStartDateFromDate : function(data){
        var aDate = data.date;
        var retDate = new Date(aDate.getTime());
        var aYear = retDate.getFullYear();
        if(aYear < 0){
            if(aYear % 10 == 0){
                var roundedYear = aYear;
            }
            else{
                var roundedYear = parseInt(aYear / 10) * 10 - 10;
            }
        }
        else{
            var roundedYear = parseInt(aYear / 10) * 10;
        }
        retDate.setFullYear(roundedYear);
        retDate.setMonth(1);
        retDate.setDate(1);
        retDate.setHours(0);
        retDate.setMinutes(0);
        retDate.setSeconds(0);
        return retDate;
    },
    getDateRangeInMS : function(data){
        var blockStartDate = data.blockStartDate;
        var retDate = new Date(blockStartDate.getTime());
        retDate.setFullYear(blockStartDate.getFullYear() + 10);
        return retDate.getTime() - blockStartDate.getTime();
    },
    getTextForDate : function(data){
        var aDate = data.date;
        return AJKHelpers.formatFullYearForDate({
            date : aDate
        });
    },
    displayDateFormat : "YYYY",
    numItems : 10,
    segmentWidth : 64
}
TLViewController.viewScaleSettings["decade-large-year"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["decade-medium-year"]
});
TLViewController.viewScaleSettings["decade-large-year"].getStageWidthRatio = function(){
    return 128 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["decade-large-year"].segmentWidth = 128;
TLViewController.viewScaleSettings["decade-small-year"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["decade-medium-year"]
});
TLViewController.viewScaleSettings["decade-small-year"].getStageWidthRatio = function(){
    return 32 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["decade-small-year"].segmentWidth = 64;
TLViewController.viewScaleSettings["decade-small-year"].numItems = 5;
TLViewController.viewScaleSettings["century-large-decade"] = 
{
    getStageWidthRatio : function(){
        return 25.6 / AJKHelpers.dateOneYearInMS;
    },
    getFirstBlockStartDateFromDate : function(data){
        var aDate = data.date;
        var retDate = new Date(aDate.getTime());
        var aYear = retDate.getFullYear();
        if(aYear < 0){
            if(aYear % 100 == 0){
                var roundedYear = aYear;
            }
            else{
                var roundedYear = parseInt(aYear / 100) * 100 - 100;
            }
        }
        else{
            var roundedYear = parseInt(aYear / 100) * 100;
        }
        retDate.setFullYear(roundedYear);
        retDate.setMonth(1);
        retDate.setDate(1);
        retDate.setHours(0);
        retDate.setMinutes(0);
        retDate.setSeconds(0);
        return retDate;
    },
    getDateRangeInMS : function(data){
        var blockStartDate = data.blockStartDate;
        var retDate = new Date(blockStartDate.getTime());
        retDate.setFullYear(blockStartDate.getFullYear() + 100);
        return retDate.getTime() - blockStartDate.getTime();
    },
    getTextForDate : function(data){
        var aDate = data.date;
        var fullYear = aDate.getFullYear();
        if(fullYear >= 0){
            var roundedFullYear = parseInt((fullYear + 1) / 10) * 10;
        }
        else{
            var roundedFullYear = parseInt((fullYear - 1) / 10) * 10;
        }
        aDate.setFullYear(roundedFullYear);
        return AJKHelpers.formatFullYearForDate({
            date : aDate
        });
    },
    displayDateFormat : "YYYY",
    numItems : 10,
    segmentWidth : 256
}
TLViewController.viewScaleSettings["century-medium-decade"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["century-large-decade"]
});
TLViewController.viewScaleSettings["century-medium-decade"].getStageWidthRatio = function(){
    return 12.8 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["century-medium-decade"].segmentWidth = 128;
TLViewController.viewScaleSettings["century-small-decade"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["century-large-decade"]
});
TLViewController.viewScaleSettings["century-small-decade"].getStageWidthRatio = function(){
    return 6.4 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["century-small-decade"].segmentWidth = 64;
TLViewController.viewScaleSettings["century-tiny-decade"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["century-large-decade"]
});
TLViewController.viewScaleSettings["century-tiny-decade"].getStageWidthRatio = function(){
    return 3.2 / AJKHelpers.dateOneYearInMS;
}
TLViewController.viewScaleSettings["century-tiny-decade"].segmentWidth = 64;
TLViewController.viewScaleSettings["century-tiny-decade"].numItems = 5;
TLViewController.viewScaleSettings["millenium-large-century"] = 
{
    getStageWidthRatio : function(){
        return 256 * 100 / AJKHelpers.dateOneYearInMS / 10000;
    },
    getFirstBlockStartDateFromDate : function(data){
        var aDate = data.date;
        var retDate = new Date(aDate.getTime());
        var aYear = retDate.getFullYear();
        if(aYear < 0){
            if(aYear % 1000 == 0){
                var roundedYear = aYear;
            }
            else{
                var roundedYear = parseInt(aYear / this.blockDateRange) * this.blockDateRange - this.blockDateRange;
            }
        }
        else{
            var roundedYear = parseInt(aYear / this.blockDateRange) * this.blockDateRange;
        }
        retDate.setFullYear(roundedYear);
        retDate.setMonth(1);
        retDate.setDate(1);
        retDate.setHours(0);
        retDate.setMinutes(0);
        retDate.setSeconds(0);
        retDate.setMilliseconds(0);
        return retDate;
    },
    getDateRangeInMS : function(data){
        var blockStartDate = data.blockStartDate;
        var retDate = new Date(blockStartDate.getTime());
        retDate.setFullYear(blockStartDate.getFullYear() + this.blockDateRange);
        return retDate.getTime() - blockStartDate.getTime();
    },
    getTextForDate : function(data){
        var aDate = data.date;
        var fullYear = aDate.getFullYear();
        if(fullYear >= 0){
            var roundedFullYear = parseInt((fullYear + 10) / 100) * 100;
        }
        else{
            var roundedFullYear = parseInt((fullYear - 10) / 100) * 100;
        }
        aDate.setFullYear(roundedFullYear);
        return AJKHelpers.formatFullYearForDate({
            date : aDate
        });
    },
    blockDateRange : 1000,
    displayDateFormat : "YYYY",
    numItems : 10,
    segmentWidth : 256
}
TLViewController.viewScaleSettings["millenium-medium-century"] = AJKHelpers.cloneObj({
    obj : TLViewController.viewScaleSettings["millenium-large-century"]
});
TLViewController.viewScaleSettings["millenium-medium-century"].getStageWidthRatio = function(){
    return 128 * 100 / AJKHelpers.dateOneYearInMS / 10000;
}
TLViewController.viewScaleSettings["millenium-medium-century"].segmentWidth = 128; (function(){
    var TLSCPCachedDivs = [20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000];
    var TLSCPDiv = 10000;
    var TLSCPMult = 2;
    var TLSCPBlueprint = AJKHelpers.cloneObj({
        obj : TLViewController.viewScaleSettings["millenium-large-century"]
    });
    TLSCPBlueprint.segmentWidth = 128;
    var TLSCPNamePrefix = "large-date-range-";
    var TLSCPInterations = 10;
    for(var counter = 0; counter < TLSCPInterations; counter ++ ){
        var scaleName = "large-date-range-" + counter;
        var scale = AJKHelpers.cloneObj({
            obj : TLSCPBlueprint
        });
        scale.largeDivider = TLSCPCachedDivs[counter];
        scale.blockDateRange = scale.largeDivider / 10;
        scale.getStageWidthRatio = function(){
            var self = this;
            return 128 * 100 / AJKHelpers.dateOneYearInMS / self.largeDivider;
        }
        TLViewController.viewScaleSettings[scaleName] = scale;
    }
})();
var TLMarker = function(data){
    var self = this;
    self.startDate = data.startDate;
    self.endDate = data.endDate;
    self.mainController = data.mainController;
    self.category = data.category;
    self.externalLink = data.externalLink;
    self.media = (data.media) ? data.media : new Array();
    self.mediaByKey = new Array();
    self.photos = data.photos;
    self.markerKey = data.markerKey;
    self.headline = data.headline;
    self.id = data.id;
    self.dateFormat = data.dateFormat;
    self.ownerId = data.ownerId;
    self.ownerName = data.ownerName;
    self.introText = data.introText;
    self.fullText = data.fullText;
    self.extraInfoLoaded = (self.fullText || TLSingleTimelineLicense) ? true : false;
    self.fullText = (self.fullText == "none") ? "" : self.fullText;
    self.INTROTEXTMAXCHARS = 150;
    self.HEADLINEMAXCHARS = 50;
    self.clippedHeadline = AJKHelpers.clipToMaxCharWords({
        aString : self.headline,
        maxChars : self.HEADLINEMAXCHARS
    });
    self.clippedIntroText = AJKHelpers.clipToMaxCharWords({
        aString : self.introText,
        maxChars : self.INTROTEXTMAXCHARS
    });
    self.clippedContentIntroText = (self.externalLink) ? AJKHelpers.clipToMaxCharWords({
        aString : self.introText,
        maxChars : 300
    }) : self.introText;
    self.domRoot = "";
    self.leftOffset = 0;
    self.numCloseMarkers = 0;
    self.sizeClass = "";
    self.vSize = "normal";
    self.sliderPointPosition = "";
    self.domSliderToolTip = "";
    self.domTooltipDomContainer = "";
    self.toolTipVisible = false;
    self.selectedImage = 0;
    self.numImages = (self.photos) ? self.photos.length : 0;
    self.displayImage = "";
    self.domImageGalleryControls = "";
    self.galleryControlsShowing = false;
    self.galleryControlsHeight = (self.vSize == "small") ? 14 : 35;
    self.domRootInner = "";
    self.domSliderToolTipHeadline = "";
    self.domSliderToolTipDate = "";
    self.domMarkerTab = "";
    self.domMarkerHeadline = "";
    self.domMarkerDate = "";
    self.domMarkerIntroText = "";
    self.domSliderPoint = "";
    self.domMainImageHolder = "";
    self.domImageGallery = "";
    self.domMainImageWidth = "";
    self.domMainImageHeight = "";
    self.orderIndex = 0;
    self.galleryClass = "tl-sb-gallery-active";
    self.initialHorizAdjustment = 0;
    self.standardPinPosition = [];
    self.standardPinPosition["normal"] = -157;
    self.standardPinPosition["small"] = -157;
    self.standardPinPosition["very-small"] = -157;
    self.standardPinPosition["tiny"] = -157;
    self.standardPinPosition["miniature"] = -231;
    self.standardPinPosition["category-small"] = -231;
    self.standardPinPosition["category-normal"] = -200;
    self.standardPinPosition["duration-normal"] = -215;
    self.horizAdjustment = 0;
    self.dateFormatString = "DD MMM YYYY"
    self.imageContainerSize = {}
    self.dateStatus = self.mainController.timeline.storyDateStatus;
    self.feedSource = false;
    self.durationBarWidth = 0;
    self.extraInfoIsBeingLoaded = false;
}
TLMarker.prototype = 
{
    init : function(){
        var self = this;
        self.syncStartEndDateIfNeeded();
        if(self.fullText){
            self.fullText = self.fullText.replace(/;xNLx;/g, "\n");
        }
        self.initialiseMedia();
        if(self.externalLink && self.externalLink.indexOf("http") == -1){
            self.externalLink = "http://" + self.externalLink;
        }
        return self;
    },
    initialiseMedia : function(){
        var self = this;
        self.media = self.media.sort(function(a, b){
            return(a.orderIndex < b.orderIndex) ? -1 : (a.orderIndex == b.orderIndex) ? 0 : 1;
        });
        self.images = new Array();
        self.videos = new Array();
        self.audio = new Array();
        self.mediaByKey = new Array();
        var listPos = 0;
        $.each(self.media, function(){
            if(this.src && this.src.charAt(0) != "h" && this.src.charAt(0) != "index-2.html"){
                this.src = "http://" + this.src;
            }
            switch(this.type){
                case "Image" : 
                    self.images.push(this);
                    break;
                case "Video" : 
                    self.videos.push(this);
                    break;
                case "Audio" : 
                    self.audio.push(this);
                    break;
            }
            this.listPosition = listPos ++ ;
            this.key = this.type + "-key-" + this.id;
            self.mediaByKey[this.key] = this;
        });
        self.numImages = self.images.length;
        self.displayImage = (self.images.length) ? self.images[0] : "";
        if( ! self.displayImage && self.videos.length && self.videos[0].externalMediaThumb){
            self.displayImage = 
            {
                id : "awaitingId",
                orderIndex : 10,
                type : "Image",
                src : self.videos[0].externalMediaThumb,
                thumbPosition : (self.videos[0].thumbPosition) ? self.videos[0].thumbPosition : "0,0",
                caption : "",
                listPosition : 1
            }
        }
        else if( ! self.displayImage && self.audio.length && self.audio[0].externalMediaThumb){
            self.displayImage = 
            {
                id : "awaitingId",
                orderIndex : 10,
                type : "Image",
                src : self.audio[0].externalMediaThumb,
                thumbPosition : (self.audio[0].thumbPosition) ? self.audio[0].thumbPosition : "0,0",
                caption : "",
                listPosition : 1
            }
        }
        self.isFlickrImage = (self.displayImage.src && self.displayImage.src.indexOf("flickr.com") != -1);
    },
    updateDisplayImage : function(){
        var self = this;
        if(self.isFlickrImage){
            $(self.domMainImageHolder).addClass("ig-inner-flickr");
        }
        else{
            $(self.domMainImageHolder).removeClass("ig-inner-flickr");
        }
        $(self.domMainImageHolder).empty().append('<img src="' + self.getDisplayImage().src + '" alt="" />');
        self.domMainImage = $(self.domMainImageHolder).find("img").get()[0];
    },
    loadExtraInfo : function(data){
        var self = this;
        var callback = (data) ? data.callback : "";
        if( ! self.extraInfoLoaded && !self.extraInfoIsBeingLoaded && self.id){
            vars = {}
            vars.storyId = self.id;
            self.extraInfoIsBeingLoaded = true;
            theAJKAjaxController.request({
                action : "/stories/getextrainfo",
                method : "post",
                vars : vars,
                alwaysAllow : true,
                callback : function(someText){
                    self.fullText = someText;
                    self.extraInfoLoaded = true;
                    if(callback){
                        callback();
                    }
                }
            });
        }
        else if(callback){
            callback();
        }
    },
    syncStartEndDateIfNeeded : function(){
        var self = this;
        if(self.endDate.getTime() < self.startDate.getTime()){
            self.endDate = new Date();
            self.endDate.setTime(self.startDate.getTime());
        }
    },
    setDomSliderPoint : function(data){
        var self = this;
        self.domSliderPoint = data.domEl;
    },
    setSliderPointPosition : function(data){
        var self = this;
        self.sliderPointPosition = data.position;
    },
    setDomTooltipDomContainer : function(data){
        var self = this;
        self.domTooltipDomContainer = data.domEl;
    },
    createToolTip : function(){
        var self = this;
        insertHTML = '<div class="tl-s-tooltip">';
        insertHTML += '<div class="tl-s-t-inner">';
        if(self.dateStatus == 1){
            insertHTML += '<h5 class="tl-ah-hide">' + self.formatDisplayDate() + '</h5>';
        }
        else if(self.dateStatus == 2){
            insertHTML += '<h5>~' + self.formatDisplayDate() + '</h5>';
        }
        else{
            insertHTML += '<h5>' + self.formatDisplayDate() + '</h5>';
        }
        insertHTML += '<h4>' + self.headline + '</h4>';
        insertHTML += '</div>';
        insertHTML += '<div class="tl-s-t-bottom"></div>';
        insertHTML += '</div>';
        self.domSliderToolTip = $(insertHTML).get()[0];
        self.domSliderToolTipHeadline = $(self.domSliderToolTip).find("h4").get()[0];
        self.domSliderToolTipDate = $(self.domSliderToolTip).find("h5").get()[0];
        $(self.domSliderToolTipDate).css({
            color : "#" + self.category.colour
        });
    },
    showToolTip : function(data){
        var self = this;
        var sliderScaleWidth = data.sliderScaleWidth;
        var scaleLeftOffset = data.scaleLeftOffset;
        var sliderWidth = data.sliderWidth;
        if( ! self.toolTipVisible){
            self.toolTipVisible = true;
            if( ! self.domSliderToolTip){
                self.createToolTip();
            }
            var leftOffset = sliderScaleWidth * self.sliderPointPosition.left / 100 + scaleLeftOffset;
            if(leftOffset > sliderWidth - 100){
                $(self.domSliderToolTip).addClass("tl-s-tooltip-right-aligned");
            }
            else{
                $(self.domSliderToolTip).removeClass("tl-s-tooltip-right-aligned");
            }
            $(self.domSliderToolTip).css({
                left : leftOffset + "px"
            });
            $(self.domTooltipDomContainer).append(self.domSliderToolTip);
        }
    },
    hideToolTip : function(){
        var self = this;
        if(self.toolTipVisible){
            $(self.domSliderToolTip).remove();
            self.toolTipVisible = false;
        }
    },
    generateDurationSizeData : function(){
        var self = this;
        self.sizeClass = "tl-sb-normal-height";
        self.vSize = "duration-normal";
        if(self.startDate.getTime() != self.endDate.getTime()){
            self.sizeClass += " tl-sb-duration-story";
            if(theTLMainController.timeline.markerSpacing == "equal"){
                var endDatePos = theTLMainController.selectedView.getEquallySpacedOffsetForDate({
                    aDate : self.endDate
                });
                endDatePos = (endDatePos == "-1") ? self.leftOffset : endDatePos;
            }
            else{
                var endDatePos = -theTLMainController.selectedView.getLeftOffsetForDate({
                    date : self.endDate
                });
            }
            var barWidth = endDatePos - self.leftOffset;
            self.durationBarWidth = barWidth;
        }
    },
    generateSizeData : function(){
        var self = this;
        if(theTLMainController.timeline.markerSpacing == "top-to-bottom" && theTLMainController.timeline.viewType == "category-band"){
            self.sizeClass = "tl-sb-category-small-height";
            self.vSize = "category-small";
        }
        else if(theTLMainController.timeline.markerSpacing == "top-to-bottom"){
            self.sizeClass = "tl-sb-tiny-height";
            self.vSize = "tiny";
        }
        else if(theTLMainController.timeline.viewType == "category-band"){
            if(self.numCloseMarkers > 1){
                self.sizeClass = "tl-sb-category-small-height";
                self.vSize = "category-small";
            }
            else{
                if(self.mainImageSize && self.mainImageSize.height > 0 && (self.mainImageSize.height < 120 || self.mainImageSize.width < 120)){
                    self.sizeClass = "tl-sb-category-normal-height tl-sb-category-normal-height-small-image";
                    self.vSize = "category-normal";
                }
                else{
                    self.sizeClass = "tl-sb-category-normal-height";
                    self.vSize = "category-normal";
                }
            }
        }
        else if(self.numCloseMarkers > 1000){
            self.sizeClass = "tl-sb-microscopic-height";
            self.vSize = "microscopic";
        }
        else if(self.numCloseMarkers > 8){
            self.sizeClass = "tl-sb-miniature-height";
            self.vSize = "miniature";
        }
        else if(self.numCloseMarkers > 5){
            self.sizeClass = "tl-sb-tiny-height";
            self.vSize = "tiny";
        }
        else if(self.numCloseMarkers > 4){
            self.sizeClass = "tl-sb-low-height tl-sb-very-low-height";
            self.vSize = "very-small";
        }
        else if(self.numCloseMarkers > 0){
            self.sizeClass = "tl-sb-low-height";
            self.vSize = "small";
        }
        else{
            if(self.mainImageSize && self.mainImageSize.height > 0 && (self.mainImageSize.height < 120 || self.mainImageSize.width < 120)){
                self.sizeClass = "tl-sb-low-height";
                self.vSize = "normal";
            }
            else{
                self.sizeClass = "tl-sb-normal-height";
                self.vSize = "normal";
            }
        }
    },
    refreshSizeClass : function(){
        var self = this;
        $(self.domRoot).removeClass("tl-sb-low-height");
        $(self.domRoot).removeClass("tl-sb-very-low-height");
        $(self.domRoot).removeClass("tl-sb-tiny-height");
        $(self.domRoot).removeClass("tl-sb-normal-height");
        $(self.domRoot).removeClass("tl-sb-miniature-height");
        $(self.domRoot).removeClass("tl-sb-microscopic-height");
        $(self.domRoot).removeClass("tl-sb-category-normal-height");
        $(self.domRoot).removeClass("tl-sb-category-normal-height-small-image");
        $(self.domRoot).removeClass("tl-sb-category-small-height");
        $(self.domRoot).removeClass("tl-sb-duration-story");
        $(self.domRoot).addClass(self.sizeClass);
    },
    setVerticalPos : function(data){
        var self = this;
        self.verticalPos = data.pos;
    },
    formatDisplayDate : function(data){
        var self = this;
        var startDateOnly = (data && data.startDateOnly) ? true : false;
        if(self.dateFormat != "auto"){
            if( ! startDateOnly && self.startDate.getTime() != self.endDate.getTime()){
                var dateString = self.generateFromToDateString({
                    formatString : self.dateFormat
                });
            }
            else{
                var dateString = AJKHelpers.formatDate({
                    date : self.startDate,
                    formatString : self.dateFormat
                });
            }
        }
        else if(self.mainController.timeline.storyDateFormat == "auto"){
            if( ! startDateOnly && self.startDate.getTime() != self.endDate.getTime()){
                var dateString = self.generateFromToDateString({
                    formatString : theTLSettings.timeInfo.markerDisplayDateFormat
                });
            }
            else{
                var dateString = AJKHelpers.formatDate({
                    date : self.startDate,
                    formatString : theTLSettings.timeInfo.markerDisplayDateFormat
                });
            }
        }
        else{
            if( ! startDateOnly && self.startDate.getTime() != self.endDate.getTime()){
                var dateString = self.generateFromToDateString({
                    formatString : self.mainController.timeline.storyDateFormat
                });
            }
            else{
                var dateString = AJKHelpers.formatDate({
                    date : self.startDate,
                    formatString : self.mainController.timeline.storyDateFormat
                });
            }
        }
        return dateString;
    },
    generateFromToDateString : function(data){
        var self = this;
        var formatString = data.formatString.replace("MMMM", "MMM");
        var dateString = AJKHelpers.formatDate({
            date : self.startDate,
            formatString : formatString
        });
        dateString += " - " + AJKHelpers.formatDate({
            date : self.endDate,
            formatString : formatString
        });
        return dateString;
    },
    generateDom : function(){
        var self = this;
        if( ! self.domRoot){
            var galleryClass = (self.numImages == 0 && (self.videos.length == 0 || !self.videos[0].externalMediaThumb) && (self.audio.length == 0 || !self.audio[0].externalMediaThumb)) ? "" : " " + self.galleryClass;
            var insertHTML = '<div class="tl-story-block" markerKey="' + self.markerKey + '">';
            insertHTML += '<div class="tl-sb-inner' + galleryClass + '">';
            insertHTML += '<h5 class="tab">' + self.category.title + '</h5>';
            insertHTML += '<div class="top"></div>';
            insertHTML += '<div class="content">';
            insertHTML += '<div class="content-inner">';
            insertHTML += '<div class="tl-sb-basic-info-holder">';
            insertHTML += '<h3 class="tl-sb-headline">' + self.clippedHeadline + '</h3>';
            if(self.dateStatus == 2){
                insertHTML += '<h4 class="tl-sb-date">~' + self.formatDisplayDate() + '</h4>';
            }
            else{
                insertHTML += '<h4 class="tl-sb-date">' + self.formatDisplayDate() + '</h4>';
            }
            if(self.numImages > 0 || (self.videos.length > 0 && self.videos[0].externalMediaThumb) || (self.audio.length > 0 && self.audio[0].externalMediaThumb)){
                insertHTML += self.generateImageGalleryHTML();
            }
            insertHTML += '<div class="tl-sb-duration-bar"></div>';
            insertHTML += '<p class="text tl-sb-intro-text">' + self.clippedIntroText + '</p>';
            insertHTML += '<a class="button-1 tl-sb-more-button" href="#">' + TLConfigText['marker_moreButton_text'] + '</a>';
            insertHTML += '</div>';
            insertHTML += '</div>';
            insertHTML += '</div>';
            insertHTML += '<div class="bottom"><div class="bl"></div><div class="br"></div><div class="bm"><div class="bmp-standard">';
            insertHTML += '<div class="bm-pointer-holder"><div class="bmp bmp-shadow"></div><div class="bmp bmp-pointer"></div></div>';
            insertHTML += '</div></div></div>';
            insertHTML += '</div>';
            insertHTML += '</div>';
            self.domRoot = $(insertHTML).get()[0];
            $(self.domRoot).css({
                visibility : "hidden"
            });
            $(self.domRoot).addClass(self.sizeClass);
            if(self.dateStatus == 1){
                $(self.domRoot).addClass("tl-story-block-hide-date");
            }
            self.domPin = $(self.domRoot).find(".bm").get()[0];
            self.domStandardPin = $(self.domRoot).find(".bmp-standard").get()[0];
            $(self.domStandardPin).css({
                left : (self.standardPinPosition[this.vSize] - self.horizAdjustment) + "px"
            });
            self.domRootInner = $(self.domRoot).find(".tl-sb-inner").get()[0];
            self.domMarkerTab = $(self.domRoot).find(".tab").get()[0];
            self.domMarkerHeadline = $(self.domRoot).find(".tl-sb-headline").get()[0];
            self.domMarkerDate = $(self.domRoot).find(".tl-sb-date").get()[0];
            self.domMarkerIntroText = $(self.domRoot).find(".tl-sb-intro-text").get()[0];
            self.domImageGallery = $(self.domRoot).find(".tl-sb-image-gallery").get()[0];
            self.domMainImageHolder = $(self.domImageGallery).find(".ig-inner").get()[0];
            self.domMainImage = $(self.domMainImageHolder).find("img").get()[0];
            self.domBasicInfoHolder = $(self.domRoot).find(".tl-sb-basic-info-holder").get()[0];
            self.domColoredPointer = $(self.domRoot).find(".bmp-pointer").get()[0];
            self.domDurationBar = $(self.domRoot).find(".tl-sb-duration-bar").get()[0];
            self.setMarkerHorizontalAndVerticalPosition();
            if( ! self.domMainImage){
                $(self.domRoot).css({
                    visibility : "visible"
                });
            }
            else{
                setTimeout(function(){
                    $(self.domRoot).css({
                        visibility : "visible"
                    });
                }, 2000);
                new AJKImageLoader({
                    imageUrl : self.domMainImage.src,
                    loadCallback : function(){
                        self.updateMainImage();
                        $(self.domRoot).css({
                            visibility : "visible"
                        });
                    }
                }).init();
            }
            if( ! $.browser.msie){
                $(self.domMainImage).load(function(){
                    self.updateMainImage();
                    $(self.domRoot).css({
                        visibility : "visible"
                    });
                });
            }
            $(self.domMarkerTab).css({
                background : "#" + self.category.colour
            });
            $(self.domBasicInfoHolder).css({
                background : "#" + self.category.colour
            });
            $(self.domColoredPointer).css({
                "border-top-color" : "#" + self.category.colour
            });
            $(self.domDurationBar).css({
                background : "#" + self.category.colour
            });
        }
        else{
            self.refreshPositionAndSize();
        }
        return self.domRoot;
    },
    getDisplayImage : function(){
        var self = this;
        return {
            src : AJKHelpers.getTimelineImageUrl({
                src : self.displayImage.src
            })
        };
    },
    refreshPositionAndSize : function(){
        var self = this;
        self.refreshSizeClass();
        $(self.domStandardPin).css({
            left : (self.standardPinPosition[this.vSize] - self.horizAdjustment) + "px"
        });
        self.setMarkerHorizontalAndVerticalPosition();
    },
    updateMainImage : function(){
        var self = this;
        if($.browser.opera || $.browser.msie){
            setTimeout(function(){
                self.updateMainImageFunc()
            }, 10);
        }
        else{
            self.updateMainImageFunc()
        }
    },
    updateMainImageFunc : function(){
        var self = this;
        var newImage = $(self.domMainImage).clone().get()[0];
        $(newImage).css({
            height : "auto",
            width : "auto"
        });
        $(self.mainController.domImagePreloader).append(newImage);
        var thisHeight = self.mainImageHeight = newImage.height;
        var thisWidth = self.mainImageWidth = newImage.width;
        $(newImage).remove();
        self.mainImageSize = 
        {
            width : thisWidth,
            height : thisHeight
        }
        if(self.vSize == "normal"){
            if(thisHeight < 120 || thisWidth < 120){
                $(self.domRoot).removeClass(self.sizeClass).addClass("tl-sb-low-height");
            }
            else{
                $(self.domRoot).removeClass("tl-sb-low-height").addClass(self.sizeClass);
            }
        }
        else if(self.vSize == "category-normal"){
            if(thisHeight < 120 || thisWidth < 120){
                $(self.domRoot).removeClass("tl-sb-category-normal-height-small-image").addClass("tl-sb-category-normal-height-small-image");
            }
            else{
                $(self.domRoot).removeClass("tl-sb-category-normal-height-small-image");
            }
        }
        self.imageContainerSize = {};
        self.positionDisplayImageInContainer();
    },
    positionDisplayImageInContainer : function(){
        var self = this;
        if(self.domMainImageHolder && self.domMainImage && self.mainImageHeight && self.mainImageWidth){
            var containerWidth = $(self.domMainImageHolder).width();
            var containerHeight = $(self.domMainImageHolder).height();
            if( ! theTLMainController.timeline.storyImageAutoCrop && self.vSize == "normal" && self.mainImageHeight > 120 && self.mainImageWidth > 120 && theTLMainController.pageSizeClass == "tl-page-size-normal-height"){
                var containerHeight = parseInt(containerWidth / self.mainImageWidth * self.mainImageHeight);
                containerHeight = (containerHeight > 350) ? 350 : containerHeight;
                $(self.domMainImageHolder).css({
                    height : containerHeight
                });
            }
            else if( ! theTLMainController.timeline.storyImageAutoCrop){
                containerHeight = containerWidth;
                $(self.domMainImageHolder).css({
                    height : containerHeight
                });
            }
            var containerSize = 
            {
                height : containerHeight,
                width : containerWidth
            }
            if(self.imageContainerSize.width != containerSize.width || self.imageContainerSize.height != containerSize.height || 1){
                self.imageContainerSize = containerSize;
                AJKHelpers.sizeImageToFitInBoxOfSize({
                    domImage : self.domMainImage,
                    boxSize : containerSize,
                    imageSize : 
                    {
                        width : self.mainImageWidth,
                        height : self.mainImageHeight
                    },
                    imageOffset : self.displayImage.thumbPosition
                });
            }
        }
    },
    generateImageGalleryHTML : function(){
        var self = this;
        var insertHTML = '<div class="tl-sb-image-gallery" markerKey="' + self.markerKey + '">';
        var extraClass = (self.isFlickrImage) ? " ig-inner-flickr" : "";
        insertHTML += '<div class="ig-inner' + extraClass + '">';
        insertHTML += '<img src="' + self.getDisplayImage().src + '" alt="" />';
        insertHTML += '<div class="ig-inner-image-mask"></div>';
        insertHTML += '</div>';
        insertHTML += '</div>';
        return insertHTML;
    },
    setMarkerHorizontalAndVerticalPosition : function(){
        var self = this;
        var extraBottom = (theTLMainController.timeline.viewType == "category-band") ? 5 : 0;
        $(self.domRoot).css({
            left : self.leftOffset + self.horizAdjustment,
            bottom : (extraBottom + self.verticalPos * 8.75) + "%"
        });
        if(self.domDurationBar && self.vSize == "duration-normal" && self.startDate.getTime() != self.endDate.getTime()){
            $(self.domDurationBar).css({
                width : self.durationBarWidth
            });
        }
    },
    showExtraInfo : function(){
        var self = this;
        self.mainController.contentPanelController.displayForStory({
            story : self
        });
    },
    focus : function(){
        var self = this;
        self.loadExtraInfo();
        if(theTLMainController.timeline.viewType == "category-band"){
            $(self.domRoot).addClass("tl-story-block-category-hover");
        }
        $(self.domRoot).css({
            zIndex : 2
        });
        if(self.vSize == "miniature"){
            $(self.domRoot).removeClass("tl-sb-" + self.vSize + "-height");
            $(self.domRoot).addClass("tl-sb-very-low-height").addClass("tl-sb-very-low-height-no-image");
        }
    },
    unfocus : function(){
        var self = this;
        if(theTLMainController.timeline.viewType == "category-band"){
            $(self.domRoot).removeClass("tl-story-block-category-hover");
        }
        $(self.domRoot).css({
            zIndex : 1
        });
        if(self.vSize == "miniature"){
            $(self.domRoot).removeClass("tl-sb-very-low-height").removeClass("tl-sb-very-low-height-no-image");;
            $(self.domRoot).addClass("tl-sb-" + self.vSize + "-height");
        }
    },
    deleteSelf : function(){
        var self = this;
        $(self.domSliderToolTip).remove();
        $(self.domRoot).remove();
        $(self.domSliderPoint).remove();
    }
}
var TLContentPanelController = function(data){
    var self = this;
    self.domRoot = data.domRoot;
    self.mainController = data.mainController;
    self.domContentViewport = $(self.domRoot).find(".tl-main-content-block").get()[0];
    self.domContentStageHolder = $(self.domRoot).find(".tl-mc-content").get()[0];
    self.domTextContentBlock = $(self.domRoot).find(".tl-ch-content-block-text").get()[0];
    self.domContentIntroBlock = $(self.domRoot).find(".tl-ch-content-intro-block").get()[0];
    self.domPanelDateText = $(self.domRoot).find(".tl-ch-panel-date-display").get()[0];
    self.domHeadline = $(self.domRoot).find(".tl-ch-content-intro-block h3").get()[0];
    self.domStandfirst = $(self.domRoot).find(".tl-ch-content-intro-block p.tl-ch-standfirst").get()[0];
    self.domAuthorCredit = $(self.domRoot).find(".tl-ch-content-intro-block p.tl-ch-author").get()[0];
    self.domCloseButton = $(self.domRoot).find(".tl-ch-close-content").get()[0];
    self.domCloseVideoButton = $(self.domRoot).find(".tl-ch-close-video").get()[0];
    self.domNextStory = $(self.domRoot).find(".tl-ch-next-story").get()[0];
    self.domPrevStory = $(self.domRoot).find(".tl-ch-prev-story").get()[0];
    self.domStoryIndexText = $(self.domRoot).find(".tl-ch-selected-story-num").get()[0];
    self.storyIndexText = $(self.domStoryIndexText).text();
    self.domMediaSelectors = $(self.domRoot).find(".tl-ch-media-list li").get();
    self.domVideoContentHolder = $(self.domRoot).find(".tl-ch-video-content").get()[0];
    self.domVideoContent = $(self.domRoot).find(".tl-ch-vc-inner").get()[0];
    self.domGalleryBlock = $(self.domRoot).find(".tl-ch-gallery-block").get()[0];
    self.domGallery = $(self.domRoot).find(".tl-gallery").get()[0];
    self.domFullText = $(self.domRoot).find(".tl-ch-extra-info-text").get()[0];
    self.domTextContentCarousel = $(self.domRoot).find(".ajk-cs-carousel").get()[0];
    self.domReadMoreButton = $(self.domRoot).find(".tl-ch-full-story-link").get()[0];
    self.domStartTimelineButton = $(self.domRoot).find(".tl-ch-start-timeline").get()[0];
    self.domImageGallerySelector = self.domMediaSelectors[0];
    self.domVideoGallerySelector = self.domMediaSelectors[1];
    self.domAudioGallerySelector = self.domMediaSelectors[2];
    self.selectedGallerySelector = "";
    self.showVideoClass = "tl-ah-show-video-content";
    self.domGalleryBlockWidth = 380;
    self.contentViewportWidth = 0;
    self.thumbBlockHeight = 70;
    self.smallViewClass = "tl-content-holder-small-view";
    self.minHeight = 200;
    self.maxHeight = 354;
    self.galleryHideThumbHeight = 170;
    self.domGalleryMaskInner = $(self.domRoot).find(".tl-g-content-mask-inner").get()[0];
    self.imageGallery = "";
    self.bodyContent = "";
    self.standardGalleryWidth = 248;
    self.smallGalleryWidth = 200;
    self.dontDisplayGalleryWidth = 580;
    self.dontDisplayGalleryClass = "tl-content-holder-dont-display-gallery";
    self.currentGalleryWidth = self.standardGalleryWidth;
    self.viewportWidthWhenSmallGalleryKicksIn = 600;
    self.nextStory = "";
    self.prevStory = "";
    self.panelVisible = false;
    self.selectedStory = "";
    self.maxPanelWidth = 800;
    self.panelMargin = 5;
    self.contentScroller = "";
    self.maxNextPrevChars = 40;
    self.showGallery = true;
    self.defaultReadMoreButtonText = TLConfigText['contentPanel_Read_more_text'];
    self.maxThumblessGalleryHeight = 233;
    self.emptyImageReplacer = "/assets/ui/default-gallery-image.gif"
}
TLContentPanelController.prototype = 
{
    init : function(){
        var self = this;
        if(self.mainController.timeline.openReadMoreLinks){
            $(self.domReadMoreButton).attr("target", "_blank");
        }
        $(self.domRoot).find(".tl-mc-fade").click(function(e){
            e.stopPropagation();
            self.hide();
        });
        $(self.domStartTimelineButton).click(function(){
            self.hide();
            return false;
        });
        self.contentScroller = new AJKContentScrollerController({
            domRootEl : self.domTextContentCarousel
        }).init();
        self.selectedGallerySelector = self.domImageGallerySelector;
        $(self.domMediaSelectors).each(function(){
            var thisSelector = this;
            var thisSelectorType = $(this).attr("rel");
            $(this).find("a").click(function(){
                var numItems = parseInt($(this).find("span").text());
                if(numItems == 0){
                    return false;
                }
                self.removeVideo();
                if(self.selectedGallerySelector != thisSelector && numItems){
                    $(self.selectedGallerySelector).removeClass("tl-ch-selected");
                    self.selectedGallerySelector = thisSelector;
                    $(self.selectedGallerySelector).addClass("tl-ch-selected");
                    self.displayGalleryType({
                        type : thisSelectorType
                    });
                }
                return false;
            });
        });
        $(self.domCloseButton).click(function(){
            self.hide();
            return false;
        });
        $(self.domCloseVideoButton).click(function(){
            self.removeVideo();
            return false;
        });
        $(self.domNextStory).click(function(){
            if(self.nextStory){
                self.mainController.focusMarker({
                    marker : self.nextStory
                });
                self.displayForStory({
                    story : self.nextStory
                });
            }
            return false;
        });
        $(self.domPrevStory).click(function(){
            if(self.prevStory){
                self.mainController.focusMarker({
                    marker : self.prevStory
                });
                self.displayForStory({
                    story : self.prevStory
                });
            }
            return false;
        });
        return self;
    },
    initialiseImageGallery : function(){
        var self = this;
        var transition = ($.browser.msie) ? "FadeIn" : "FadeIn";
        var domGalleryRoot = $(self.domRoot).find(".tl-g-main-content").get()[0];
        var domThumbRoot = $(self.domRoot).find(".tl-g-thumb-holder").get()[0];
        $(domGalleryRoot).mousedown(function(e){
            return false;
        });
        $(domGalleryRoot).click(function(e){
            if($(e.target).hasClass("tl-g-video-button")){
                var videoKey = $(e.target).attr("videoKey");
                var videoItem = self.selectedStory.mediaByKey[videoKey];
                self.loadVideo({
                    videoItem : videoItem
                });
                e.preventDefault();
                return false;
            }
            else if($(e.target).hasClass("tl-g-audio-button")){
                var audioKey = $(e.target).attr("audioKey");
                var audioItem = self.selectedStory.mediaByKey[audioKey];
                self.loadAudio({
                    audioItem : audioItem
                });
                e.preventDefault();
                return false;
            }
            else if($(e.target).hasClass("tl-g-flickr-button")){
                window.open($(e.target).attr("href"));
                e.preventDefault();
                return false;
            }
            else if($(self.imageGallery.domStageHolder).hasClass("tl-g-make-item-clickable")){
                var flickrImageUrl = AJKHelpers.getFKRPhotoPageFromImageSrc({
                    src : $(self.imageGallery.previousImage.domImage).attr("origSrc")
                });
                window.open(flickrImageUrl);
            }
        });
        $(domThumbRoot).mousedown(function(e){
            return false;
        });
        self.imageGallery = new AJKImageGallery({
            domRootEl : domGalleryRoot,
            domStageHolder : $(self.domRoot).find(".tl-g-main-content").get()[0],
            domStage : $(self.domRoot).find(".tl-g-main-stage").get()[0],
            transition : transition,
            domPrevButton : $(self.domRoot).find(".tl-g-gallery-control-left").get()[0],
            domNextButton : $(self.domRoot).find(".tl-g-gallery-control-right").get()[0],
            buttonHideClass : "tl-hide",
            imageInfoFunction : "",
            imageHolderHTML : '<div class="tl-g-main-item ak-image-holder"></div>',
            thumbBlockSize : 
            {
                height : 60,
                width : 60,
                widthPadding : 3
            },
            createImageInfoHTML : function(data){
                var anImage = data.image;
                var insertHTML = "";
                if(anImage.caption){
                    insertHTML += '<div class="tl-g-caption-holder">';
                    insertHTML += '<p>' + anImage.caption + '</p>';
                    insertHTML += '</div>';
                }
                if(anImage.type == "Video"){
                    insertHTML += '<a href="#" class="tl-g-media-button tl-g-video-button" videoKey="' + anImage.key + '">' + TLConfigText['contentPanel_Play_video'] + '</a>';
                }
                if(anImage.type == "Audio"){
                    insertHTML += '<a href="#" class="tl-g-media-button tl-g-audio-button" audioKey="' + anImage.key + '">' + TLConfigText['contentPanel_Play_audio'] + '</a>';
                }
                if(anImage.type == "Image" && AJKHelpers.isFlickrImage({
                    src : anImage.src
                })){
                    var fkrLink = AJKHelpers.getFKRPhotoPageFromImageSrc({
                        src : anImage.src
                    });
                    insertHTML += '<a href="' + fkrLink + '" class="tl-g-media-button tl-g-flickr-button" imageKey="' + anImage.key + '">View on Flickr</a>';
                }
                return insertHTML;
            },
            createDomImage : function(data){
                var anImage = data.image;
                var insertHTML = "";
                if(anImage.type == "Image"){
                    var imageSrc = AJKHelpers.getTimelineImageUrl({
                        src : anImage.src,
                        emptyImage : self.emptyImageReplacer
                    });
                    insertHTML += '<img origSrc="' + anImage.src + '" src="' + imageSrc + '" alt="' + anImage.caption + '" />';
                }
                else if(anImage.type == "Video"){
                    var imageSrc = AJKHelpers.getTimelineImageUrl({
                        src : anImage.externalMediaThumb,
                        emptyImage : self.emptyImageReplacer
                    });
                    insertHTML += '<img src="' + imageSrc + '" alt="' + anImage.caption + '" />';
                }
                else if(anImage.type == "Audio"){
                    var audioImage = AJKHelpers.getTimelineImageUrl({
                        src : anImage.externalMediaThumb,
                        emptyImage : self.mainController.defaultAudioImage
                    });
                    insertHTML += '<img src="' + audioImage + '" alt="' + anImage.caption + '" />';
                }
                return $(insertHTML).get()[0];
            },
            domThumbPrevButton : $(self.domRoot).find(".tl-g-thumb-control-left").get()[0],
            domThumbNextButton : $(self.domRoot).find(".tl-g-thumb-control-right").get()[0],
            selectedThumbClass : "tl-g-thumb-item-selected",
            domThumbsHolder : domThumbRoot,
            domThumbsStage : $(self.domRoot).find(".tl-g-thumb-stage").get()[0],
            createThumbBlockFunc : function(data){
                var domImage = data.domImage;
                var insertHTML = '<div class="tl-g-thumb-item">';
                insertHTML += '<div class="tl-g-thumb-mask"></div>';
                insertHTML += '</div>';
                var domThumb = $(insertHTML).get()[0];
                $(domThumb).prepend(domImage);
                return domThumb;
            },
            resizeCallbackFunc : function(data){
                var newSize = data.newSize;
                $(self.domGalleryMaskInner).css({
                    height : newSize.height - 2
                });
            },
            imageWasSelected : function(data){
                var origSrc = $(data.anImage.domImage).attr("origSrc");
                if(origSrc && origSrc.indexOf("flickr.com") != -1){
                    $(self.imageGallery.domStageHolder).addClass("tl-g-make-item-clickable");
                }
                else{
                    $(self.imageGallery.domStageHolder).removeClass("tl-g-main-item-clickable");
                }
            }
        }).init();
    },
    loadVideo : function(data){
        var self = this;
        var videoItem = data.videoItem;
        var embedHTML = AJKHelpers.generateVideoEmbedHTML({
            src : videoItem.src,
            type : videoItem.externalMediaType,
            videoId : videoItem.externalMediaId,
            width : "100%",
            height : "100%",
            colour : self.mainController.timeline.mainColour,
            autoplay : true
        });
        $(self.domCloseVideoButton).text(TLConfigText['contentPanel_Close_video']);
        $(self.domVideoContentHolder).css({
            display : "block"
        });
        $(self.domContentViewport).addClass(self.showVideoClass);
        $(self.domVideoContent).html(embedHTML);
    },
    loadAudio : function(data){
        var self = this;
        var audioItem = data.audioItem;
        var embedHTML = AJKHelpers.generateAudioEmbedHTML({
            src : audioItem.src,
            type : audioItem.externalMediaType,
            audioId : audioItem.externalMediaId,
            width : "100%",
            height : "100%",
            colour : self.mainController.timeline.mainColour,
            autoplay : true
        });
        $(self.domCloseVideoButton).text(TLConfigText['contentPanel_Close_audio']);
        $(self.domVideoContentHolder).css({
            display : "block"
        });
        $(self.domContentViewport).addClass(self.showVideoClass);
        $(self.domVideoContent).html(embedHTML);
    },
    displayGalleryType : function(data){
        var self = this;
        var galleryType = data.type;
        self.imageGallery.loadWithImages({
            images : self.selectedStory[galleryType]
        });
        self.resizeContent({
            newSize : AJKHelpers.viewportSize()
        });
    },
    updateMediaGallerySelectors : function(data){
        var self = this;
        var story = data.story;
        $(self.domImageGallerySelector).removeClass("tl-ch-disabled").find("span").text(story.images.length);
        $(self.domVideoGallerySelector).removeClass("tl-ch-disabled").find("span").text(story.videos.length);
        $(self.domAudioGallerySelector).removeClass("tl-ch-disabled").find("span").text(story.audio.length);
        if(story.images.length == 0){
            $(self.domImageGallerySelector).addClass("tl-ch-disabled");
        }
        if(story.videos.length == 0){
            $(self.domVideoGallerySelector).addClass("tl-ch-disabled");
        }
        if(story.audio.length == 0){
            $(self.domAudioGallerySelector).addClass("tl-ch-disabled");
        }
        $(self.selectedGallerySelector).removeClass("tl-ch-selected");
        if(story.videos.length > 0){
            self.selectedGallerySelector = self.domVideoGallerySelector;
        }
        else if(story.audio.length > 0 && story.images.length == 0){
            self.selectedGallerySelector = self.domAudioGallerySelector;
        }
        else{
            self.selectedGallerySelector = self.domImageGallerySelector;
        }
        $(self.selectedGallerySelector).addClass("tl-ch-selected");
    },
    displayForStory : function(data){
        var self = this;
        var story = data.story;
        self.showGallery = true;
        var cancelGalleryTransition = true;
        self.selectedStory = story;
        if( ! self.panelVisible){
            $(self.domRoot).css({
                display : "block",
                visibility : "hidden"
            });
            setTimeout(function(){
                self.fadeInPanel();
            }, 1);
        }
        if( ! story.isTimelineIntro && !story.extraInfoLoaded){
            $(self.domContentStageHolder).css({
                visibility : "hidden"
            }); (function(){
                var thisFunc = arguments.callee;
                if(story.extraInfoLoaded){
                    self.bodyContent = (story.fullText) ? self.formatBodyText({
                        text : story.fullText
                    }) : "";
                    $(self.domFullText).html(self.bodyContent);
                    self.contentScroller.reset();
                    self.contentScroller.resetSize();
                    $(self.domContentStageHolder).css({
                        visibility : "visible"
                    });
                    self.resizeContent({
                        newSize : AJKHelpers.viewportSize()
                    });
                }
                else{
                    setTimeout(function(){
                        thisFunc();
                    }, 10);
                }
            })();
        }
        if(story.isTimelineIntro){
            $(self.domContentViewport).addClass("tl-ch-timeline-intro-view");
            $(self.domPanelDateText).text(TLConfigText['basic_By'] + " " + self.mainController.timeline.authorName);
        }
        else{
            $(self.domContentViewport).removeClass("tl-ch-timeline-intro-view");
            if(story.dateStatus == 1){
                $(self.domPanelDateText).text("n/a").removeClass("tl-hide").addClass("tl-hide");
            }
            else if(story.dateStatus == 2){
                $(self.domPanelDateText).text("~" + story.formatDisplayDate()).removeClass("tl-hide");
            }
            else{
                $(self.domPanelDateText).text(story.formatDisplayDate()).removeClass("tl-hide");
            }
        }
        if(story.externalLink){
            var buttonText = self.defaultReadMoreButtonText;
            if(story.feedSource == "twitter"){
                buttonText = TLConfigText['contentPanel_View_on'] + " Twitter"
            }
            else if(story.feedSource == "youtube"){
                buttonText = TLConfigText['contentPanel_View_on'] + " YouTube"
            }
            $(self.domReadMoreButton).text(buttonText).css({
                display : "block"
            }).attr("href", story.externalLink);
        }
        else{
            $(self.domReadMoreButton).css({
                display : "none"
            });
        }
        self.removeVideo();
        self.panelVisible = true;
        self.prevStory = self.mainController.getPrevStory({
            story : story
        });
        if(self.prevStory){
            $(self.domPrevStory).text(AJKHelpers.clipToMaxCharWords({
                aString : self.prevStory.headline,
                maxChars : 40
            })).css({
                display : "block"
            });
            self.prevStory.loadExtraInfo();
        }
        else{
            $(self.domPrevStory).css({
                display : "none"
            });
        }
        self.nextStory = self.mainController.getNextStory({
            story : story
        });
        if(self.nextStory){
            $(self.domNextStory).text(AJKHelpers.clipToMaxCharWords({
                aString : self.nextStory.headline,
                maxChars : 40
            })).css({
                display : "block"
            });
            self.nextStory.loadExtraInfo();
            self.lastStoryReached = false;
        }
        else{
            $(self.domNextStory).css({
                display : "none"
            });
            self.lastStoryReached = true;
        }
        var numStories = self.mainController.getNumStories();
        var storyIndexText = self.storyIndexText.replace("x1", (story.orderIndex + 1)).replace("x2", numStories);
        $(self.domStoryIndexText).text(storyIndexText);
        self.bodyContent = (story.fullText) ? self.formatBodyText({
            text : story.fullText
        }) : "";
        $(self.domFullText).html(self.bodyContent);
        $(self.domHeadline).text(story.headline);
        $(self.domStandfirst).text(story.clippedContentIntroText);
        if(story.ownerName){
            $(self.domAuthorCredit).text(TLConfigText['basic_By'] + " " + story.ownerName).css({
                display : "block"
            });
        }
        else{
            $(self.domAuthorCredit).css({
                display : "None"
            });
        }
        $(self.domRoot).css({
            display : "block"
        });
        if( ! self.imageGallery){
            self.initialiseImageGallery();
        }
        var galleryImages = "";
        if(story.images.length > 0 && story.feedSource != "twitter"){
            galleryImages = story.images;
        }
        else{
            galleryImages = [{
                id : "noId",
                src : "",
                caption : "",
                type : "Image"
            }];
        }
        if(story.videos.length > 0){
            self.imageGallery.loadWithImages({
                images : story.videos,
                clearTransition : cancelGalleryTransition
            });
        }
        else if(story.audio.length > 0 && story.images.length == 0){
            self.imageGallery.loadWithImages({
                images : story.audio,
                clearTransition : cancelGalleryTransition
            });
        }
        else{
            self.imageGallery.loadWithImages({
                images : galleryImages,
                clearTransition : cancelGalleryTransition
            });
        }
        if(story.videos.length == 0 && story.audio.length == 0 && !galleryImages[0].src){
            self.showGallery = false;
        }
        self.updateMediaGallerySelectors({
            story : story
        });
        theAJKWindowResizeEvent.removeAsObserver({
            observer : self
        });
        theAJKWindowResizeEvent.registerAsObserver({
            observer : self
        });
        self.resizeContent({
            newSize : AJKHelpers.viewportSize()
        });
        setTimeout(function(){
            self.resizeContent({
                newSize : AJKHelpers.viewportSize()
            });
        });
        self.contentScroller.reset();
        self.contentScroller.resetSize();
    },
    removeVideo : function(){
        var self = this;
        $(self.domVideoContent).empty();
        setTimeout(function(){
            $(self.domVideoContentHolder).css({
                display : "none"
            });
            $(self.domContentViewport).removeClass(self.showVideoClass);
        }, 1);
    },
    hide : function(){
        var self = this;
        theAJKWindowResizeEvent.removeAsObserver({
            observer : self
        });
        if($.browser.msie && $.browser.version < 9){
            $(self.domRoot).css({
                display : "none"
            });
            self.removeVideo();
        }
        else{
            $(self.domRoot).animate({
                opacity : 0
            }, 500, function(){
                $(this).css({
                    display : "none"
                });
                self.removeVideo();
            });
        }
        self.panelVisible = false;
    },
    fadeInPanel : function(){
        var self = this;
        if($.browser.msie && $.browser.version < 9){
            $(self.domRoot).css({
                display : "block",
                visibility : "hidden"
            });
            setTimeout(function(){
                $(self.domRoot).css({
                    visibility : "visible"
                });
            }, 1);
        }
        else{
            $(self.domRoot).css({
                opacity : 0,
                display : "block",
                visibility : "visible"
            });
            setTimeout(function(){
                $(self.domRoot).animate({
                    opacity : 1
                }, 500);
            }, 1);
        }
        self.panelVisible = true;
    },
    windowDidResize : function(data){
        var self = this;
        var newSize = data.newSize;
        self.resizeContent({
            newSize : newSize
        });
    },
    resizeContent : function(data){
        var self = this;
        var newSize = data.newSize;
        var showGallery = (newSize.width < self.dontDisplayGalleryWidth) ? false : self.showGallery;
        if(showGallery){
            $(self.domContentViewport).removeClass(self.dontDisplayGalleryClass);
        }
        else{
            $(self.domContentViewport).addClass(self.dontDisplayGalleryClass);
        }
        var gallerySize = "standard";
        var smallTextLayout = false;
        var contentHeight = newSize.height - 150;
        contentHeight = (contentHeight > self.minHeight) ? contentHeight : self.minHeight;
        contentHeight = (contentHeight < self.maxHeight) ? contentHeight : self.maxHeight;
        $(self.domContentStageHolder).css({
            height : contentHeight
        });
        $(self.domTextContentCarousel).css({
            height : contentHeight - 48
        });
        $(self.domGallery).css({
            height : contentHeight - 48
        });
        var panelWidth = newSize.width - 50;
        panelWidth = (panelWidth > self.maxPanelWidth) ? self.maxPanelWidth : panelWidth;
        self.panelMargin = (newSize.height - contentHeight - 84) / 2;
        $(self.domContentViewport).css({
            top : self.panelMargin,
            width : panelWidth
        });
        $(self.domVideoContentHolder).css({
            height : contentHeight - 48,
            width : panelWidth - 40
        });
        self.contentViewportWidth = $(self.domContentStageHolder).width();
        if( ! showGallery){
            self.currentGalleryWidth = 0;
        }
        else if(self.contentViewportWidth <= self.viewportWidthWhenSmallGalleryKicksIn){
            self.currentGalleryWidth = self.smallGalleryWidth;
            gallerySize = "smaller";
            smallTextLayout = true;
        }
        else{
            self.currentGalleryWidth = self.standardGalleryWidth;
        }
        var dateTextLeft = self.currentGalleryWidth + ((showGallery) ? 20 : 0);
        $(self.domPanelDateText).css({
            left : dateTextLeft
        });
        var nextPrevChars = parseInt((self.contentViewportWidth - 100) / 17);
        nextPrevChars = (nextPrevChars > self.maxNextPrevChars) ? self.maxNextPrevChars : nextPrevChars;
        if(self.prevStory){
            $(self.domPrevStory).text(AJKHelpers.clipToMaxCharWords({
                aString : self.prevStory.headline,
                maxChars : nextPrevChars
            }));
        }
        if(self.nextStory){
            $(self.domNextStory).text(AJKHelpers.clipToMaxCharWords({
                aString : self.nextStory.headline,
                maxChars : nextPrevChars
            }));
        }
        if(contentHeight - self.minHeight < 30){
            gallerySize = "smaller";
            smallTextLayout = true;
        }
        if( ! self.selectedStory.fullText){
            var extraClass = (smallTextLayout) ? "tl-ch-content-small-text-large-standfirst" : "tl-ch-content-large-standfirst";
        }
        $(self.domTextContentBlock).css({
            width : self.contentViewportWidth - self.currentGalleryWidth - 0
        });
        if(self.imageGallery && showGallery){
            var setUpGallery = function(){
                var galleryHeight = contentHeight - 51 - self.thumbBlockHeight;
                var forceHideThumbs = false;
                if(self.selectedStory.isTimelineIntro || self.imageGallery.numImages <= 1){
                    forceHideThumbs = true;
                }
                if(galleryHeight < self.galleryHideThumbHeight || self.currentGalleryWidth < self.standardGalleryWidth || forceHideThumbs){
                    galleryHeight += self.thumbBlockHeight;
                    self.imageGallery.hideThumbs();
                    if(self.selectedStory.mainImageHeight > 0 && self.selectedStory.mainImageWidth > 0 && self.selectedStory.mainImageHeight / self.selectedStory.mainImageWidth < 1.2){
                        galleryHeight = (galleryHeight > self.maxThumblessGalleryHeight) ? self.maxThumblessGalleryHeight : galleryHeight;
                    }
                }
                else{
                    self.imageGallery.showThumbs();
                }
                $(self.domGalleryBlock).css({
                    width : self.currentGalleryWidth
                });
                self.imageGallery.updateSizeTo({
                    size : 
                    {
                        width : self.currentGalleryWidth,
                        height : galleryHeight
                    }
                });
            }
            if($.browser.msie && $.browser.version < 9){
                setTimeout(function(){
                    setUpGallery();
                }, 1);
            }
            else{
                setUpGallery();
            }
        }
        self.contentScroller.resetSize();
    },
    formatBodyText : function(data){
        var self = this;
        var someText = data.text;
        var extraLinkText = (self.mainController.timeline.embed == "true") ? 'target="_top"' : "";
        extraLinkText = (self.mainController.timeline.openReadMoreLinks == 1) ? 'target="_blank"' : extraLinkText;
        if(someText){
            someText = someText.replace(/\\'/g, "'").replace(/;xNLx;/g, "\n").replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n\n/g, "\n").replace(/   /g, " ").replace(/  /g, " ").replace(/ \n/g, "\n").replace(/\n/g, "</p><p>");
            someText = '<p>' + someText + '</p>';
            var aMatch = "";
            while((aMatch = someText.match(/\[([^-\[\(\]\)]*)\]\(([^\[\(\]\)]*)\)/))){
                var aLink = AJKHelpers.customCreateClickableLinks({
                    aString : aMatch[0],
                    extra : extraLinkText
                });
                someText = someText.replace(aMatch[0], aLink);
            }
        }
        return someText;
    }
}
var AJKButtonPopupController = function(data){
    this.domButtons = data.domButtons;
    this.buttonPopups = new Array();
    this.buttonPopupsByKey = new Array();
    this.selectedPopup = "";
    this.observers = new Array();
    this.adjustFunc = (data.adjustFunc) ? data.adjustFunc : function(){
        return 0;
    }
}
AJKButtonPopupController.prototype = 
{
    init : function(){
        var self = this;
        $(self.domButtons).each(function(){
            var popupId = $(this).attr("popupId");
            if(popupId){
                var aButtonPopup = new AJKButtonPopup({
                    domRootEl : $("#" + popupId).get()[0],
                    domButton : this,
                    controller : self,
                    id : popupId
                }).init();
                self.buttonPopups.push(aButtonPopup);
                self.buttonPopupsByKey[popupId] = aButtonPopup;
                $(this).click(function(){
                    if(self.selectedPopup == aButtonPopup){
                        aButtonPopup.hide();
                        self.popupDidClose();
                    }
                    else{
                        aButtonPopup.display();
                        if(self.selectedPopup){
                            self.selectedPopup.hide();
                            self.popupDidClose();
                        }
                        self.selectedPopup = aButtonPopup;
                        self.popupDidOpen();
                    }
                    return false;
                });
            }
        });
        return self;
    },
    popupDidOpen : function(){
        var self = this;
        if(self.observers[self.selectedPopup.id]){
            $.each(self.observers[self.selectedPopup.id], function(){
                if(this.buttonPopupDidOpen){
                    this.buttonPopupDidOpen({
                        popup : self.selectedPopup
                    });
                }
            });
        }
        theAJKKeyEvent.registerAsObserver({
            observer : self
        });
    },
    popupDidClose : function(){
        var self = this;
        if(self.observers[self.selectedPopup.id]){
            $.each(self.observers[self.selectedPopup.id], function(){
                if(this.buttonPopupDidClose){
                    this.buttonPopupDidClose({
                        popup : self.selectedPopup
                    });
                }
            });
        }
        self.selectedPopup = "";
        theAJKKeyEvent.removeAsObserver({
            observer : self
        });
    },
    registerAsObserverOfType : function(dataObj){
        var self = this;
        var type = dataObj.type;
        var observer = dataObj.observer;
        if( ! self.observers[type]){
            self.observers[type] = new Array();
        }
        self.observers[type].push(observer);
    },
    keyEventTookPlace : function(dataObj){
        var self = this;
        var key = dataObj.key;
        if(key == 27 && self.selectedPopup){
            self.selectedPopup.hide();
            self.popupDidClose();
        }
    },
    forceOpenPopupOfType : function(dataObj){
        var self = this;
        var type = dataObj.type;
        if( ! self.buttonPopupsByKey[type].open){
            $(self.buttonPopupsByKey[type].domButton).click();
        }
    },
    forceClosePopupOfType : function(dataObj){
        var self = this;
        var type = dataObj.type;
        if(self.buttonPopupsByKey[type].open){
            $(self.buttonPopupsByKey[type].domButton).click();
        }
    }
}
var AJKButtonPopup = function(dataObj){
    this.domRootEl = dataObj.domRootEl;
    this.domButton = dataObj.domButton;
    this.id = dataObj.id;
    this.domCloseButtons = $(this.domRootEl).find("a.close").get();
    this.observers = new Array();
    this.open = false;
    this.controller = dataObj.controller;
    this.animateStartTop = -100;
    this.animateEndTop = 40;
}
AJKButtonPopup.prototype = 
{
    init : function(){
        var self = this;
        $(self.domCloseButtons).click(function(){
            self.hide();
            self.controller.popupDidClose();
            return false;
        });
        return self;
    },
    display : function(){
        var self = this;
        var rightOffset = theAJKWindowResizeEvent.lastWindowSize.width - AJKHelpers.getCoordsOfDomEl({
            domEl : self.domButton
        }).x + self.controller.adjustFunc();
        rightOffset -= parseInt($(self.domButton).parent().width() / 2);
        if($.browser.msie && $.browser.version < 9){
            $(self.domRootEl).css({
                top : self.animateStartTop,
                display : "block",
                right : rightOffset
            }).animate({
                top : self.animateEndTop
            }, 250, function(){});
        }
        else{
            $(self.domRootEl).css({
                opacity : 0,
                top : self.animateStartTop,
                display : "block",
                right : rightOffset
            }).animate({
                top : self.animateEndTop,
                opacity : 1
            }, 250, function(){});
        }
        self.open = true;
    },
    hide : function(){
        var self = this;
        if($.browser.msie && $.browser.version < 9){
            $(self.domRootEl).animate({
                top : self.animateStartTop
            }, 250, function(){
                $(this).css({
                    display : "none"
                });
            });
        }
        else{
            $(self.domRootEl).animate({
                top : self.animateStartTop,
                opacity : 0
            }, 250, function(){
                $(this).css({
                    display : "none"
                });
            });
        }
        self.open = false;
    }
}
var TLLoginPanelController = function(data){
    var self = this;
    self.domRootEl = data.domRootEl;
    self.buttonPopupId = data.buttonPopupId;
    self.loginVerification = "";
    self.controller = data.controller;
    self.domCarousel = $(self.domRootEl).find(".fp-carousel").get()[0];
    self.domStage = $(self.domRootEl).find(".fp-stage").get()[0];
    self.domBlocks = $(self.domRootEl).find(".fp-block").get();
    self.domForgottenPassword = $(self.domRootEl).find(".forgotten-password").get()[0];
    self.carouselBlockHeight = "10.5em";
    self.selectedBlock = 0;
    self.getLoginDetailsVerification = "";
}
TLLoginPanelController.prototype = 
{
    init : function(){
        var self = this;
        $(self.domBlocks).css({
            height : self.carouselBlockHeight
        });
        $(self.domCarousel).css({
            height : self.carouselBlockHeight
        });
        $(self.domBlocks[0]).css({
            display : "block"
        });
        if(self.buttonPopupId){
            theAJKButtonPopupController.registerAsObserverOfType({
                type : self.buttonPopupId,
                observer : self
            });
            self.buttonPopupDidClose = function(){
                self.reset();
            }
        }
        $(self.domRootEl).find(".ajk-pd-back-to-start").click(function(){
            self.jumpTo({
                pos : 0
            });
            return false;
        });
        $(self.domForgottenPassword).click(function(){
            self.jumpTo({
                pos : 1
            });
            return false;
        });
        self.loginVerification = new AJKVerifier({
            domRootEl : $(self.domRootEl).find(".fp-block-0").get()[0],
            submitFunc : function(data){
                data.fieldData["password"] = data.fieldData["tikitokipassword"];
                theAJKAjaxController.request({
                    action : "/login/",
                    method : "post",
                    alwaysAllow : true,
                    vars : data.fieldData,
                    callback : function(xml){
                        var error = $(xml).find("error").text();
                        if(error){
                            self.loginVerification.errorHighlightField({
                                fieldName : "username"
                            });
                            self.loginVerification.errorHighlightField({
                                fieldName : "tikitokipassword"
                            });
                            self.loginVerification.displayErrorMessage({
                                message : TLConfigText['loginPopdown_incorrectLogin_message']
                            });
                        }
                        else{
                            var userId = $(xml).find("userId").text();
                            var username = $(xml).find("username").text();
                            var verifyCode = $(xml).find("verifyCode").text();
                            theAJKButtonPopupController.forceClosePopupOfType({
                                type : self.buttonPopupId
                            });
                            setTimeout(function(){
                                self.reset();
                            }, 300);
                            self.controller.logUserIn({
                                userId : userId,
                                username : username,
                                verifyCode : verifyCode
                            });
                        }
                    }
                });
            }
        }).init();
        self.getLoginDetailsVerification = new AJKVerifier({
            domRootEl : $(self.domRootEl).find(".fp-block-1").get()[0],
            submitFunc : function(data){
                self.jumpTo({
                    pos : 2
                });
                theAJKAjaxController.request({
                    action : "/login/recovery/",
                    method : "post",
                    alwaysAllow : true,
                    vars : data.fieldData,
                    callback : function(xml){
                        var error = $(xml).find("error").text();
                        if(error){
                            self.getLoginDetailsVerification.errorHighlightField({
                                fieldName : "email"
                            });
                            self.getLoginDetailsVerification.displayErrorMessage({
                                message : TLConfigText['loginPopdown_Email_not_in_database']
                            });
                            self.jumpTo({
                                pos : 1
                            });
                        }
                        else{
                            self.jumpTo({
                                pos : 3
                            });
                        }
                    }
                });
            }
        }).init();
        return self;
    },
    jumpTo : function(dataObj){
        var self = this;
        var newPos = dataObj.pos;
        var callback = dataObj.callback;
        var duration = (dataObj.instantly) ? 0 : 300;
        if(self.selectedBlock == newPos){
            return;
        }
        var oldPos = self.selectedBlock;
        self.selectedBlock = newPos;
        self.carouselHeight = $(self.domCarousel).height();
        if(newPos > oldPos){
            $(self.domBlocks[newPos]).css({
                display : "block"
            });
            $(self.domStage).animate({
                marginTop : -self.carouselHeight
            }, duration, function(){
                $(self.domBlocks[oldPos]).css({
                    display : "none"
                });
                $(this).css({
                    marginTop : "0"
                });
                if(callback){
                    callback();
                }
            });
        }
        else{
            $(self.domBlocks[newPos]).css({
                display : "block"
            });
            $(self.domStage).css({
                marginTop : -self.carouselHeight
            });
            $(self.domStage).animate({
                marginTop : 0
            }, duration, function(){
                $(self.domBlocks[oldPos]).css({
                    display : "none"
                });
                if(callback){
                    callback();
                }
            });
        }
    },
    reset : function(){
        var self = this;
        self.resetFields();
        self.jumpTo({
            pos : 0,
            instantly : true
        });
    },
    resetFields : function(){
        var self = this;
        self.loginVerification.clearFields();
        self.loginVerification.clearAllErrors();
    }
}
var TLSignupPanelController = function(data){
    var self = this;
    self.domRootEl = data.domRootEl;
    self.controller = data.controller;
    self.buttonPopupId = data.buttonPopupId;
    self.signUpVerification = "";
    self.domCarousel = $(self.domRootEl).find(".fp-carousel").get()[0];
    self.domStage = $(self.domRootEl).find(".fp-stage").get()[0];
    self.domBlocks = $(self.domRootEl).find(".fp-block").get();
    self.carouselBlockHeight = "21em";
    self.selectedBlock = 0;
    self.domAutoLoginButton = $(self.domRootEl).find(".tl-signup-auto-login-button").get()[0];
    self.username = "";
    self.userPassword = "";
    self.userId;
}
TLSignupPanelController.prototype = 
{
    init : function(){
        var self = this;
        $(self.domBlocks).css({
            height : self.carouselBlockHeight
        });
        $(self.domCarousel).css({
            height : self.carouselBlockHeight
        });
        $(self.domBlocks[0]).css({
            display : "block"
        });
        if(self.buttonPopupId){
            theAJKButtonPopupController.registerAsObserverOfType({
                type : self.buttonPopupId,
                observer : self
            });
            self.buttonPopupDidClose = function(){
                self.reset();
            }
        }
        $(self.domAutoLoginButton).click(function(){
            self.controller.loginPanelController.loginVerification.setFieldValues({
                fieldValues : 
                {
                    username : self.username,
                    tikitokipassword : self.userPassword
                }
            });
            self.controller.loginPanelController.loginVerification.fireButton({
                buttonType : "save"
            });
            theAJKButtonPopupController.forceClosePopupOfType({
                type : self.buttonPopupId
            });
            return false;
        });
        self.signUpVerification = new AJKVerifier({
            domRootEl : $(self.domRootEl).find(".ajk-verifier").get()[0],
            submitFunc : function(data){
                data.fieldData["password"] = data.fieldData["tikitokisignuppassword"];
                self.username = data.fieldData["username"];
                self.userPassword = data.fieldData["password"];
                data.fieldData["pupilClassCode"] = (data.fieldData["pupilClassCode"] == TLConfigText['signup_Enter_class_code']) ? "" : data.fieldData["pupilClassCode"];
                theAJKAjaxController.request({
                    action : "/signup/",
                    method : "post",
                    alwaysAllow : true,
                    vars : data.fieldData,
                    callback : function(xml){
                        var anError = $(xml).find("error").text();
                        if(anError && anError == "error:username-already-exists"){
                            self.signUpVerification.errorHighlightField({
                                fieldName : "username"
                            });
                            self.signUpVerification.displayErrorMessage({
                                message : TLConfigText['signup_Username_exists']
                            });
                        }
                        else if(anError && anError == "error:email-already-exists"){
                            self.signUpVerification.errorHighlightField({
                                fieldName : "email"
                            });
                            self.signUpVerification.displayErrorMessage({
                                message : TLConfigText['signup_Email_taken']
                            });
                        }
                        else if(anError && anError == "error:too-many-pupils"){
                            self.signUpVerification.errorHighlightField({
                                fieldName : "pupilClassCode"
                            });
                            self.signUpVerification.displayErrorMessage({
                                message : TLConfigText['signup_Class_accounts_full']
                            });
                        }
                        else if(anError && anError == "error:incorrect-class-code"){
                            self.signUpVerification.errorHighlightField({
                                fieldName : "pupilClassCode"
                            });
                            self.signUpVerification.displayErrorMessage({
                                message : TLConfigText['signup_Incorrect_class_code']
                            });
                        }
                        else{
                            self.userId = $(xml).find("userId").text();
                            self.jumpTo({
                                pos : 1
                            });
                        }
                    }
                });
            }
        }).init();
        return self;
    },
    jumpTo : function(dataObj){
        var self = this;
        var newPos = dataObj.pos;
        var callback = dataObj.callback;
        var duration = (dataObj.instantly) ? 0 : 300;
        if(self.selectedBlock == newPos){
            return;
        }
        var oldPos = self.selectedBlock;
        self.selectedBlock = newPos;
        self.carouselHeight = $(self.domCarousel).height();
        if(newPos > oldPos){
            $(self.domBlocks[newPos]).css({
                display : "block"
            });
            $(self.domStage).animate({
                marginTop : -self.carouselHeight
            }, duration, function(){
                $(self.domBlocks[oldPos]).css({
                    display : "none"
                });
                $(this).css({
                    marginTop : "0"
                });
                if(callback){
                    callback();
                }
            });
        }
        else{
            $(self.domBlocks[newPos]).css({
                display : "block"
            });
            $(self.domStage).css({
                marginTop : -self.carouselHeight
            });
            $(self.domStage).animate({
                marginTop : 0
            }, duration, function(){
                $(self.domBlocks[oldPos]).css({
                    display : "none"
                });
                if(callback){
                    callback();
                }
            });
        }
    },
    reset : function(){
        var self = this;
        self.resetFields();
        self.jumpTo({
            pos : 0,
            instantly : true
        });
    },
    resetFields : function(){
        var self = this;
        self.signUpVerification.clearFields();
        self.signUpVerification.clearAllErrors();
    }
}
var AJKVerifier = function(data){
    this.domRootEl = data.domRootEl;
    this.domFields = $(this.domRootEl).find(".ajk-verifier-field").get();
    this.domSubmitButton = $(this.domRootEl).find(".ajk-verifier-submit").get()[0];
    this.domCancelButton = $(this.domRootEl).find(".ajk-verifier-cancel").get()[0];
    this.domRevertButton = $(this.domRootEl).find(".ajk-verifier-revert").get()[0];
    this.domTooltipDisplay = $(this.domRootEl).find(".ajk-verifier-tooltip-displayer").get()[0];
    this.domErrorMessage = $(this.domRootEl).find(".ajk-verifier-error-message").get()[0];
    this.domSuccessMessage = $(this.domRootEl).find(".ajk-verifier-success-message").get()[0];
    this.defaultErrorMessage = $(this.domErrorMessage).text();
    this.submitFunc = data.submitFunc;
    this.cancelFunc = data.cancelFunc;
    this.revertFunc = data.revertFunc;
    this.objFields = new Array();
    this.objFieldsByKey = new Array();
    this.numFields = this.domFields.length;
    this.onChangeCallback = "";
    this.onKeyUpCallback = "";
    this.savedFieldValues = "";
    this.disableSaveAndRevertClass = "ajk-verifier-disable-save-and-revert";
    self.saveAndRevertDisabled = false;
    return this;
}
AJKVerifier.prototype = 
{
    init : function(){
        var self = this;
        $(this.domRootEl).find("form").each(function(){
            $(this).submit(function(){
                return false
            });
        });
        var counter = 0;
        $.each(self.domFields, function(){
            var isLast = ( ++ counter == self.numFields) ? true : false;
            var aNewField = new AJKVerifierField({
                domRootEl : this,
                isLast : isLast,
                fieldHoverFunc : function(data){
                    self.displayTooltip(data);
                },
                clearAllErrorsFunc : function(data){
                    self.clearAllErrors(data);
                },
                controller : self
            }).init();
            self.objFields.push(aNewField);
            self.objFieldsByKey[aNewField.fieldName] = aNewField;
        });
        if( ! self.domErrorMessage){
            self.hideErrorMessage = function(){};
            self.displayErrorMessage = function(){};
        }
        if( ! self.domTooltipDisplay){
            self.displayTooltip = function(){};
        }
        $(self.domSubmitButton).click(function(){
            self.attemptToSubmit();
            return false;
        });
        $(self.domCancelButton).click(function(){
            if(self.cancelFunc){
                self.cancelFunc();
            }
            return false;
        });
        $(self.domRevertButton).click(function(){
            if(self.revertFunc && !self.saveAndRevertDisabled){
                self.revertFunc();
                self.clearAllErrors();
            }
            return false;
        });
        return self;
    },
    fireButton : function(data){
        var self = this;
        var buttonType = data.buttonType;
        switch(buttonType){
            case "revert" : 
                $(self.domRevertButton).click();
                break;
            case "save" : 
                $(self.domSubmitButton).click();
                break;
            case "cancel" : 
                $(self.domCancelButton).click();
                break;
        }
    },
    showCancelButton : function(){
        var self = this;
        if(self.domCancelButton){
            $(self.domCancelButton).css({
                display : "block"
            });
        }
    },
    showRevertButton : function(){
        var self = this;
        if(self.domRevertButton){
            $(self.domRevertButton).css({
                display : "block"
            });
        }
    },
    hideCancelButton : function(){
        var self = this;
        if(self.domCancelButton){
            $(self.domCancelButton).css({
                display : "none"
            });
        }
    },
    hideRevertButton : function(){
        var self = this;
        if(self.domRevertButton){
            $(self.domRevertButton).css({
                display : "none"
            });
        }
    },
    enableSaveAndRevert : function(){
        var self = this;
        $(self.domRootEl).removeClass(self.disableSaveAndRevertClass);
        self.saveAndRevertDisabled = false;
    },
    disableSaveAndRevert : function(){
        var self = this;
        $(self.domRootEl).addClass(self.disableSaveAndRevertClass);
        self.saveAndRevertDisabled = true;
    },
    setFieldValues : function(data){
        var self = this;
        var fieldValues = data.fieldValues;
        var forceChangeEvent = data.forceChangeEvent;
        for(var fieldName in fieldValues){
            if(self.objFieldsByKey[fieldName]){
                var oldValue = self.objFieldsByKey[fieldName].getValue();
                self.objFieldsByKey[fieldName].forceSetValue({
                    value : fieldValues[fieldName]
                });
                if(forceChangeEvent == "auto"){
                    if(oldValue != fieldValues[fieldName]){
                        self.fieldDidChange({
                            fieldName : fieldName,
                            fieldValue : self.objFieldsByKey[fieldName].fieldValue
                        });
                    }
                }
                else if(forceChangeEvent){
                    self.fieldDidChange({
                        fieldName : fieldName,
                        fieldValue : self.objFieldsByKey[fieldName].fieldValue
                    });
                }
            }
        }
    },
    getFieldValueFromName : function(data){
        var self = this;
        var fieldName = data.fieldName;
        return self.objFieldsByKey[fieldName].getValue();
    },
    attemptToSubmit : function(){
        var self = this;
        if(self.saveAndRevertDisabled){
            return false;
        }
        if(self.verifyFields()){
            self.submit();
        }
        else{
            self.displayErrorMessage({
                message : self.defaultErrorMessage
            })
        }
    },
    errorHighlightField : function(data){
        var self = this;
        var fieldName = data.fieldName;
        self.objFieldsByKey[fieldName].highlightError();
    },
    displayErrorMessage : function(data){
        var self = this;
        var message = data.message;
        $(self.domErrorMessage).html(message).css({
            display : "block"
        });
        self.hideSuccessMessage();
    },
    hideErrorMessage : function(data){
        var self = this;
        $(self.domErrorMessage).css({
            display : "none"
        });
    },
    displaySuccessMessage : function(data){
        var self = this;
        if(self.domSuccessMessage){
            $(self.domSuccessMessage).css({
                display : "block"
            });
        }
    },
    hideSuccessMessage : function(data){
        var self = this;
        if(self.domSuccessMessage){
            $(self.domSuccessMessage).css({
                display : "none"
            });
        }
    },
    clearAllErrors : function(){
        var self = this;
        self.hideErrorMessage();
        self.hideSuccessMessage();
        $.each(self.objFields, function(){
            this.clearError();
        });
    },
    displayTooltip : function(data){
        var self = this;
        var tooltipText = data.tooltipText;
        if(tooltipText){
            $(self.domTooltipDisplay).html(tooltipText).css({
                display : "block"
            });
        }
        else{
            $(self.domTooltipDisplay).html(tooltipText).css({
                display : "none"
            });
        }
    },
    verifyFields : function(){
        var self = this;
        var failedFields = 0;
        $.each(self.objFields, function(){
            if( ! this.verify()){
                failedFields ++ ;
                this.highlightError();
            }
        });
        return(failedFields == 0);
    },
    submit : function(){
        var self = this;
        if(self.saveAndRevertDisabled){
            return false;
        }
        $.each(self.objFields, function(){
            this.blur();
        });
        var fieldData = new Object();
        self.displaySuccessMessage();
        $.each(self.objFields, function(){
            var thisVal = this.fieldValue;
            if(thisVal && thisVal.replace){
                if(this.controlType == "input text"){
                    thisVal = thisVal.replace(/[\n\r]/g, "");
                }
                thisVal = thisVal.replace(/[\t]/g, "");
                thisVal = thisVal.replace(/\x18/g, "");
                thisVal = thisVal.replace(/\u2028/g, "");
                thisVal = thisVal.replace(/\u2029/g, "");
            }
            fieldData[this.fieldName] = thisVal;
        });
        self.submitFunc({
            fieldData : fieldData
        });
    },
    saveFieldValues : function(){
        var self = this;
        self.savedFieldValues = {};
        $.each(self.objFields, function(){
            self.savedFieldValues[this.fieldName] = this.fieldValue;
        });
    },
    clearSavedFieldValues : function(){
        var self = this;
        self.savedFieldValues = {};
        $.each(self.objFields, function(){
            self.savedFieldValues[this.fieldName] = "";
        });
    },
    restoreSavedFieldValues : function(){
        var self = this;
        if(self.savedFieldValues){
            self.setFieldValues({
                fieldValues : self.savedFieldValues,
                forceChangeEvent : "auto"
            });
        }
        self.disableSaveAndRevert();
    },
    restoreOldValueForField : function(data){
        var self = this;
        var fieldName = data.fieldName;
        self.objFieldsByKey[fieldName].forceSetValue({
            value : self.objFieldsByKey[fieldName].oldFieldValue
        });
        if( ! self.areValuesDifferentFromSavedValues()){
            self.disableSaveAndRevert();
        }
    },
    restoreSavedValueForField : function(data){
        var self = this;
        var fieldName = data.fieldName;
        if(self.savedFieldValues && self.savedFieldValues[fieldName]){
            self.objFieldsByKey[fieldName].forceSetValue({
                value : self.savedFieldValues[fieldName]
            });
            self.fieldDidChange({
                fieldName : fieldName,
                fieldValue : self.objFieldsByKey[fieldName].fieldValue
            });
            if( ! self.areValuesDifferentFromSavedValues()){
                self.disableSaveAndRevert();
            }
        }
    },
    clearFields : function(){
        var self = this;
        $.each(self.objFields, function(){
            this.clear();
        });
    },
    fieldDidChange : function(data){
        var self = this;
        var fieldName = data.fieldName;
        var fieldValue = data.fieldValue;
        if(self.onChangeCallback){
            self.onChangeCallback({
                fieldName : fieldName,
                fieldValue : fieldValue
            });
        }
        if(self.areValuesDifferentFromSavedValues()){
            self.enableSaveAndRevert();
        }
        else{
            self.disableSaveAndRevert();
        }
    },
    fieldDidKeyUp : function(data){
        var self = this;
        var fieldName = data.fieldName;
        var fieldValue = data.fieldValue;
        if(self.onKeyUpCallback){
            self.onKeyUpCallback({
                fieldName : fieldName,
                fieldValue : fieldValue
            });
        }
        if(self.areValuesDifferentFromSavedValues()){
            self.enableSaveAndRevert();
        }
        else{
            self.disableSaveAndRevert();
        }
    },
    areValuesDifferentFromSavedValues : function(){
        var self = this;
        if(self.savedFieldValues){
            var difference = false;
            $.each(self.objFields, function(){
                if(this.getValue() != self.savedFieldValues[this.fieldName]){
                    difference = true;
                }
            });
            return difference;
        }
        else{
            return true;
        }
    }
}
var AJKVerifierField = function(data){
    this.domRootEl = data.domRootEl;
    this.fieldHoverFunc = data.fieldHoverFunc;
    this.clearAllErrorsFunc = data.clearAllErrorsFunc;
    this.isLast = data.isLast;
    this.controller = data.controller;
    this.domFormat = "";
    this.domChars = "";
    this.domTooltip = "";
    this.domControl = "";
    this.tooltip = "";
    this.format = "";
    this.chars = "";
    this.defaultValue = "";
    this.controlType = "";
    this.fieldValue = "";
    this.fieldName = "";
    this.defaultValueOkay = "";
    this.valueOptions = "";
    this.colorPicker = false;
    this.oldFieldValue = "";
    return this;
}
AJKVerifierField.prototype = 
{
    init : function(){
        var self = this;
        self.domFormat = $(this.domRootEl).find(".ajk-verifier-format");
        self.domChars = $(this.domRootEl).find(".ajk-verifier-chars");
        self.domTooltip = $(this.domRootEl).find(".ajk-verifier-tooltip");
        self.domControl = $(this.domRootEl).find(".ajk-verifier-control");
        self.tooltip = (self.domTooltip.length > 0) ? $(self.domTooltip).text() : "";
        self.format = (self.domFormat.length > 0) ? $(self.domFormat).text() : "";
        self.chars = (self.domChars.length > 0) ? $(self.domChars).text() : "";
        self.domControl = (self.domControl.length > 0) ? $(self.domControl).get()[0] : "";
        self.defaultValueOkay = ($(this.domRootEl).find(".ajk-verifier-not-default-value").length > 0) ? false : true;
        self.hideDefaultValue = ($(this.domRootEl).find(".ajk-verifier-hide-default-value").length > 0) ? true : false;
        var domOptionValues = $(this.domRootEl).find(".ajk-verifier-value-options");
        self.valueOptions = (domOptionValues.length > 0) ? $(domOptionValues).text().split() : "";
        self.fieldName = $(self.domControl).attr("name");
        if(self.chars){
            var charArray = self.chars.split("-");
            self.chars = 
            {
                minChar : charArray[0],
                maxChar : charArray[1]
            }
        }
        self.calculateControlType();
        self.setupValueGetterSetter();
        self.setupVerificationFunction();
        self.setupTooltip();
        self.setupFocus();
        self.setupClick();
        self.setupKeyEvents();
        self.invalidDateMessage = (TLConfigText && TLConfigText['verifier_invaldiDate_message']) ? TLConfigText['verifier_invaldiDate_message'] : "Not a valid date";
        if($(self.domControl).hasClass("ajk-color-selector") && typeof AJKColorPicker != "undefined"){
            self.colorPicker = new AJKColorPicker.color(self.domControl, {});
        }
        return self;
    },
    setupValueGetterSetter : function(){
        var self = this;
        switch(self.controlType){
            case "span ajk-custom-checkbox" : 
                self.getValue = function(){
                    return $(this.domControl).text();
                }
                self.setValue = function(data){
                    $(this.domControl).text(data.value);
                }
                break;
            case "textarea textarea" : 
                self.getValue = function(){
                    return $(this.domControl).val();
                }
                self.setValue = function(data){
                    $(this.domControl).val(data.value);
                }
                break;
            case "select" : 
                self.getValue = function(){
                    return $(this.domControl).val();
                }
                self.setValue = function(data){
                    $(this.domControl).val(data.value);
                }
                break;
            default : 
                self.getValue = function(){
                    return $(this.domControl).val();
                }
                self.setValue = function(data){
                    $(this.domControl).val(data.value);
                }
                break;
        }
    },
    calculateControlType : function(){
        var self = this;
        var tagName = self.domControl.tagName;
        var type = $(self.domControl).attr("type");
        self.controlType = (tagName + " " + type).toLowerCase();
        if(tagName == "SELECT"){
            self.controlType = "select";
        }
    },
    setupClick : function(){
        var self = this;
        switch(self.controlType){
            case "span ajk-custom-checkbox" : 
                self.fieldValue = self.getValue();
                $(self.domControl).click(function(){
                    if(self.fieldValue == "on"){
                        self.fieldValue = "off";
                        $(this).removeClass("checkbox-selected");
                    }
                    else{
                        self.fieldValue = "on";
                        $(this).addClass("checkbox-selected");
                    }
                    self.clearAllErrorsFunc();
                    return false;
                });
                break;
            default : 
                break;
        }
    },
    setupFocus : function(){
        var self = this;
        switch(self.controlType){
            case "input text" : 
                self.fieldValue = self.defaultValue = $(self.domControl).val();
                $(self.domControl).focus(function(){
                    var thisVal = self.getValue();
                    if(self.format == "date" && thisVal == self.invalidDateMessage){
                        self.setValue({
                            value : ""
                        });
                    }
                    if(thisVal == self.defaultValue && ( ! self.defaultValueOkay || self.hideDefaultValue)){
                        self.setValue({
                            value : ""
                        });
                    }
                    $(self.domRootEl).addClass("ajk-verifier-field-focused");
                    self.clearAllErrorsFunc();
                }).blur(function(){
                    var thisVal = self.getValue();
                    if(self.format == "date"){
                        var parsedDate = Date.parse(thisVal);
                        if(parsedDate){
                            var formatedDate = AJKHelpers.formatDate({
                                formatString : "DD MMM YYYY HH:mm:ss",
                                date : parsedDate,
                                language : "base"
                            });
                            self.setValue({
                                value : formatedDate
                            });
                            thisVal = formatedDate;
                        }
                        else{
                            self.setValue({
                                value : self.invalidDateMessage
                            });
                            thisVal = self.invalidDateMessage;
                        }
                    }
                    if( ! thisVal){
                        self.setValue({
                            value : self.defaultValue
                        });
                    }
                    self.oldFieldValue = self.fieldValue;
                    self.fieldValue = thisVal;
                    if(self.oldFieldValue != thisVal){
                        self.controller.fieldDidChange({
                            fieldName : self.fieldName,
                            fieldValue : thisVal
                        });
                    }
                    $(self.domRootEl).removeClass("ajk-verifier-field-focused");
                });
                break;
            case "textarea textarea" : 
                self.fieldValue = self.defaultValue = $(self.domControl).val();
                $(self.domControl).focus(function(){
                    var thisVal = self.getValue();
                    if(thisVal == self.defaultValue){}
                    $(self.domRootEl).addClass("ajk-verifier-field-focused");
                    self.clearAllErrorsFunc();
                }).blur(function(){
                    var thisVal = self.getValue();
                    if( ! thisVal){}
                    if(self.fieldValue != thisVal){
                        self.controller.fieldDidChange({
                            fieldName : self.fieldName,
                            fieldValue : thisVal
                        });
                    }
                    self.fieldValue = thisVal;
                    $(self.domRootEl).removeClass("ajk-verifier-field-focused");
                });
                break;
            case "select" : 
                self.fieldValue = $(self.domControl).val();
                $(self.domControl).focus(function(){
                    $(self.domRootEl).addClass("ajk-verifier-field-focused");
                    self.clearAllErrorsFunc();
                }).blur(function(){
                    var thisVal = self.getValue();
                    if(self.fieldValue != thisVal){
                        self.controller.fieldDidChange({
                            fieldName : self.fieldName,
                            fieldValue : thisVal
                        });
                    }
                    self.fieldValue = thisVal;
                    $(self.domRootEl).removeClass("ajk-verifier-field-focused");
                }).change(function(){
                    $(self.domControl).blur();
                });
                break;
            default : 
                break;
        }
    },
    setupKeyEvents : function(){
        var self = this;
        if(self.format == "number"){
            $(self.domControl).keydown(function(e){
                var charCode = e.keyCode;
                if((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 13 || charCode == 9 || charCode == 37 || charCode == 39 || charCode == 46 || charCode == 17 || charCode == 18){
                    return true;
                }
                else{
                    return false;
                }
            });
        }
        $(self.domControl).keyup(function(e){
            self.controller.fieldDidKeyUp({
                fieldName : self.fieldName,
                fieldValue : $(this).val()
            });
        });
        if(self.isLast && self.controlType == "input text"){
            $(self.domControl).keyup(function(e){
                if(e.keyCode == 13){
                    self.fieldValue = $(self.domControl).val();
                    self.controller.attemptToSubmit();
                }
            });
        }
    },
    clear : function(){
        var self = this;
        switch(self.controlType){
            case "input text" : 
                self.fieldValue = (self.defaultValue) ? self.defaultValue : "";
                $(self.domControl).val(self.fieldValue);
                break;
            case "textarea textarea" : 
                self.fieldValue = (self.defaultValue) ? self.defaultValue : "";
                $(self.domControl).val(self.fieldValue);
                break;
            default : 
                self.fieldValue = (self.defaultValue) ? self.defaultValue : "";
                $(self.domControl).val(self.fieldValue);
                break;
        }
    },
    forceSetValue : function(data){
        var self = this;
        var value = data.value;
        switch(self.controlType){
            case "input text" : 
                self.oldFieldValue = self.fieldValue;
                self.fieldValue = value;
                $(self.domControl).val(value);
                break;
            case "textarea textarea" : 
                self.oldFieldValue = self.fieldValue;
                self.fieldValue = value;
                $(self.domControl).val(value);
                break;
            default : 
                self.oldFieldValue = self.fieldValue;
                self.fieldValue = value;
                $(self.domControl).val(value);
                break;
        }
        if(self.colorPicker){
            AJKColorPicker.fireEvent(self.domControl, "keyup");
        }
    },
    clearError : function(){
        var self = this;
        $(self.domRootEl).removeClass("ajk-verifier-field-error");
    },
    setupTooltip : function(){
        var self = this;
        $(self.domControl).hover(function(){
            self.fieldHoverFunc({
                tooltipText : self.tooltip
            });
        }, function(){
            self.fieldHoverFunc({
                tooltipText : ""
            });
        });
    },
    setupVerificationFunction : function(){
        var self = this;
        switch(self.format){
            case "email" : 
                self.verify = function(){
                    var self = this;
                    var fieldValue = self.getValue();
                    if( ! fieldValue || (fieldValue == self.defaultValue && !self.defaultValueOkay)){
                        return false;
                    }
                    return fieldValue.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                }
                break;
            case "date" : 
            {
                self.verify = function(){
                    var self = this;
                    var fieldValue = self.getValue();
                    if( ! fieldValue || (fieldValue == self.defaultValue && !self.defaultValueOkay)){
                        return false;
                    }
                    return(Date.parse(fieldValue)) ? true : false;
                }
            }
            break;
        default : 
            self.verify = function(){
                if( ! self.defaultValueOkay && self.fieldValue == self.defaultValue){
                    return false;
                }
                return(self.checkFieldCharLength() && self.checkForValueOptions());
            }
            break;
    }
},
verify : function(){},
blur : function(){
    var self = this;
    $(self.domControl).blur();
},
highlightError : function(){
    var self = this;
    $(self.domRootEl).addClass("ajk-verifier-field-error");
},
checkFieldCharLength : function(){
    var self = this;
    if( ! self.chars){
        return true;
    }
    var fieldLength = self.fieldValue.length;
    return(fieldLength >= self.chars.minChar && fieldLength <= self.chars.maxChar);
},
checkForValueOptions : function(){
    var self = this;
    if( ! self.valueOptions){
        return true;
    }
    var optionFound = false;
    $.each(self.valueOptions, function(){
        if(self.fieldValue == this){
            optionFound = true;
        }
    });
    return optionFound;
}
}
var AJKKeyEvent = function(){
    var self = this;
    self.observers = new Array();
    self.isInputFocussed = false;
}
AJKKeyEvent.prototype = 
{
    init : function(){
        var self = this;
        $(document).keyup(function(e){
            if(e.target.tagName != "INPUT" && e.target.tagName != "TEXTAREA"){
                self.informObservers({
                    key : e.keyCode,
                    mode : "keyup"
                });
            }
        });
        return self;
    },
    informObservers : function(data){
        var self = this;
        $.each(self.observers, function(){
            if(this.keyEventTookPlace){
                this.keyEventTookPlace(data);
            }
        });
    },
    registerAsObserver : function(data){
        var self = this;
        var observer = data.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        })
        self.observers.push(observer);
    },
    removeAsObserver : function(data){
        var self = this;
        var observer = data.observer;
        self.observers = AJKHelpers.removeItemFromArray({
            anArray : self.observers,
            item : observer
        })
    }
}
var AJKContentScrollerController = function(data){
    this.domRootEl = data.domRootEl;
    this.maxHeight = data.maxHeight;
    this.domStage = $(this.domRootEl).find(".ajk-cs-carousel-stage").get()[0];
    this.domScrollHolder = $(this.domRootEl).find(".ajk-cs-carousel-scroll-holder").get()[0];
    this.domScrollBar = $(this.domRootEl).find(".ajk-cs-scroll-bar").get()[0];
    this.domUpArrow = $(this.domRootEl).find(".ajk-cs-up-arrow").get()[0];
    this.domDownArrow = $(this.domRootEl).find(".ajk-cs-down-arrow").get()[0];
    this.carouselHeight = 0;
    this.stageHeight = 0;
    this.topOffset = 0;
    this.carouselWidth = 0;
    this.arrowPadding = 14;
    this.scrollBarHeight = 0;
    this.scrollDragInitialised = false;
    this.domScrollBarUp = $(this.domScrollHolder).find("a.ajk-cs-up-arrow").get()[0];
    this.domScrollBarDown = $(this.domScrollHolder).find("a.ajk-cs-down-arrow").get()[0];
    this.currentlyScrolling = false;
    this.idealCarouselHeight = 0;
}
AJKContentScrollerController.prototype = 
{
    init : function(){
        var self = this;
        $(self.domScrollBarUp).unbind("click").click(function(){
            self.scrollUp();
            return false;
        });
        $(self.domScrollBarDown).unbind("click").click(function(){
            self.scrollDown();
            return false;
        });
        $(self.domRootEl).hover(function(){
            theAJKMouseScrollEvent.registerAsObserver({
                observer : self
            });
        }, function(){
            theAJKMouseScrollEvent.removeAsObserver({
                observer : self
            });
        });
        return self;
    },
    mouseDidScroll : function(data){
        var self = this;
        var delta = -data.delta;
        var maxScrollDistance = self.stageHeight - self.carouselHeight;
        var newPos = this.topOffset + delta * maxScrollDistance / 20;
        self.animateToPos({
            pos : newPos,
            instantly : true
        });
    },
    reset : function(){
        var self = this;
        self.topOffset = 0;
        $(self.domStage).css({
            top : 0
        });
        $(self.domScrollBar).css({
            top : self.arrowPadding
        });
    },
    resetSize : function(){
        var self = this;
        self.idealCarouselHeight = false;
        self.enable();
    },
    enable : function(){
        var self = this;
        self.carouselHeight = $(self.domRootEl).height();
        if(self.carouselHeight && !self.idealCarouselHeight){
            self.idealCarouselHeight = self.carouselHeight;
        }
        self.carouselWidth = $(self.domRootEl).width();
        self.stageHeight = $(self.domStage).height();
        if(self.stageHeight < self.idealCarouselHeight){
            self.carouselHeight = self.stageHeight;
        }
        else{
            self.carouselHeight = self.idealCarouselHeight;
        }
        $(self.domRootEl).css({
            height : self.carouselHeight
        });
        self.topOffset = -parseInt($(self.domStage).css("top"), 10);
        if(self.topOffset > (self.stageHeight - self.carouselHeight)){
            self.topOffset = (self.stageHeight - self.carouselHeight);
            $(self.domStage).css({
                top : -self.topOffset
            });
        }
        if(self.stageHeight > self.carouselHeight){
            self.displayScroller();
            if( ! self.scrollDragInitialised){
                self.scrollDragInitialised = true;
                var aDraggable = new AJKDraggable({
                    domDragEl : self.domScrollBar,
                    limitFunc : function(){
                        var limit = 
                        {
                            minX : 0,
                            maxX : 0,
                            minY : self.arrowPadding,
                            maxY : self.carouselHeight - self.arrowPadding - self.scrollBarHeight
                        }
                        return limit;
                    },
                    mouseMoveFunc : function(data){
                        var dragElPos = data.dragElPos;
                        self.updateCarouselFromScrollBarPos({
                            scrollBarPos : dragElPos
                        });
                    }
                }).init();
            }
        }
        else{
            self.hideScroller();
        }
    },
    animateToTop : function(data){
        var self = this;
        var callback = (data) ? data.callback : "";
        self.animateToPos({
            pos : 0,
            callback : function(){
                if(callback){
                    callback();
                }
            }
        });
    },
    animateToPos : function(data){
        var self = this;
        if(self.currentlyScrolling){
            return;
        }
        self.currentlyScrolling = true;
        var instantly = (data) ? data.instantly : "";
        var duration = (instantly) ? 0 : 300;
        var callback = (data) ? data.callback : "";
        self.topOffset = data.pos;
        self.topOffset = (self.topOffset < 0) ? 0 : self.topOffset;
        self.topOffset = (self.topOffset > (self.stageHeight - self.carouselHeight)) ? self.stageHeight - self.carouselHeight : self.topOffset;
        if(self.stageHeight != self.carouselHeight){
            var scrollTopOffset = (self.topOffset / (self.stageHeight - self.carouselHeight) * (self.carouselHeight - 2 * self.arrowPadding - self.scrollBarHeight)) + self.arrowPadding;
        }
        else{
            var scrollTopOffset = 0;
        }
        $(self.domStage).animate({
            top : -self.topOffset
        }, duration, function(){
            self.currentlyScrolling = false;
            if(callback){
                callback();
            }
        });
        $(self.domScrollBar).animate({
            top : scrollTopOffset
        }, duration, function(){});
    },
    scrollUp : function(){
        var self = this;
        self.topOffset = self.topOffset - self.carouselHeight;
        self.animateToPos({
            pos : self.topOffset
        });
    },
    scrollDown : function(){
        var self = this;
        self.topOffset = self.topOffset + self.carouselHeight;
        self.animateToPos({
            pos : self.topOffset
        });
    },
    displayScroller : function(){
        var self = this;
        $(self.domScrollHolder).css({
            display : "block",
            height : self.carouselHeight
        });
        $(self.domStage).css({
            width : self.carouselWidth - 20
        });
        self.scrollBarHeight = self.carouselHeight / self.stageHeight * (self.carouselHeight - (self.arrowPadding * 2));
        self.scrollBarHeight = (self.scrollBarHeight < 20) ? 20 : self.scrollBarHeight;
        if(self.stageHeight != self.carouselHeight){
            var scrollTopOffset = (self.topOffset / (self.stageHeight - self.carouselHeight) * (self.carouselHeight - 2 * self.arrowPadding - self.scrollBarHeight)) + self.arrowPadding;
        }
        else{
            var scrollTopOffset = 0;
        }
        $(self.domScrollBar).css({
            top : scrollTopOffset,
            height : self.scrollBarHeight
        });
    },
    hideScroller : function(){
        var self = this;
        $(self.domScrollHolder).css({
            display : "none"
        });
        $(self.domStage).css({
            width : self.carouselWidth
        });
    },
    updateCarouselFromScrollBarPos : function(data){
        var self = this;
        var scrollBarPos = data.scrollBarPos;
        var carouselTopOffset = (scrollBarPos.y - self.arrowPadding) / (self.carouselHeight - self.scrollBarHeight - 2 * self.arrowPadding);
        self.topOffset = carouselTopOffset * (self.stageHeight - self.carouselHeight);
        $(self.domStage).css({
            top : -self.topOffset
        });
    }
}
var TLSecretLoginController = function(data){
    var self = this;
    self.domRoot = $("#ajk-panel-secret-login").get()[0];
    self.initialShow = data.initialShow;
    self.mainController = data.mainController;
    self.verifer = "";
}
TLSecretLoginController.prototype = 
{
    init : function(){
        var self = this;
        if(self.initialShow){
            self.show();
        }
        $(self.domRoot).find(".close").click(function(){
            $(self.domRoot).remove();
            return false;
        });
        self.verifier = new AJKVerifier({
            domRootEl : $(self.domRoot).find(".ajk-verifier").get()[0],
            submitFunc : function(data){
                data.fieldData["timelineId"] = self.mainController.timeline.id;
                theAJKAjaxController.request({
                    action : "/login/secretlogin",
                    method : "post",
                    alwaysAllow : true,
                    vars : data.fieldData,
                    callback : function(xml){
                        var error = $(xml).find("error").text();
                        if(error){
                            self.verifier.errorHighlightField({
                                fieldName : "secret"
                            });
                            self.verifier.displayErrorMessage({
                                message : TLConfigText['groupEditLogin_loginError_message']
                            });
                        }
                        else{
                            var secretUserId = $(xml).find("secretUserId").text();
                            var verifyCode = $(xml).find("verifyCode").text();
                            self.mainController.logSecretUserIn({
                                userId : secretUserId,
                                username : data.fieldData["nickname"],
                                verifyCode : verifyCode
                            })
                        }
                    }
                });
            }
        }).init();
        return self;
    },
    show : function(){
        var self = this;
        $(self.domRoot).css({
            display : "block"
        });
    },
    hide : function(){
        var self = this;
        $(self.domRoot).css({
            display : "none"
        });
    }
}
if(typeof TLSingleTimelineLicense == "undefined"){
    var TLSingleTimelineLicense = false;
}
var theAJKWindowResizeEvent,
theTLSettings,
theTLMainController,
theAJKMouseMoveEvent,
theAJKMouseScrollEvent,
theAJKButtonPopupController,
theAJKKeyEvent,
theAJKAjaxController;
$(document).ready(function(){
    $.browser.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    $.browser.isMac = navigator.userAgent.toLowerCase().indexOf('macintosh') > -1;
    if($.browser.msie && $.browser.version >= 9){
        $.browser.msie = false;
        $.browser.isIE9 = true;
    }
    theAJKWindowResizeEvent = new AJKWindowResizeEvent().init();
    theAJKMouseMoveEvent = new AJKMouseMoveEvent().init();
    theAJKMouseScrollEvent = new AJKMouseScrollEvent({
        disableScrollPropagation : (TLTimelineData.embed == "true")
    }).init();
    theAJKKeyEvent = new AJKKeyEvent().init();
    theAJKWindowBlurEvent = new AJKWindowBlurEvent().init();
    theAJKAjaxController = new AJKAjaxController().init();
    theAJKButtonPopupController = new AJKButtonPopupController({
        domButtons : $("#tl-header .main-menu a").get()
    }).init();
    theTLSettings = new TLSettings().init(); (function(){
        if($("#tl-slider-scale canvas").get()[0].getContext){
            theTLMainController = new TLMainController();
            theTLMainController.init();
        }
        else{
            var thisFunc = arguments.callee;
            setTimeout(function(){
                thisFunc();
            }, 5);
        }
    })();
    var onmessage = function(e){
        if(e.data == "mouseup"){
            theAJKWindowBlurEvent.informObserversOfBlur();
        }
    }
    if(typeof window.addEventListener != 'undefined'){
        window.addEventListener('message', onmessage, false);
    }
    else if(typeof window.attachEvent != 'undefined'){
        window.attachEvent('onmessage', onmessage);
    }
    var isTouchDevice = false;
    if( ! $.browser.msie && !$.browser.isIE9){
        isTouchDevice = function(){
            try{
                document.createEvent("TouchEvent");
                return true;
            }
            catch(e){
                return false;
            }
        }
    }
    if(isTouchDevice){
        var touchHandler = function(event){
            var touches = event.changedTouches, first = touches[0], type = "";
            switch(event.type){
                case "touchstart" : 
                    type = "mousedown";
                    break;
                case "touchmove" : 
                    type = "mousemove";
                    break;
                case "touchend" : 
                    type = "mouseup";
                    break;
                default : 
                    return;
            }
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
            first.target.dispatchEvent(simulatedEvent);
            if(event.type == "touchmove"){
                event.preventDefault();
            }
        }
        document.addEventListener("touchstart", touchHandler, true);
        document.addEventListener("touchmove", touchHandler, true);
        document.addEventListener("touchend", touchHandler, true);
        document.addEventListener("touchcancel", touchHandler, true);
    }
});

var TLFeedController = function(data){
    var self = this;
    self.feeds = data.feeds;
    self.feedsByKey = [];
    self.keyPrefix = "tl-feed-";
    self.feedsLoadedCallback = data.feedsLoadedCallback;
    self.controller = data.controller;
    self.timeline = self.controller.timeline;
    self.feedStoryId = 1;
    self.feedStoryIdPrefix = "tl-feed-story-";
};

TLFeedController.prototype = 
{
    init : function(){
        var self = this;
        $.each(self.feeds, function(){
            self.initialiseFeed({
                feed : this
            });
        });
        self.loadFeeds({
            callback : self.feedsLoadedCallback
        });
        return self;
    },
    initialiseFeed : function(data){
        var self = this;
        var feed = data.feed;
        feed.feedsKey = self.keyPrefix + feed.id;
        self.feedsByKey[feed.feedsKey] = feed;
        var feedCat = self.timeline.categoriesByKey[self.controller.categoriesKeyPrefix + feed.category];
        feedCat = (feedCat) ? feedCat : (self.timeline.categories[0]) ? self.timeline.categories[0] : self.controller.defaultCategory;
        feed.category = feedCat;
    },
    removeFeed : function(data){
        var self = this;
        var feed = data.feed;
        $.each(feed.markers, function(){
            this.toBeRemoved = true;
        });
        var newMarkerArray = [];
        $.each(self.controller.markers, function(){
            if( ! this.toBeRemoved){
                newMarkerArray.push(this);
            }
        });
        self.controller.markers = newMarkerArray;
    },
    loadNewFeed : function(data){
        var self = this;
        var callback = data.callback;
        var feed = data.feed;
        self.initialiseFeed({
            feed : feed
        });
        self.loadFeed({
            feed : feed,
            callback : function(){
                if(callback){
                    callback();
                }
            }
        });
    },
    loadFeeds : function(){
        var self = this;
        var numFeeds = self.feeds.length;
        var feedsLoaded = 0;
        if(numFeeds > 0){
            $.each(self.feeds, function(){
                self.loadFeed({
                    feed : this,
                    callback : function(){
                        if( ++ feedsLoaded >= numFeeds){
                            self.feedsLoadedCallback();
                        }
                    }
                });
            });
        }
        else{
            self.feedsLoadedCallback();
        }
    },
    loadFeed : function(data){
        var self = this;
        var callback = data.callback;
        var feed = data.feed;
        var feedCancelled = false;
        var cancelFeedTimer = setTimeout(function(){
            feedCancelled = true;
            callback();
        }, 5000);
        if(feed.source == "flickr"){
            TLFlickrFeedHelper.getPhotosForFeed({
                feed : feed,
                callback : function(data){
                    if(feedCancelled){
                        return;
                    }
                    clearTimeout(cancelFeedTimer);
                    var photos = data.photos;
                    $.each(photos, function(){
                        var markerDate = AJKHelpers.dateFromMySQLDate({
                            dateString : this.datetaken
                        });
                        var aMarker = self.controller.createMarker({
                            id : self.feedStoryIdPrefix + self.feedStoryId,
                            ownerId : "",
                            ownerName : this.ownername,
                            startDate : markerDate,
                            endDate : new Date(markerDate.getTime()),
                            media : [{
                                id : this.id,
                                src : this.small,
                                caption : "",
                                type : "Image",
                                externalMediaThumb : "",
                                externalMediaType : "",
                                externalMediaId : "",
                                orderIndex : 10
                            }],
                            headline : this.caption,
                            introText : "An image uploaded to Flickr by " + this.ownername,
                            category : feed.category
                        });
                        aMarker.extraInfoLoaded = true;
                        aMarker.feedSource = "flickr";
                        aMarker.uneditable = true;
                        if( ! feed.markers){
                            feed.markers = [];
                        }
                        feed.markers.push(aMarker);
                    });
                    callback();
                }
            });
        }
        else if(feed.source == "youtube"){
            TLYouTubeFeedHelper.getVideosForFeed({
                feed : feed,
                callback : function(data){
                    if(feedCancelled){
                        return;
                    }
                    clearTimeout(cancelFeedTimer);
                    var videos = data.videos;
                    $.each(videos, function(){
                        var markerDate = this.date;
                        var aMarker = self.controller.createMarker({
                            id : self.feedStoryIdPrefix + self.feedStoryId,
                            ownerId : "",
                            ownerName : this.ownername,
                            startDate : markerDate,
                            endDate : new Date(markerDate.getTime()),
                            media : [{
                                id : this.id,
                                src : "http://www.youtube.com/watch?v=" + this.id,
                                caption : "",
                                type : "Video",
                                externalMediaThumb : this.image,
                                externalMediaType : "youtube",
                                externalMediaId : this.id,
                                orderIndex : 10
                            }],
                            headline : this.title,
                            introText : this.description,
                            category : feed.category,
                            externalLink : this.url
                        });
                        aMarker.extraInfoLoaded = true;
                        aMarker.feedSource = "youtube";
                        aMarker.uneditable = true;
                        if( ! feed.markers){
                            feed.markers = [];
                        }
                        feed.markers.push(aMarker);
                    });
                    callback();
                }
            });
        }
        else if(feed.source == "twitter"){
            TLTwitterFeedHelper.getTweetsForFeed({
                feed : feed,
                callback : function(data){
                    if(feedCancelled){
                        return;
                    }
                    clearTimeout(cancelFeedTimer);
                    var tweets = data.tweets;
                    $.each(tweets, function(){
                        var markerDate = this.date;
                        var aMarker = self.controller.createMarker({
                            id : self.feedStoryIdPrefix + self.feedStoryId,
                            ownerId : "",
                            ownerName : this.ownername,
                            startDate : markerDate,
                            endDate : new Date(markerDate.getTime()),
                            media : [{
                                id : this.id,
                                src : this.image,
                                caption : "",
                                type : "Image",
                                externalMediaThumb : "",
                                externalMediaType : "",
                                externalMediaId : "",
                                orderIndex : 10
                            }],
                            headline : AJKHelpers.clipToMaxCharWords({
                                aString : this.title,
                                maxChars : 50
                            }),
                            introText : this.description,
                            category : feed.category,
                            externalLink : "http://www.twitter.com/" + this.ownername
                        });
                        aMarker.extraInfoLoaded = true;
                        aMarker.feedSource = "twitter";
                        aMarker.uneditable = true;
                        if( ! feed.markers){
                            feed.markers = [];
                        }
                        feed.markers.push(aMarker);
                    });
                    callback();
                }
            });
        }
        else if(feed.source == "rss"){
            TLGoogleRSSFeedHelper.getRSSEntriesForFeed({
                feed : feed,
                callback : function(data){
                    if(feedCancelled){
                        return;
                    }
                    clearTimeout(cancelFeedTimer);
                    var entries = data.entries;
                    $.each(entries, function(){
                        var markerDate = this.date;
                        var media = [];
                        $.each(this.images, function(){
                            media.push({
                                id : this,
                                src : this,
                                caption : "",
                                type : "Image",
                                externalMediaThumb : "",
                                externalMediaType : "",
                                externalMediaId : "",
                                orderIndex : 10
                            });
                        });
                        $.each(this.audio, function(){
                            media.push({
                                id : this,
                                src : this,
                                caption : "",
                                type : "Audio",
                                externalMediaThumb : "",
                                externalMediaType : "",
                                externalMediaId : "",
                                orderIndex : 10
                            });
                        });
                        var aMarker = self.controller.createMarker({
                            id : self.feedStoryIdPrefix + self.feedStoryId,
                            ownerId : "",
                            ownerName : this.ownername,
                            startDate : markerDate,
                            endDate : new Date(markerDate.getTime()),
                            media : media,
                            headline : AJKHelpers.clipToMaxCharWords({
                                aString : this.title,
                                maxChars : 50
                            }),
                            introText : this.description,
                            category : feed.category,
                            externalLink : this.url
                        });
                        aMarker.extraInfoLoaded = true;
                        aMarker.feedSource = "RSS";
                        aMarker.uneditable = true;
                        if( ! feed.markers){
                            feed.markers = [];
                        }
                        feed.markers.push(aMarker);
                    });
                    callback();
                }
            });
        }
        else if(feed.source == "json"){
            $.ajax({
                url : feed.filter,
                dataType : 'jsonp',
                jsonp : false,
                jsonpCallback : "TLonJSONPLoad",
                crossDomain : true,
                success : function(data){
                    if(feedCancelled){
                        return;
                    }
                    clearTimeout(cancelFeedTimer);
                    if(data && data.length > 0){
                        $.each(data, function(){
                            if(typeof this.text == "undefined"){
                                this.uneditable = true;
                                self.controller.addNewCategory({
                                    category : this
                                });
                            }
                            else{
                                var aMarker = self.controller.createMarker({
                                    id : this.id,
                                    ownerId : this.ownerId,
                                    ownerName : this.ownerName,
                                    startDate : AJKHelpers.dateFromMySQLDate({
                                        dateString : this.startDate
                                    }),
                                    headline : this.title,
                                    introText : this.text,
                                    media : this.media,
                                    endDate : AJKHelpers.dateFromMySQLDate({
                                        dateString : this.endDate
                                    }),
                                    category : self.timeline.categoriesByKey[self.controller.categoriesKeyPrefix + this.category],
                                    externalLink : this.externalLink,
                                    fullText : this.fullText
                                });
                                aMarker.extraInfoLoaded = true;
                                aMarker.feedSource = "RSS";
                                aMarker.uneditable = true;
                                if( ! feed.markers){
                                    feed.markers = [];
                                }
                                feed.markers.push(aMarker);
                            }
                        });
                    }
                    callback();
                }
            });
        }
    }
};
var TLFlickrFeedHelper = 
{
    defautPerPage : 20,
    cachedFlickrUsers : [],
    getPhotosForFeed : function(data){
        var feed = data.feed;
        var callback = data.callback;
        if(feed.filter == "flickr-latest"){
            TLFlickrFeedHelper.getLatestPhotos({
                perPage : feed.numItems,
                page : 1,
                callback : function(data){
                    callback({
                        photos : data.itemObjs
                    });
                }
            });
        }
        else if(feed.filter == "flickr-interesting"){
            TLFlickrFeedHelper.getMostInterestingPhotos({
                perPage : feed.numItems,
                page : 1,
                callback : function(data){
                    callback({
                        photos : data.itemObjs
                    });
                }
            });
        }
        else if(feed.filter == "flickr-username"){
            TLFlickrFeedHelper.getPhotosFromUsername({
                perPage : feed.numItems,
                page : 1,
                username : feed.param1,
                callback : function(data){
                    callback({
                        photos : data.itemObjs
                    });
                }
            });
        }
        else if(feed.filter == "flickr-search"){
            TLFlickrFeedHelper.getPhotosForSearchTerm({
                perPage : feed.numItems,
                page : 1,
                searchTerm : feed.param1,
                callback : function(data){
                    callback({
                        photos : data.itemObjs
                    });
                }
            });
        }
    },
    getPhotosFromUsername : function(data){
        var username = data.username;
        var callback = data.callback;
        var perPage = data.perPage;
        var page = data.page;
        if( ! TLFlickrFeedHelper.cachedFlickrUsers[username]){
            $.getJSON("http://api.flickr.com/services/rest/?jsoncallback=?", 
            {
                method : "flickr.people.findByUsername",
                username : username,
                api_key : theTLSettings.flickrApiKey,
                format : "json"
            }, function(data){
                if( ! data.user){
                    if(callback){
                        callback({
                            itemObjs : []
                        });
                    }
                    return;
                }
                var userId = data.user.nsid;
                TLFlickrFeedHelper.cachedFlickrUsers[username] = 
                {
                    username : username,
                    userId : userId
                }
                TLFlickrFeedHelper.getPhotosForUser({
                    userId : userId,
                    perPage : perPage,
                    page : page,
                    callback : function(data){
                        if(callback){
                            callback(data);
                        }
                    }
                });
            });
        }
        else{
            TLFlickrFeedHelper.getPhotosForUser({
                userId : TLFlickrFeedHelper.cachedFlickrUsers[username].userId,
                page : page,
                perPage : perPage,
                callback : function(data){
                    if(callback){
                        callback(data);
                    }
                }
            });
        }
    },
    feedLoadFunc : function(data){
        var callback = data.callback;
        var feedData = data.feedData;
        if( ! feedData || !feedData.photos || !feedData.photos.photo){
            callback({
                itemObjs : []
            });
            return;
        }
        var returnObjs = TLFlickrFeedHelper.processImageJSONFromArray({
            anArray : feedData.photos.photo
        });
        callback({
            itemObjs : returnObjs
        });
    },
    getPhotosForSearchTerm : function(data){
        var callback = data.callback;
        var searchTerm = data.searchTerm;
        $.getJSON("http://api.flickr.com/services/rest/?jsoncallback=?", 
        {
            method : "flickr.photos.search",
            text : searchTerm,
            extras : "owner_name,date_upload,date_taken",
            page : data.page,
            per_page : data.perPage,
            license : "1,2,3,4,5,6,7",
            api_key : theTLSettings.flickrApiKey,
            format : "json"
        }, function(data){
            TLFlickrFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    getPhotosForUser : function(data){
        var userId = data.userId;
        var callback = data.callback;
        var page = data.page;
        var perPage = data.perPage;
        $.getJSON("http://api.flickr.com/services/rest/?jsoncallback=?", 
        {
            method : "flickr.people.getPublicPhotos",
            extras : "owner_name,date_upload,date_taken",
            user_id : userId,
            page : page,
            per_page : perPage,
            api_key : theTLSettings.flickrApiKey,
            format : "json"
        }, function(data){
            TLFlickrFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    getMostInterestingPhotos : function(data){
        var callback = data.callback;
        var page = data.page;
        var perPage = data.perPage;
        $.getJSON("http://api.flickr.com/services/rest/?jsoncallback=?", 
        {
            method : "flickr.interestingness.getList",
            page : data.page,
            per_page : data.perPage,
            api_key : theTLSettings.flickrApiKey,
            extras : "owner_name,date_upload,date_taken",
            format : "json"
        }, function(data){
            TLFlickrFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    getLatestPhotos : function(data){
        var callback = data.callback;
        var page = data.page;
        var perPage = data.perPage;
        $.getJSON("http://api.flickr.com/services/rest/?jsoncallback=?", 
        {
            method : "flickr.photos.getRecent",
            page : data.page,
            per_page : data.perPage,
            api_key : theTLSettings.flickrApiKey,
            extras : "owner_name,date_upload,date_taken",
            format : "json"
        }, function(data){
            TLFlickrFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    processImageJSONFromArray : function(data){
        var anArray = data.anArray;
        var returnObjs = new Array();
        var counter = 0;
        if( ! anArray){
            return[];
        }
        $.each(anArray, function(){
            var anObj = 
            {
                id : this.id,
                owner : this.owner,
                caption : this.title,
                secret : this.secret,
                thumb : "http://farm" + this.farm + ".static.flickr.com/" + this.server + "/" + this.id + "_" + this.secret + "_s.jpg",
                small : "http://farm" + this.farm + ".static.flickr.com/" + this.server + "/" + this.id + "_" + this.secret + "_m.jpg",
                medium : "http://farm" + this.farm + ".static.flickr.com/" + this.server + "/" + this.id + "_" + this.secret + "_-.jpg",
                large : "http://farm" + this.farm + ".static.flickr.com/" + this.server + "/" + this.id + "_" + this.secret + "_b.jpg",
                ownername : this.ownername,
                dateupload : this.dateupload,
                datetaken : this.datetaken,
                index : counter ++ 
            }
            returnObjs.push(anObj);
        });
        return returnObjs;
    }
}
var TLYouTubeFeedHelper = 
{
    defautNumVideos : 20,
    defaultThumbImage : "/assets/ui/youtube-default-thumb.jpg",
    getVideosForFeed : function(data){
        var feed = data.feed;
        var callback = data.callback;
        var numItems = (feed.numItems > 50) ? 50 : feed.numItems;
        if(feed.filter == "youtube-username"){
            TLYouTubeFeedHelper.getVideosFromUsername({
                numVideos : numItems,
                startIndex : 1,
                username : feed.param1,
                callback : function(data){
                    callback({
                        videos : data.itemObjs
                    });
                }
            });
        }
        else if(feed.filter == "youtube-search"){
            TLYouTubeFeedHelper.getVideosForSearchTerm({
                numVideos : numItems,
                startIndex : 1,
                searchTerm : feed.param1,
                callback : function(data){
                    callback({
                        videos : data.itemObjs
                    });
                }
            });
        }
        else{
            var feedType = feed.filter.split("youtube-")[1];
            TLYouTubeFeedHelper.getVideosForStandardFeedOfType({
                type : feedType,
                numVideos : numItems,
                startIndex : 1,
                callback : function(data){
                    callback({
                        videos : data.itemObjs
                    });
                }
            });
        }
    },
    getVideosFromUsername : function(data){
        var callback = data.callback;
        $.getJSON("https://gdata.youtube.com/feeds/api/users/" + data.username + "/uploads" + "?callback=?", 
        {
            "start-index" : data.startIndex,
            "max-results" : data.numVideos,
            "v" : 2,
            "alt" : "json"
        }, function(data){
            TLYouTubeFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    getVideosForStandardFeedOfType : function(data){
        var callback = data.callback;
        $.getJSON("https://gdata.youtube.com/feeds/api/standardfeeds/" + data.type + "?callback=?", 
        {
            "start-index" : data.startIndex,
            "max-results" : data.numVideos,
            "v" : 2,
            "alt" : "json",
            "orderby" : "published"
        }, function(data){
            TLYouTubeFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    getVideosForSearchTerm : function(data){
        var callback = data.callback;
        $.getJSON("http://gdata.youtube.com/feeds/api/videos" + "?callback=?", 
        {
            "q" : data.searchTerm,
            "start-index" : data.startIndex,
            "max-results" : data.numVideos,
            "v" : 2,
            "alt" : "json",
            "orderby" : "published"
        }, function(data){
            TLYouTubeFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    feedLoadFunc : function(data){
        var callback = data.callback;
        var feedData = data.feedData;
        if( ! feedData || !feedData.feed || !feedData.feed.entry){
            return;
        }
        var returnObjs = TLYouTubeFeedHelper.processJSONFromArray({
            anArray : feedData.feed.entry
        });
        callback({
            itemObjs : returnObjs
        });
    },
    processJSONFromArray : function(data){
        var anArray = data.anArray;
        var returnObjs = new Array();
        var counter = 0;
        if( ! anArray){
            return[];
        }
        $.each(anArray, function(){
            if(this["media$group"] && this["media$group"]["media$description"] && this["media$group"]["media$description"].type == "plain"){
                var description = this["media$group"]["media$description"]["$t"];
            }
            else{
                var description = "";
            }
            var thumbImage = (this["media$group"]["media$thumbnail"]) ? this["media$group"]["media$thumbnail"][1] || this["media$group"]["media$thumbnail"][0] : 
            {
                url : TLYouTubeFeedHelper.defaultThumbImage
            };
            var aDate = this.published["$t"];
            aDate = aDate.replace("T", " ").replace(".000Z", "");
            var anObj = 
            {
                id : this.id["$t"].split("video:")[1],
                owner : this.author[0].name["$t"],
                title : this.title["$t"],
                description : description,
                url : this.link[0].href,
                image : thumbImage.url,
                ownername : this.author[0].name["$t"],
                date : AJKHelpers.dateFromMySQLDate({
                    dateString : aDate
                }),
                index : counter ++ 
            }
            returnObjs.push(anObj);
        });
        return returnObjs;
    }
}
var TLTwitterFeedHelper = 
{
    defautNumTweets : 5,
    getTweetsForFeed : function(data){
        var feed = data.feed;
        var callback = data.callback;
        if(feed.filter == "twitter-username"){
            TLTwitterFeedHelper.getTweetsFromUsername({
                numTweets : feed.numItems,
                startIndex : 1,
                username : feed.param1,
                callback : function(data){
                    callback({
                        tweets : data.itemObjs
                    });
                }
            });
        }
        else if(feed.filter == "twitter-search"){
            TLTwitterFeedHelper.getTweetsForSearchTerm({
                numTweets : feed.numItems,
                startIndex : 1,
                searchTerm : feed.param1,
                callback : function(data){
                    callback({
                        tweets : data.itemObjs
                    });
                }
            });
        }
    },
    getTweetsFromUsername : function(data){
        var callback = data.callback;
        $.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?callback=?", 
        {
            "screen_name" : data.username,
            "include_rts" : 1,
            "page" : data.startIndex,
            "count" : data.numTweets
        }, function(data){
            TLTwitterFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    getTweetsForSearchTerm : function(data){
        var callback = data.callback;
        $.getJSON("http://search.twitter.com/search.json?callback=?", 
        {
            "q" : data.searchTerm,
            "result_type" : "recent",
            "rpp" : data.numTweets
        }, function(data){
            TLTwitterFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data.results
            });
        });
    },
    feedLoadFunc : function(data){
        var callback = data.callback;
        var feedData = data.feedData;
        if( ! feedData){
            callback({
                itemObjs : []
            });
            return;
        }
        var returnObjs = TLTwitterFeedHelper.processJSONFromArray({
            anArray : feedData
        });
        callback({
            itemObjs : returnObjs
        });
    },
    processDate : function(data){
        var aDate = data.dateString;
        var searchFormat = data.searchFormat;
        var aDateSplit = aDate.split(" ");
        if( ! searchFormat){
            var newDateString = aDateSplit[1] + " " + aDateSplit[2] + " " + aDateSplit[5] + " " + aDateSplit[3];
        }
        else{
            var newDateString = aDateSplit[1] + " " + aDateSplit[2] + " " + aDateSplit[3] + " " + aDateSplit[4];
        }
        return Date.parse(newDateString);
    },
    processJSONFromArray : function(data){
        var anArray = data.anArray;
        var returnObjs = new Array();
        var counter = 0;
        if( ! anArray){
            return[];
        }
        $.each(anArray, function(){
            if(this.user){
                var anImage = this.user.profile_image_url;
                var ownername = this.user.screen_name;
                var aDate = TLTwitterFeedHelper.processDate({
                    dateString : this.created_at
                });
            }
            else{
                var anImage = this.profile_image_url;
                var ownername = this.from_user;
                var aDate = TLTwitterFeedHelper.processDate({
                    dateString : this.created_at,
                    searchFormat : true
                });
            }
            var anObj = 
            {
                id : this.id,
                owner : "",
                title : this.text,
                description : this.text,
                url : "",
                image : anImage,
                ownername : ownername,
                date : aDate,
                index : counter ++ 
            }
            returnObjs.push(anObj);
        });
        return returnObjs;
    }
}
var TLGoogleRSSFeedHelper = 
{
    defautNumRSSEntries : 5,
    googleFeedsApiKey : "ABQIAAAAoS3NPqk2d6o96HgQgEr7jBQUtt4mvZP9P5pNofftEDxlb2GQSRSf6RrGPPDdNE4zh8WtTHRlW4a1xw",
    getRSSEntriesForFeed : function(data){
        var feed = data.feed;
        var callback = data.callback;
        TLGoogleRSSFeedHelper.getRSSEntries({
            numRSSEntries : feed.numItems,
            startIndex : 1,
            url : feed.filter,
            callback : function(data){
                callback({
                    entries : data.itemObjs
                });
            }
        });
    },
    getRSSEntries : function(data){
        var url = data.url;
        var callback = data.callback;
        var numRSSEntries = data.numRSSEntries;
        var startIndex = data.startIndex;
        var url = (url.indexOf("index.html") == -1) ? "http://" + url : url;
        var path = "http://ajax.googleapis.com/ajax/services/feed/load?callback=?";
        var key = TLGoogleRSSFeedHelper.googleFeedsApiKey;
        if(key){
            path += ("&key=" + key);
        }
        $.getJSON(path, 
        {
            "v" : "1.0",
            "q" : url,
            "num" : numRSSEntries
        }, function(data){
            TLGoogleRSSFeedHelper.feedLoadFunc({
                callback : callback,
                feedData : data
            });
        });
    },
    feedLoadFunc : function(data){
        var callback = data.callback;
        var feedData = data.feedData;
        if( ! feedData || !feedData.responseData){
            callback({
                itemObjs : []
            });
            return;
        }
        var returnObjs = TLGoogleRSSFeedHelper.processJSONFromArray({
            anArray : feedData.responseData.feed.entries
        });
        callback({
            itemObjs : returnObjs
        });
    },
    processDate : function(data){
        var aDate = data.dateString;
        var aDateSplit = aDate.split(" ");
        var newDateString = aDateSplit[1] + " " + aDateSplit[2] + " " + aDateSplit[3] + " " + aDateSplit[4];
        return Date.parse(newDateString);
    },
    processJSONFromArray : function(data){
        var anArray = data.anArray;
        var returnObjs = new Array();
        var counter = 0;
        if( ! anArray){
            return[];
        }
        $.each(anArray, function(){
            var aDate = TLGoogleRSSFeedHelper.processDate({
                dateString : this.publishedDate
            });
            if( ! aDate || !aDate.getTime){
                aDate = new Date();
            }
            var feedImages = [];
            var feedAudio = [];
            if(this.mediaGroups && this.mediaGroups[0] && this.mediaGroups[0].contents){
                $.each(this.mediaGroups[0].contents, function(){
                    if(this.type && this.type.indexOf("audio") != -1){
                        feedAudio.push(this.url);
                    }
                    else{
                        feedImages.push(this.url);
                    }
                });
            }
            var domContent = $("<div>" + this.content + "</div>").get()[0];
            $(domContent).find("img").each(function(){
                var src = $(this).attr("src");
                if(src && src.indexOf("index.html") != -1 && (src.toLowerCase().indexOf(".png") != -1 || src.toLowerCase().indexOf(".jpg") != -1 || src.toLowerCase().indexOf(".jpeg") != -1 || src.toLowerCase().indexOf(".gif") != -1)){
                    feedImages.push(src);
                }
            });
            var anObj = 
            {
                id : this.link,
                owner : "",
                title : this.title,
                description : this.contentSnippet,
                url : this.link,
                images : feedImages,
                audio : feedAudio,
                ownername : this.author,
                date : aDate,
                index : counter ++ 
            };
            returnObjs.push(anObj);
        });
        return returnObjs;
    }
}