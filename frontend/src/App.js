import React, { useState, useEffect } from 'react';
import { 
  Shield, FileText, AlertTriangle, Clock, Upload, Download, 
  Settings, User, LogOut, RefreshCw, CheckCircle, XCircle,
  Calendar, DollarSign, Building, Users, Target, Bell,
  Activity, TrendingUp, BarChart3, FileSpreadsheet, Plus,
  Search, Filter, Edit, Trash2, Eye, Save, X, Mail,
  Calculator, DocumentText, Printer, Package, TrendingDown,
  TrendingUp as TrendingUpIcon, AlertCircle, Award, FileDown,
  PieChart, BarChart, LineChart, ShoppingCart, Pill
} from 'lucide-react';

const API_BASE_URL = 'https://sistema-pmvg-backend.onrender.com/api';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderBottom: '2px solid #2563eb',
    padding: '1rem 0'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  logoIcon: {
    color: '#2563eb',
    width: '32px',
    height: '32px'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    margin: 0
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem 1rem',
    display: 'flex',
    gap: '2rem'
  },
  sidebar: {
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  content: {
    flex: 1
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#374151',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s',
    textAlign: 'left',
    width: '100%'
  },
  navButtonActive: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontWeight: '500'
  },
  badge: {
    backgroundColor: '#2563eb',
    color: 'white',
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    marginLeft: 'auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    marginBottom: '1.5rem'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  statIcon: {
    padding: '0.5rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statIconBlue: {
    backgroundColor: '#dbeafe',
    color: '#2563eb'
  },
  statIconGreen: {
    backgroundColor: '#dcfce7',
    color: '#16a34a'
  },
  statIconRed: {
    backgroundColor: '#fee2e2',
    color: '#dc2626'
  },
  statIconYellow: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  },
  statText: {
    flex: 1
  },
  statTitle: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6b7280',
    margin: 0
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  statSubtitle: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    margin: 0
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  buttonPrimary: {
    backgroundColor: '#2563eb',
    color: 'white'
  },
  buttonSecondary: {
    backgroundColor: '#f3f4f6',
    color: '#374151'
  },
  buttonSuccess: {
    backgroundColor: '#16a34a',
    color: 'white'
  },
  buttonDanger: {
    backgroundColor: '#dc2626',
    color: 'white'
  },
  buttonWarning: {
    backgroundColor: '#d97706',
    color: 'white'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  formGroupRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  formGroupRow3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    minHeight: '100px',
    resize: 'vertical'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: 'white'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  th: {
    backgroundColor: '#f9fafb',
    padding: '0.75rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '1px solid #e5e7eb'
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #e5e7eb',
    color: '#6b7280'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '900px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #e5e7eb'
  },
  tab: {
    padding: '0.75rem 1rem',
    border: 'none',
    borderBottom: '2px solid transparent',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6b7280'
  },
  tabActive: {
    color: '#2563eb',
    borderBottomColor: '#2563eb'
  },
  priceComparison: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    border: '1px solid #e5e7eb'
  },
  priceBox: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '6px',
    border: '1px solid #e5e7eb'
  },
  priceLabel: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '0.5rem'
  },
  priceValue: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  },
  priceChange: {
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem'
  },
  alert: {
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    border: '1px solid'
  },
  alertSuccess: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
    color: '#15803d'
  },
  alertError: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
    color: '#b91c1c'
  },
  alertWarning: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
    color: '#92400e'
  },
  alertInfo: {
    backgroundColor: '#dbeafe',
    borderColor: '#93c5fd',
    color: '#1e40af'
  },
  loginContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  }
};

