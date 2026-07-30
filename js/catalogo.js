(function () {
  var WA = '5532998381286';
  var produtos = window.PRODUTOS || [];
  var categorias = window.CATEGORIAS || [];

  var elGrid = document.getElementById('cat-grid');
  var elChips = document.getElementById('cat-chips');
  var elBusca = document.getElementById('cat-busca');
  var elFaixa = document.getElementById('cat-faixa');
  var elOrdem = document.getElementById('cat-ordem');
  var elContador = document.getElementById('cat-contador');
  var elVazio = document.getElementById('cat-vazio');
  var elLimpar = document.getElementById('cat-limpar');

  if (!elGrid) return;

  var estado = { categoria: '', busca: '', faixa: '', ordem: 'destaque' };

  // ---- helpers -----------------------------------------------------------

  function formatarPreco(v) {
    if (v === null || v === undefined || v === '') return 'Sob consulta';
    return 'R$ ' + Number(v).toLocaleString('pt-BR');
  }

  function slug(txt) {
    return txt
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function semAcento(txt) {
    return (txt || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function waLink(nome) {
    var msg =
      'Olá! Vi o catálogo no site e me interessei pela peça: ' + nome + '. Pode me passar mais informações?';
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }

  function escapar(txt) {
    var d = document.createElement('div');
    d.textContent = txt == null ? '' : String(txt);
    return d.innerHTML;
  }

  // ---- filtros -----------------------------------------------------------

  function dentroDaFaixa(preco, faixa) {
    if (!faixa) return true;
    if (preco === null || preco === undefined) return false; // "sob consulta" fica fora das faixas
    var partes = faixa.split('-');
    var min = partes[0] === '' ? -Infinity : Number(partes[0]);
    var max = partes[1] === '' || partes[1] === undefined ? Infinity : Number(partes[1]);
    return preco >= min && preco <= max;
  }

  function aplicarFiltros() {
    var termo = semAcento(estado.busca).trim();

    var lista = produtos.filter(function (p) {
      if (estado.categoria && p.categoria !== estado.categoria) return false;
      if (!dentroDaFaixa(p.preco, estado.faixa)) return false;
      if (termo) {
        var alvo = semAcento([p.nome, p.categoria, p.material, p.descricao].join(' '));
        if (alvo.indexOf(termo) === -1) return false;
      }
      return true;
    });

    var semPreco = function (p) {
      return p.preco === null || p.preco === undefined;
    };

    lista.sort(function (a, b) {
      if (estado.ordem === 'az') return a.nome.localeCompare(b.nome, 'pt-BR');
      // peças "sob consulta" vão sempre para o fim nas ordenações por preço
      if (estado.ordem === 'menor' || estado.ordem === 'maior') {
        if (semPreco(a) && semPreco(b)) return 0;
        if (semPreco(a)) return 1;
        if (semPreco(b)) return -1;
        return estado.ordem === 'menor' ? a.preco - b.preco : b.preco - a.preco;
      }
      // destaque
      if (!!b.destaque !== !!a.destaque) return b.destaque - a.destaque;
      return a.nome.localeCompare(b.nome, 'pt-BR');
    });

    return lista;
  }

  // ---- render ------------------------------------------------------------

  function cardHTML(p) {
    var temMedidas = p.medidas && String(p.medidas).trim() !== '';
    var temDescricao = p.descricao && String(p.descricao).trim() !== '';

    return (
      '<article class="cat-card">' +
      '<div class="cat-card-foto ph ph-light">' +
      '<img src="' + escapar(p.foto) + '" alt="' + escapar(p.nome) + '" loading="lazy">' +
      (p.destaque ? '<span class="cat-tag">Destaque</span>' : '') +
      '</div>' +
      '<div class="cat-card-corpo">' +
      '<span class="cat-card-material">' + escapar(p.material) + '</span>' +
      '<h3 class="cat-card-nome">' + escapar(p.nome) + '</h3>' +
      (temDescricao ? '<p class="cat-card-desc">' + escapar(p.descricao) + '</p>' : '') +
      '<div class="cat-card-rodape">' +
      '<div class="cat-card-preco">' +
      '<span class="valor">' + escapar(formatarPreco(p.preco)) + '</span>' +
      (temMedidas ? '<span class="medidas">' + escapar(p.medidas) + '</span>' : '') +
      '</div>' +
      '<a class="cat-card-cta link-arrow" href="' + waLink(p.nome) + '" target="_blank" rel="noopener">' +
      'Consultar <span class="arrow">&rarr;</span></a>' +
      '</div>' +
      '</div>' +
      '</article>'
    );
  }

  function render() {
    var lista = aplicarFiltros();

    elGrid.innerHTML = lista.map(cardHTML).join('');

    var n = lista.length;
    elContador.textContent =
      n === 0 ? '' : n === 1 ? '1 peça encontrada' : n + ' peças encontradas';

    elVazio.hidden = n !== 0;
    elGrid.hidden = n === 0;

    var filtrando =
      !!estado.categoria || !!estado.busca || !!estado.faixa || estado.ordem !== 'destaque';
    elLimpar.hidden = !filtrando;

    Array.prototype.forEach.call(elChips.children, function (btn) {
      var ativo = btn.dataset.cat === estado.categoria;
      btn.classList.toggle('is-active', ativo);
      btn.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });

    sincronizarURL();
  }

  // ---- URL (permite compartilhar link já filtrado) ------------------------

  function sincronizarURL() {
    var params = new URLSearchParams();
    if (estado.categoria) params.set('cat', slug(estado.categoria));
    if (estado.busca) params.set('q', estado.busca);
    if (estado.faixa) params.set('preco', estado.faixa);
    if (estado.ordem !== 'destaque') params.set('ordem', estado.ordem);
    var qs = params.toString();
    var novaURL = window.location.pathname + (qs ? '?' + qs : '');
    window.history.replaceState(null, '', novaURL);
  }

  function lerURL() {
    var params = new URLSearchParams(window.location.search);
    var cat = params.get('cat');
    if (cat) {
      var achou = categorias.filter(function (c) {
        return slug(c) === cat;
      })[0];
      if (achou) estado.categoria = achou;
    }
    if (params.get('q')) estado.busca = params.get('q');
    if (params.get('preco')) estado.faixa = params.get('preco');
    if (params.get('ordem')) estado.ordem = params.get('ordem');

    elBusca.value = estado.busca;
    elFaixa.value = estado.faixa;
    elOrdem.value = estado.ordem;
  }

  // ---- setup -------------------------------------------------------------

  function montarChips() {
    var todas = [''].concat(categorias);
    elChips.innerHTML = todas
      .map(function (c) {
        var label = c === '' ? 'Todas' : c;
        return (
          '<button type="button" class="cat-chip" data-cat="' +
          escapar(c) +
          '" aria-pressed="false">' +
          escapar(label) +
          '</button>'
        );
      })
      .join('');

    elChips.addEventListener('click', function (e) {
      var btn = e.target.closest('.cat-chip');
      if (!btn) return;
      estado.categoria = btn.dataset.cat;
      render();
    });
  }

  // Debounce simples pra busca não re-renderizar a cada tecla
  var timerBusca;
  elBusca.addEventListener('input', function () {
    clearTimeout(timerBusca);
    timerBusca = setTimeout(function () {
      estado.busca = elBusca.value;
      render();
    }, 180);
  });

  elFaixa.addEventListener('change', function () {
    estado.faixa = elFaixa.value;
    render();
  });

  elOrdem.addEventListener('change', function () {
    estado.ordem = elOrdem.value;
    render();
  });

  elLimpar.addEventListener('click', function () {
    estado = { categoria: '', busca: '', faixa: '', ordem: 'destaque' };
    elBusca.value = '';
    elFaixa.value = '';
    elOrdem.value = 'destaque';
    render();
  });

  // Mede a altura real do header pra barra de filtros grudar logo abaixo dele
  function ajustarOffsetHeader() {
    var header = document.getElementById('topo');
    if (!header) return;
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  }

  montarChips();
  lerURL();
  render();
  ajustarOffsetHeader();
  window.addEventListener('resize', ajustarOffsetHeader);
})();
