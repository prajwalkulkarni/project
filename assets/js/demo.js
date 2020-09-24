
        $(document).ready(function() {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
    
            /*  className colors
    
            className: default(transparent), important(red), chill(pink), success(green), info(blue)
    
            */
    
    
            /* initialize the external events
            -----------------------------------------------------------------*/
    
            $('#external-events div.external-event').each(function() {
    
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim($(this).text()) // use the element's text as the event title
                };
    
                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);
    
                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });
    
            });
    
    
            /* initialize the calendar
            -----------------------------------------------------------------*/
    
            var calendar =  $('#calendar').fullCalendar({
                header: {
                    left: 'title',
                    center: 'agendaDay,agendaWeek,month',
                    right: 'prev,next today'
                },
                editable: true,
                firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
                selectable: true,
                defaultView: 'month',
    
                axisFormat: 'h:mm',
                columnFormat: {
                    month: 'ddd',    // Mon
                    week: 'ddd d', // Mon 7
                    day: 'dddd M/d',  // Monday 9/7
                    agendaDay: 'dddd d'
                },
                titleFormat: {
                    month: 'MMMM yyyy', // September 2009
                    week: "MMMM yyyy", // September 2009
                    day: 'MMMM yyyy'                  // Tuesday, Sep 8, 2009
                },
                allDaySlot: false,
                selectHelper: true,
                select: function(start, end, allDay) {
                    var title = prompt('Event Title:');
                    if (title) {
                        calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                            true // make the event "stick"
                        );
                    }
                    calendar.fullCalendar('unselect');
                },
                droppable: true, // this allows things to be dropped onto the calendar !!!
                drop: function(date, allDay) { // this function is called when something is dropped
    
                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
    
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);
    
                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
    
                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
    
                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
    
                },
    
                events: [
                    {
                        title: 'All Day Event',
                        start: new Date(y, m, 1)
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: new Date(y, m, d-3, 16, 0),
                        allDay: false,
                        className: 'info'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: new Date(y, m, d+4, 16, 0),
                        allDay: false,
                        className: 'info'
                    },
                    {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false,
                        className: 'important'
                    },
                    {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: false,
                        className: 'important'
                    },
                    {
                        title: 'Birthday Party',
                        start: new Date(y, m, d+1, 19, 0),
                        end: new Date(y, m, d+1, 22, 30),
                        allDay: false,
                    },
                    {
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        url: 'http://google.com/',
                        className: 'success'
                    }
                ],
            });

            

         

    
        });

        function onHover(name,className) {
            let cname = String(className)
            $(cname).css('background','#ffffff')
            $(cname).attr('src', 'assets/images/Submenu_icons/'+name+'r.png');
        }
        let selected = ""
        let selectedImage=""
        let count=0
        

        function offHover(name,className) {
            let cname = String(className)
           
                $(cname).css('background','#ff3333')
                $(cname).attr('src', 'assets/images/Submenu_icons/'+name+'.png');
            
        }

        
        /*function hightlight(id,className){
            ++count;

            let rId = "#"+id;
            let cNumber = parseInt(className.replace("test",""))
            let rClassName = "."+className

            if(count>1){
                $(selected).css('background','#ff3333')
                let prevNum = selectedImage.replace(".test","")
                if(parseInt(prevNum)<10){
                    prevNum='00'+prevNum
                }
                else{
                    prevNum = '0'+prevNum
                }
                $(selectedImage).attr('src','assets/images/Submenu_icons/'+prevNum+'.png')
                $(rId).css('background','#ffffff')
                if(cNumber<10){
                    number='00'+cNumber
                }
                else{
                    number = '0'+cNumber
                }
                path = 'assets/images/Submenu_icons/'+number+'r.png'
                $(rClassName).attr('src',path)
                selected = rId
                selectedImage = rClassName
                

            }
            else{
                selected = rId
                selectedImage = rClassName
                let number=""
                $(rId).css('background','#ffffff')
                if(cNumber<10){
                    number='00'+cNumber
                }
                else{
                    number = '0'+cNumber
                }
                path = 'assets/images/Submenu_icons/'+number+'r.png'
                $(rClassName).attr('src',path)
            }
        }*/
        
    
        
    
        function openCity(evt, cityName) {
            var i, x, tablinks;
            x = document.getElementsByClassName("city");
            for (i = 0; i < x.length; i++) {
              x[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablink");
            for (i = 0; i < x.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
            }
            document.getElementById(cityName).style.display = "block";
            evt.currentTarget.firstElementChild.className += " w3-border-red";
          }