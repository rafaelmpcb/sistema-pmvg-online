const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const xlsx = require('xlsx');
const cron = require('node-cron');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'sistema-pmvg-secret-key';

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Base de dados em memória (substitua por banco real em produção)
let medicamentos = [];
let licitacoes = [];
let alertas = [];
let prazos = [];
let notasTecnicas = [];
let autorizacoes = [];
let systemStatus = {
  pmvgAutomation: {
    isRunning: false,
    lastUpdate: null,
    nextUpdate: null,
    totalMedicamentos: 0,
    status: 'Sistema inicializado - Pronto para primeira execução'
  }
};

// Usuários do sistema
const users = [
  {
    id: 1,
    email: 'admin@sistema.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
    name: 'Administrador PMVG'
  },
  {
    id: 2,
    email: 'usuario@sistema.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'cliente',
    name: 'Distribuidora Cliente'
  }
];

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Função para logging
const log = (message, level = 'INFO') => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;
  console.log(logMessage);
  
  // Salvar em arquivo de log
  const logFile = path.join(__dirname, 'logs', 'system.log');
  fs.ensureDirSync(path.dirname(logFile));
  fs.appendFileSync(logFile, logMessage + '\n');
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    services: {
      pmvgAutomation: systemStatus.pmvgAutomation.status,
      totalMedicamentos: medicamentos.length,
      totalLicitacoes: licitacoes.length
    }
  });
});

