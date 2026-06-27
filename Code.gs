// Google Apps Script para I A BOA?
// Configure este script no seu Google Apps Script vinculado à planilha

const SHEET_NAME = "Eventos";
const REPORTS_SHEET_NAME = "Denuncias";
const EMAIL_RECIPIENT = "gl451606@gmail.com";

// doGet - Retorna todos os eventos (suporta JSONP para evitar CORS)
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Pular cabeçalho se existir
  const headers = data[0];
  const rows = data.slice(1);
  
  // Converter para array de objetos
  const events = rows.map(row => ({
    id: row[0],
    name: row[1],
    location: row[2],
    datetime: row[3],
    type: row[4],
    rating: row[5]
  }));
  
  // Verificar se é requisição JSONP
  const callback = e.parameter.callback;
  if (callback) {
    return ContentService.createTextOutput(`${callback}(${JSON.stringify(events)})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  return ContentService.createTextOutput(JSON.stringify(events))
    .setMimeType(ContentService.MimeType.JSON);
}

// doPost - Adiciona novo evento ou denúncia
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Se for denúncia
    if (data.type === 'report') {
      return handleReport(data);
    }
    
    // Se for novo evento
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    sheet.appendRow([
      data.id,
      data.name,
      data.location,
      data.datetime,
      data.type,
      data.rating
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle report submission
function handleReport(reportData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Criar aba de denúncias se não existir
  let reportsSheet = ss.getSheetByName(REPORTS_SHEET_NAME);
  if (!reportsSheet) {
    reportsSheet = ss.insertSheet(REPORTS_SHEET_NAME);
    reportsSheet.appendRow(["Timestamp", "Evento ID", "Evento Nome", "Motivo", "Contato"]);
  }
  
  // Adicionar denúncia à planilha
  reportsSheet.appendRow([
    reportData.timestamp,
    reportData.eventId,
    reportData.eventName,
    reportData.reason,
    reportData.contact
  ]);
  
  // Enviar email
  sendReportEmail(reportData);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Send report email
function sendReportEmail(reportData) {
  const subject = "🚨 Nova Denúncia - I A BOA?";
  
  const body = `
Nova denúncia recebida:

Evento: ${reportData.eventName}
ID do Evento: ${reportData.eventId}

Motivo:
${reportData.reason}

Contato: ${reportData.contact || "Não informado"}
Data/Hora: ${reportData.timestamp}

---
I A BOA? - Sistema de Denúncias
  `;
  
  MailApp.sendEmail({
    to: EMAIL_RECIPIENT,
    subject: subject,
    body: body
  });
}