// Dados mockados para demonstração
const medicamentosMock = [
  {
    id: 1,
    codigo: '90001015',
    nome: 'ACETAMINOFEN 500MG COMPRIMIDO',
    laboratorio: 'EUROFARMA',
    apresentacao: 'CAIXA COM 20 COMPRIMIDOS',
    pmvg: 2.45,
    precoFabrica: 1.85,
    categoria: 'Analgésico'
  },
  {
    id: 2,
    codigo: '90002015',
    nome: 'AMOXICILINA 500MG CÁPSULA',
    laboratorio: 'EUROFARMA',
    apresentacao: 'CAIXA COM 21 CÁPSULAS',
    pmvg: 15.67,
    precoFabrica: 12.30,
    categoria: 'Antibiótico'
  },
  {
    id: 3,
    codigo: '90003015',
    nome: 'DIPIRONA 500MG COMPRIMIDO',
    laboratorio: 'SANOFI',
    apresentacao: 'CAIXA COM 20 COMPRIMIDOS',
    pmvg: 5.23,
    precoFabrica: 3.80,
    categoria: 'Analgésico'
  },
  {
    id: 4,
    codigo: '90004015',
    nome: 'OMEPRAZOL 20MG CÁPSULA',
    laboratorio: 'MEDLEY',
    apresentacao: 'CAIXA COM 28 CÁPSULAS',
    pmvg: 18.90,
    precoFabrica: 14.20,
    categoria: 'Antiácido'
  },
  {
    id: 5,
    codigo: '90005015',
    nome: 'LOSARTANA 50MG COMPRIMIDO',
    laboratorio: 'EMS',
    apresentacao: 'CAIXA COM 30 COMPRIMIDOS',
    pmvg: 12.45,
    precoFabrica: 9.80,
    categoria: 'Anti-hipertensivo'
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState(null);
  const [pmvgStatus, setPmvgStatus] = useState(null);
  const [licitacoes, setLicitacoes] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [medicamentos, setMedicamentos] = useState(medicamentosMock);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedLicitacao, setSelectedLicitacao] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      loadSystemStatus();
      loadData();
    }
  }, []);

  const api = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers
        },
        ...options
      });

      if (response.status === 401) {
        logout();
        return null;
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      setMessage({ type: 'error', text: 'Erro de conexão com o servidor' });
      return null;
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        loadSystemStatus();
        loadData();
        showMessage('success', 'Login realizado com sucesso!');
      } else {
        showMessage('error', data.error || 'Erro no login');
      }
    } catch (error) {
      showMessage('error', 'Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('dashboard');
    showMessage('info', 'Logout realizado com sucesso');
  };

  const loadSystemStatus = async () => {
    try {
      const data = await api('/system/status');
      if (data) setSystemStatus(data);
    } catch (error) {
      console.error('Erro ao carregar status:', error);
    }
  };

  const loadData = async () => {
    try {
      const [licitacoesData, alertasData, pmvgData] = await Promise.all([
        api('/licitacoes'),
        api('/alertas'),
        api('/pmvg/status')
      ]);
      
      if (licitacoesData) setLicitacoes(licitacoesData);
      if (alertasData) setAlertas(alertasData);
      if (pmvgData) setPmvgStatus(pmvgData);

      // Gerar alertas automáticos
      generateAutomaticAlerts();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const generateAutomaticAlerts = () => {
    const alertasAutomaticos = [];

    // Verificar medicamentos com preço acima da PMVG
    medicamentos.forEach(med => {
      if (med.precoFabrica > med.pmvg) {
        alertasAutomaticos.push({
          id: `alert-${med.id}`,
          tipo: 'preco_acima_pmvg',
          titulo: `Preço acima da PMVG: ${med.nome}`,
          descricao: `Preço de fábrica (R$ ${med.precoFabrica.toFixed(2)}) está acima da PMVG (R$ ${med.pmvg.toFixed(2)})`,
          medicamento: med,
          status: 'ativo',
          prioridade: 'alta',
          dataGeracao: new Date().toISOString()
        });
      }
    });

    // Verificar licitações próximas do vencimento
    licitacoes.forEach(lic => {
      const diasRestantes = Math.ceil((new Date(lic.dataVencimento) - new Date()) / (1000 * 60 * 60 * 24));
      if (diasRestantes <= 7 && diasRestantes > 0) {
        alertasAutomaticos.push({
          id: `alert-lic-${lic.id}`,
          tipo: 'licitacao_vencendo',
          titulo: `Licitação próxima do vencimento: ${lic.numero}`,
          descricao: `Restam apenas ${diasRestantes} dias para o vencimento`,
          licitacao: lic,
          status: 'ativo',
          prioridade: diasRestantes <= 3 ? 'alta' : 'media',
          dataGeracao: new Date().toISOString()
        });
      }
    });

    setAlertas(prev => [...prev, ...alertasAutomaticos]);
  };

  const openModal = (type, data = null) => {
    setModalType(type);
    setSelectedLicitacao(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedLicitacao(null);
  };

  const saveLicitacao = (licitacaoData) => {
    if (selectedLicitacao) {
      // Editar licitação existente
      setLicitacoes(prev => prev.map(l => 
        l.id === selectedLicitacao.id ? { ...l, ...licitacaoData } : l
      ));
      showMessage('success', 'Licitação atualizada com sucesso!');
    } else {
      // Nova licitação
      const novaLicitacao = {
        id: Date.now(),
        ...licitacaoData,
        userId: user.id,
        status: 'ativa',
        medicamentos: [],
        createdAt: new Date().toISOString()
      };
      setLicitacoes(prev => [...prev, novaLicitacao]);
      showMessage('success', 'Licitação criada com sucesso!');
    }
    closeModal();
  };

  const exportData = (type, format) => {
    // Simular exportação
    showMessage('success', `Relatório ${type} exportado em ${format.toUpperCase()}!`);
  };

  if (!user) {
    return <LoginScreen onLogin={login} loading={loading} />;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <Shield style={styles.logoIcon} />
            <div>
              <h1 style={styles.title}>Sistema PMVG</h1>
              <p style={styles.subtitle}>Preço Máximo de Venda ao Governo</p>
            </div>
          </div>
          <div style={styles.userInfo}>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>
              <span style={{ fontWeight: '500' }}>{user.name}</span>
              <span style={{ color: '#9ca3af', marginLeft: '0.5rem' }}>({user.role})</span>
            </div>
            <button
              onClick={logout}
              style={{ ...styles.button, ...styles.buttonSecondary }}
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          zIndex: 1000,
          ...styles.alert,
          ...styles[`alert${message.type.charAt(0).toUpperCase() + message.type.slice(1)}`]
        }}>
          {message.text}
        </div>
      )}

      <div style={styles.main}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <NavButton
            icon={BarChart3}
            label="Dashboard"
            active={currentView === 'dashboard'}
            onClick={() => setCurrentView('dashboard')}
          />
          <NavButton
            icon={Shield}
            label="PMVG - ANVISA"
            active={currentView === 'pmvg'}
            onClick={() => setCurrentView('pmvg')}
            badge={pmvgStatus?.totalMedicamentos || 0}
          />
          <NavButton
            icon={FileText}
            label="Licitações"
            active={currentView === 'licitacoes'}
            onClick={() => setCurrentView('licitacoes')}
            badge={licitacoes.length}
          />
          <NavButton
            icon={AlertTriangle}
            label="Alertas"
            active={currentView === 'alertas'}
            onClick={() => setCurrentView('alertas')}
            badge={alertas.filter(a => a.status === 'ativo').length}
          />
          <NavButton
            icon={Calculator}
            label="Comparação Preços"
            active={currentView === 'comparacao'}
            onClick={() => setCurrentView('comparacao')}
          />
          <NavButton
            icon={FileDown}
            label="Relatórios"
            active={currentView === 'relatorios'}
            onClick={() => setCurrentView('relatorios')}
          />
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {currentView === 'dashboard' && (
            <DashboardView 
              systemStatus={systemStatus}
              licitacoes={licitacoes}
              alertas={alertas}
              pmvgStatus={pmvgStatus}
              medicamentos={medicamentos}
            />
          )}
          {currentView === 'pmvg' && (
            <PMVGView
              pmvgStatus={pmvgStatus}
              medicamentos={medicamentos}
              loading={loading}
              isAdmin={user.role === 'admin'}
            />
          )}
          {currentView === 'licitacoes' && (
            <LicitacoesView 
              licitacoes={licitacoes}
              medicamentos={medicamentos}
              onOpenModal={openModal}
              user={user}
            />
          )}
          {currentView === 'alertas' && (
            <AlertasView 
              alertas={alertas}
              pmvgStatus={pmvgStatus}
            />
          )}
          {currentView === 'comparacao' && (
            <ComparacaoView
              medicamentos={medicamentos}
              licitacoes={licitacoes}
            />
          )}
          {currentView === 'relatorios' && (
            <RelatoriosView
              licitacoes={licitacoes}
              medicamentos={medicamentos}
              alertas={alertas}
              onExport={exportData}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal 
          type={modalType} 
          data={selectedLicitacao}
          medicamentos={medicamentos}
          onClose={closeModal}
          onSave={modalType === 'licitacao' ? saveLicitacao : closeModal}
        />
      )}
    </div>
  );
}