// Rotas de autenticação
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    log(`Tentativa de login para: ${email}`);
    
    const user = users.find(u => u.email === email);
    if (!user) {
      log(`Login falhou - usuário não encontrado: ${email}`, 'WARN');
      return res.status(401).json({ error: 'Email não encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      log(`Login falhou - senha incorreta: ${email}`, 'WARN');
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    log(`Login bem-sucedido: ${email} (${user.role})`);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (error) {
    log(`Erro no login: ${error.message}`, 'ERROR');
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para status do sistema
app.get('/api/system/status', authenticateToken, (req, res) => {
  const stats = {
    totalMedicamentos: medicamentos.length,
    totalLicitacoes: licitacoes.length,
    alertasAtivos: alertas.filter(a => a.status === 'ativo').length,
    prazosVencendo: prazos.filter(p => {
      const diff = new Date(p.dataLimite) - new Date();
      return diff > 0 && diff <= 7 * 24 * 60 * 60 * 1000; // 7 dias
    }).length,
    pmvgAutomation: systemStatus.pmvgAutomation
  };
  
  res.json(stats);
});

// Rotas PMVG
app.get('/api/pmvg/status', authenticateToken, (req, res) => {
  res.json(systemStatus.pmvgAutomation);
});

app.post('/api/pmvg/force-update', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Apenas administradores podem forçar atualizações' });
    }

    if (systemStatus.pmvgAutomation.isRunning) {
      return res.status(409).json({ error: 'Automação já está em execução' });
    }

    log('🔄 Iniciando atualização manual da PMVG...');
    
    systemStatus.pmvgAutomation.isRunning = true;
    systemStatus.pmvgAutomation.status = 'Executando atualização manual...';
    
    // Simular busca de dados da ANVISA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Dados de demonstração
    const demoData = [
      {
        codigo: '90001015',
        produto: 'ACETAMINOFEN 500MG COMPRIMIDO',
        pmvg: 2.45,
        laboratorio: 'EUROFARMA',
        apresentacao: 'CAIXA COM 20 COMPRIMIDOS',
        restricaoHospitalar: 'NÃO',
        cap: 'SIM'
      },
      {
        codigo: '90002015',
        produto: 'AMOXICILINA 500MG CÁPSULA',
        pmvg: 15.67,
        laboratorio: 'EUROFARMA',
        apresentacao: 'CAIXA COM 21 CÁPSULAS',
        restricaoHospitalar: 'NÃO',
        cap: 'SIM'
      },
      {
        codigo: '90003015',
        produto: 'DIPIRONA 500MG COMPRIMIDO',
        pmvg: 5.23,
        laboratorio: 'SANOFI',
        apresentacao: 'CAIXA COM 20 COMPRIMIDOS',
        restricaoHospitalar: 'NÃO',
        cap: 'SIM'
      }
    ];
    
    // Gerar mais dados de demonstração
    for (let i = 0; i < 100; i++) {
      demoData.push({
        codigo: `9000${String(i + 4).padStart(4, '0')}`,
        produto: `MEDICAMENTO EXEMPLO ${i + 1}`,
        pmvg: Math.round((Math.random() * 100 + 1) * 100) / 100,
        laboratorio: ['EUROFARMA', 'MEDLEY', 'EMS', 'SANOFI'][Math.floor(Math.random() * 4)],
        apresentacao: 'CAIXA COM 30 COMPRIMIDOS',
        restricaoHospitalar: Math.random() > 0.5 ? 'SIM' : 'NÃO',
        cap: 'SIM'
      });
    }
    
    medicamentos = demoData;
    
    systemStatus.pmvgAutomation = {
      isRunning: false,
      lastUpdate: new Date().toISOString(),
      nextUpdate: getNextScheduledUpdate(),
      totalMedicamentos: medicamentos.length,
      status: `Atualização manual concluída - ${medicamentos.length} medicamentos processados`
    };
    
    log(`✅ PMVG atualizada manualmente: ${medicamentos.length} medicamentos`);
    res.json({ 
      success: true, 
      message: 'Atualização concluída com sucesso', 
      total: medicamentos.length 
    });
    
  } catch (error) {
    log(`❌ Erro na atualização manual da PMVG: ${error.message}`, 'ERROR');
    systemStatus.pmvgAutomation.isRunning = false;
    systemStatus.pmvgAutomation.status = `Erro na atualização: ${error.message}`;
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/pmvg/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }

    log('📁 Processando upload manual da PMVG...');
    
    // Processar arquivo PMVG
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Validar e processar dados
    const processedData = data.map(row => ({
      codigo: row.CÓDIGO || row.codigo || '',
      produto: row.PRODUTO || row.produto || '',
      pmvg: parseFloat(row.PMVG || row.pmvg || 0),
      laboratorio: row.LABORATÓRIO || row.laboratorio || '',
      apresentacao: row.APRESENTAÇÃO || row.apresentacao || '',
      restricaoHospitalar: row['RESTRIÇÃO HOSPITALAR'] || row.restricaoHospitalar || '',
      cap: row.CAP || row.cap || ''
    })).filter(item => item.codigo && item.produto && item.pmvg > 0);

    if (processedData.length < 10) {
      return res.status(400).json({ 
        error: 'Arquivo inválido - muito poucos medicamentos encontrados' 
      });
    }

    // Atualizar medicamentos
    medicamentos = processedData;
    
    systemStatus.pmvgAutomation = {
      ...systemStatus.pmvgAutomation,
      lastUpdate: new Date().toISOString(),
      totalMedicamentos: medicamentos.length,
      status: `Upload manual concluído - ${medicamentos.length} medicamentos processados`
    };

    // Remover arquivo temporário
    fs.unlinkSync(req.file.path);

    log(`✅ Upload PMVG processado: ${medicamentos.length} medicamentos`);
    res.json({ 
      success: true, 
      message: 'Upload processado com sucesso', 
      total: medicamentos.length 
    });
  } catch (error) {
    log(`❌ Erro no upload da PMVG: ${error.message}`, 'ERROR');
    res.status(500).json({ error: 'Erro ao processar arquivo' });
  }
});

// Rotas de Licitações
app.get('/api/licitacoes', authenticateToken, (req, res) => {
  let filteredLicitacoes = licitacoes;
  
  if (req.user.role !== 'admin') {
    filteredLicitacoes = licitacoes.filter(l => l.userId === req.user.id);
  }
  
  res.json(filteredLicitacoes);
});

app.post('/api/licitacoes', authenticateToken, (req, res) => {
  try {
    const novaLicitacao = {
      id: Date.now(),
      ...req.body,
      userId: req.user.id,
      createdAt: new Date().toISOString()
    };
    
    licitacoes.push(novaLicitacao);
    log(`Nova licitação criada: ${novaLicitacao.numero} por ${req.user.email}`);
    res.json(novaLicitacao);
  } catch (error) {
    log(`Erro ao criar licitação: ${error.message}`, 'ERROR');
    res.status(500).json({ error: 'Erro ao criar licitação' });
  }
});

