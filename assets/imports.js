const links = document.querySelectorAll('link[rel="import"]')

// Array.prototype.forEach.call(links, (link) => {
//   let template = link.import.querySelector('template')
//   let clone = document.importNode(template.content, true)

//   let current = clone.querySelector('#timer-template')
//   console.log('current: ' + current);

//   let tabPane = document.querySelector('.tab-pane.active').setAttribute('id', 'timer')
//   console.log('tab: ' + tabPane);
//   document.querySelector('#template-container').appendChild(current)

// })

////////////////////////////////////

// const link = document.querySelector('link[rel="import"]');

// // Clone the <template> in the import.
// let template = link.import.querySelector('template');
// let clone = document.importNode(template.content, true);

// document.querySelector('#container').appendChild(clone);