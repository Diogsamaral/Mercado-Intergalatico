import React, { useState, useEffect, useMemo } from 'react';
import { 
  Star, 
  Zap, 
  ShoppingCart, 
  Eye, 
  Search, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  Sparkles, 
  Orbit, 
  ShieldAlert 
} from 'lucide-react';

// --- Types & Interfaces ---
export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  tag?: string;
  category: string;
  description: string;
  origin: string;
  specs: { label: string; value: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// --- Mock Data ---
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Núcleo de Dobra Xylos',
    price: 12500.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=600',
    tag: 'Lendário',
    category: 'Energia',
    description: 'Gerador de curvatura de espaço-tempo capaz de impulsionar naves da classe Fragata até a velocidade Warp 9.2 sem superaquecimento.',
    origin: 'Setor Alfa - Anéis de Xylos',
    specs: [
      { label: 'Rendimento', value: '99.8% Quântico' },
      { label: 'Combustível', value: 'Cristais de Dilítio' },
      { label: 'Massa', value: '420 kg' }
    ]
  },
  {
    id: '2',
    name: 'Scanner de Nebulosa',
    price: 3200.50,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600',
    tag: 'Novo',
    category: 'Sensores',
    description: 'Mapeador espectral de longo alcance que penetra poeira cósmica espessa e detecta assinaturas térmicas a até 5 anos-luz.',
    origin: 'Estação Científica Kepler-186f',
    specs: [
      { label: 'Alcance', value: '5 Anos-Luz' },
      { label: 'Frequência', value: 'Sub-espacial' },
      { label: 'Precisão', value: '99.99%' }
    ]
  },
  {
    id: '3',
    name: 'Luvas de Plasma Reativo',
    price: 890.00,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600',
    category: 'Equipamentos',
    description: 'Vestuário tático reforçado com revestimento de plasma cinético que absorve impactos e fornece força empunhada aumentada em 300%.',
    origin: 'Fundição de Vulcano',
    specs: [
      { label: 'Proteção', value: 'Classe IV Térmica' },
      { label: 'Bateria', value: '48h uso contínuo' },
      { label: 'Peso', value: '1.2 kg' }
    ]
  },
  {
    id: '4',
    name: 'Propulsor Quântico Tachyon',
    price: 45000.00,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=600',
    tag: 'Experimental',
    category: 'Motores',
    description: 'Unidade de propulsão fotônica de última geração desenvolvida para explorar sistemas solares distantes com consumo mínimo de recursos.',
    origin: 'Laboratório Obscuro de Andromeda',
    specs: [
      { label: 'Empuxo', value: '12.5 Petanewtons' },
      { label: 'Modo', value: 'Tachyon Contínuo' },
      { label: 'Estabilidade', value: '98.5%' }
    ]
  },
  {
    id: '5',
    name: 'Escudo Defletor de Íons',
    price: 8750.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=600',
    tag: 'Raro',
    category: 'Defesa',
    description: 'Matriz de defesa polarizada que repele detritos cósmicos, disparos de plasma e radiação de supernovas.',
    origin: 'Cinturão de Orion',
    specs: [
      { label: 'Capacidade', value: '500 Gigajoules' },
      { label: 'Recarga', value: '3.2 segundos' },
      { label: 'Resistência', value: 'Gama & Plasma' }
    ]
  },
  {
    id: '6',
    name: 'Bússola Gravitacional Chronos',
    price: 2100.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    category: 'Relíquias',
    description: 'Artefato antigo recuperado de uma nave colônia extinta, capaz de orientar pilotos através de fendas temporais e buracos de minhoca.',
    origin: 'Ruínas Antigas de Titan',
    specs: [
      { label: 'Calibração', value: 'Auto-sincronizada' },
      { label: 'Material', value: 'Liga Néon-Titânio' },
      { label: 'Precisão', value: 'Absoluta' }
    ]
  }
];

const CATEGORIES = ['Todos', 'Energia', 'Sensores', 'Motores', 'Defesa', 'Equipamentos', 'Relíquias'];

// --- Helper Formatting ---
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(val);
};

