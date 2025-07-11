import React, { useState, useEffect } from 'react';
import { 
  Shield, FileText, AlertTriangle, Clock, Upload, Download, 
  Settings, User, LogOut, RefreshCw, CheckCircle, XCircle,
  Calendar, DollarSign, Building, Users, Target, Bell,
  Activity, TrendingUp, BarChart3, FileSpreadsheet, Plus,
  Search, Filter, Edit, Trash2, Eye, Save, X, Mail,
  Calculator, DocumentText, Printer, Package, TrendingDown,
  TrendingUp as TrendingUpIcon, AlertCircle, Award, FileDown,
  PieChart, BarChart, LineChart, ShoppingCart, Pill, ExclamationTriangle
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
  badgeRed: {
    backgroundColor: '#dc2626',
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
  formGroupRow4: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
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
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
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

// Dados mockados atualizados com estrutura correta
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
  }
];

// Dados de licitações mockados com medicamentos e preços ofertados
const licitacoesMock = [
  {
    id: 1,
    numero: 'PP-001/2025',
    orgao: 'Secretaria Municipal de Saúde',
    dataPublicacao: '2025-01-15',
    dataVencimento: '2025-08-15',
    vigenciaContratual: '12 meses',
    valor: 100000.00,
    status: 'ativa',
    medicamentos: [
      {
        id: 1,
        codigo: '90001015',
        nome: 'ACETAMINOFEN 500MG COMPRIMIDO',
        laboratorio: 'EUROFARMA',
        apresentacao: 'CAIXA COM 20 COMPRIMIDOS',
        pmvg: 2.45,
        precoFabrica: 2.65, // ⚠️ MAIOR que preço ofertado - RISCO
        precoOfertado: 2.40,
        quantidade: 1000,
        valorTotal: 2400.00,
        categoria: 'Analgésico',
        dataAtualizacaoPrecoFabrica: '2025-06-15'
      },
      {
        id: 2,
        codigo: '90002015',
        nome: 'AMOXICILINA 500MG CÁPSULA',
        laboratorio: 'EUROFARMA',
        apresentacao: 'CAIXA COM 21 CÁPSULAS',
        pmvg: 15.67,
        precoFabrica: 12.30, // ✅ MENOR que preço ofertado - ECONOMIA
        precoOfertado: 14.50,
        quantidade: 500,
        valorTotal: 7250.00,
        categoria: 'Antibiótico',
        dataAtualizacaoPrecoFabrica: '2025-06-20'
      }
    ],
    createdAt: '2025-01-15T10:00:00.000Z'
  }
];

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState(null);
  const [pmvgStatus, setPmvgStatus] = useState(null);
  const [licitacoes, setLicitacoes] = useState(licitacoesMock);
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
      
      // Se não conseguir dados da API, manter dados mock
      if (licitacoesData) setLicitacoes(licitacoesData);
      if (alertasData) setAlertas(alertasData);
      if (pmvgData) setPmvgStatus(pmvgData);

      // Gerar alertas automáticos com lógica corrigida
      generateAutomaticAlerts();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Gerar alertas mesmo se API falhar
      generateAutomaticAlerts();
    }
  };

  // ✅ CORREÇÃO URGENTE: Nova lógica de alertas
  const generateAutomaticAlerts = () => {
    const alertasAutomaticos = [];

    licitacoes.forEach(licitacao => {
      if (licitacao.medicamentos && licitacao.medicamentos.length > 0) {
        licitacao.medicamentos.forEach(med => {
          
          // 🚨 ALERTA CRÍTICO: Preço de fábrica > Preço ofertado (RISCO DE DESCUMPRIMENTO)
          if (med.precoFabrica && med.precoOfertado && med.precoFabrica > med.precoOfertado) {
            alertasAutomaticos.push({
              id: `risco-${med.id}-${licitacao.id}`,
              tipo: 'risco_descumprimento',
              titulo: `🚨 RISCO CRÍTICO: ${med.nome}`,
              descricao: `Preço de fábrica (R$ ${med.precoFabrica.toFixed(2)}) superior ao valor ofertado (R$ ${med.precoOfertado.toFixed(2)}). AÇÃO URGENTE: Notificar órgão licitante e solicitar revisão contratual.`,
              medicamento: med,
              licitacao: licitacao,
              status: 'ativo',
              prioridade: 'alta',
              acoes: [
                'Notificar órgão licitante imediatamente',
                'Solicitar majoração da proposta',
                'Documentar comunicação oficial',
                'Revisar preço de fábrica'
              ],
              dataGeracao: new Date().toISOString()
            });
          }

          // ⚠️ ALERTA MÉDIO: Preço ofertado > PMVG
          if (med.precoOfertado && med.pmvg && med.precoOfertado > med.pmvg) {
            alertasAutomaticos.push({
              id: `pmvg-${med.id}-${licitacao.id}`,
              tipo: 'preco_acima_pmvg',
              titulo: `Preço ofertado acima da PMVG: ${med.nome}`,
              descricao: `Preço ofertado (R$ ${med.precoOfertado.toFixed(2)}) está R$ ${(med.precoOfertado - med.pmvg).toFixed(2)} acima da PMVG (R$ ${med.pmvg.toFixed(2)})`,
              medicamento: med,
              licitacao: licitacao,
              status: 'ativo',
              prioridade: 'media',
              dataGeracao: new Date().toISOString()
            });
          }

          // 📅 ALERTA INFO: Preço de fábrica desatualizado
          if (med.dataAtualizacaoPrecoFabrica) {
            const diasSemAtualizacao = Math.floor((new Date() - new Date(med.dataAtualizacaoPrecoFabrica)) / (1000 * 60 * 60 * 24));
            if (diasSemAtualizacao > 30) {
              alertasAutomaticos.push({
                id: `atualizacao-${med.id}-${licitacao.id}`,
                tipo: 'atualizacao_pendente',
                titulo: `Preço de fábrica desatualizado: ${med.nome}`,
                descricao: `Última atualização há ${diasSemAtualizacao} dias. Recomenda-se atualizar mensalmente.`,
                medicamento: med,
                licitacao: licitacao,
                status: 'ativo',
                prioridade: 'baixa',
                dataGeracao: new Date().toISOString()
              });
            }
          }
        });
      }
    });

    setAlertas(prev => {
      // Remover alertas antigos e adicionar novos
      const alertasExistentes = prev.filter(a => !a.tipo || !['risco_descumprimento', 'preco_acima_pmvg', 'atualizacao_pendente'].includes(a.tipo));
      return [...alertasExistentes, ...alertasAutomaticos];
    });
  };

  // ✅ CORREÇÃO: Calcular métricas reais
  const calcularMetricas = () => {
    let medicamentosTotal = 0;
    let medicamentosComRisco = 0;
    let economiaTotal = 0;
    let gastosTotal = 0;

    licitacoes.forEach(lic => {
      if (lic.medicamentos) {
        lic.medicamentos.forEach(med => {
          medicamentosTotal++;
          
          // Risco de descumprimento
          if (med.precoFabrica > med.precoOfertado) {
            medicamentosComRisco++;
          }
          
          // Economia/gasto real
          const diferencaUnitaria = med.precoOfertado - med.precoFabrica;
          const diferencaTotal = diferencaUnitaria * (med.quantidade || 1);
          
          if (diferencaTotal > 0) {
            economiaTotal += diferencaTotal;
          } else {
            gastosTotal += Math.abs(diferencaTotal);
          }
        });
      }
    });

    return {
      medicamentosTotal,
      medicamentosComRisco,
      economiaTotal,
      gastosTotal,
      alertasCriticos: alertas.filter(a => a.prioridade === 'alta').length
    };
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
      setLicitacoes(prev => prev.map(l => 
        l.id === selectedLicitacao.id ? { ...l, ...licitacaoData } : l
      ));
      showMessage('success', 'Licitação atualizada com sucesso!');
    } else {
      const novaLicitacao = {
        id: Date.now(),
        ...licitacaoData,
        userId: user?.id,
        status: 'ativa',
        medicamentos: licitacaoData.medicamentos || [],
        createdAt: new Date().toISOString()
      };
      setLicitacoes(prev => [...prev, novaLicitacao]);
      showMessage('success', 'Licitação criada com sucesso!');
    }
    closeModal();
    // Regenerar alertas após salvar
    setTimeout(generateAutomaticAlerts, 100);
  };

  if (!user) {
    return <LoginScreen onLogin={login} loading={loading} />;
  }

  const metricas = calcularMetricas();

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
            badge={pmvgStatus?.totalMedicamentos || medicamentos.length}
          />
          <NavButton
            icon={FileText}
            label="Licitações"
            active={currentView === 'licitacoes'}
            onClick={() => setCurrentView('licitacoes')}
            badge={licitacoes.length}
          />
          <NavButton
            icon={ExclamationTriangle}
            label="Alertas Críticos"
            active={currentView === 'alertas'}
            onClick={() => setCurrentView('alertas')}
            badge={metricas.alertasCriticos}
            badgeType={metricas.alertasCriticos > 0 ? 'red' : 'blue'}
          />
          <NavButton
            icon={Calculator}
            label="Análise de Economia"
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
              metricas={metricas}
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
              licitacoes={licitacoes}
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
              metricas={metricas}
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
const NavButton = ({ icon: Icon, label, active, onClick, badge, badgeType = 'blue' }) => (
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
      <span style={badgeType === 'red' ? styles.badgeRed : styles.badge}>
        {badge}
      </span>
    )}
  </button>
);

