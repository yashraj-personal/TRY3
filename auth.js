const Auth = (() => {
  const isAdmin = () => sessionStorage.getItem('lectureHubAdmin') === 'true';
  const gate = async (admin = false) => {
    if ((!admin && sessionStorage.getItem('lectureHubAccess') === 'true') || (admin && isAdmin())) return true;
    return new Promise(resolve => {
      const gate = document.createElement('section'); gate.className = 'access-gate';
      gate.innerHTML = `<div class="gate-orb orb-a"></div><div class="gate-orb orb-b"></div><form class="gate-card"><span class="eyebrow">${admin ? 'ADMINISTRATOR CONSOLE' : 'PRIVATE LECTURE PORTAL'}</span><h1>${admin ? 'Control the archive.' : 'Authorized access only.'}</h1><p>${admin ? 'Sign in using the administrator credentials provided by the portal.' : 'Everything you need to learn, beautifully organized.'}</p><label>Password <span><input autocomplete="current-password" type="password" required placeholder="Enter your password"><button type="button" class="show-password" aria-label="Show password">◉</button></span></label><button class="button primary" type="submit">ENTER ${admin ? 'ADMIN' : 'PORTAL'} <b>↗</b></button><small class="gate-status">Secure connection required</small></form>`;
      document.body.prepend(gate);
      const input = gate.querySelector('input'), status = gate.querySelector('.gate-status');
      gate.querySelector('.show-password').onclick = () => input.type = input.type === 'password' ? 'text' : 'password';
      gate.querySelector('form').onsubmit = async e => { e.preventDefault(); status.textContent = 'VERIFYING ACCESS…'; try { const r = await API.login(input.value, admin); const ok = r?.success === true || r?.authenticated === true || r?.status === 'success' || r?.valid === true; if (!ok) throw Error(); sessionStorage.setItem(admin ? 'lectureHubAdmin' : 'lectureHubAccess', 'true'); status.textContent = '✓ ACCESS GRANTED'; API.log(admin ? 'ADMIN_LOGIN_SUCCESS' : 'LOGIN_SUCCESS'); gate.classList.add('leaving'); setTimeout(() => { gate.remove(); resolve(true); }, 620); } catch { status.textContent = 'ACCESS DENIED'; input.value = ''; API.log(admin ? 'ADMIN_LOGIN_FAILED' : 'LOGIN_FAILED'); } };
    });
  };
  return { gate, isAdmin };
})();