// --- Skeleton Card Component ---
const SkeletonCard: React.FC = () => (
  <div className="w-full bg-gray-900/80 border border-purple-900/30 rounded-2xl p-4 space-y-4 animate-pulse">
    <div className="w-full h-52 bg-gray-800 rounded-xl" />
    <div className="h-4 bg-gray-800 rounded w-1/3" />
    <div className="h-6 bg-gray-800 rounded w-3/4" />
    <div className="flex justify-between items-center pt-4 border-t border-purple-900/20">
      <div className="h-8 bg-gray-800 rounded w-1/2" />
      <div className="h-10 w-10 bg-gray-800 rounded-xl" />
    </div>
  </div>
);

// --- Product Card Component ---
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="group relative w-full bg-gray-900/90 border border-purple-900/40 rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyan-500/60 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] flex flex-col justify-between">
      
      {/* Badge de Tag */}
      {product.tag && (
        <div className="absolute top-3 left-3 z-10 bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center border border-purple-400/40 shadow-lg">
          <Zap className="w-3 h-3 mr-1 fill-white" />
          {product.tag.toUpperCase()}
        </div>
      )}

      {/* Imagem e Overlays */}
      <div>
        <div className="relative h-56 overflow-hidden bg-gray-950">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
          />
          
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
            <button 
              onClick={() => onViewDetails(product)}
              className="p-3 bg-cyan-950/80 hover:bg-cyan-500 text-cyan-300 hover:text-gray-950 rounded-full border border-cyan-500/40 transition-all transform hover:scale-110 shadow-lg"
              title="Análise Profunda"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onAddToCart(product)}
              className="p-3 bg-purple-950/80 hover:bg-purple-600 text-purple-300 hover:text-white rounded-full border border-purple-500/40 transition-all transform hover:scale-110 shadow-lg"
              title="Designar ao Hangar"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase block mb-1">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center bg-gray-800/80 px-2 py-1 rounded-lg border border-gray-700/60 shrink-0">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-xs font-bold text-yellow-200">{product.rating}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 line-clamp-2 font-light">
            {product.description}
          </p>
        </div>
      </div>

      {/* Rodapé do Card */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-purple-900/30">
          <div>
            <span className="block text-gray-500 text-[10px] uppercase font-mono tracking-wider">Créditos</span>
            <span className="text-xl font-black text-purple-400 tracking-tight">
              {formatCurrency(product.price)}
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-gray-950 font-bold p-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-1 text-xs"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Adicionar</span>
          </button>
        </div>

        {/* Linha Neon Inferior */}
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500 group-hover:w-full rounded-full" />
      </div>
    </div>
  );
};

// --- Product Modal Component ---
interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-gray-900 border border-purple-500/50 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/40 text-white">
        
        {/* Fechar Modal */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-800/80 hover:bg-purple-600 rounded-full text-gray-300 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Imagem do Artefato */}
          <div className="relative h-64 md:h-full bg-gray-950">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r" />
          </div>

          {/* Informações detalhadas */}
          <div className="p-6 md:p-8 space-y-5">
            <div>
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">{product.category} • {product.origin}</span>
              <h2 className="text-2xl font-black text-white mt-1">{product.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                  <span className="font-bold text-sm">{product.rating}</span>
                </div>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-purple-300 font-mono">ID: {product.id}</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed font-light">
              {product.description}
            </p>

            {/* ESPECIFICAÇÕES */}
            <div className="space-y-2 bg-gray-950/60 p-4 rounded-xl border border-purple-900/30">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Especificações de Escaneamento
              </span>
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between text-xs border-b border-gray-800 pb-1 last:border-none">
                  <span className="text-gray-400">{spec.label}</span>
                  <span className="text-gray-200 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs text-gray-500 uppercase font-mono block">Preço de Aquisição</span>
                <span className="text-2xl font-black text-purple-400">{formatCurrency(product.price)}</span>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-gray-950 font-black rounded-xl shadow-lg shadow-cyan-500/25 transition active:scale-95 flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Adicionar ao Hangar</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Hangar / Cart Drawer Component ---
interface HangarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const HangarDrawer: React.FC<HangarDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) => {
  if (!isOpen) return null;

  const totalCredits = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-gray-900 border-l border-purple-800/50 text-white shadow-2xl p-6 flex flex-col justify-between">
          
