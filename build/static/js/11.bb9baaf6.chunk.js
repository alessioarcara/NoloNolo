(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{104:function(t,e,n){"use strict";var a=n(3),c=n(98),r=n.n(c),i=(n(127),n(105),n(132)),o=n(0),s=n(137),l=n(1);Object(c.registerLocale)("it",i.a);e.a=function(t){var e=t.minDate,n=t.start,c=t.end,i=t.onChangeStartDate,d=t.onChangeEndDate,u=t.monthsShown,b=t.alreadyRentedDates,m=Object(o.useMemo)((function(){var t=[];return b&&b.forEach((function(e){for(var n=new Date(e.from),a=new Date(e.to),c=n;c<=a;c=Object(s.default)(c,1))t.push(c)})),t}),[b]);return Object(l.jsx)(r.a,{locale:"it",wrapperClassName:"input-container",minDate:e&&e,selected:n,startDate:n,endDate:c,onChange:function(t){var e=Object(a.a)(t,2),n=e[0],c=e[1];i(n),d(c)},monthsShown:u,calendarStartDay:1,selectsRange:!0,inline:!0,excludeDates:m})}},105:function(t,e,n){},109:function(t,e,n){"use strict";var a=n(82),c=n(84),r=n(104),i=n(111),o=n.n(i),s=n(1);e.a=function(t){var e=t.minDate,n=t.moveClickHandler,i=t.changeStartDateHandler,l=t.changeEndDateHandler,d=t.searchClickHandler,u=t.cancelSelectionHandler,b=t.startDate,m=t.endDate,j=t.skipTextButton,f=t.confirmTextButton,_=t.alreadyRentedDates;return Object(s.jsxs)("div",{className:o.a["datepicker-container"],children:[Object(s.jsxs)("div",{className:o.a["header-datepicker"],children:[Object(s.jsx)(a.a,{actionClassName:o.a["actions-top"],firstButtonClassName:"btn ".concat(o.a["btn-back"]),firstButtonClickHandler:n,firstButtonText:Object(s.jsx)(c.a,{}),secondButtonClassName:"btn btn-secondary ".concat(o.a["btn-cancel"]),secondButtonClickHandler:u,secondButtonText:"Cancella"}),Object(s.jsxs)("ul",{className:o.a["days-text"],children:[Object(s.jsx)("li",{children:"lun"}),Object(s.jsx)("li",{children:"mar"}),Object(s.jsx)("li",{children:"mer"}),Object(s.jsx)("li",{children:"gio"}),Object(s.jsx)("li",{children:"ven"}),Object(s.jsx)("li",{children:"sab"}),Object(s.jsx)("li",{children:"dom"})]})]}),Object(s.jsx)("div",{className:o.a["day-picker"],children:Object(s.jsx)(r.a,{minDate:e,start:b,end:m,monthsShown:2,onChangeStartDate:i,onChangeEndDate:l,alreadyRentedDates:_})}),Object(s.jsx)(a.a,{actionClassName:(j||f)&&o.a["actions-bottom"],firstButtonClassName:j?"btn btn-secondary ".concat(o.a["btn-skip"]):o.a.hide,firstButtonClickHandler:j&&d,firstButtonText:j&&j,secondButtonClassName:f?"btn btn-outline-primary":o.a.hide,secondButtonClickHandler:f&&d,secondButtonText:f,secondButtonDisabled:!b||!m||b.getTime()===m.getTime()})]})}},111:function(t,e,n){t.exports={"datepicker-container":"SelectDates_datepicker-container__2CEui",hide:"SelectDates_hide__2pWwh","header-datepicker":"SelectDates_header-datepicker__1wQlw","btn-cancel":"SelectDates_btn-cancel__3cZ2Q","days-text":"SelectDates_days-text__3KDIa","actions-top":"SelectDates_actions-top__37iWM","actions-bottom":"SelectDates_actions-bottom__1AKcx","btn-back":"SelectDates_btn-back__11LuK","btn-skip":"SelectDates_btn-skip__2Wdyl","day-picker":"SelectDates_day-picker__2qrWC"}},112:function(t,e,n){"use strict";n.d(e,"b",(function(){return r}));var a=n(7),c=n(24),r={startDate:null,endDate:null,city:"",region:"",isNextPage:!1};e.a=function(t,e){var n=e.type,i=e.payload;switch(n){case c.t:return Object(a.a)(Object(a.a)({},t),{},{isNextPage:!t.isNextPage,city:i.city,region:i.region});case c.c:return Object(a.a)(Object(a.a)({},t),{},{startDate:i});case c.b:return Object(a.a)(Object(a.a)({},t),{},{endDate:i});case c.d:return Object(a.a)(Object(a.a)({},t),{},{startDate:null,endDate:null});default:return r}}},117:function(t,e,n){t.exports={"not-found-container":"ElementsNotFound_not-found-container__3E81E","box-shadow":"ElementsNotFound_box-shadow__1uY-k",container:"ElementsNotFound_container__3PO_a","not-found-text":"ElementsNotFound_not-found-text__12TAH"}},121:function(t,e,n){"use strict";var a=n(7),c=n(3),r=n(0),i=n(122),o=n.n(i),s=n(26),l=n.n(s),d=n(1),u=function(t){var e=t.message,n=t.status,a=t.duration,i=void 0===a?3e3:a,s=Object(r.useState)(!0),l=Object(c.a)(s,2),u=l[0],b=l[1],m=o.a.default;"error"===n&&(m=o.a.error),"success"===n&&(m=o.a.success);var j="".concat(o.a.notification," ").concat(m);return Object(r.useEffect)((function(){!0===u&&setTimeout((function(){b(!1)}),i)}),[u]),u?Object(d.jsx)("div",{className:j,children:e}):null};e.a=function(t){return l.a.createPortal(Object(d.jsx)(u,Object(a.a)({},t)),document.getElementById("overlay-root"))}},122:function(t,e,n){t.exports={notification:"Notification_notification__3buj9","slide-down":"Notification_slide-down__1tich",default:"Notification_default__UhEQ8",error:"Notification_error__21fFx",success:"Notification_success__sVwJ2"}},287:function(t,e,n){t.exports={"administration-container":"WebsiteAdministration_administration-container__1fmQr","header-background":"WebsiteAdministration_header-background__2pwIE",container:"WebsiteAdministration_container__2nFOh","administration-card":"WebsiteAdministration_administration-card__3N1ZN","rentals-title":"WebsiteAdministration_rentals-title__3fFim","rentals-list-title":"WebsiteAdministration_rentals-list-title__mF3fm","exit-btn":"WebsiteAdministration_exit-btn__1XS7b","administration-title":"WebsiteAdministration_administration-title__2l44U"}},288:function(t,e,n){t.exports={"rental-container":"AdministrationRental_rental-container__jg-5X","customer-email":"AdministrationRental_customer-email__3z8vk","rental-dates":"AdministrationRental_rental-dates__3L-JM","city-name":"AdministrationRental_city-name__Gn7lk","retro-btn":"AdministrationRental_retro-btn__35kZa"}},315:function(t,e,n){"use strict";n.r(e);var a=n(3),c=n(287),r=n.n(c),i=n(88),o=n(0),s=n.n(o),l=n(288),d=n.n(l),u=n(71),b=n(75),m=n(28),j=n(7),f=n(109),_=n(112),h=n(11),O=n(24),x=n(25),p=n(9),v=n(1),k=function(t){var e=t.handleDatesModal,n=t.handleBackDateRentals,c=t.rentalId,r=t.boatId,i=t.from,s=t.to,l=Object(x.a)(!0),d=l.data,b=l.sendRequest,m=Object(o.useMemo)((function(){return Object(u.p)(d,i,s)}),[d,i,s]),k=Object(o.useContext)(p.b).token,D=Object(o.useReducer)(_.a,Object(j.a)(Object(j.a)({},_.b),{},{startDate:new Date(i),endDate:new Date(s)})),N=Object(a.a)(D,2),g=N[0],y=N[1],C=Object(o.useCallback)((function(){y({type:O.d})}),[y]),w=Object(o.useCallback)((function(t){y({type:O.c,payload:t})}),[y]),B=Object(o.useCallback)((function(t){y({type:O.b,payload:t})}),[y]);return Object(o.useEffect)((function(){b({body:Object(h.body_boatRentals)({boatId:r}),token:k},(function(t){return t.boatRentals}))}),[b,k,r]),Object(v.jsx)(f.a,{moveClickHandler:e,searchClickHandler:function(){e(),n(Object(h.body_backdateRental)({rentalId:c,from:Object(u.i)(g.startDate).toString(),to:Object(u.i)(g.endDate).toString()}),(function(t,e){return t.map((function(t){return t._id===c?e:t}))}))},confirmTextButton:"Conferma",cancelSelectionHandler:C,changeStartDateHandler:w,changeEndDateHandler:B,startDate:g.startDate,endDate:g.endDate,alreadyRentedDates:m})},D=function(t){var e=t.customer,n=t.rentalId,c=t.boatId,r=t.from,i=t.to,s=t.city,l=t.handleMutationAdministrationRentals,j=Object(o.useState)(!1),f=Object(a.a)(j,2),_=f[0],h=f[1],O=Object(o.useContext)(m.b),x=Object(o.useCallback)((function(){h((function(t){return!t}))}),[]);return Object(v.jsxs)(v.Fragment,{children:[_&&Object(v.jsx)(b.a,{adapterSize:O.breakpoint,closeModalHandler:x,children:Object(v.jsx)(k,{handleDatesModal:x,handleBackDateRentals:l,rentalId:n,boatId:c,from:r,to:i})}),Object(v.jsxs)("div",{className:d.a["rental-container"],children:[Object(v.jsx)("div",{className:d.a["customer-email"],children:e.split("@")[0]}),Object(v.jsx)("div",{className:d.a["city-name"],children:s}),Object(v.jsx)("div",{className:d.a["rental-dates"],children:"\n                        ".concat(Object(u.j)(r,{day:"numeric",month:"short",year:"numeric"})," -\n                        ").concat(Object(u.j)(i,{day:"numeric",month:"short",year:"numeric"}),"\n                    ")}),Object(v.jsx)("button",{className:"".concat(d.a["retro-btn"]," btn btn-primary"),onClick:x,children:"Retrodata"})]})]})},N=n(89),g=function(t){var e,n=t.handleMutationAdministrationRentals,a=t.rentals;return e=a.length>0?a.map((function(t){return Object(v.jsx)(D,{rentalId:t._id,boatId:t.boat._id,handleMutationAdministrationRentals:n,customer:t.customer.email,from:t.from,to:t.to,city:t.boat.isDocked.city},t._id)})):Object(v.jsx)(N.a,{warningText:"Non ci sono noleggi futuri presenti!",hasBackdrop:!1}),Object(v.jsx)(v.Fragment,{children:e})},y=s.a.memo(g),C=n(74),w=function(t){var e=t.rentals,n=t.handleMutationAdministrationRentals,a=t.logout,c=Object(o.useMemo)((function(){return e.filter((function(t){return new Date(t.from)>new Date}))}),[e]);return Object(v.jsxs)("div",{className:r.a["administration-container"],children:[Object(v.jsx)(i.a,{textTitle:"Amministrazione",classNameHeader:r.a["header-background"],classNameTitle:r.a["administration-title"]}),Object(v.jsxs)("section",{className:r.a.container,children:[Object(v.jsxs)("div",{className:r.a["administration-card"],children:[Object(v.jsx)(i.a,{textTitle:"Noleggi futuri",classNameHeader:r.a["rentals-list-title"],classNameTitle:r.a["rentals-title"]}),Object(v.jsx)(y,{rentals:c,handleMutationAdministrationRentals:n})]}),Object(v.jsx)("div",{className:r.a["exit-btn"],children:Object(v.jsx)(C.a,{onClick:a,type:"button",children:"Esci"})})]})]})},B=n(121);e.default=function(){var t=Object(o.useState)([]),e=Object(a.a)(t,2),n=e[0],c=e[1],r=Object(x.a)(!0),i=r.status,s=r.data,l=r.error,d=r.sendRequest,b=Object(o.useContext)(p.b),m=b.logout,j=b.token,f=Object(o.useRef)(!1),_=Object(o.useCallback)((function(t,e){d({body:t,token:j},Object(u.m)(c,e)),f.current=!0}),[d,j]);return Object(o.useEffect)((function(){d({body:h.body_rentals,token:j},(function(t){return c(t.rentals)}))}),[d,j]),Object(v.jsxs)(v.Fragment,{children:[f.current&&"completed"===i&&!s&&!l&&Object(v.jsx)(B.a,{message:"Operazione riuscita",status:"success"}),f.current&&"completed"===i&&(s||l)&&Object(v.jsx)(B.a,{message:"Operazione fallita",status:"error"}),Object(v.jsx)(w,{rentals:n,handleMutationAdministrationRentals:_,logout:m})]})}},71:function(t,e,n){"use strict";n.d(e,"g",(function(){return o})),n.d(e,"e",(function(){return s})),n.d(e,"k",(function(){return l})),n.d(e,"i",(function(){return d})),n.d(e,"j",(function(){return u})),n.d(e,"f",(function(){return b})),n.d(e,"o",(function(){return m})),n.d(e,"p",(function(){return j})),n.d(e,"c",(function(){return f})),n.d(e,"d",(function(){return _})),n.d(e,"b",(function(){return h})),n.d(e,"a",(function(){return O})),n.d(e,"h",(function(){return x})),n.d(e,"n",(function(){return p})),n.d(e,"m",(function(){return v})),n.d(e,"l",(function(){return k}));var a=n(7),c=n(79),r=n(24),i=void 0,o=function(t,e){var n;return function(){for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];clearTimeout(n),n=setTimeout((function(){t.apply(i,c)}),e)}},s=function(t,e,n){return n<e?t.slice(e).concat(t.slice(0,n+1)):t.slice(e,n+1)},l=function(t){return new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(t)},d=function(t){return new Date(t.getTime()-60*t.getTimezoneOffset()*1e3).toISOString().split("T")[0]},u=function(t,e){return new Date(t).toLocaleDateString("it-IT",e)},b=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?t.slice().sort((function(t,e){return new Date(t.from)-new Date(e.from)})):t.slice().sort((function(t,e){return new Date(e.from)-new Date(t.from)}))},m=function(t,e){return e?Math.round((new Date(e)-new Date(t))/864e5):0},j=function(t,e,n){return t?t.filter((function(t){return t.from!==e&&t.to!==n})):[]},f=function(t){return t.reduce((function(t,e){return t+e.rating}),0)/t.length},_=function(t,e,n,a,c){return parseFloat(t)*m(n,a)+parseFloat(e)+function(t,e,n){return Math.max(0,m(t,n)-m(t,e))}(n,a,c)*(2*t)},h=function(t,e){return[].concat(Object(c.a)(t),Object(c.a)(e)).reduce((function(e,n,c){return c<t.length?e[n._id]=Object(a.a)(Object(a.a)({},n),{},{isRented:!1}):new Date(n.from)<=new Date&&e[n.boat._id]&&(e[n.boat._id].isRented=!0),e}),{})},O=function(t,e){return[].concat(Object(c.a)(t),Object(c.a)(e)).reduce((function(e,n,c){return c<t.length?e[n._id]=Object(a.a)(Object(a.a)({},n),{},{rentals:[]}):e[n.boat._id]&&e[n.boat._id].rentals.push(n),e}),{})},x=function(t){return Object.values(t[Object.keys(t)])},p=function(t){return t[Object.keys(t)]},v=function(t,e,n,a){return function(c){var r=x(c);return r[0]&&t(e?function(t){return e(t,r[0])}:r[0]),n&&n(a(r[0])),r[1]}},k=function(t){return"".concat(r.j).concat(t.substring(1))}},74:function(t,e,n){"use strict";var a=n(0),c=n.n(a),r=n(76),i=n.n(r),o=n(27),s=n(1),l=function(t){var e=t.type,n=t.className,a=t.onClick,c=t.disabled,r=t.isLoading,l=t.children;return Object(s.jsx)("button",{type:e||"submit",className:n||i.a.Button,onClick:a,disabled:c,children:r?Object(s.jsx)(o.a,{}):l})};e.a=c.a.memo(l)},75:function(t,e,n){"use strict";var a=n(3),c=n(0),r=n(26),i=n.n(r),o=n(78),s=n.n(o),l=n(1),d=function(t){return Object(l.jsx)("div",{className:s.a.backdrop,onClick:t.onCancel})},u=function(t){var e=t.title,n=t.children,a=t.actions,r=t.onCancel,i=t.adapterSize,o=void 0===i?"desktop":i;return Object(c.useEffect)((function(){return document.body.style.overflow="hidden",function(){document.body.style.overflow="unset"}}),[]),"smartphone"===o?Object(l.jsx)("div",{className:s.a["modal-fullscreen"],children:n}):Object(l.jsxs)("div",{className:s.a.modal,children:[Object(l.jsx)("header",{className:s.a["modal-header"],children:Object(l.jsx)("h1",{children:e})}),Object(l.jsx)("section",{className:s.a["modal-content"],children:n}),Object(l.jsxs)("footer",{children:[a,Object(l.jsx)("span",{onClick:r,className:s.a["modal-close"],children:"\xd7"})]})]})};e.a=function(t){var e=Object(c.useState)(!0),n=Object(a.a)(e,2),r=n[0],o=n[1],s=function(){o(!1)};return r?Object(l.jsxs)(l.Fragment,{children:[i.a.createPortal(Object(l.jsx)(d,{onCancel:t.closeModalHandler||s}),document.getElementById("backdrop-root")),i.a.createPortal(Object(l.jsx)(u,{title:t.title,children:t.children,adapterSize:t.adapterSize,onCancel:t.closeModalHandler||s}),document.getElementById("overlay-root"))]}):null}},76:function(t,e,n){t.exports={Button:"Button_Button__3gFiX"}},78:function(t,e,n){t.exports={backdrop:"Modal_backdrop__3iXHD","modal-fullscreen":"Modal_modal-fullscreen__12Zdf",modal:"Modal_modal__30MRu","slide-down":"Modal_slide-down__294fH","modal-header":"Modal_modal-header__22ZUr","modal-content":"Modal_modal-content__1hFZf","modal-close":"Modal_modal-close__2Adva"}},82:function(t,e,n){"use strict";var a=n(0),c=n.n(a),r=n(74),i=n(83),o=n.n(i),s=n(1),l=function(t){var e=t.actionClassName,n=t.firstButtonClassName,a=t.firstButtonClickHandler,c=t.firstButtonText,i=t.firstButtonDisabled,l=t.secondButtonClassName,d=t.secondButtonClickHandler,u=t.secondButtonText,b=t.secondButtonDisabled,m=t.secondButtonType;return Object(s.jsxs)("div",{className:e||o.a.actions,children:[Object(s.jsx)(r.a,{className:n||o.a["btn-first"],onClick:a,disabled:i,type:"button",children:c}),Object(s.jsx)(r.a,{className:"".concat(l," ").concat(o.a["btn-second"]),onClick:d,disabled:b,type:m||"button",children:u})]})};e.a=c.a.memo(l)},83:function(t,e,n){t.exports={actions:"ActionButton_actions__27dZ-","btn-first":"ActionButton_btn-first__v2NlO","btn-second":"ActionButton_btn-second__1MDkF"}},84:function(t,e,n){"use strict";var a=n(0),c=n.n(a),r=n(1),i=function(){return Object(r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"2 0 20 20",stroke:"currentColor",width:"24px",children:Object(r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15 19l-7-7 7-7"})})};e.a=c.a.memo(i)},88:function(t,e,n){"use strict";var a=n(0),c=n.n(a),r=n(90),i=n.n(r),o=n(2),s=n(1),l=function(t){var e=t.classNameHeader,n=t.classNameTitle,c=t.navigatePath,r=t.backElement,l=t.textTitle,d=t.optionsElement,u=t.handleOptionsElement,b=t.children,m=Object(o.h)(),j=Object(a.useCallback)((function(){m(c||-1)}),[m,c]);return Object(s.jsx)("div",{className:"".concat(i.a.wrapper," ").concat(e),children:Object(s.jsxs)("div",{className:i.a.container,children:[Object(s.jsxs)("div",{className:i.a["header-container"],children:[Object(s.jsx)("div",{className:i.a["first-element"],onClick:j,children:r}),Object(s.jsx)("h1",{className:"".concat(i.a["second-element"]," ").concat(n," title"),children:l}),Object(s.jsx)("div",{className:i.a["third-element"],onClick:u,children:d})]}),b]})})};e.a=c.a.memo(l)},89:function(t,e,n){"use strict";var a=n(0),c=n.n(a),r=n(117),i=n.n(r),o=n(8),s=n(1),l=function(t){var e=t.warningText,n=t.warningTextButton,a=t.path,c=t.hasBackdrop,r=void 0===c||c;return Object(s.jsx)("div",{className:"".concat(i.a["not-found-container"]," ").concat(r?i.a["box-shadow"]:""),children:Object(s.jsxs)("div",{className:i.a.container,children:[Object(s.jsx)("div",{className:i.a["not-found-text"],children:e}),a&&Object(s.jsx)(o.b,{className:"btn btn-primary",to:a,state:{isOpenModal:!0},children:n})]})})};e.a=c.a.memo(l)},90:function(t,e,n){t.exports={wrapper:"Header_wrapper__3B1Tp",container:"Header_container__3Vnol","header-container":"Header_header-container__3X5NG","first-element":"Header_first-element__1Vci_","second-element":"Header_second-element__2geBZ","third-element":"Header_third-element__204mo"}}}]);
//# sourceMappingURL=11.bb9baaf6.chunk.js.map