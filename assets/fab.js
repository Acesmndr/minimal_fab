// v1.3.0
(function(){
  let fabBg = document.createElement("div");
  fabBg.className = "fab-bg";
  fabBg.addEventListener("mouseout",(event) => {
    if(event.toElement){
      event = event.toElement.classList;
      (event.contains("fab-child")||event.contains("fab-bg")||event.contains("fa"))?false:_closeFab();
    }
  });
  document.body.appendChild(fabBg);
  fabSetup = (buttons) => {
    for( let _btn in buttons ){
      let _fabIcon,_fabHelp,_callback;
      switch (_btn) {
        case "instruction":
          _fabIcon = "info";
          _fabHelp = "Instructions";
          _callback = ()=>{_bootboxAlert(`Instructions`,buttons[_btn])};
          break;
        case "reference":
          _fabIcon = "file-text";
          _fabHelp = "Reference Guide";
          _callback = ()=>{window.open(buttons[_btn],"_blank")};
          break;
        case "shortcut":
          _fabIcon = "keyboard-o";
          _fabHelp = "Shortcuts";
          _callback = ()=>{_bootboxAlert(`Shortcuts`,buttons[_btn])};
          break;
        case "video":
          _fabIcon = "video-camera";
          _fabHelp = "Training Video";
          _callback = ()=>{_bootboxAlert(`Training Video`,`<center><iframe width="480" height="320" align="center" src="`+buttons[_btn]+`" frameborder="0" allowfullscreen></iframe></center>`)};
          break;
        default:
          _fabIcon = "bars";
          _fabHelp = _btn;
          _callback = buttons[_btn];
      }
      let fabBtn = document.createElement("a");
      fabBtn.className = "fab-child";
      fabBtn.id = "fab-"+_fabIcon;
      fabBtn.addEventListener("click",function(){
        _callback();
        _closeFab();
        _hideToolTip();
      });
      fabBtn.addEventListener("mouseover",(ev) => {
        ev=ev.target.getBoundingClientRect();
        _showToolTip(_fabHelp,ev.top+ev.height/2-13);
      });
      fabBtn.addEventListener("mouseout",(ev) => {
        _hideToolTip();
      });
      let fabIcon = document.createElement("i");
      fabIcon.className = "fa fa-fw fa-"+_fabIcon;
      fabBtn.appendChild( fabIcon );
      fabBg.appendChild( fabBtn );
    };
    let mainBtn = document.createElement("a");
    mainBtn.className = "fab-main";
    mainBtn.id = "fab";
    let mainIcon = document.createElement("i");
    mainIcon.className = "fa fa-fw fa-question";
    mainBtn.appendChild( mainIcon );
    mainBtn.addEventListener("mouseover",(ev) => {
      ev=ev.target.getBoundingClientRect();
      _showToolTip("Help",ev.top+ev.height/2-13);
      _openFab();
    });
    mainBtn.addEventListener("mouseout",() => {
      _hideToolTip();
      mainBtn.children[0].className="fa fa-fw fa-question";
    });
    mainBtn.addEventListener("click",(ev) => {
      (ev.target.classList.contains("forward-spin")||ev.target.children[0].classList.contains("forward-spin"))?_closeFab():_openFab();
    });
    _openFab = () => {
      mainBtn.children[0].className="fa fa-fw fa-question forward-spin";
      for( let i=0;i < document.getElementsByClassName("fab-child").length; i++ ){
          document.getElementsByClassName("fab-child")[i].classList.add("fab-child-display");
      }
    };
    _closeFab = () => {
      mainBtn.children[0].className="fa fa-fw fa-question reverse-spin";
      for( let i=0;i < document.getElementsByClassName("fab-child").length; i++ ){
        document.getElementsByClassName("fab-child")[i].classList.remove("fab-child-display");
      }
    };
    _setupToolTip = () => {
      let tooltipx = document.createElement("div");
      tooltipx.className = "tooltipx";
      tooltipx.id = "tooltipx";
      document.body.appendChild(tooltipx);
    };
    _showToolTip = (text,top) => {
      let tooltipx = document.getElementById("tooltipx");
      tooltipx.style.top = top+"px";
      tooltipx.textContent = text;
      tooltipx.classList.add("tooltipx-show");
    };
    _hideToolTip = () => {
      document.getElementById("tooltipx").classList.remove("tooltipx-show");
    };
    _bootboxAlert = (title,message) => {
      bootbox.dialog({
        title: title,
        message: message,
        size: "large",
        buttons: {ok: {label:"OK"}}
      });
    };
    fabBg.appendChild( mainBtn );
    _setupToolTip();
  };
  fabSyntax = () => {console.log(`fabSetup({instruction:"instruction text",video:"video link",shortcut:"Shortcut text",reference:"Reference Link"});`);};
})();
