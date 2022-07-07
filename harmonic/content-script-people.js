

// var insertedNodes = [];
// var observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//     for (var i = 0; i < mutation.addedNodes.length; i++)
//       // insertedNodes.push(mutation.addedNodes[i]);
//       alert(`${mutation.type} has been changed.`);

//     })
// });
// observer.observe(observed, { childList: true, subtree:true });
// console.log(insertedNodes);

// window.addEventListener('load', (event) => {
//   console.log('page is fully loaded');
//   const observed = document.querySelector("#content-main")
//   console.log(observed)
// });

const waitForElm = async (selector)=> {
  
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const elm = await waitForElm('ol.artdeco-list');

// waitForElm('ol.artdeco-list').then((elm) => {
//     console.log('Element is ready');
//     var insertedNodes = [];
//     var observer = new MutationObserver(function(mutations) {
//         mutations.forEach(function(mutation) {
//         for (var i = 0; i < mutation.addedNodes.length; i++)
//             insertedNodes.push(mutation.addedNodes[i]);
//             console.log("yes")
//         })
//     });
//     observer.observe(document.querySelector("ol.artdeco-list"), { childList: true });
//     console.log(insertedNodes);

// });