// Componente de Login
const LoginScreen = ({ onLogin, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <Shield style={{ ...styles.logoIcon, margin: '0 auto 1rem' }} />
          <h1 style={{ ...styles.title, fontSize: '1.5rem' }}>Sistema PMVG</h1>
          <p style={styles.subtitle}>Preço Máximo de Venda ao Governo</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.buttonPrimary,
              width: '100%',
              justifyContent: 'center',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
          <p style={{ marginBottom: '0.5rem' }}>👤 Usuários de demonstração:</p>
          <p><strong>Admin:</strong> admin@sistema.com / 123456</p>
          <p><strong>Cliente:</strong> usuario@sistema.com / 123456</p>
        </div>
      </div>
    </div>
  );
};

// Componente de Navegação
const NavButton = ({ icon: Icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.navButton,
      ...(active ? styles.navButtonActive : {})
    }}
  >
    <Icon size={20} />
    <span style={{ flex: 1 }}>{label}</span>
    {badge > 0 && (
      <span style={styles.badge}>
        {badge}
      </span>
    )}
  </button>
);

// Dashboard View
const DashboardView = ({ systemStatus, licitacoes, alertas, pmvgStatus, medicamentos }) => {
  const alertasAtivos = alertas.filter(a => a.status === 'ativo');
  const licitacoesAtivas = licitacoes.filter(l => l.status === 'ativa');
  const medicamentosComProblema = medicamentos.filter(m => m.precoFabrica > m.pmvg);

  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Dashboard - Sistema PMVG Avançado</h2>
        
        <div style={styles.statsGrid}>
          <StatCard
            title="Medicamentos PMVG"
            value={medicamentos.length}
            icon={Pill}
            color="blue"
            subtitle="Base completa atualizada"
          />
          <StatCard
            title="Licitações Ativas"
            value={licitacoesAtivas.length}
            icon={FileText}
            color="green"
            subtitle="Em acompanhamento"
          />
          <StatCard
            title="Alertas Críticos"
            value={alertasAtivos.length}
            icon={AlertCircle}
            color="red"
            subtitle="Requerem atenção imediata"
          />
          <StatCard
            title="Não Conformidades"
            value={medicamentosComProblema.length}
            icon={TrendingDown}
            color="yellow"
            subtitle="Preços acima da PMVG"
          />
        </div>
      </div>

      {/* Resumo de Compliance */}
      <div style={styles.card}>
        <h3 style={{ ...styles.cardTitle, fontSize: '1.125rem' }}>
          Análise de Conformidade PMVG
        </h3>
        
        <div style={styles.priceComparison}>
          <div style={styles.priceBox}>
            <div style={styles.priceLabel}>Medicamentos Conformes</div>
            <div style={{ ...styles.priceValue, color: '#16a34a' }}>
              {medicamentos.length - medicamentosComProblema.length}
            </div>
            <div style={{ ...styles.priceChange, color: '#16a34a' }}>
              <CheckCircle size={14} />
              {((medicamentos.length - medicamentosComProblema.length) / medicamentos.length * 100).toFixed(1)}%
            </div>
          </div>
          
          <div style={styles.priceBox}>
            <div style={styles.priceLabel}>Não Conformes</div>
            <div style={{ ...styles.priceValue, color: '#dc2626' }}>
              {medicamentosComProblema.length}
            </div>
            <div style={{ ...styles.priceChange, color: '#dc2626' }}>
              <XCircle size={14} />
              {(medicamentosComProblema.length / medicamentos.length * 100).toFixed(1)}%
            </div>
          </div>
          
          <div style={styles.priceBox}>
            <div style={styles.priceLabel}>Economia Potencial</div>
            <div style={{ ...styles.priceValue, color: '#2563eb' }}>
              R$ {medicamentosComProblema.reduce((acc, med) => 
                acc + (med.precoFabrica - med.pmvg), 0
              ).toFixed(2)}
            </div>
            <div style={{ ...styles.priceChange, color: '#2563eb' }}>
              <TrendingDown size={14} />
              Por unidade
            </div>
          </div>
        </div>
      </div>

      {/* Status da Automação PMVG */}
      <div style={styles.card}>
        <h3 style={{ ...styles.cardTitle, fontSize: '1.125rem' }}>
          Status da Automação PMVG - ANVISA
        </h3>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          borderLeft: '4px solid #2563eb',
          padding: '1rem',
          borderRadius: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: '500' }}>
              <Activity size={20} />
              <span>{pmvgStatus?.status || 'Sistema operacional'}</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
              {pmvgStatus?.totalMedicamentos || medicamentos.length} medicamentos
            </div>
          </div>
          
          {pmvgStatus?.lastUpdate && (
            <div style={{ fontSize: '0.875rem', color: '#1e40af', marginBottom: '0.5rem' }}>
              Última atualização: {new Date(pmvgStatus.lastUpdate).toLocaleString('pt-BR')}
            </div>
          )}
          
          {pmvgStatus?.nextUpdate && (
            <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
              Próxima execução: {new Date(pmvgStatus.nextUpdate).toLocaleString('pt-BR')}
            </div>
          )}
        </div>
      </div>

      {/* Alertas Recentes */}
      <div style={styles.card}>
        <h3 style={{ ...styles.cardTitle, fontSize: '1.125rem' }}>
          Alertas Críticos Recentes
        </h3>
        
        {alertasAtivos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            <CheckCircle size={48} style={{ margin: '0 auto 1rem', color: '#16a34a' }} />
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Sistema em Conformidade</h4>
            <p style={{ margin: 0 }}>Nenhum alerta crítico detectado</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {alertasAtivos.slice(0, 5).map(alerta => (
              <div key={alerta.id} style={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px', 
                padding: '0.75rem',
                borderLeft: `4px solid ${alerta.prioridade === 'alta' ? '#dc2626' : '#d97706'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontWeight: '500', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                      {alerta.titulo}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      {alerta.descricao}
                    </p>
                  </div>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    backgroundColor: alerta.prioridade === 'alta' ? '#fee2e2' : '#fef3c7', 
                    color: alerta.prioridade === 'alta' ? '#dc2626' : '#d97706',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {alerta.prioridade.charAt(0).toUpperCase() + alerta.prioridade.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// PMVG View
const PMVGView = ({ pmvgStatus, medicamentos, loading, isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = [...new Set(medicamentos.map(m => m.categoria))];
  
  const filteredMedicamentos = medicamentos.filter(med => {
    const matchesSearch = med.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.codigo.includes(searchTerm);
    const matchesCategory = !selectedCategory || med.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Base de Dados PMVG - ANVISA</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={16} style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af' 
              }} />
              <input
                type="text"
                placeholder="Buscar medicamentos por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ ...styles.input, paddingLeft: '2.5rem' }}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={styles.select}
            >
              <option value="">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Mostrando {filteredMedicamentos.length} de {medicamentos.length} medicamentos
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Código</th>
              <th style={styles.th}>Medicamento</th>
              <th style={styles.th}>Laboratório</th>
              <th style={styles.th}>Categoria</th>
              <th style={styles.th}>PMVG</th>
              <th style={styles.th}>Preço Fábrica</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicamentos.slice(0, 50).map(med => {
              const isAcimaPMVG = med.precoFabrica > med.pmvg;
              return (
                <tr key={med.id}>
                  <td style={styles.td}>{med.codigo}</td>
                  <td style={styles.td}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{med.nome}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{med.apresentacao}</div>
                    </div>
                  </td>
                  <td style={styles.td}>{med.laboratorio}</td>
                  <td style={styles.td}>{med.categoria}</td>
                  <td style={styles.td}>
                    <span style={{ fontWeight: '500', color: '#16a34a' }}>
                      R$ {med.pmvg.toFixed(2)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontWeight: '500', color: isAcimaPMVG ? '#dc2626' : '#16a34a' }}>
                      R$ {med.precoFabrica.toFixed(2)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      backgroundColor: isAcimaPMVG ? '#fee2e2' : '#dcfce7',
                      color: isAcimaPMVG ? '#dc2626' : '#16a34a'
                    }}>
                      {isAcimaPMVG ? 'Acima PMVG' : 'Conforme'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, ...styles.buttonSecondary, padding: '0.25rem' }}>
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Licitações View Avançada
const LicitacoesView = ({ licitacoes, medicamentos, onOpenModal, user }) => (
  <div>
    <div style={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={styles.cardTitle}>Gestão Avançada de Licitações</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onOpenModal('licitacao')}
            style={{ ...styles.button, ...styles.buttonPrimary }}
          >
            <Plus size={16} />
            Nova Licitação
          </button>
          <button style={{ ...styles.button, ...styles.buttonSecondary }}>
            <Upload size={16} />
            Importar
          </button>
        </div>
      </div>

      {licitacoes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <FileText size={64} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>Nenhuma licitação cadastrada</h3>
          <p style={{ margin: '0 0 1rem 0' }}>Comece criando sua primeira licitação com medicamentos</p>
          <button
            onClick={() => onOpenModal('licitacao')}
            style={{ ...styles.button, ...styles.buttonPrimary }}
          >
            <Plus size={16} />
            Criar Primeira Licitação
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {licitacoes.map(licitacao => {
            const diasRestantes = Math.ceil((new Date(licitacao.dataVencimento) - new Date()) / (1000 * 60 * 60 * 24));
            const isVencendo = diasRestantes <= 7;
            
            return (
              <div key={licitacao.id} style={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px', 
                padding: '1.5rem',
                borderLeft: `4px solid ${isVencendo ? '#dc2626' : '#16a34a'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#1f2937', fontSize: '1.125rem' }}>
                      {licitacao.numero}
                    </h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>
                      {licitacao.orgao}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <span>
                        <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Vencimento: {new Date(licitacao.dataVencimento).toLocaleDateString('pt-BR')}
                      </span>
                      <span>
                        <DollarSign size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Valor: R$ {licitacao.valor?.toLocaleString('pt-BR')}
                      </span>
                      <span style={{ color: isVencendo ? '#dc2626' : '#16a34a' }}>
                        <Clock size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {diasRestantes > 0 ? `${diasRestantes} dias restantes` : 'Vencida'}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => onOpenModal('licitacao', licitacao)}
                      style={{ ...styles.button, ...styles.buttonSecondary }}
                    >
                      <Edit size={16} />
                      Editar
                    </button>
                    <button style={{ ...styles.button, ...styles.buttonPrimary }}>
                      <Eye size={16} />
                      Visualizar
                    </button>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: '#f9fafb', 
                  padding: '1rem', 
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h5 style={{ margin: '0 0 0.5rem 0', fontWeight: '500', color: '#1f2937' }}>
                    Medicamentos Associados: {licitacao.medicamentos?.length || 0}
                  </h5>
                  {licitacao.medicamentos?.length > 0 ? (
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {licitacao.medicamentos.slice(0, 3).map(med => med.nome).join(', ')}
                      {licitacao.medicamentos.length > 3 && ` +${licitacao.medicamentos.length - 3} mais...`}
                    </div>
                  ) : (
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>
                      Nenhum medicamento associado ainda
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

// Comparação de Preços View
const ComparacaoView = ({ medicamentos, licitacoes }) => {
  const [selectedMedicamento, setSelectedMedicamento] = useState('');
  const [selectedLicitacao, setSelectedLicitacao] = useState('');
  
  const medicamentoSelecionado = medicamentos.find(m => m.id === parseInt(selectedMedicamento));
  
  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Comparação Inteligente de Preços</h2>
        
        <div style={styles.formGroupRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Selecionar Medicamento</label>
            <select
              value={selectedMedicamento}
              onChange={(e) => setSelectedMedicamento(e.target.value)}
              style={styles.select}
            >
              <option value="">Escolha um medicamento...</option>
              {medicamentos.map(med => (
                <option key={med.id} value={med.id}>
                  {med.nome} - {med.laboratorio}
                </option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Licitação (Opcional)</label>
            <select
              value={selectedLicitacao}
              onChange={(e) => setSelectedLicitacao(e.target.value)}
              style={styles.select}
            >
              <option value="">Análise geral</option>
              {licitacoes.map(lic => (
                <option key={lic.id} value={lic.id}>
                  {lic.numero} - {lic.orgao}
                </option>
              ))}
            </select>
          </div>
        </div>

        {medicamentoSelecionado && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
              Análise de Preços: {medicamentoSelecionado.nome}
            </h3>
            
            <div style={styles.priceComparison}>
              <div style={styles.priceBox}>
                <div style={styles.priceLabel}>Preço PMVG (Máximo)</div>
                <div style={{ ...styles.priceValue, color: '#2563eb' }}>
                  R$ {medicamentoSelecionado.pmvg.toFixed(2)}
                </div>
                <div style={{ ...styles.priceChange, color: '#2563eb' }}>
                  <Shield size={14} />
                  Referência ANVISA
                </div>
              </div>
              
              <div style={styles.priceBox}>
                <div style={styles.priceLabel}>Preço de Fábrica</div>
                <div style={{ 
                  ...styles.priceValue, 
                  color: medicamentoSelecionado.precoFabrica > medicamentoSelecionado.pmvg ? '#dc2626' : '#16a34a' 
                }}>
                  R$ {medicamentoSelecionado.precoFabrica.toFixed(2)}
                </div>
                <div style={{ 
                  ...styles.priceChange, 
                  color: medicamentoSelecionado.precoFabrica > medicamentoSelecionado.pmvg ? '#dc2626' : '#16a34a' 
                }}>
                  {medicamentoSelecionado.precoFabrica > medicamentoSelecionado.pmvg ? 
                    <TrendingUpIcon size={14} /> : <TrendingDown size={14} />
                  }
                  {((medicamentoSelecionado.precoFabrica / medicamentoSelecionado.pmvg - 1) * 100).toFixed(1)}%
                </div>
              </div>
              
              <div style={styles.priceBox}>
                <div style={styles.priceLabel}>Preço Sugerido</div>
                <div style={{ ...styles.priceValue, color: '#16a34a' }}>
                  R$ {(medicamentoSelecionado.pmvg * 0.95).toFixed(2)}
                </div>
                <div style={{ ...styles.priceChange, color: '#16a34a' }}>
                  <Award size={14} />
                  95% da PMVG
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                Análise de Conformidade
              </h4>
              
              {medicamentoSelecionado.precoFabrica > medicamentoSelecionado.pmvg ? (
                <div style={{ ...styles.alert, ...styles.alertError, margin: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <XCircle size={16} />
                    <strong>Não Conforme</strong>
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0' }}>
                    O preço de fábrica (R$ {medicamentoSelecionado.precoFabrica.toFixed(2)}) está 
                    R$ {(medicamentoSelecionado.precoFabrica - medicamentoSelecionado.pmvg).toFixed(2)} 
                    acima da PMVG estabelecida pela ANVISA.
                  </p>
                </div>
              ) : (
                <div style={{ ...styles.alert, ...styles.alertSuccess, margin: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} />
                    <strong>Conforme</strong>
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0' }}>
                    O preço está dentro do limite estabelecido pela PMVG. 
                    Economia de R$ {(medicamentoSelecionado.pmvg - medicamentoSelecionado.precoFabrica).toFixed(2)} 
                    por unidade.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ranking de Medicamentos por Economia */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Ranking de Oportunidades de Economia</h3>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Medicamento</th>
              <th style={styles.th}>PMVG</th>
              <th style={styles.th}>Preço Fábrica</th>
              <th style={styles.th}>Economia/Unidade</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos
              .map(med => ({
                ...med,
                economia: med.pmvg - med.precoFabrica
              }))
              .sort((a, b) => b.economia - a.economia)
              .slice(0, 10)
              .map(med => (
                <tr key={med.id}>
                  <td style={styles.td}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{med.nome}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{med.laboratorio}</div>
                    </div>
                  </td>
                  <td style={styles.td}>R$ {med.pmvg.toFixed(2)}</td>
                  <td style={styles.td}>R$ {med.precoFabrica.toFixed(2)}</td>
                  <td style={styles.td}>
                    <span style={{ 
                      fontWeight: '500', 
                      color: med.economia >= 0 ? '#16a34a' : '#dc2626' 
                    }}>
                      {med.economia >= 0 ? '+' : ''}R$ {med.economia.toFixed(2)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      backgroundColor: med.economia >= 0 ? '#dcfce7' : '#fee2e2',
                      color: med.economia >= 0 ? '#16a34a' : '#dc2626'
                    }}>
                      {med.economia >= 0 ? 'Economia' : 'Acima PMVG'}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Alertas View Avançada
const AlertasView = ({ alertas, pmvgStatus }) => {
  const alertasAtivos = alertas.filter(a => a.status === 'ativo');
  const alertasPorTipo = alertasAtivos.reduce((acc, alerta) => {
    acc[alerta.tipo] = (acc[alerta.tipo] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={styles.cardTitle}>Central de Alertas Inteligentes</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ ...styles.button, ...styles.buttonSecondary }}>
              <Settings size={16} />
              Configurar
            </button>
            <button style={{ ...styles.button, ...styles.buttonPrimary }}>
              <RefreshCw size={16} />
              Atualizar
            </button>
          </div>
        </div>

        {/* Resumo de Alertas */}
        <div style={styles.statsGrid}>
          <StatCard
            title="Alertas Ativos"
            value={alertasAtivos.length}
            icon={Bell}
            color="red"
            subtitle="Requerem ação"
          />
          <StatCard
            title="Preços Acima PMVG"
            value={alertasPorTipo.preco_acima_pmvg || 0}
            icon={TrendingUpIcon}
            color="yellow"
            subtitle="Não conformidades"
          />
          <StatCard
            title="Licitações Vencendo"
            value={alertasPorTipo.licitacao_vencendo || 0}
            icon={Clock}
            color="red"
            subtitle="Próximas 7 dias"
          />
          <StatCard
            title="Sistema PMVG"
            value={1}
            icon={Shield}
            color="green"
            subtitle="Operacional"
          />
        </div>

        {/* Lista de Alertas */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {alertasAtivos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
              <CheckCircle size={64} style={{ margin: '0 auto 1rem', color: '#16a34a' }} />
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>Sistema em Perfeita Conformidade</h3>
              <p style={{ margin: 0 }}>Todos os indicadores estão dentro dos parâmetros estabelecidos</p>
            </div>
          ) : (
            alertasAtivos.map(alerta => (
              <div key={alerta.id} style={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px', 
                padding: '1.5rem',
                borderLeft: `4px solid ${getPriorityColor(alerta.prioridade)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {getAlertIcon(alerta.tipo)}
                      <h4 style={{ margin: 0, fontWeight: '600', color: '#1f2937', fontSize: '1.125rem' }}>
                        {alerta.titulo}
                      </h4>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: getPriorityBgColor(alerta.prioridade),
                        color: getPriorityColor(alerta.prioridade)
                      }}>
                        {alerta.prioridade.toUpperCase()}
                      </span>
                    </div>
                    
                    <p style={{ margin: '0 0 1rem 0', color: '#6b7280', lineHeight: 1.5 }}>
                      {alerta.descricao}
                    </p>
                    
                    {alerta.medicamento && (
                      <div style={{ 
                        backgroundColor: '#f9fafb', 
                        padding: '0.75rem', 
                        borderRadius: '6px',
                        fontSize: '0.875rem'
                      }}>
                        <strong>Medicamento:</strong> {alerta.medicamento.nome}<br/>
                        <strong>Laboratório:</strong> {alerta.medicamento.laboratorio}<br/>
                        <strong>PMVG:</strong> R$ {alerta.medicamento.pmvg.toFixed(2)} | 
                        <strong> Preço Fábrica:</strong> R$ {alerta.medicamento.precoFabrica.toFixed(2)}
                      </div>
                    )}
                    
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.75rem' }}>
                      Gerado em: {new Date(alerta.dataGeracao).toLocaleString('pt-BR')}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                    <button style={{ ...styles.button, ...styles.buttonSecondary }}>
                      <Eye size={16} />
                      Detalhes
                    </button>
                    <button style={{ ...styles.button, ...styles.buttonSuccess }}>
                      <CheckCircle size={16} />
                      Resolver
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Relatórios View
const RelatoriosView = ({ licitacoes, medicamentos, alertas, onExport }) => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const reportTypes = [
    { id: 'compliance', name: 'Relatório de Conformidade PMVG', description: 'Análise completa de conformidade dos preços' },
    { id: 'licitacoes', name: 'Relatório de Licitações', description: 'Resumo detalhado das licitações em andamento' },
    { id: 'economia', name: 'Relatório de Economia', description: 'Análise de economia e oportunidades de melhoria' },
    { id: 'alertas', name: 'Relatório de Alertas', description: 'Histórico e status dos alertas do sistema' }
  ];

  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Central de Relatórios e Exportação</h2>
        
        <div style={styles.formGroupRow}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tipo de Relatório</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              style={styles.select}
            >
              <option value="">Selecione um relatório...</option>
              {reportTypes.map(report => (
                <option key={report.id} value={report.id}>{report.name}</option>
              ))}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Período (Opcional)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                style={styles.input}
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {selectedReport && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>
              {reportTypes.find(r => r.id === selectedReport)?.name}
            </h4>
            <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
              {reportTypes.find(r => r.id === selectedReport)?.description}
            </p>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onExport(selectedReport, 'pdf')}
                style={{ ...styles.button, ...styles.buttonPrimary }}
              >
                <FileDown size={16} />
                Exportar PDF
              </button>
              <button
                onClick={() => onExport(selectedReport, 'excel')}
                style={{ ...styles.button, ...styles.buttonSuccess }}
              >
                <Download size={16} />
                Exportar Excel
              </button>
              <button
                onClick={() => onExport(selectedReport, 'csv')}
                style={{ ...styles.button, ...styles.buttonSecondary }}
              >
                <FileSpreadsheet size={16} />
                Exportar CSV
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Relatórios Rápidos */}
      <div style={styles.card}>
        <h3 style={{ ...styles.cardTitle, fontSize: '1.125rem' }}>Relatórios Rápidos</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChart size={20} color="#2563eb" />
              Resumo Executivo
            </h4>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Visão geral do sistema com métricas principais
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div>Medicamentos: <strong>{medicamentos.length}</strong></div>
              <div>Licitações: <strong>{licitacoes.length}</strong></div>
              <div>Alertas: <strong>{alertas.length}</strong></div>
              <div>Conformidade: <strong>{((medicamentos.filter(m => m.precoFabrica <= m.pmvg).length / medicamentos.length) * 100).toFixed(1)}%</strong></div>
            </div>
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart size={20} color="#16a34a" />
              Análise de Economia
            </h4>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Potencial de economia com preços otimizados
            </p>
            <div style={{ fontSize: '0.875rem' }}>
              <div>Economia Total: <strong style={{ color: '#16a34a' }}>
                R$ {medicamentos.reduce((acc, med) => 
                  acc + Math.max(0, med.pmvg - med.precoFabrica), 0
                ).toFixed(2)}
              </strong></div>
              <div>Medicamentos Conformes: <strong>{medicamentos.filter(m => m.precoFabrica <= m.pmvg).length}</strong></div>
            </div>
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LineChart size={20} color="#d97706" />
              Tendências
            </h4>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Análise de tendências e projeções
            </p>
            <div style={{ fontSize: '0.875rem' }}>
              <div>Taxa de Conformidade: <strong style={{ color: '#16a34a' }}>
                {((medicamentos.filter(m => m.precoFabrica <= m.pmvg).length / medicamentos.length) * 100).toFixed(1)}%
              </strong></div>
              <div>Alertas Críticos: <strong style={{ color: '#dc2626' }}>{alertas.filter(a => a.prioridade === 'alta').length}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Component Avançado
const Modal = ({ type, data, medicamentos, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [formData, setFormData] = useState(data || {});
  const [selectedMedicamentos, setSelectedMedicamentos] = useState(data?.medicamentos || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, medicamentos: selectedMedicamentos });
  };

  const toggleMedicamento = (medicamento) => {
    setSelectedMedicamentos(prev => {
      const exists = prev.find(m => m.id === medicamento.id);
      if (exists) {
        return prev.filter(m => m.id !== medicamento.id);
      } else {
        return [...prev, { ...medicamento, precoOfertado: medicamento.precoFabrica }];
      }
    });
  };

  const updatePrecoOfertado = (medicamentoId, preco) => {
    setSelectedMedicamentos(prev => 
      prev.map(m => 
        m.id === medicamentoId ? { ...m, precoOfertado: parseFloat(preco) || 0 } : m
      )
    );
  };

  if (type !== 'licitacao') return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
            {data ? 'Editar Licitação' : 'Nova Licitação'}
          </h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'dados-gerais' ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab('dados-gerais')}
          >
            Dados Gerais
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'medicamentos' ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab('medicamentos')}
          >
            Medicamentos ({selectedMedicamentos.length})
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'comparacao' ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab('comparacao')}
          >
            Comparação de Preços
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'dados-gerais' && (
            <div style={styles.form}>
              <div style={styles.formGroupRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Número da Licitação</label>
                  <input
                    type="text"
                    value={formData.numero || ''}
                    onChange={(e) => setFormData({...formData, numero: e.target.value})}
                    style={styles.input}
                    placeholder="PP-001/2025"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Órgão</label>
                  <input
                    type="text"
                    value={formData.orgao || ''}
                    onChange={(e) => setFormData({...formData, orgao: e.target.value})}
                    style={styles.input}
                    placeholder="Secretaria Municipal de Saúde"
                    required
                  />
                </div>
              </div>

              <div style={styles.formGroupRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Data de Publicação</label>
                  <input
                    type="date"
                    value={formData.dataPublicacao || ''}
                    onChange={(e) => setFormData({...formData, dataPublicacao: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Data de Vencimento</label>
                  <input
                    type="date"
                    value={formData.dataVencimento || ''}
                    onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={styles.formGroupRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Valor Estimado</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valor || ''}
                    onChange={(e) => setFormData({...formData, valor: parseFloat(e.target.value)})}
                    style={styles.input}
                    placeholder="100000.00"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Vigência Contratual</label>
                  <input
                    type="text"
                    value={formData.vigenciaContratual || ''}
                    onChange={(e) => setFormData({...formData, vigenciaContratual: e.target.value})}
                    style={styles.input}
                    placeholder="12 meses"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Observações</label>
                <textarea
                  value={formData.observacoes || ''}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                  style={styles.textarea}
                  placeholder="Observações adicionais sobre a licitação..."
                />
              </div>
            </div>
          )}

          {activeTab === 'medicamentos' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Selecionar Medicamentos</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                  Escolha os medicamentos que fazem parte desta licitação
                </p>
              </div>

              <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ ...styles.th, width: '50px' }}>Seleção</th>
                      <th style={styles.th}>Medicamento</th>
                      <th style={styles.th}>PMVG</th>
                      <th style={styles.th}>Preço Fábrica</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicamentos.slice(0, 20).map(med => {
                      const isSelected = selectedMedicamentos.some(m => m.id === med.id);
                      const isAcimaPMVG = med.precoFabrica > med.pmvg;
                      
                      return (
                        <tr key={med.id} style={{ backgroundColor: isSelected ? '#f0f9ff' : 'white' }}>
                          <td style={styles.td}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleMedicamento(med)}
                              style={{ cursor: 'pointer' }}
                            />
                          </td>
                          <td style={styles.td}>
                            <div>
                              <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{med.nome}</div>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{med.laboratorio}</div>
                            </div>
                          </td>
                          <td style={styles.td}>R$ {med.pmvg.toFixed(2)}</td>
                          <td style={styles.td}>R$ {med.precoFabrica.toFixed(2)}</td>
                          <td style={styles.td}>
                            <span style={{ 
                              padding: '0.25rem 0.5rem', 
                              borderRadius: '4px', 
                              fontSize: '0.75rem',
                              backgroundColor: isAcimaPMVG ? '#fee2e2' : '#dcfce7',
                              color: isAcimaPMVG ? '#dc2626' : '#16a34a'
                            }}>
                              {isAcimaPMVG ? 'Acima PMVG' : 'Conforme'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'comparacao' && selectedMedicamentos.length > 0 && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Comparação e Definição de Preços</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                  Defina os preços ofertados para cada medicamento selecionado
                </p>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {selectedMedicamentos.map(med => (
                  <div key={med.id} style={{ 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '6px', 
                    padding: '1rem'
                  }}>
                    <h5 style={{ margin: '0 0 1rem 0', fontWeight: '600' }}>{med.nome}</h5>
                    
                    <div style={styles.priceComparison}>
                      <div style={styles.priceBox}>
                        <div style={styles.priceLabel}>PMVG (Máximo)</div>
                        <div style={{ ...styles.priceValue, color: '#2563eb', fontSize: '1rem' }}>
                          R$ {med.pmvg.toFixed(2)}
                        </div>
                      </div>
                      
                      <div style={styles.priceBox}>
                        <div style={styles.priceLabel}>Preço de Fábrica</div>
                        <div style={{ 
                          ...styles.priceValue, 
                          fontSize: '1rem',
                          color: med.precoFabrica > med.pmvg ? '#dc2626' : '#16a34a' 
                        }}>
                          R$ {med.precoFabrica.toFixed(2)}
                        </div>
                      </div>
                      
                      <div style={styles.priceBox}>
                        <div style={styles.priceLabel}>Preço Ofertado</div>
                        <input
                          type="number"
                          step="0.01"
                          value={med.precoOfertado || ''}
                          onChange={(e) => updatePrecoOfertado(med.id, e.target.value)}
                          style={{ ...styles.input, textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {med.precoOfertado && (
                      <div style={{ marginTop: '0.75rem' }}>
                        {med.precoOfertado > med.pmvg ? (
                          <div style={{ ...styles.alert, ...styles.alertError, margin: 0, padding: '0.5rem' }}>
                            ⚠️ Preço ofertado acima da PMVG (diferença: R$ {(med.precoOfertado - med.pmvg).toFixed(2)})
                          </div>
                        ) : (
                          <div style={{ ...styles.alert, ...styles.alertSuccess, margin: 0, padding: '0.5rem' }}>
                            ✓ Preço conforme PMVG (economia: R$ {(med.pmvg - med.precoOfertado).toFixed(2)})
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <button type="button" onClick={onClose} style={{ ...styles.button, ...styles.buttonSecondary }}>
              Cancelar
            </button>
            <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>
              <Save size={16} />
              Salvar Licitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente de Estatística
const StatCard = ({ title, value, icon: Icon, color, subtitle }) => {
  const colorStyles = {
    blue: styles.statIconBlue,
    green: styles.statIconGreen,
    red: styles.statIconRed,
    yellow: styles.statIconYellow
  };

  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIcon, ...colorStyles[color] }}>
        <Icon size={24} />
      </div>
      <div style={styles.statText}>
        <p style={styles.statTitle}>{title}</p>
        <p style={styles.statValue}>{value.toLocaleString()}</p>
        {subtitle && (
          <p style={styles.statSubtitle}>{subtitle}</p>
        )}
      </div>
    </div>
  );
};

// Funções auxiliares
const getPriorityColor = (prioridade) => {
  switch (prioridade) {
    case 'alta': return '#dc2626';
    case 'media': return '#d97706';
    case 'baixa': return '#16a34a';
    default: return '#6b7280';
  }
};

const getPriorityBgColor = (prioridade) => {
  switch (prioridade) {
    case 'alta': return '#fee2e2';
    case 'media': return '#fef3c7';
    case 'baixa': return '#dcfce7';
    default: return '#f3f4f6';
  }
};

const getAlertIcon = (tipo) => {
  switch (tipo) {
    case 'preco_acima_pmvg': return <TrendingUpIcon size={16} style={{ color: '#dc2626' }} />;
    case 'licitacao_vencendo': return <Clock size={16} style={{ color: '#d97706' }} />;
    case 'sistema': return <Shield size={16} style={{ color: '#2563eb' }} />;
    default: return <Bell size={16} style={{ color: '#6b7280' }} />;
  }
};

export default App;
