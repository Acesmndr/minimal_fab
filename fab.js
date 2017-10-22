const swal = require('sweetalert');
module.exports = function(buttons){
  let fabBg = document.createElement('div');
  fabBg.className = 'fab-bg';
  fabBg.addEventListener('mouseout',(event) => {
    if(event.toElement){
      event = event.toElement.classList;
      (event.contains('fab-child')||event.contains('fab-bg')||event.contains('fa'))?false:_closeFab();
    }
  });
  _getIcon = (customIcon, defaultIcon)=>{
    return customIcon ? customIcon.slice('fa-') : defaultIcon;
  }
  document.body.appendChild(fabBg);
  buttons.map((_btn) => {
    let _fabIcon,_fabHelp,_callback;
    switch (_btn.type) {
      case 'text':
        _fabIcon = _getIcon(_btn.icon, 'info');
        _fabHelp = _btn.title || 'Information';
        _callback = ()=>{
          swal({text: _btn.text});
        };
        break;
      case 'link':
        _fabIcon = _getIcon(_btn.icon, 'file-text');
        _fabHelp = _btn.title || 'Link';
        _callback = ()=>{
          window.open(_btn.link, '_blank');
        };
        break;
      case 'video':
        _fabIcon = _getIcon(_btn.icon, 'video-camera');
        _fabHelp = _btn.title || 'Video';
        _callback = ()=>{
          swal({
            content: {
              element: "iframe",
              attributes: {
                width: 440,
                height: 340,
                align: 'center',
                src: _btn.link,
                frameborder: 0,
                allowfullscreen: true,
              },
            },
            button: false,
          });
        } 
       break;
      case 'custom':
        _fabIcon = _getIcon(_btn.icon, 'bars');
        _fabHelp = _btn.title || 'Custom text';
        _callback = ()=>{
          _btn.callback()
        };
        break;
      case 'custom-dialog':
        _fabIcon = _getIcon(btn.icon, 'bars');
        _fabHelp = _btn.title || 'Custom Dialog';
        _callback = ()=>{
          swal(_btn.config);
        };
        break;
      case 'help':
      default:
        _fabIcon = _getIcon(_btn.icon, 'keyboard-o');
        _fabHelp = _btn.title || 'Help';
        _callback = ()=>{
          swal({
            text: _btn.text,
            title: _btn.title || false
          });
        };
    }
    let fabBtn = document.createElement('a');
    fabBtn.className = 'fab-child';
    fabBtn.id = 'fab-'+_fabIcon;
    fabBtn.addEventListener('click',function(){
      _callback();
      _closeFab();
      _hideToolTip();
    });
    fabBtn.addEventListener('mouseover',(ev) => {
      ev=ev.target.getBoundingClientRect();
      _showToolTip(_fabHelp,ev.top+ev.height/2-13);
    });
    fabBtn.addEventListener('mouseout',(ev) => {
      _hideToolTip();
    });
    let fabIcon = document.createElement('i');
    fabIcon.className = 'fa fa-fw fa-'+_fabIcon;
    fabBtn.appendChild( fabIcon );
    fabBg.appendChild( fabBtn );
  });
  let mainBtn = document.createElement('a');
  mainBtn.className = 'fab-main';
  mainBtn.id = 'fab';
  let mainIcon = document.createElement('i');
  mainIcon.className = 'fa fa-fw fa-question';
  mainBtn.appendChild( mainIcon );
  mainBtn.addEventListener('mouseover',(ev) => {
    ev=ev.target.getBoundingClientRect();
    _showToolTip('Help',ev.top+ev.height/2-13);
    _openFab();
  });
  mainBtn.addEventListener('mouseout',() => {
    _hideToolTip();
    mainBtn.children[0].className='fa fa-fw fa-question';
  });
  mainBtn.addEventListener('click',(ev) => {
    (ev.target.classList.contains('forward-spin')||ev.target.children[0].classList.contains('forward-spin'))?_closeFab():_openFab();
  });
  _openFab = () => {
    mainBtn.children[0].className='fa fa-fw fa-question forward-spin';
    for( let i=0;i < document.getElementsByClassName('fab-child').length; i++ ){
        document.getElementsByClassName('fab-child')[i].classList.add('fab-child-display');
    }
  };
  _closeFab = () => {
    mainBtn.children[0].className='fa fa-fw fa-question reverse-spin';
    for( let i=0;i < document.getElementsByClassName('fab-child').length; i++ ){
      document.getElementsByClassName('fab-child')[i].classList.remove('fab-child-display');
    }
  };
  _setupToolTip = () => {
    let tooltipx = document.createElement('div');
    tooltipx.className = 'tooltipx';
    tooltipx.id = 'tooltipx';
    document.body.appendChild(tooltipx);
  };
  _showToolTip = (text,top) => {
    let tooltipx = document.getElementById('tooltipx');
    tooltipx.style.top = top+'px';
    tooltipx.textContent = text;
    tooltipx.classList.add('tooltipx-show');
  };
  _hideToolTip = () => {
    document.getElementById('tooltipx').classList.remove('tooltipx-show');
  };
  fabBg.appendChild( mainBtn );
  _setupToolTip();
}
