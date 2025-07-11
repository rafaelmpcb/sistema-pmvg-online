import React, { useState, useEffect } from 'react';
import { 
  Shield, FileText, AlertTriangle, Clock, Upload, Download, 
  Settings, User, LogOut, RefreshCw, CheckCircle, XCircle,
  Calendar, DollarSign, Building, Users, Target, Bell,
  Activity, TrendingUp, BarChart3, FileSpreadsheet
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
    maxWidth: '1200px',
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
    border: '1px solid #e5e7eb'
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
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
  demoInfo: {
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
    textAlign: 'center'
  },
  pmvgCard: {
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    borderLeft: '4px solid #2563eb',
    marginBottom: '1.5rem'
  },
  pmvgStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  statusRunning: {
    color: '#d97706',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  statusSuccess: {
    color: '#16a34a',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  alert: {
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    border: '1px solid'
  },
  alertInfo: {
    backgroundColor: '#dbeafe',
    borderColor: '#93c5fd',
    color: '#1e40af'
  },
  alertSuccess: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
    color: '#15803d'
  },
  alertWarning: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
    color: '#92400e'
  },
  alertError: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
    color: '#b91c1c'
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState(null);
  const [pmvgStatus, setPmvgStatus] = useState(null);
  const [licitacoes, setLicitacoes] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [message, setMessage] = useState(null);

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
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const forceUpdatePMVG = async () => {
    setLoading(true);
    try {
      const response = await api('/pmvg/force-update', { method: 'POST' });
      if (response?.success) {
        showMessage('success', `PMVG atualizada com sucesso! ${response.total} medicamentos processados.`);
        loadData();
      } else {
        showMessage('error', response?.error || 'Erro na atualização');
      }
    } catch (error) {
      showMessage('error', 'Erro na atualização da PMVG');
    } finally {
      setLoading(false);
    }
  };

  const uploadPMVGFile = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_BASE_URL}/pmvg/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage('success', `Upload concluído! ${data.total} medicamentos processados.`);
        loadData();
      } else {
        showMessage('error', data.error || 'Erro no upload');
      }
    } catch (error) {
      showMessage('error', 'Erro no upload do arquivo');
    } finally {
      setLoading(false);
    }
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
            label="Alertas PMVG"
            active={currentView === 'alertas'}
            onClick={() => setCurrentView('alertas')}
            badge={alertas.filter(a => a.status === 'ativo').length}
          />
          <NavButton
            icon={Clock}
            label="Prazos"
            active={currentView === 'prazos'}
            onClick={() => setCurrentView('prazos')}
          />
          <NavButton
            icon={FileSpreadsheet}
            label="Notas Técnicas"
            active={currentView === 'notas'}
            onClick={() => setCurrentView('notas')}
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
            />
          )}
          {currentView === 'pmvg' && (
            <PMVGView
              pmvgStatus={pmvgStatus}
              onForceUpdate={forceUpdatePMVG}
              onUpload={uploadPMVGFile}
              loading={loading}
              isAdmin={user.role === 'admin'}
            />
          )}
          {currentView === 'licitacoes' && (
            <LicitacoesView licitacoes={licitacoes} />
          )}
          {currentView === 'alertas' && (
            <AlertasView alertas={alertas} />
          )}
          {currentView === 'prazos' && (
            <PrazosView />
          )}
          {currentView === 'notas' && (
            <NotasView />
          )}
        </div>
      </div>
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

        <div style={styles.demoInfo}>
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
const DashboardView = ({ systemStatus, licitacoes, alertas, pmvgStatus }) => (
  <div>
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Dashboard - Sistema PMVG para Licitações Públicas</h2>
      
      <div style={styles.statsGrid}>
        <StatCard
          title="Medicamentos PMVG"
          value={systemStatus?.totalMedicamentos || 0}
          icon={Shield}
          color="blue"
          subtitle="Base ANVISA atualizada"
        />
        <StatCard
          title="Licitações Ativas"
          value={systemStatus?.totalLicitacoes || 0}
          icon={FileText}
          color="green"
          subtitle="Em acompanhamento"
        />
        <StatCard
          title="Alertas Ativos"
          value={systemStatus?.alertasAtivos || 0}
          icon={AlertTriangle}
          color="red"
          subtitle="Requerem atenção"
        />
        <StatCard
          title="Prazos Vencendo"
          value={systemStatus?.prazosVencendo || 0}
          icon={Clock}
          color="yellow"
          subtitle="Próximos 7 dias"
        />
      </div>
    </div>

    {/* Status da Automação PMVG */}
    <div style={styles.card}>
      <h3 style={{ ...styles.cardTitle, fontSize: '1.125rem' }}>
        Status da Automação PMVG - ANVISA
      </h3>
      
      <div style={styles.pmvgCard}>
        <div style={styles.pmvgStatus}>
          <div style={styles.statusSuccess}>
            <Activity size={20} />
            <span>{pmvgStatus?.status || 'Inicializando...'}</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
            {pmvgStatus?.totalMedicamentos || 0} medicamentos
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

    {/* Licitações Recentes */}
    <div style={styles.card}>
      <h3 style={{ ...styles.cardTitle, fontSize: '1.125rem' }}>
        Licitações Recentes
      </h3>
      
      {licitacoes.length === 0 ? (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '1rem' }}>
          Nenhuma licitação cadastrada
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {licitacoes.slice(0, 5).map(licitacao => (
            <div key={licitacao.id} style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '6px', 
              padding: '0.75rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontWeight: '500', color: '#1f2937', margin: '0 0 0.25rem 0' }}>
                    {licitacao.numero || 'Sem número'}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                    {licitacao.orgao || 'Órgão não informado'}
                  </p>
                </div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  backgroundColor: '#dbeafe', 
                  color: '#1e40af',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  Ativa
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// PMVG View
const PMVGView = ({ pmvgStatus, onForceUpdate, onUpload, loading, isAdmin }) => {
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Automação PMVG - ANVISA</h2>
        
        <div style={styles.pmvgCard}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
            <Shield size={24} style={{ color: '#2563eb' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e40af', margin: 0 }}>
              Sistema Automatizado de Preços Máximos
            </h3>
          </div>
          
          <p style={{ color: '#1e40af', marginBottom: '1rem' }}>
            Este sistema monitora automaticamente os preços máximos de venda ao governo (PMVG) 
            estabelecidos pela ANVISA, garantindo compliance total em licitações públicas.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                {pmvgStatus?.totalMedicamentos || 0}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Medicamentos na Base</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                {pmvgStatus?.lastUpdate ? 'Ativo' : 'Aguardando'}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Status do Sistema</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>Mensal</div>
              <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Frequência de Atualização</div>
            </div>
          </div>
        </div>

        {/* Status Detalhado */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem', marginBottom: '1.5rem' }}>
          <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Status da Automação</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Status atual:</span>
              <span style={{ 
                fontWeight: '500', 
                color: pmvgStatus?.isRunning ? '#d97706' : '#16a34a'
              }}>
                {pmvgStatus?.isRunning ? 'Executando...' : pmvgStatus?.status || 'Aguardando'}
              </span>
            </div>
            
            {pmvgStatus?.lastUpdate && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Última atualização:</span>
                <span style={{ fontWeight: '500' }}>
                  {new Date(pmvgStatus.lastUpdate).toLocaleString('pt-BR')}
                </span>
              </div>
            )}
            
            {pmvgStatus?.nextUpdate && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Próxima execução:</span>
                <span style={{ fontWeight: '500' }}>
                  {new Date(pmvgStatus.nextUpdate).toLocaleString('pt-BR')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Controles */}
        {isAdmin && (
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '1rem' }}>
            <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Controles Administrativos</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <button
                  onClick={onForceUpdate}
                  disabled={loading || pmvgStatus?.isRunning}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    opacity: (loading || pmvgStatus?.isRunning) ? 0.5 : 1
                  }}
                >
                  <RefreshCw size={16} style={{ 
                    animation: loading ? 'spin 1s linear infinite' : 'none' 
                  }} />
                  {loading ? 'Atualizando...' : 'Forçar Atualização PMVG'}
                </button>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Executa a busca e download imediato dos dados da ANVISA
                </p>
              </div>

              <div>
                <label style={{ ...styles.label, marginBottom: '0.5rem', display: 'block' }}>
                  Upload Manual de Arquivo PMVG
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  disabled={loading}
                  style={{
                    ...styles.input,
                    opacity: loading ? 0.5 : 1
                  }}
                />
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Faça upload de um arquivo PMVG (.xlsx, .xls ou .csv) da ANVISA
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Outras Views (simplificadas)
const LicitacoesView = ({ licitacoes }) => (
  <div style={styles.card}>
    <h2 style={styles.cardTitle}>Gestão de Licitações</h2>
    <p style={{ color: '#6b7280' }}>
      {licitacoes.length} licitações cadastradas no sistema.
    </p>
    {/* Implementar lista e formulários aqui */}
  </div>
);

const AlertasView = ({ alertas }) => (
  <div style={styles.card}>
    <h2 style={styles.cardTitle}>Alertas PMVG</h2>
    <p style={{ color: '#6b7280' }}>
      {alertas.filter(a => a.status === 'ativo').length} alertas ativos baseados na PMVG.
    </p>
    {/* Implementar lista de alertas aqui */}
  </div>
);

const PrazosView = () => (
  <div style={styles.card}>
    <h2 style={styles.cardTitle}>Controle de Prazos</h2>
    <p style={{ color: '#6b7280' }}>Monitoramento de prazos legais para licitações.</p>
  </div>
);

const NotasView = () => (
  <div style={styles.card}>
    <h2 style={styles.cardTitle}>Notas Técnicas</h2>
    <p style={{ color: '#6b7280' }}>Geração automática de notas técnicas para governo.</p>
  </div>
);

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

export default App;
