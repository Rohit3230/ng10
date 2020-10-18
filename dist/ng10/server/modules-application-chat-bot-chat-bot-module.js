exports.ids=[1],exports.modules={vwlc:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ChatBotModule",(function(){return ChatBotModule}));var common=__webpack_require__("ofXK"),router=__webpack_require__("tyNb"),Subject=__webpack_require__("XNiG"),Subscriber=__webpack_require__("7o/Q"),Observable=__webpack_require__("HDdC"),Subscription=__webpack_require__("quSY");class Action_Action extends Subscription.a{constructor(scheduler,work){super()}schedule(state,delay=0){return this}}class AsyncAction_AsyncAction extends Action_Action{constructor(scheduler,work){super(scheduler,work),this.scheduler=scheduler,this.work=work,this.pending=!1}schedule(state,delay=0){if(this.closed)return this;this.state=state;const id=this.id,scheduler=this.scheduler;return null!=id&&(this.id=this.recycleAsyncId(scheduler,id,delay)),this.pending=!0,this.delay=delay,this.id=this.id||this.requestAsyncId(scheduler,this.id,delay),this}requestAsyncId(scheduler,id,delay=0){return setInterval(scheduler.flush.bind(scheduler,this),delay)}recycleAsyncId(scheduler,id,delay=0){if(null!==delay&&this.delay===delay&&!1===this.pending)return id;clearInterval(id)}execute(state,delay){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const error=this._execute(state,delay);if(error)return error;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(state,delay){let errored=!1,errorValue=void 0;try{this.work(state)}catch(e){errored=!0,errorValue=!!e&&e||new Error(e)}if(errored)return this.unsubscribe(),errorValue}_unsubscribe(){const id=this.id,scheduler=this.scheduler,actions=scheduler.actions,index=actions.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==index&&actions.splice(index,1),null!=id&&(this.id=this.recycleAsyncId(scheduler,id,null)),this.delay=null}}class Scheduler{constructor(SchedulerAction,now=Scheduler.now){this.SchedulerAction=SchedulerAction,this.now=now}schedule(work,delay=0,state){return new this.SchedulerAction(this,work).schedule(state,delay)}}Scheduler.now=()=>Date.now();class AsyncScheduler_AsyncScheduler extends Scheduler{constructor(SchedulerAction,now=Scheduler.now){super(SchedulerAction,()=>AsyncScheduler_AsyncScheduler.delegate&&AsyncScheduler_AsyncScheduler.delegate!==this?AsyncScheduler_AsyncScheduler.delegate.now():now()),this.actions=[],this.active=!1,this.scheduled=void 0}schedule(work,delay=0,state){return AsyncScheduler_AsyncScheduler.delegate&&AsyncScheduler_AsyncScheduler.delegate!==this?AsyncScheduler_AsyncScheduler.delegate.schedule(work,delay,state):super.schedule(work,delay,state)}flush(action){const{actions:actions}=this;if(this.active)return void actions.push(action);let error;this.active=!0;do{if(error=action.execute(action.state,action.delay))break}while(action=actions.shift());if(this.active=!1,error){for(;action=actions.shift();)action.unsubscribe();throw error}}}const queue_queue=new class extends AsyncScheduler_AsyncScheduler{}(class extends AsyncAction_AsyncAction{constructor(scheduler,work){super(scheduler,work),this.scheduler=scheduler,this.work=work}schedule(state,delay=0){return delay>0?super.schedule(state,delay):(this.delay=delay,this.state=state,this.scheduler.flush(this),this)}execute(state,delay){return delay>0||this.closed?super.execute(state,delay):this._execute(state,delay)}requestAsyncId(scheduler,id,delay=0){return null!==delay&&delay>0||null===delay&&this.delay>0?super.requestAsyncId(scheduler,id,delay):scheduler.flush(this)}});var NotificationKind,empty=__webpack_require__("EY2u"),of=__webpack_require__("LRne");function dispatch({error:error,subscriber:subscriber}){subscriber.error(error)}!function(NotificationKind){NotificationKind.NEXT="N",NotificationKind.ERROR="E",NotificationKind.COMPLETE="C"}(NotificationKind||(NotificationKind={}));class Notification_Notification{constructor(kind,value,error){this.kind=kind,this.value=value,this.error=error,this.hasValue="N"===kind}observe(observer){switch(this.kind){case"N":return observer.next&&observer.next(this.value);case"E":return observer.error&&observer.error(this.error);case"C":return observer.complete&&observer.complete()}}do(next,error,complete){switch(this.kind){case"N":return next&&next(this.value);case"E":return error&&error(this.error);case"C":return complete&&complete()}}accept(nextOrObserver,error,complete){return nextOrObserver&&"function"==typeof nextOrObserver.next?this.observe(nextOrObserver):this.do(nextOrObserver,error,complete)}toObservable(){switch(this.kind){case"N":return Object(of.a)(this.value);case"E":return function throwError(error,scheduler){return scheduler?new Observable.a(subscriber=>scheduler.schedule(dispatch,0,{error:error,subscriber:subscriber})):new Observable.a(subscriber=>subscriber.error(error))}(this.error);case"C":return Object(empty.b)()}throw new Error("unexpected notification kind value")}static createNext(value){return void 0!==value?new Notification_Notification("N",value):Notification_Notification.undefinedValueNotification}static createError(err){return new Notification_Notification("E",void 0,err)}static createComplete(){return Notification_Notification.completeNotification}}Notification_Notification.completeNotification=new Notification_Notification("C"),Notification_Notification.undefinedValueNotification=new Notification_Notification("N",void 0);class observeOn_ObserveOnSubscriber extends Subscriber.a{constructor(destination,scheduler,delay=0){super(destination),this.scheduler=scheduler,this.delay=delay}static dispatch(arg){const{notification:notification,destination:destination}=arg;notification.observe(destination),this.unsubscribe()}scheduleMessage(notification){this.destination.add(this.scheduler.schedule(observeOn_ObserveOnSubscriber.dispatch,this.delay,new ObserveOnMessage(notification,this.destination)))}_next(value){this.scheduleMessage(Notification_Notification.createNext(value))}_error(err){this.scheduleMessage(Notification_Notification.createError(err)),this.unsubscribe()}_complete(){this.scheduleMessage(Notification_Notification.createComplete()),this.unsubscribe()}}class ObserveOnMessage{constructor(notification,destination){this.notification=notification,this.destination=destination}}var ObjectUnsubscribedError=__webpack_require__("9ppp"),SubjectSubscription=__webpack_require__("Ylt2");class ReplaySubject_ReplaySubject extends Subject.b{constructor(bufferSize=Number.POSITIVE_INFINITY,windowTime=Number.POSITIVE_INFINITY,scheduler){super(),this.scheduler=scheduler,this._events=[],this._infiniteTimeWindow=!1,this._bufferSize=bufferSize<1?1:bufferSize,this._windowTime=windowTime<1?1:windowTime,windowTime===Number.POSITIVE_INFINITY?(this._infiniteTimeWindow=!0,this.next=this.nextInfiniteTimeWindow):this.next=this.nextTimeWindow}nextInfiniteTimeWindow(value){const _events=this._events;_events.push(value),_events.length>this._bufferSize&&_events.shift(),super.next(value)}nextTimeWindow(value){this._events.push(new ReplayEvent(this._getNow(),value)),this._trimBufferThenGetEvents(),super.next(value)}_subscribe(subscriber){const _infiniteTimeWindow=this._infiniteTimeWindow,_events=_infiniteTimeWindow?this._events:this._trimBufferThenGetEvents(),scheduler=this.scheduler,len=_events.length;let subscription;if(this.closed)throw new ObjectUnsubscribedError.a;if(this.isStopped||this.hasError?subscription=Subscription.a.EMPTY:(this.observers.push(subscriber),subscription=new SubjectSubscription.a(this,subscriber)),scheduler&&subscriber.add(subscriber=new observeOn_ObserveOnSubscriber(subscriber,scheduler)),_infiniteTimeWindow)for(let i=0;i<len&&!subscriber.closed;i++)subscriber.next(_events[i]);else for(let i=0;i<len&&!subscriber.closed;i++)subscriber.next(_events[i].value);return this.hasError?subscriber.error(this.thrownError):this.isStopped&&subscriber.complete(),subscription}_getNow(){return(this.scheduler||queue_queue).now()}_trimBufferThenGetEvents(){const now=this._getNow(),_bufferSize=this._bufferSize,_windowTime=this._windowTime,_events=this._events,eventsCount=_events.length;let spliceCount=0;for(;spliceCount<eventsCount&&!(now-_events[spliceCount].time<_windowTime);)spliceCount++;return eventsCount>_bufferSize&&(spliceCount=Math.max(spliceCount,eventsCount-_bufferSize)),spliceCount>0&&_events.splice(0,spliceCount),_events}}class ReplayEvent{constructor(time,value){this.time=time,this.value=value}}const DEFAULT_WEBSOCKET_CONFIG={url:"",deserializer:e=>JSON.parse(e.data),serializer:value=>JSON.stringify(value)};class WebSocketSubject_WebSocketSubject extends Subject.a{constructor(urlConfigOrSource,destination){if(super(),urlConfigOrSource instanceof Observable.a)this.destination=destination,this.source=urlConfigOrSource;else{const config=this._config=Object.assign({},DEFAULT_WEBSOCKET_CONFIG);if(this._output=new Subject.b,"string"==typeof urlConfigOrSource)config.url=urlConfigOrSource;else for(let key in urlConfigOrSource)urlConfigOrSource.hasOwnProperty(key)&&(config[key]=urlConfigOrSource[key]);if(!config.WebSocketCtor&&WebSocket)config.WebSocketCtor=WebSocket;else if(!config.WebSocketCtor)throw new Error("no WebSocket constructor can be found");this.destination=new ReplaySubject_ReplaySubject}}lift(operator){const sock=new WebSocketSubject_WebSocketSubject(this._config,this.destination);return sock.operator=operator,sock.source=this,sock}_resetState(){this._socket=null,this.source||(this.destination=new ReplaySubject_ReplaySubject),this._output=new Subject.b}multiplex(subMsg,unsubMsg,messageFilter){const self=this;return new Observable.a(observer=>{try{self.next(subMsg())}catch(err){observer.error(err)}const subscription=self.subscribe(x=>{try{messageFilter(x)&&observer.next(x)}catch(err){observer.error(err)}},err=>observer.error(err),()=>observer.complete());return()=>{try{self.next(unsubMsg())}catch(err){observer.error(err)}subscription.unsubscribe()}})}_connectSocket(){const{WebSocketCtor:WebSocketCtor,protocol:protocol,url:url,binaryType:binaryType}=this._config,observer=this._output;let socket=null;try{socket=protocol?new WebSocketCtor(url,protocol):new WebSocketCtor(url),this._socket=socket,binaryType&&(this._socket.binaryType=binaryType)}catch(e){return void observer.error(e)}const subscription=new Subscription.a(()=>{this._socket=null,socket&&1===socket.readyState&&socket.close()});socket.onopen=e=>{const{_socket:_socket}=this;if(!_socket)return socket.close(),void this._resetState();const{openObserver:openObserver}=this._config;openObserver&&openObserver.next(e);const queue=this.destination;this.destination=Subscriber.a.create(x=>{if(1===socket.readyState)try{const{serializer:serializer}=this._config;socket.send(serializer(x))}catch(e){this.destination.error(e)}},e=>{const{closingObserver:closingObserver}=this._config;closingObserver&&closingObserver.next(void 0),e&&e.code?socket.close(e.code,e.reason):observer.error(new TypeError("WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }")),this._resetState()},()=>{const{closingObserver:closingObserver}=this._config;closingObserver&&closingObserver.next(void 0),socket.close(),this._resetState()}),queue&&queue instanceof ReplaySubject_ReplaySubject&&subscription.add(queue.subscribe(this.destination))},socket.onerror=e=>{this._resetState(),observer.error(e)},socket.onclose=e=>{this._resetState();const{closeObserver:closeObserver}=this._config;closeObserver&&closeObserver.next(e),e.wasClean?observer.complete():observer.error(e)},socket.onmessage=e=>{try{const{deserializer:deserializer}=this._config;observer.next(deserializer(e))}catch(err){observer.error(err)}}}_subscribe(subscriber){const{source:source}=this;return source?source.subscribe(subscriber):(this._socket||this._connectSocket(),this._output.subscribe(subscriber),subscriber.add(()=>{const{_socket:_socket}=this;0===this._output.observers.length&&(_socket&&1===_socket.readyState&&_socket.close(),this._resetState())}),subscriber)}unsubscribe(){const{_socket:_socket}=this;_socket&&1===_socket.readyState&&_socket.close(),this._resetState(),super.unsubscribe()}}var core=__webpack_require__("fXoL");function ChatBotComponent_div_2_li_2_button_2_Template(rf,ctx){if(1&rf){const _r6=core.Kc();core.Jc(0,"button",5),core.Qc("click",(function ChatBotComponent_div_2_li_2_button_2_Template_button_click_0_listener(){core.Vc(_r6);const dataObj_r2=core.Sc().$implicit;return core.Sc(2).getAnswers(dataObj_r2._id)})),core.ad(1,"Select"),core.Ic()}}function ChatBotComponent_div_2_li_2_Template(rf,ctx){if(1&rf&&(core.Jc(0,"li"),core.Hc(1,"p",3),core.Zc(2,ChatBotComponent_div_2_li_2_button_2_Template,2,0,"button",4),core.Hc(3,"br"),core.Hc(4,"br"),core.Ic()),2&rf){const dataObj_r2=ctx.$implicit;core.wc(1),core.Tc("innerHTML",dataObj_r2.data,core.Wc),core.wc(1),core.Tc("ngIf","link"==dataObj_r2.type)}}function ChatBotComponent_div_2_Template(rf,ctx){if(1&rf&&(core.Jc(0,"div"),core.Jc(1,"ul"),core.Zc(2,ChatBotComponent_div_2_li_2_Template,5,2,"li",1),core.Jc(3,"li"),core.Jc(4,"p"),core.ad(5," Go to live chat "),core.Ic(),core.Jc(6,"a",2),core.ad(7,"Live Chat"),core.Ic(),core.Hc(8,"br"),core.Hc(9,"br"),core.Ic(),core.Ic(),core.Ic()),2&rf){const ctx_r0=core.Sc();core.wc(2),core.Tc("ngForOf",ctx_r0.chatAnsArray)}}class chat_bot_component_ChatBotComponent{constructor(){this.subject=function webSocket(urlConfigOrSource){return new WebSocketSubject_WebSocketSubject(urlConfigOrSource)}("ws://localhost:3230"),this.chatAnsArray=[]}ngOnInit(){this.getAnswers("init")}getAnsArrays(chatAnsArr){this.chatAnsArray=chatAnsArr}openLiveChat(){}getAnswers(parentId){this.subject.next({event:"events",data:{id:parentId}}),console.log("new message from client to websocket: "),this.subject.subscribe(chatAnsArr=>this.getAnsArrays(chatAnsArr),err=>console.log(err),()=>console.log("complete"))}}chat_bot_component_ChatBotComponent.\u0275fac=function ChatBotComponent_Factory(t){return new(t||chat_bot_component_ChatBotComponent)},chat_bot_component_ChatBotComponent.\u0275cmp=core.Ac({type:chat_bot_component_ChatBotComponent,selectors:[["app-chat-bot"]],decls:3,vars:1,consts:[[4,"ngIf"],[4,"ngFor","ngForOf"],["type","btn","routerLink","/signin",1,"btn","btn-success"],[3,"innerHTML"],["type","btn","class","btn btn-secondary",3,"click",4,"ngIf"],["type","btn",1,"btn","btn-secondary",3,"click"]],template:function ChatBotComponent_Template(rf,ctx){1&rf&&(core.Jc(0,"h1"),core.ad(1," Welcome to Chat-bot Application. "),core.Ic(),core.Zc(2,ChatBotComponent_div_2_Template,10,1,"div",0)),2&rf&&(core.wc(2),core.Tc("ngIf",ctx.chatAnsArray&&ctx.chatAnsArray.length))},directives:[common.i,common.h,router.a],styles:[""]});const routes=[{path:"",component:chat_bot_component_ChatBotComponent}];class ChatBotRoutingModule{}ChatBotRoutingModule.\u0275mod=core.Ec({type:ChatBotRoutingModule}),ChatBotRoutingModule.\u0275inj=core.Dc({factory:function ChatBotRoutingModule_Factory(t){return new(t||ChatBotRoutingModule)},imports:[[router.b.forChild(routes)],router.b]});class ChatBotModule{}ChatBotModule.\u0275mod=core.Ec({type:ChatBotModule}),ChatBotModule.\u0275inj=core.Dc({factory:function ChatBotModule_Factory(t){return new(t||ChatBotModule)},providers:[],imports:[[common.b,ChatBotRoutingModule]]})}};