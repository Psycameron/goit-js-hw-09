const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.body};t.startBtn.addEventListener("click",(function(){t.startBtn.disabled||(t.startBtn.disabled=!0,timerId=setInterval((()=>{t.body.style.backgroundColor=""+(console.log(`#${Math.floor(16777215*Math.random()).toString(16)}`),`#${Math.floor(16777215*Math.random()).toString(16)}`)}),1e3))})),t.stopBtn.addEventListener("click",(function(){t.startBtn.disabled=!1,clearInterval(timerId),console.log(`Interval with id ${timerId} has stopped!`)}));
//# sourceMappingURL=01-color-switcher.9bd93fcb.js.map
