// v1.1.0
(function(){
  fabSetup = (buttons) => {
    let _fabTimer;
    let fabBg = document.createElement("div");
    fabBg.className = "fab-bg";
    fabBg.addEventListener("mouseout",(event) => {
      event = event.toElement.classList;
      (event.contains("fab-main")||event.contains("fab-child")||event.contains("fab-bg")||event.contains("fa"))?false:_closeFab();
    });
    buttons.map((_btn)=>{
      document.body.appendChild(fabBg);
      _btn.icon = _btn.icon || "info";
      _btn.help = _btn.help || "Instructions";
      _btn.callback = _btn.callback || function(){};
      let fabBtn = document.createElement("a");
      fabBtn.className = "fab-child";
      fabBtn.id = "fab-"+_btn.icon;
      fabBtn.setAttribute("data-toggle","tooltip");
      fabBtn.setAttribute("data-original-title",_btn.help);
      fabBtn.setAttribute("data-placement","left");
      fabBtn.addEventListener("click",function(){
        _closeFab();
        _btn.callback();
      });
      fabBtn.addEventListener("mouseover",function(){

      });
      let fabIcon = document.createElement("i");
      fabIcon.className = "fa fa-fw fa-"+_btn.icon;
      fabBtn.appendChild( fabIcon );
      fabBg.appendChild( fabBtn );
    });
    let mainBtn = document.createElement("a");
    mainBtn.className = "fab-main";
    mainBtn.id = "fab";
    mainBtn.setAttribute("data-toggle","tooltip");
    mainBtn.setAttribute("data-original-title","Help");
    mainBtn.setAttribute("data-placement","left");
    let mainIcon = document.createElement("i");
    mainIcon.className = "fa fa-fw fa-question";
    mainBtn.appendChild( mainIcon );
    mainBtn.addEventListener("mouseover",() => {
      _openFab();
    });
    _openFab = () => {
      mainBtn.setAttribute("data-original-title","Close");
      mainBtn.children[0].className="fa fa-fw fa-times";
      for( let i=0;i < document.getElementsByClassName("fab-child").length; i++ ){
          document.getElementsByClassName("fab-child")[i].classList.add("fab-child-display");
      }
      // _fabTimeout = setTimeout(_closeFab,5000);
    }
    _closeFab = () => {
      mainBtn.setAttribute("data-original-title","Help");
      mainBtn.children[0].className="fa fa-fw fa-question";
      for( let i=0;i < document.getElementsByClassName("fab-child").length; i++ ){
        document.getElementsByClassName("fab-child")[i].classList.remove("fab-child-display");
      }
      // clearTimeout(_fabTimeout);
    };
    fabBg.appendChild( mainBtn );
    $('[data-toggle="tooltip"]').tooltip();
  };
  fabSyntax = () => {
    console.log(`fabSetup([{
      icon:"info", // font-awesome icons eg. info for fa-info
      help:"tooltip text",
      callback:function(){}
    }]); //insert multiple objects for multiple fab icons`);
  };
})();
