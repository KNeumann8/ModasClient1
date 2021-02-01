$(function () {
    var totalPages;
    var currentPage;
    var audio = new Audio('assets/spiderButt.mp3');
    //audio.play();
    getEvents(1)

    var firstPageBtn = document.getElementById("firstBtn");
    firstPageBtn.addEventListener("click", goFirstPage);
    var nextPageBtn = document.getElementById("nextBtn");
    nextPageBtn.addEventListener("click", goNextPage);
    var prevPageBtn = document.getElementById("prevBtn");
    prevPageBtn.addEventListener("click", goPrevPage);
    var lastPageBtn = document.getElementById("lastBtn");
    lastPageBtn.addEventListener("click", goLastPage);
  
    function getEvents(page) {
      $.getJSON({
        url: "https://modas-kvn-spring2021.azurewebsites.net//api/event/pagesize/10/page/" + page,
        success: function (response, textStatus, jqXhr) {
          console.log(response);
          loadTable(response.events);
          loadPageInfo(response.pagingInfo);
          totalPages = response.pagingInfo.totalPages;
          currentPage = response.pagingInfo.currentPage;
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // log the error to the console
          console.log("The following error occured: " + textStatus, errorThrown);
        }
      });
    }

    function loadTable(events){
      var table = document.getElementById("event-tbody");
      table.innerHTML = "";
      events.forEach(element => {
        let tr = document.createElement("tr");
        tr.setAttribute("id", element.id);
        table.appendChild(tr);

        let flag = document.createElement("td");
        flag.innerHTML = element.flag;
        tr.appendChild(flag);

        let dateTime = dateAndTime(element.stamp);

        let date = document.createElement("td");
        date.innerHTML = dateTime[0];
        tr.appendChild(date);

        let time = document.createElement("td");
        time.innerHTML = dateTime[1];
        tr.appendChild(time);

        let location = document.createElement("td");
        location.innerHTML = element.loc;
        tr.appendChild(location);
      });
    }

    function dateAndTime(stamp){
      var dateTime = stamp.split("T"); //This line splits the datetime into an array of date and time

      //This gets rid of seconds and smaller portions of time
      var time = dateTime[1];
      time = time.substr(0,5);
      //This changes time from military to normal person time :P
      timeAr = time.split(":");
      if(timeAr[0] > 12){
        timeAr[0] = timeAr[0] - 12;
        time = timeAr[0] + ":" + timeAr[1] + " PM"
      }else{
        timeAr[0] = timeAr[0] - 0; //I hate this, this just changes the format
        time = timeAr[0] + ":" + timeAr[1] + " AM"
      }
      dateTime[1] = time;

      var date = dateTime[0];
      dateAr = date.split("-");
      date = dateAr[1] + "/" + dateAr[2] + "/" + dateAr[0];
      dateTime[0] = date;

      return dateTime;
    }

    function loadPageInfo(pageinfo){
      var pageinfoTag = document.getElementById("pageinfo");
      pageinfoTag.innerHTML = pageinfo.currentPage + " of " + pageinfo.totalPages;
    }

    function goFirstPage(){
      getEvents(1);
      audio.currentTime = 0;
      audio.play();
    }

    function goLastPage(){
      getEvents(totalPages);
      audio.currentTime = 0;
      audio.play();
    }

    function goNextPage(){
      if(currentPage + 1 <= totalPages){
        getEvents(currentPage + 1);
        audio.currentTime = 0;
        audio.play();
      }
    }

    function goPrevPage(){
      if(currentPage - 1 >= 1){
        getEvents(currentPage - 1);
        audio.currentTime = 0;
        audio.play();
      }
    }

  });