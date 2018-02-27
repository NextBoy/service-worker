# Service Worker 有以下功能和特性：

 - 一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context。
 - 一旦被 install，就永远存在，除非被 uninstall
 - 需要的时候可以直接唤醒，不需要的时候自动睡眠（有效利用资源，此处有坑）
 - 可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）
 - 离线内容开发者可控
 - 能向客户端推送消息
 - 不能直接操作 DOM
 - 出于安全的考虑，必须在 HTTPS 环境下才能工作
 - 异步实现，内部大都是通过 Promise 实现
 
 # Service Worker 的生命周期
 
 register - installing - installed - activating - activated - redundant 废弃（解除）
 
 在使用Service Worker前我们需要在当前页面的JavaScript主进程中使用serviceWorkerContainer.register()
 来注册Service Worker, 如果注册成功则Service Worker 会在serviceWorkerGlobalScope环境中运行，该进程
 与主进程相互独立，且不能访问DOM
 
 - installing  安装中
    
    如果注册成功，则会开始安装，并且会触发install事件回调指定一些资源进行离线缓存
    
    install事件回调的两个方法
    - event.waitUtil() 传入一个promise参数，等到该promise 为resolve状态为止
    - self.skipWaiting() self 是当前 context 的 global 变量，执行该方法表示强制当前处在 waiting 状态的 Service Worker 进入 activating 状态。
 
 - installed  安装后
 
    Service Worker 已经完成了安装，并且等待其他的 Service Worker 线程被关闭。   
 
 - activating 激活中
 
     在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装，并且清除了其他的 worker 以及关联缓存的旧缓存资源，
     等待新的 Service Worker 线程被激活。
 
   activate事件回调的两个方法
    - event.waitUtil() 传入一个Promise参数，等到该Promise为resolve为止
    - self.global.clients.claim()  取得页面的控制权 

 - activated 激活后
 在这个状态会处理 activate 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 fetch (请求)、sync (后台同步)、push (推送)。
 
 - redundant 废弃状态
 这个状态表示一个 Service Worker 的生命周期结束。    