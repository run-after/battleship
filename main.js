(()=>{"use strict";const l=()=>{const l={1:[null,null,null,null,null,null,null,null,null,null],2:[null,null,null,null,null,null,null,null,null,null],3:[null,null,null,null,null,null,null,null,null,null],4:[null,null,null,null,null,null,null,null,null,null],5:[null,null,null,null,null,null,null,null,null,null],6:[null,null,null,null,null,null,null,null,null,null],7:[null,null,null,null,null,null,null,null,null,null],8:[null,null,null,null,null,null,null,null,null,null],9:[null,null,null,null,null,null,null,null,null,null],10:[null,null,null,null,null,null,null,null,null,null]},e=[];return{board:l,placeShip:(t,n,r)=>{const u=n[0],a=n[1],o=r[0],s=r[1];if(u===o){let n=0;for(let e=a;e<=s;e++)l[e][u]=[t,n],n++;e.push(t)}else{let n=0;for(let e=u;e<=o;e++)l[a][e]=[t,n],n++;e.push(t)}return l},receiveAttack:(e,t)=>{if(l[t][e]){let n=l[t][e][0],r=l[t][e][1];return"miss"===l[t][e]||!0===n.hitStatus[r]?"already guessed":(n.hit(r),"hit")}return l[t][e]="miss","miss"},allShipsSunk:()=>e.map((l=>l.isSunk())).every((l=>!0===l)),randomlyPlaceShips:(l,e)=>{l.forEach((l=>{const t=Math.floor(2*Math.random());let n,r;const u=()=>{if(0===t){n=Math.floor(6*Math.random()),r=Math.floor(10*Math.random())+1;for(let t=0;t<l.length;t++)e.board[r][n+t]&&u()}else{n=Math.floor(9*Math.random()),r=Math.floor(6*Math.random())+1;for(let t=0;t<l.length;t++)e.board[r+t][n]&&u()}return[n,r]},a=u();0===t?e.placeShip(l,a,[a[0]+l.length-1,a[1]]):e.placeShip(l,a,[a[0],a[1]+l.length-1])}))}}},e=(l,e,t,n,r,u)=>{const a=(l,e)=>{const t=document.createElement("p");t.textContent="Place your ships",s.appendChild(t);const n=document.createElement("button");n.classList.add("orientation-btn"),n.textContent="orientation",s.appendChild(n),n.addEventListener("click",(()=>{m="x"===m?"y":"x"})),o.map((t=>{let n=document.createElement("div");n.classList.add("row"),e.appendChild(n),l[t].map(((l,r)=>{let u=document.createElement("div");u.classList.add("space"),u.setAttribute("data-coord",`${r},${t}`),e===s&&l&&(u.style.background="grey"),n.appendChild(u)}))}))},o=Object.keys(e.board),s=document.querySelector(".player-board");a(e.board,s);const c=(l,t,n)=>{const r=l[0],u=l[1];if(t[0],t[1],"x"===m){for(let l=0;l<n;l++)if(e.board[u][Number(r)+l])return!1;return!0}for(let l=0;l<n;l++)if(e.board[Number(u)+l][r])return!1;return!0};let d=n.shift(),i=d.length,m="x";s.addEventListener("click",(o=>{if("space"!==o.target.classList[0])return;const b=o.target.dataset.coord.split(",");if("x"===m){if(!document.querySelector(`[data-coord="${Number(b[0])+i-1},${b[1]}"]`)||!c(b,[Number(b[0])+i-1,b[1]],i))return;e.placeShip(d,b,[Number(b[0])+i-1,b[1]]),s.innerHTML="",a(e.board,s),document.querySelectorAll(".space").forEach((l=>{l.addEventListener("mouseenter",p),l.addEventListener("mouseleave",h)}))}else{if(!document.querySelector(`[data-coord="${b[0]},${Number(b[1])+i-1}"]`)||!c(b,[b[0],Number(b[1])+i-1],i))return;e.placeShip(d,b,[b[0],Number(b[1])+i-1]),s.innerHTML="",a(e.board,s),document.querySelectorAll(".space").forEach((l=>{l.addEventListener("mouseenter",p),l.addEventListener("mouseleave",h)}))}d=n.shift(),d?i=d.length:(i=0,s.replaceWith(s.cloneNode(!0)),((l,e,t,n,r)=>{const u=(l,e)=>{a.map((t=>{let n=document.createElement("div");n.classList.add("row"),e.appendChild(n),l[t].map(((l,r)=>{let u=document.createElement("div");u.classList.add("space"),u.setAttribute("data-coord",`${r},${t}`),e===o&&l&&(u.style.background="grey"),n.appendChild(u)}))}))},a=Object.keys(e.board),o=document.querySelector(".player-board");o.textContent=`${t.name}'s Board`,u(e.board,o),o.classList.add("disable-clicks");const s=document.querySelector(".arena"),c=document.createElement("div");c.classList.add("computer-board"),s.appendChild(c),c.textContent="Computers Board",u(l.board,c);const d=(l,e)=>{if("space"===e.target.classList[0]){const t=e.target.dataset.coord.split(",");let n=Number(t[0]),r=Number(t[1]);const u=l.receiveAttack(n,r);if(e.target.classList.add("disable-clicks"),"hit"===u){const l=document.createElement("div");l.classList.add("hit"),e.target.appendChild(l)}else"miss"===u&&(e.target.style="background: blue");return u}};c.addEventListener("click",(e=>{const t=d(l,e),u=n().split(",");let a=o.querySelector(`[data-coord='${u[0]},${u[1]}']`);t&&!r()&&setTimeout((()=>a.click()),500)})),o.addEventListener("click",(l=>{d(e,l)}))})(l,e,t,r,u))}));const p=l=>{const e=l.target.dataset.coord.split(",");let t=[];if("y"===m)for(let l=0;l<i;l++){const n=document.querySelector(`[data-coord="${e[0]},${Number(e[1])+l}"]`);n&&t.push(n)}else for(let l=0;l<i;l++){const n=document.querySelector(`[data-coord="${Number(e[0])+l},${e[1]}"]`);n&&t.push(n)}t.forEach((l=>{l.style.border="1px solid red"}))},h=l=>{const e=l.target.dataset.coord.split(",");let t=[];if("y"===m)for(let l=0;l<i;l++){const n=document.querySelector(`[data-coord="${e[0]},${Number(e[1])+l}"]`);n&&t.push(n)}else for(let l=0;l<i;l++){const n=document.querySelector(`[data-coord="${Number(e[0])+l},${e[1]}"]`);n&&t.push(n)}t.forEach((l=>{l.style.border="1px solid white"}))};document.querySelectorAll(".space").forEach((l=>{l.addEventListener("mouseenter",p),l.addEventListener("mouseleave",h)}))},t=l=>{const e=Array(l).fill(!1);return{length:l,hitStatus:e,isSunk:()=>e.every((l=>!0===l)),hit:l=>{e[l]=!0}}},n=l=>{const e=[],t=()=>{const l=Math.floor(9*Math.random()),n=Math.floor(10*Math.random())+1;let r=[l,n];return e.includes(`${l},${n}`)&&(r=t()),e.push(`${r[0]},${r[1]}`),r};return{name:l,playedMoves:e,computerPlay:t}};(()=>{const r=prompt("What's your name?")||"Player",u=n(r),a=l(),o=[t(5),t(4),t(3),t(3),t(2)],s=n("Computer"),c=l(),d=[t(5),t(4),t(3),t(3),t(2)];c.randomlyPlaceShips(d,c),e(c,a,u,o,(()=>{c.allShipsSunk()?(alert("Player wins"),document.querySelector(".computer-board").classList.add("disable-clicks")):a.allShipsSunk()&&(alert("Computer wins"),document.querySelector(".computer-board").classList.add("disable-clicks"));const l=s.computerPlay();return`${l[0]},${l[1]}`}),(()=>c.allShipsSunk()||a.allShipsSunk()))})()})();