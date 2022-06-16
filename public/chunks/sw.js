if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/chunks/load.worker.js', {}).then(registration => {
        registration.update();
    });
    navigator.serviceWorker.ready.then(registration => {
        //const channel = new MessageChannel();
        registration.active.postMessage('*', {});
        //location.reload();
    })
} else {
    const firefox = false; 
    if (firefox) {
        document.write('❌ Please leave private browsing mode.');
    } else {
        document.write('❌ Service workers are not supported!');
    }
}