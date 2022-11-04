const moment = require("moment/moment")

class Dates {
    constructor(bd){
        this.bd = bd;
        this.today = moment();
    }

    getToday(){
        return this.today.format('LLLL');
    }
    getAllYears(){
        return this.today.diff(this.bd, 'years', true);
    }
    getAllDays(){
        return this.today.diff(this.bd, 'days', true);
    }
}

module.exports = Dates;