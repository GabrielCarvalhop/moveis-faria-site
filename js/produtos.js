/* ==========================================================================
   CATÁLOGO — LISTA DE PRODUTOS
   --------------------------------------------------------------------------
   Este é o único arquivo que precisa ser editado para atualizar o catálogo.
   Para adicionar uma peça nova, copie um bloco { ... } inteiro e altere.

   Campos:
     nome       texto  — nome da peça, aparece em destaque
     categoria  texto  — precisa ser IGUAL a uma das CATEGORIAS lá embaixo
     material   texto  — ex.: 'Madeira de demolição'
     medidas    texto  — ex.: '2,20 × 1,00 m'   (deixe '' se não quiser mostrar)
     preco      número — em reais, SEM pontos. Ex.: 4800  → vira "R$ 4.800"
                         Use null para a peça aparecer como "Sob consulta".
     destaque   true/false — peças em destaque aparecem primeiro
     foto       caminho da imagem dentro de assets/img/fotos/
     descricao  texto curto (1 linha) — opcional, deixe '' se não quiser
   ========================================================================== */

window.CATEGORIAS = [
  'Mesas',
  'Cadeiras e Bancos',
  'Aparadores e Buffets',
  'Estantes e Cristaleiras',
  'Poltronas e Móveis para Sala',
  'Sob Medida',
];

window.PRODUTOS = [
  {
    nome: 'Mesa de Jantar em Madeira de Demolição',
    categoria: 'Mesas',
    material: 'Madeira de demolição',
    medidas: '2,20 × 1,00 m',
    preco: 4800,
    destaque: true,
    foto: 'assets/img/fotos/mesa-demolicao-detalhe.jpg',
    descricao: 'Peça robusta com veios marcados, ideal para reunir a família à mesa.',
  },
  {
    nome: 'Mesa de Jantar Rústica 8 Lugares',
    categoria: 'Mesas',
    material: 'Madeira maciça',
    medidas: '2,40 × 1,00 m',
    preco: 5200,
    destaque: true,
    foto: 'assets/img/fotos/mesa-jantar-ambiente.jpg',
    descricao: 'Tampo largo e pés torneados, para salas de jantar amplas.',
  },
  {
    nome: 'Mesa de Jantar Contemporânea',
    categoria: 'Mesas',
    material: 'Madeira maciça',
    medidas: '1,80 × 0,90 m',
    preco: 4400,
    destaque: false,
    foto: 'assets/img/fotos/mesa-jantar-moderna.jpg',
    descricao: 'Linhas retas e acabamento natural, combina com ambientes modernos.',
  },
  {
    nome: 'Mesa de Centro Ripada',
    categoria: 'Mesas',
    material: 'Madeira maciça',
    medidas: '1,20 × 0,70 m',
    preco: 1900,
    destaque: false,
    foto: 'assets/img/fotos/mesa-centro-dia.jpg',
    descricao: 'Desenho ripado leve, perfeita para varandas e áreas gourmet.',
  },
  {
    nome: 'Conjunto Mesa e Cadeiras',
    categoria: 'Mesas',
    material: 'Madeira e palhinha',
    medidas: 'Mesa 2,00 m + 6 cadeiras',
    preco: 7500,
    destaque: true,
    foto: 'assets/img/fotos/jantar-elegante-1.jpg',
    descricao: 'Conjunto completo com cadeiras estofadas e encosto em palhinha.',
  },
  {
    nome: 'Banco Trançado em Madeira Maciça',
    categoria: 'Cadeiras e Bancos',
    material: 'Madeira maciça',
    medidas: '1,60 × 0,40 m',
    preco: 1450,
    destaque: true,
    foto: 'assets/img/fotos/banco-trancado-1.jpg',
    descricao: 'Assento em trama de madeira, com acabamento artesanal.',
  },
  {
    nome: 'Banco Rústico Longo',
    categoria: 'Cadeiras e Bancos',
    material: 'Madeira maciça',
    medidas: '1,80 × 0,40 m',
    preco: 1280,
    destaque: false,
    foto: 'assets/img/fotos/banco-trancado-2.jpg',
    descricao: 'Versátil para varandas, áreas gourmet e ambientes externos cobertos.',
  },
  {
    nome: 'Banco Trançado Compacto',
    categoria: 'Cadeiras e Bancos',
    material: 'Madeira maciça',
    medidas: '1,20 × 0,40 m',
    preco: 980,
    destaque: false,
    foto: 'assets/img/fotos/banco-trancado-3.jpg',
    descricao: 'Tamanho reduzido, ideal para hall de entrada e cantos da casa.',
  },
  {
    nome: 'Cadeira com Encosto em Palhinha',
    categoria: 'Cadeiras e Bancos',
    material: 'Madeira e palhinha',
    medidas: 'Altura 0,90 m',
    preco: 890,
    destaque: false,
    foto: 'assets/img/fotos/cadeiras-par.jpg',
    descricao: 'Encosto em palhinha natural e assento em couro.',
  },
  {
    nome: 'Banqueta Alta com Palhinha',
    categoria: 'Cadeiras e Bancos',
    material: 'Madeira e couro',
    medidas: 'Altura 1,05 m',
    preco: 960,
    destaque: false,
    foto: 'assets/img/fotos/cadeira-canela-detalhe.jpg',
    descricao: 'Feita para bancadas e ilhas de cozinha.',
  },
  {
    nome: 'Aparador Buffet 4 Portas',
    categoria: 'Aparadores e Buffets',
    material: 'Madeira maciça',
    medidas: '2,00 × 0,50 m',
    preco: 3900,
    destaque: true,
    foto: 'assets/img/fotos/aparador-buffet-grande.jpg',
    descricao: 'Amplo espaço interno, com gavetas e portas almofadadas.',
  },
  {
    nome: 'Console Aparador com Gavetas',
    categoria: 'Aparadores e Buffets',
    material: 'Madeira maciça',
    medidas: '1,60 × 0,45 m',
    preco: 2600,
    destaque: false,
    foto: 'assets/img/fotos/console-aparador.jpg',
    descricao: 'Estrutura sólida com prateleira inferior, para sala ou hall.',
  },
  {
    nome: 'Cristaleira / Adega em Madeira',
    categoria: 'Estantes e Cristaleiras',
    material: 'Madeira e vidro',
    medidas: '0,90 × 1,10 m',
    preco: 3200,
    destaque: false,
    foto: 'assets/img/fotos/adega-cristaleira.jpg',
    descricao: 'Porta de vidro, nicho para garrafas e gaveta inferior.',
  },
  {
    nome: 'Rack / Painel para Sala',
    categoria: 'Poltronas e Móveis para Sala',
    material: 'Madeira maciça',
    medidas: 'Sob medida',
    preco: 3400,
    destaque: false,
    foto: 'assets/img/fotos/sala-tv-jantar.jpg',
    descricao: 'Compõe a sala de estar integrando TV e decoração.',
  },
  {
    nome: 'Projeto Sob Medida',
    categoria: 'Sob Medida',
    material: 'A definir',
    medidas: 'Conforme o ambiente',
    preco: null,
    destaque: false,
    foto: 'assets/img/fotos/showroom-geral.jpg',
    descricao: 'Conte sua ideia, medidas e referências para avaliarmos as possibilidades.',
  },
];