// Dashboard View - CORRIGIDO
const DashboardView = ({ systemStatus, licitacoes, alertas, pmvgStatus, medicamentos, metricas }) => {
  const alertasCriticos = alertas.filter(a => a.prioridade === 'alta');
  const licitacoesAtivas = licitacoes.filter(l => l.status === 'ativa');

  return (
    <div>
      {/* Banner de Aviso se houver alertas críticos */}
      {alertasCriticos.length > 0 && (
        <div style={{ 
          ...styles.alert, 
          ...styles.alertError, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <ExclamationTriangle size={20} />
          <div>
            <strong>⚠️ ATENÇÃO: {alertasCriticos.length} alerta(s) crítico(s) detectado(s)!</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
              Existem medicamentos com risco de descumprimento da proposta. Acesse a seção "Alertas Críticos" para mais detalhes.
            </p>
          </div>
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Dashboard - Sistema PMVG Corrigido</h2>
        
        <div style={styles.statsGrid}>
          <StatCard
            title="Medicamentos em Licitações"
            value={metricas.medicamentosTotal}
            icon={Pill}
            color="blue"
            subtitle="Total cadastrados"
          />
          <StatCard
            title="🚨 Riscos Críticos"
            value={metricas.medicamentosComRisco}
            icon={ExclamationTriangle}
            color="red"
            subtitle="Preço fábrica > ofertado"
          />
          <StatCard
            title="💰 Economia Real"
            value={`R$ ${metricas.economiaTotal.toFixed(2)}`}
            icon={TrendingDown}
            color="green"
            subtitle="Ofertado > fábrica"
          />
          <StatCard
            title="Licitações Ativas"
            value={licitacoesAtivas.length}
            icon={FileText}
            color="blue"
            subtitle="Em acompanhamento"
          />
        </div>
      </div>

      {/* Resumo de Economia CORRIGIDO */}
      <div style={styles.card}>
        <h3 style={{ ...styles.cardTitle, fontSize: '1.125rem' }}>
          ✅ Análise Financeira Corrigida (Preço Ofertado vs Preço de Fábrica)
        </h3>
        
        <div style={styles.priceComparison}>
          <div style={styles.priceBox}>
            <div style={styles.priceLabel}>💰 Economia Total</div>
            <div style={{ ...styles.priceValue, color: '#16a34a' }}>
              R$ {metricas.economiaTotal.toFixed(2)}
            </div>
            <div style={{ ...styles.priceChange, color: '#16a34a' }}>
              <TrendingDown size={14} />
              Quando ofertado > fábrica
            </div>
          </div>
          
          <div style={styles.priceBox}>
            <div style={styles.priceLabel}>🚨 Riscos/Prejuízos</div>
            <div style={{ ...styles.priceValue, color: '#dc2626' }}>
              R$ {metricas.gastosTotal.toFixed(2)}
            </div>
            <div style={{ ...styles.priceChange, color: '#dc2626' }}>
              <TrendingUpIcon size={14} />
              Quando fábrica > ofertado
            </div>
          </div>
          
          <div style={styles.priceBox}>
            <div style={styles.priceLabel}>⚖️ Saldo Líquido</div>
            <div style={{ 
              ...styles.priceValue, 
              color: (metricas.economiaTotal - metricas.gastosTotal) >= 0 ? '#16a34a' : '#dc2626' 
            }}>
              R$ {(metricas.economiaTotal - metricas.gastosTotal).toFixed(2)}
            </div>
            <div style={{ 
              ...styles.priceChange, 
              color: (metricas.economiaTotal - metricas.gastosTotal) >= 0 ? '#16a34a' : '#dc2626' 
            }}>
              {(metricas.economiaTotal - metricas.gastosTotal) >= 0 ? <CheckCircle size={14} /> : <XCircle size={14} />}
              Resultado final
            </div>
          </div>
          
          <div style={styles.priceBox}>
            <div style={styles.priceLabel}>📊 Conformidade</div>
            <div style={{ ...styles.priceValue, color: '#2563eb' }}>
              {metricas.medicamentosTotal > 0 ? 
                (((metricas.medicamentosTotal - metricas.medicamentosComRisco) / metricas.medicamentosTotal) * 100).toFixed(1) : 0
              }%
            </div>
            <div style={{ ...styles.priceChange, color: '#2563eb' }}>
              <Shield size={14} />
              Sem riscos
            </div>
          </div>
        </div>
      </div>

      {/* Alertas Críticos Recentes */}
      <div style={styles.card}>
        <h3 style={{ ...styles.cardTitle, fontSize: '1.125rem' }}>
          🚨 Alertas Críticos Recentes
        </h3>
        
        {alertasCriticos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            <CheckCircle size={48} style={{ margin: '0 auto 1rem', color: '#16a34a' }} />
            <h4 style={{ margin: '0 0 0.5rem 0' }}>✅ Nenhum risco crítico detectado</h4>
            <p style={{ margin: 0 }}>Todos os preços de fábrica estão dentro dos valores ofertados</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {alertasCriticos.slice(0, 3).map(alerta => (
              <div key={alerta.id} style={{ 
                border: '1px solid #fca5a5', 
                borderRadius: '6px', 
                padding: '1rem',
                backgroundColor: '#fef2f2',
                borderLeft: '4px solid #dc2626'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontWeight: '600', color: '#dc2626', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ExclamationTriangle size={16} />
                      {alerta.titulo}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#7f1d1d', margin: '0 0 0.5rem 0' }}>
                      {alerta.descricao}
                    </p>
                    {alerta.licitacao && (
                      <p style={{ fontSize: '0.75rem', color: '#991b1b', margin: 0 }}>
                        📄 {alerta.licitacao.numero} - {alerta.licitacao.orgao}
                      </p>
                    )}
                  </div>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    backgroundColor: '#dc2626', 
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontWeight: '500'
                  }}>
                    CRÍTICO
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

// Licitações View
const LicitacoesView = ({ licitacoes, medicamentos, onOpenModal, user }) => (
  <div>
    <div style={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={styles.cardTitle}>Gestão de Licitações</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onOpenModal('licitacao')}
            style={{ ...styles.button, ...styles.buttonPrimary }}
          >
            <Plus size={16} />
            Nova Licitação
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
            
            // Calcular riscos na licitação
            const medicamentosComRisco = licitacao.medicamentos?.filter(m => m.precoFabrica > m.precoOfertado).length || 0;
            
            return (
              <div key={licitacao.id} style={{ 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px', 
                padding: '1.5rem',
                borderLeft: `4px solid ${medicamentosComRisco > 0 ? '#dc2626' : '#16a34a'}`
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
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: medicamentosComRisco > 0 ? '#fef2f2' : '#f9fafb', 
                  padding: '1rem', 
                  borderRadius: '6px',
                  border: `1px solid ${medicamentosComRisco > 0 ? '#fca5a5' : '#e5e7eb'}`
                }}>
                  <h5 style={{ margin: '0 0 0.5rem 0', fontWeight: '500', color: '#1f2937' }}>
                    📋 Medicamentos: {licitacao.medicamentos?.length || 0}
                    {medicamentosComRisco > 0 && (
                      <span style={{ color: '#dc2626', marginLeft: '0.5rem' }}>
                        | 🚨 {medicamentosComRisco} com risco
                      </span>
                    )}
                  </h5>
                  
                  {licitacao.medicamentos?.length > 0 ? (
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {licitacao.medicamentos.slice(0, 3).map(med => (
                        <div key={med.id} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: med.precoFabrica > med.precoOfertado ? '#dc2626' : '#6b7280'
                        }}>
                          <span>{med.nome}</span>
                          <span>
                            {med.precoFabrica > med.precoOfertado ? '🚨' : '✅'} 
                            R$ {med.precoOfertado?.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {licitacao.medicamentos.length > 3 && (
                        <div style={{ marginTop: '0.25rem', fontStyle: 'italic' }}>
                          +{licitacao.medicamentos.length - 3} medicamentos...
                        </div>
                      )}
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

// Alertas View - CORRIGIDA
const AlertasView = ({ alertas, pmvgStatus, licitacoes }) => {
  const alertasAtivos = alertas.filter(a => a.status === 'ativo');
  const alertasCriticos = alertasAtivos.filter(a => a.prioridade === 'alta');
  const alertasRisco = alertasAtivos.filter(a => a.tipo === 'risco_descumprimento');

  return (
    <div>
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={styles.cardTitle}>🚨 Central de Alertas Críticos</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ ...styles.button, ...styles.buttonPrimary }}>
              <RefreshCw size={16} />
              Atualizar
            </button>
          </div>
        </div>

        {/* Resumo de Alertas */}
        <div style={styles.statsGrid}>
          <StatCard
            title="🚨 Alertas Críticos"
            value={alertasCriticos.length}
            icon={ExclamationTriangle}
            color="red"
            subtitle="Ação urgente requerida"
          />
          <StatCard
            title="⚠️ Riscos de Descumprimento"
            value={alertasRisco.length}
            icon={AlertTriangle}
            color="yellow"
            subtitle="Preço fábrica > ofertado"
          />
          <StatCard
            title="📊 Alertas Ativos"
            value={alertasAtivos.length}
            icon={Bell}
            color="blue"
            subtitle="Total de alertas"
          />
          <StatCard
            title="✅ Conformidade"
            value={`${alertasAtivos.length === 0 ? 100 : Math.max(0, 100 - (alertasCriticos.length / alertasAtivos.length * 100)).toFixed(1)}%`}
            icon={Shield}
            color="green"
            subtitle="Sem alertas críticos"
          />
        </div>

        {/* Lista de Alertas */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {alertasAtivos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
              <CheckCircle size={64} style={{ margin: '0 auto 1rem', color: '#16a34a' }} />
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>✅ Sistema em Perfeita Conformidade</h3>
              <p style={{ margin: 0 }}>Todos os preços estão dentro dos parâmetros estabelecidos</p>
            </div>
          ) : (
            alertasAtivos
              .sort((a, b) => {
                const prioridadeOrder = { 'alta': 3, 'media': 2, 'baixa': 1 };
                return prioridadeOrder[b.prioridade] - prioridadeOrder[a.prioridade];
              })
              .map(alerta => (
                <div key={alerta.id} style={{ 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '1.5rem',
                  borderLeft: `4px solid ${getPriorityColor(alerta.prioridade)}`,
                  backgroundColor: alerta.prioridade === 'alta' ? '#fef2f2' : 'white'
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
                          color: getPriorityColor(alerta.prioridade),
                          fontWeight: '600'
                        }}>
                          {alerta.prioridade.toUpperCase()}
                        </span>
                      </div>
                      
                      <p style={{ margin: '0 0 1rem 0', color: '#6b7280', lineHeight: 1.5 }}>
                        {alerta.descricao}
                      </p>
                      
                      {alerta.medicamento && (
                        <div style={{ 
                          backgroundColor: alerta.prioridade === 'alta' ? '#fef2f2' : '#f9fafb', 
                          padding: '0.75rem', 
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          border: `1px solid ${alerta.prioridade === 'alta' ? '#fca5a5' : '#e5e7eb'}`
                        }}>
                          <div style={styles.formGroupRow4}>
                            <div>
                              <strong>💊 Medicamento:</strong><br />
                              {alerta.medicamento.nome}
                            </div>
                            <div>
                              <strong>💰 Preço Ofertado:</strong><br />
                              <span style={{ color: '#2563eb', fontWeight: '600' }}>
                                R$ {alerta.medicamento.precoOfertado?.toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <strong>🏭 Preço Fábrica:</strong><br />
                              <span style={{ 
                                color: alerta.medicamento.precoFabrica > alerta.medicamento.precoOfertado ? '#dc2626' : '#16a34a',
                                fontWeight: '600'
                              }}>
                                R$ {alerta.medicamento.precoFabrica?.toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <strong>📄 Licitação:</strong><br />
                              {alerta.licitacao?.numero}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {alerta.acoes && alerta.acoes.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                          <strong style={{ fontSize: '0.875rem', color: '#374151' }}>🎯 Ações Recomendadas:</strong>
                          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#6b7280' }}>
                            {alerta.acoes.slice(0, 3).map((acao, index) => (
                              <li key={index} style={{ marginBottom: '0.25rem' }}>{acao}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.75rem' }}>
                        📅 Gerado em: {new Date(alerta.dataGeracao).toLocaleString('pt-BR')}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                      <button style={{ ...styles.button, ...styles.buttonSecondary }}>
                        <Eye size={16} />
                        Detalhes
                      </button>
                      {alerta.prioridade === 'alta' && (
                        <button style={{ ...styles.button, ...styles.buttonDanger }}>
                          <Mail size={16} />
                          Notificar
                        </button>
                      )}
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

// Comparação View - CORRIGIDA
const ComparacaoView = ({ medicamentos, licitacoes }) => {
  const [selectedLicitacao, setSelectedLicitacao] = useState('');
  
  // ✅ NOVA LÓGICA: Calcular economia real (preço ofertado - preço fábrica)
  const medicamentosComEconomia = [];
  
  licitacoes.forEach(licitacao => {
    if (licitacao.medicamentos) {
      licitacao.medicamentos.forEach(med => {
        if (med.precoOfertado && med.precoFabrica) {
          const economiaUnitaria = med.precoOfertado - med.precoFabrica;
          const economiaTotal = economiaUnitaria * (med.quantidade || 1);
          
          medicamentosComEconomia.push({
            ...med,
            licitacao: licitacao,
            economiaUnitaria: economiaUnitaria,
            economiaTotal: economiaTotal,
            economiaPercentual: (economiaUnitaria / med.precoOfertado) * 100,
            status: economiaUnitaria > 0 ? 'economia' : 'risco'
          });
        }
      });
    }
  });

  const selectedLicitacaoData = licitacoes.find(l => l.id === parseInt(selectedLicitacao));

  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>💰 Análise Real de Economia (Corrigida)</h2>
        
        <div style={{ ...styles.alert, ...styles.alertInfo, marginBottom: '1.5rem' }}>
          <strong>✅ Lógica Corrigida:</strong> Agora comparamos <strong>Preço Ofertado vs Preço de Fábrica</strong> para calcular a economia real.
          <br />• <strong>Economia:</strong> Quando preço ofertado {'>'} preço de fábrica
          <br />• <strong>Risco:</strong> Quando preço de fábrica {'>'} preço ofertado (risco de descumprimento)
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Filtrar por Licitação (Opcional)</label>
          <select
            value={selectedLicitacao}
            onChange={(e) => setSelectedLicitacao(e.target.value)}
            style={styles.select}
          >
            <option value="">Todas as licitações</option>
            {licitacoes.map(lic => (
              <option key={lic.id} value={lic.id}>
                {lic.numero} - {lic.orgao}
              </option>
            ))}
          </select>
        </div>

        {selectedLicitacaoData && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
              📄 Análise da Licitação: {selectedLicitacaoData.numero}
            </h3>
            
            <div style={styles.priceComparison}>
              <div style={styles.priceBox}>
                <div style={styles.priceLabel}>💰 Economia Total</div>
                <div style={{ ...styles.priceValue, color: '#16a34a' }}>
                  R$ {selectedLicitacaoData.medicamentos?.reduce((acc, med) => 
                    acc + Math.max(0, (med.precoOfertado - med.precoFabrica) * (med.quantidade || 1)), 0
                  ).toFixed(2) || '0.00'}
                </div>
              </div>
              <div style={styles.priceBox}>
                <div style={styles.priceLabel}>🚨 Riscos Total</div>
                <div style={{ ...styles.priceValue, color: '#dc2626' }}>
                  R$ {selectedLicitacaoData.medicamentos?.reduce((acc, med) => 
                    acc + Math.max(0, (med.precoFabrica - med.precoOfertado) * (med.quantidade || 1)), 0
                  ).toFixed(2) || '0.00'}
                </div>
              </div>
              <div style={styles.priceBox}>
                <div style={styles.priceLabel}>📊 Medicamentos</div>
                <div style={{ ...styles.priceValue, color: '#2563eb' }}>
                  {selectedLicitacaoData.medicamentos?.length || 0}
                </div>
              </div>
              <div style={styles.priceBox}>
                <div style={styles.priceLabel}>⚠️ Com Risco</div>
                <div style={{ ...styles.priceValue, color: '#dc2626' }}>
                  {selectedLicitacaoData.medicamentos?.filter(m => m.precoFabrica > m.precoOfertado).length || 0}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ranking de Economia CORRIGIDO */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>📊 Ranking Real de Economia/Risco</h3>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Medicamento</th>
              <th style={styles.th}>Licitação</th>
              <th style={styles.th}>💰 Preço Ofertado</th>
              <th style={styles.th}>🏭 Preço Fábrica</th>
              <th style={styles.th}>📊 Economia/Risco Unitária</th>
              <th style={styles.th}>📈 % Economia</th>
              <th style={styles.th}>📦 Qtd</th>
              <th style={styles.th}>💵 Total</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicamentosComEconomia
              .filter(med => !selectedLicitacao || med.licitacao.id === parseInt(selectedLicitacao))
              .sort((a, b) => b.economiaTotal - a.economiaTotal)
              .map(med => (
                <tr key={`${med.id}-${med.licitacao.id}`}>
                  <td style={styles.td}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{med.nome}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{med.laboratorio}</div>
                    </div>
                  </td>
                  <td style={styles.td}>{med.licitacao.numero}</td>
                  <td style={styles.td}>R$ {med.precoOfertado.toFixed(2)}</td>
                  <td style={styles.td}>
                    <span style={{ 
                      fontWeight: '500',
                      color: med.precoFabrica > med.precoOfertado ? '#dc2626' : '#16a34a'
                    }}>
                      R$ {med.precoFabrica.toFixed(2)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ 
                      fontWeight: '500', 
                      color: med.economiaUnitaria >= 0 ? '#16a34a' : '#dc2626' 
                    }}>
                      {med.economiaUnitaria >= 0 ? '+' : ''}R$ {med.economiaUnitaria.toFixed(2)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ 
                      fontWeight: '500', 
                      color: med.economiaPercentual >= 0 ? '#16a34a' : '#dc2626' 
                    }}>
                      {med.economiaPercentual.toFixed(1)}%
                    </span>
                  </td>
                  <td style={styles.td}>{med.quantidade || 1}</td>
                  <td style={styles.td}>
                    <span style={{ 
                      fontWeight: '600', 
                      color: med.economiaTotal >= 0 ? '#16a34a' : '#dc2626' 
                    }}>
                      {med.economiaTotal >= 0 ? '+' : ''}R$ {med.economiaTotal.toFixed(2)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      backgroundColor: med.economiaTotal >= 0 ? '#dcfce7' : '#fee2e2',
                      color: med.economiaTotal >= 0 ? '#16a34a' : '#dc2626',
                      fontWeight: '500'
                    }}>
                      {med.economiaTotal >= 0 ? '💰 Economia' : '🚨 Risco'}
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

// Relatórios View
const RelatoriosView = ({ licitacoes, medicamentos, alertas, metricas }) => {
  const exportData = (type, format) => {
    // Simular exportação
    alert(`Relatório ${type} exportado em ${format.toUpperCase()}!`);
  };

  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📋 Central de Relatórios</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChart size={20} color="#2563eb" />
              Resumo Executivo
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div>Medicamentos: <strong>{metricas.medicamentosTotal}</strong></div>
              <div>Licitações: <strong>{licitacoes.length}</strong></div>
              <div>🚨 Riscos: <strong style={{ color: '#dc2626' }}>{metricas.medicamentosComRisco}</strong></div>
              <div>💰 Economia: <strong style={{ color: '#16a34a' }}>R$ {metricas.economiaTotal.toFixed(2)}</strong></div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => exportData('executivo', 'pdf')}
                style={{ ...styles.button, ...styles.buttonPrimary }}
              >
                <FileDown size={14} />
                PDF
              </button>
              <button
                onClick={() => exportData('executivo', 'excel')}
                style={{ ...styles.button, ...styles.buttonSuccess }}
              >
                <Download size={14} />
                Excel
              </button>
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
        return [...prev, { 
          ...medicamento, 
          precoOfertado: medicamento.precoFabrica * 1.2, // Sugerir 20% acima do preço de fábrica
          quantidade: 100,
          dataAtualizacaoPrecoFabrica: new Date().toISOString()
        }];
      }
    });
  };

  const updateMedicamento = (medicamentoId, field, value) => {
    setSelectedMedicamentos(prev => 
      prev.map(m => 
        m.id === medicamentoId ? { ...m, [field]: parseFloat(value) || value } : m
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
              ...(activeTab === 'analise' ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab('analise')}
          >
            Análise de Economia
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
                  <label style={styles.label}>Data de Vencimento</label>
                  <input
                    type="date"
                    value={formData.dataVencimento || ''}
                    onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                    style={styles.input}
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
                <label style={styles.label}>Valor do Empenho</label>
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
            </div>
          )}

          {activeTab === 'medicamentos' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Selecionar Medicamentos</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                  Escolha os medicamentos e defina preços ofertados e quantidades
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
                      <th style={styles.th}>Preço Ofertado</th>
                      <th style={styles.th}>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicamentos.slice(0, 20).map(med => {
                      const isSelected = selectedMedicamentos.some(m => m.id === med.id);
                      const selectedMed = selectedMedicamentos.find(m => m.id === med.id);
                      
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
                            {isSelected ? (
                              <input
                                type="number"
                                step="0.01"
                                value={selectedMed?.precoOfertado || ''}
                                onChange={(e) => updateMedicamento(med.id, 'precoOfertado', e.target.value)}
                                style={{ ...styles.input, width: '100px', padding: '0.25rem' }}
                                placeholder="0.00"
                              />
                            ) : (
                              <span style={{ color: '#9ca3af' }}>-</span>
                            )}
                          </td>
                          <td style={styles.td}>
                            {isSelected ? (
                              <input
                                type="number"
                                value={selectedMed?.quantidade || ''}
                                onChange={(e) => updateMedicamento(med.id, 'quantidade', e.target.value)}
                                style={{ ...styles.input, width: '80px', padding: '0.25rem' }}
                                placeholder="0"
                              />
                            ) : (
                              <span style={{ color: '#9ca3af' }}>-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analise' && selectedMedicamentos.length > 0 && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>💰 Análise de Economia e Riscos</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                  Comparação automática entre preços ofertados e preços de fábrica
                </p>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {selectedMedicamentos.map(med => {
                  const economia = (med.precoOfertado || 0) - med.precoFabrica;
                  const economiaTotal = economia * (med.quantidade || 1);
                  const isRisco = economia < 0;
                  
                  return (
                    <div key={med.id} style={{ 
                      border: `1px solid ${isRisco ? '#fca5a5' : '#d1d5db'}`, 
                      borderRadius: '6px', 
                      padding: '1rem',
                      backgroundColor: isRisco ? '#fef2f2' : 'white'
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
                          <div style={{ ...styles.priceValue, fontSize: '1rem', color: '#6b7280' }}>
                            R$ {med.precoFabrica.toFixed(2)}
                          </div>
                        </div>
                        
                        <div style={styles.priceBox}>
                          <div style={styles.priceLabel}>Preço Ofertado</div>
                          <div style={{ 
                            ...styles.priceValue, 
                            fontSize: '1rem',
                            color: isRisco ? '#dc2626' : '#16a34a'
                          }}>
                            R$ {(med.precoOfertado || 0).toFixed(2)}
                          </div>
                        </div>
                        
                        <div style={styles.priceBox}>
                          <div style={styles.priceLabel}>Economia/Risco Total</div>
                          <div style={{ 
                            ...styles.priceValue, 
                            fontSize: '1rem',
                            color: isRisco ? '#dc2626' : '#16a34a'
                          }}>
                            {economia >= 0 ? '+' : ''}R$ {economiaTotal.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {economia !== 0 && (
                        <div style={{ marginTop: '0.75rem' }}>
                          {isRisco ? (
                            <div style={{ ...styles.alert, ...styles.alertError, margin: 0, padding: '0.5rem' }}>
                              🚨 <strong>RISCO CRÍTICO:</strong> Preço de fábrica superior ao ofertado. 
                              Diferença: R$ {Math.abs(economia).toFixed(2)} por unidade.
                              <br /><strong>Ação:</strong> Notificar órgão licitante e solicitar revisão.
                            </div>
                          ) : (
                            <div style={{ ...styles.alert, ...styles.alertSuccess, margin: 0, padding: '0.5rem' }}>
                              ✅ <strong>Economia confirmada:</strong> R$ {economia.toFixed(2)} por unidade.
                              Total: R$ {economiaTotal.toFixed(2)} ({med.quantidade || 1} unidades).
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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
        <p style={styles.statValue}>{typeof value === 'string' ? value : value.toLocaleString()}</p>
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
    case 'risco_descumprimento': return <ExclamationTriangle size={16} style={{ color: '#dc2626' }} />;
    case 'preco_acima_pmvg': return <TrendingUpIcon size={16} style={{ color: '#d97706' }} />;
    case 'atualizacao_pendente': return <Clock size={16} style={{ color: '#2563eb' }} />;
    default: return <Bell size={16} style={{ color: '#6b7280' }} />;
  }
};

export default App;
