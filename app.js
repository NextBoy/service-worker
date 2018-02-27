if('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker/sw.js', {scope: '/service-worker/'})
            .then(registration => {})
            .catch(err => {
                console.log(err)
            })
    })
}