          {/* Header do Hangar */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
              <div className="flex items-center gap-2">
                <Orbit className="w-6 h-6 text-cyan-400 animate-spin-slow" />
                <h2 className="text-xl font-black tracking-wider uppercase text-cyan-400">Seu Hangar Estelar</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de Itens */}
            <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500 space-y-3">
                  <ShieldAlert className="w-12 h-12 mx-auto text-purple-900/80" />
                  <p className="font-mono text-sm uppercase">Seu hangar está vazio.</p>
                  <p className="text-xs text-gray-600">Explore o catálogo e adicione novos artefatos.</p>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div 
                    key={product.id}
                    className="flex gap-3 bg-gray-950/70 p-3 rounded-xl border border-purple-900/30 items-center justify-between"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded-lg border border-purple-900/40" 
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{product.name}</h4>
                      <span className="text-xs text-purple-400 font-mono">{formatCurrency(product.price)}</span>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 bg-gray-800 hover:bg-purple-700 rounded text-gray-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono px-2 font-bold">{quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 bg-gray-800 hover:bg-purple-700 rounded text-gray-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(product.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition"
                      title="Remover Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Rodapé / Total */}
          {cart.length > 0 && (
            <div className="pt-6 border-t border-purple-900/40 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 uppercase font-mono">Total em Créditos</span>
                <span className="text-2xl font-black text-cyan-400">{formatCurrency(totalCredits)}</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-gray-950 font-black rounded-xl uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Ativar Dobra e Finalizar</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHangarOpen, setIsHangarOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Simular carregamento inicial dos produtos
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Notificação Temporária
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Gerenciamento do Carrinho
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    showNotification(`"${product.name}" adicionado ao seu Hangar!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.product.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== id));
  };

  const handleCheckout = () => {
    setCart([]);
    setIsHangarOpen(false);
    showNotification('🛰️ Ordem enviada! Os artefatos foram teleportados.');
  };

  // Filtragem de Produtos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans p-4 sm:p-8 relative overflow-x-hidden">
      
      {/* Luzes de Fundo Cenas Cósmicas */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Notificação Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-900 to-gray-900 border border-cyan-500/50 text-cyan-200 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-mono font-bold tracking-wide">{notification}</span>
        </div>
      )}

      {/* Header do Sistema */}
      <header className="relative z-10 max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-purple-900/30">
          
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] text-cyan-400 font-mono tracking-[0.2em] uppercase">Setor 7-G Ativo</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-purple-400">
              MERCADO <span className="text-cyan-400">INTERGALÁCTICO</span>
            </h1>
          </div>

          {/* Botão do Hangar / Carrinho */}
          <button
            onClick={() => setIsHangarOpen(true)}
            className="relative px-6 py-3 bg-gray-900 hover:bg-purple-950/60 border border-purple-600/50 rounded-2xl shadow-lg transition-all flex items-center gap-3 group"
          >
            <ShoppingCart className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-wider text-gray-200">Hangar Estelar</span>
            {totalCartCount > 0 && (
              <span className="bg-cyan-400 text-gray-950 text-xs font-black px-2 py-0.5 rounded-full font-mono">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

        {/* Filtros e Busca */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categorias */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-gray-950 font-black shadow-lg shadow-cyan-500/20'
                    : 'bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 border border-purple-900/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar artefatos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/90 border border-purple-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60 transition"
            />
          </div>
        </div>
      </header>

      {/* Conteúdo Principal / Grid de Produtos */}
      <main className="relative z-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array(4).fill(0).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 space-y-4 bg-gray-900/40 rounded-3xl border border-purple-900/20">
            <Orbit className="w-12 h-12 mx-auto text-purple-700 animate-spin-slow" />
            <h3 className="text-xl font-bold text-gray-300">Sinal não detectado</h3>
            <p className="text-xs text-gray-500 font-mono">Nenhum artefato atende aos parâmetros da busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modais */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <HangarDrawer
        isOpen={isHangarOpen}
        onClose={() => setIsHangarOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Rodapé */}
      <footer className="mt-20 pt-8 border-t border-purple-900/30 text-center text-gray-600 text-xs font-mono uppercase tracking-widest">
        &copy; 2142 Estaleiros de Orion • Todos os direitos reservados no Setor 7-G.
      </footer>
    </div>
  );
}