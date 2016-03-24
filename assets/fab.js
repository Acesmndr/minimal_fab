// v1.2.0
(function(){
  let fabBg = document.createElement("div");
  fabBg.className = "fab-bg";
  fabBg.addEventListener("mouseout",(event) => {
    event = event.toElement.classList||" ";
    (event.contains("fab-child")||event.contains("fab-bg")||event.contains("fa"))?false:_closeFab();
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
          _fabHelp = "Reference";
          _callback = ()=>{window.open(buttons[_btn],"_blank")};
          break;
        case "shortcut":
          _fabIcon = "keyboard-o";
          _fabHelp = "Shortcuts";
          _callback = ()=>{_bootboxAlert(`Shortcuts`,buttons[_btn])};
          break;
        case "video":
          _fabIcon = "video-camera";
          _fabHelp = "Video";
          _callback = ()=>{_bootboxAlert(`Training Video`,`<iframe width="800" height="600" src="`+buttons[_btn]+`" frameborder="0" allowfullscreen></iframe>`)};
          break;
        default:
          _fabIcon = "bars";
          _fabHelp = _btn;
          _callback = buttons[_btn];
      }
      let fabBtn = document.createElement("a");
      fabBtn.className = "fab-child";
      fabBtn.setAttribute("data-toggle","tooltip");
      fabBtn.setAttribute("data-placement","left");
      fabBtn.id = "fab-"+_fabIcon;
      fabBtn.setAttribute("data-original-title",_fabHelp);
      fabBtn.addEventListener("click",function(){
        _callback();
        _closeFab();
      });
      let fabIcon = document.createElement("i");
      fabIcon.className = "fa fa-fw fa-"+_fabIcon;
      fabBtn.appendChild( fabIcon );
      fabBg.appendChild( fabBtn );
    };
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
    }
    _closeFab = () => {
      mainBtn.setAttribute("data-original-title","Help");
      mainBtn.children[0].className="fa fa-fw fa-question";
      for( let i=0;i < document.getElementsByClassName("fab-child").length; i++ ){
        document.getElementsByClassName("fab-child")[i].classList.remove("fab-child-display");
      }
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
    $('[data-toggle="tooltip"]').tooltip();
  };
  fabSyntax = () => {console.log(`fabSetup({instruction:"instruction text",video:"video link",shortcut:"Shortcut text",reference:"Reference Link"});`);};
})();
