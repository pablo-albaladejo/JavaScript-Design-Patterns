$(function () {

    var model = {
        init: function () {
            if (!localStorage.attendance) {
                function getRandom() {
                    return (Math.random() >= 0.5);
                }

                var nameColumns = $('tbody .name-col'),
                    attendance = {};

                nameColumns.each(function () {
                    var name = this.innerText;
                    attendance[name] = [];

                    for (var i = 0; i <= 11; i++) {
                        attendance[name].push(getRandom());
                    }
                });
                localStorage.attendance = JSON.stringify(attendance);
            }
        },

        getAttendance: function () {
            return JSON.parse(localStorage.attendance);
        },

        saveAttendance: function (attendance) {
            localStorage.attendance = JSON.stringify(attendance);
        }
    };

    var view = {

        init: function () {
            $allCheckboxes = $('tbody input');
            $allCheckboxes.on('click', function () {

                var studentRows = $('tbody .student'),
                    newAttendance = {};

                studentRows.each(function () {
                    var name = $(this).children('.name-col').text(),
                        $allCheckboxes = $(this).children('td').children('input');

                    newAttendance[name] = [];

                    $allCheckboxes.each(function () {
                        newAttendance[name].push($(this).prop('checked'));
                    });
                });
                octopus.updateAttendance(newAttendance);
            });

            this.render();
        },

        render: function () {
            var attendance = octopus.getAttendance();
            
            $.each(attendance, function (name, days) {
                var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                    dayChecks = $(studentRow).children('.attend-col').children('input');

                dayChecks.each(function (i) {
                    $(this).prop('checked', days[i]);
                });
            });

            this.countMissing();
        },

        countMissing: function () {

            $allMissed = $('tbody .missed-col'),
                $allMissed.each(function () {
                    var studentRow = $(this).parent('tr'),
                        dayChecks = $(studentRow).children('td').children('input'),
                        numMissed = 0;

                    dayChecks.each(function () {
                        if (!$(this).prop('checked')) {
                            numMissed++;
                        }
                    });

                    $(this).text(numMissed);
                });
        }
    };

    var octopus = {
        init: function () {
            model.init();
            view.init();
        },

        getAttendance: function () {
            return model.getAttendance();
        },

        updateAttendance: function (attendance) {
            model.saveAttendance(attendance);
            view.render();
        }
        
    };

    octopus.init();
}());