// Rotas de Medicamentos
app.get('/api/medicamentos', authenticateToken, (req, res) => {
  const { search, licitacaoId } = req.query;
  let result = medicamentos;
  
  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter(m => 
      m.produto.toLowerCase().includes(searchLower) ||
      m.codigo.toLowerCase().includes(searchLower) ||
      m.laboratorio.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(result.slice(0, 100)); // Limitar retorno para performance
});

// Rotas de Alertas
app.get('/api/alertas', authenticateToken, (req, res) => {
  let filteredAlertas = alertas;
  
  if (req.user.role !== 'admin') {
    filteredAlertas = alertas.filter(a => a.userId === req.user.id);
  }
  
  res.json(filteredAlertas);
});

// Função para calcular próxima execução
function getNextScheduledUpdate() {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 5, 2, 0, 0);
  return nextMonth.toISOString();
}

// Configurar automação mensal (dia 5 às 02:00)
cron.schedule('0 2 5 * *', async () => {
  log('🕐 Executando automação mensal da PMVG...');
  
  try {
    systemStatus.pmvgAutomation.isRunning = true;
    systemStatus.pmvgAutomation.status = 'Executando automação mensal...';
    
    // Simular automação (em produção, seria a busca real da ANVISA)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    systemStatus.pmvgAutomation = {
      isRunning: false,
      lastUpdate: new Date().toISOString(),
      nextUpdate: getNextScheduledUpdate(),
      totalMedicamentos: medicamentos.length,
      status: `Automação mensal concluída - ${medicamentos.length} medicamentos`
    };
    
    log(`✅ Automação mensal PMVG concluída: ${medicamentos.length} medicamentos`);
  } catch (error) {
    log(`❌ Erro na automação mensal da PMVG: ${error.message}`, 'ERROR');
    systemStatus.pmvgAutomation.isRunning = false;
    systemStatus.pmvgAutomation.status = `Erro na automação: ${error.message}`;
  }
});

// Configurar próxima execução na inicialização
systemStatus.pmvgAutomation.nextUpdate = getNextScheduledUpdate();

// Inicializar com alguns dados de demonstração
const initializeDemoData = () => {
  // Criar algumas licitações de demonstração
  licitacoes.push({
    id: 1,
    numero: 'PP-001/2025',
    orgao: 'Secretaria Municipal de Saúde',
    dataPublicacao: '2025-01-15',
    dataVencimento: '2025-02-15',
    vigenciaContratual: '12 meses',
    valor: 100000.00,
    userId: 1,
    status: 'ativa',
    createdAt: new Date().toISOString()
  });
  
  // Criar alguns alertas de demonstração
  alertas.push({
    id: 1,
    tipo: 'pmvg',
    titulo: 'Preço acima da PMVG',
    descricao: 'Medicamento com preço superior ao PMVG estabelecido',
    status: 'ativo',
    prioridade: 'alta',
    userId: 1,
    createdAt: new Date().toISOString()
  });
  
  log('📋 Dados de demonstração inicializados');
};

// Inicializar dados na startup
initializeDemoData();

// Tratamento de erros global
process.on('unhandledRejection', (reason, promise) => {
  log(`Unhandled Rejection at: ${promise}, reason: ${reason}`, 'ERROR');
});

process.on('uncaughtException', (error) => {
  log(`Uncaught Exception: ${error.message}`, 'ERROR');
  process.exit(1);
});

// Iniciar servidor
app.listen(PORT, () => {
  log(`🚀 Servidor PMVG rodando na porta ${PORT}`);
  log(`📅 Próxima automação PMVG: ${systemStatus.pmvgAutomation.nextUpdate}`);
  log('👤 Usuários disponíveis:');
  log('   Admin: admin@sistema.com / 123456');
  log('   Cliente: usuario@sistema.com / 123456');
  log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
