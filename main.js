const fabSetup = require('minimal_fab');

fabSetup([
    { type: 'text', text: `Here is some text that I'd like to see in a modal dialog` },
    { type: 'video', link: 'https://www.youtube.com/embed/EfvsNZIW970' },
    { type: 'link', link: 'http://youtube.com', title: 'Go to Youtube' },
    { type: 'custom', callback: () => { console.log('I can do almost anything')} },
]);