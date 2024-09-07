function doPost(e) {
  var line_token = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
  var spreadsheetUrl = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_URL');
  var sheetName = "Transactions";
  
  var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  var sheet = spreadsheet.getSheetByName(sheetName);

  // 檢查第一行是否為標題行,如果不是,則添加標題行
  var firstRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (firstRow[0] !== "日期" || firstRow[1] !== "使用者名稱" || firstRow[2] !== "消費品項" || 
      firstRow[3] !== "消費金額" || firstRow[4] !== "儲值金額" || firstRow[5] !== "餘額") {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, 6).setValues([["日期", "使用者名稱", "消費品項", "消費金額", "儲值金額", "餘額"]]);
  }

  var event = JSON.parse(e.postData.contents).events[0];
  var replyToken = event.replyToken;
  var userMessage = event.message.text;
  var userId = event.source.userId;

  var response = processUserMessage(userMessage, userId, sheet);

  var payload = {
    replyToken: replyToken,
    messages: [{ type: 'text', text: response }]
  };

  var options = {
    payload: JSON.stringify(payload),
    myamethod: 'POST',
    headers: { Authorization: 'Bearer ' + line_token },
    contentType: 'application/json'
  };

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', options);
}

function processUserMessage(message, userId, sheet) {
  var parts = message.split(/[+-]/);
  
  if (message.toLowerCase() === "餘額") {
    return getBalance(sheet);
  } else if (message.toLowerCase() === "今日花費") {
    return getTodayExpenses(sheet);
  } else if (parts.length === 2) {
    var item = parts[0].trim();
    var amount = parseInt(parts[1].trim());
    
    if (message.includes('+')) {
      var balance = recordTransaction(sheet, userId, item, null, amount);
      return '已記錄增加經費 ' + amount + ' 元,餘額: ' + balance + ' 元';
    } else if (message.includes('-')) {
      var balance = recordTransaction(sheet, userId, item, amount, null);
      return '已記錄消費 ' + amount + ' 元,餘額: ' + balance + ' 元';
    }
  } else {
    return '多少錢呢?';
  }
}

function getBalance(sheet) {
  var lastRow = sheet.getLastRow();
  var balance = lastRow > 1 ? sheet.getRange(lastRow, 6).getValue() : 0;
  return '目前餘額: ' + balance + ' 元';
}

function getTodayExpenses(sheet) {
  var today = new Date();
  var startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  var endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);
  
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return '尚無任何花費記錄';
  }

  var transactions = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  var todayTransactions = transactions.filter(function(row) {
    return row[0] >= startTime && row[0] < endTime;
  });
  
  if (todayTransactions.length === 0) {
    return '今日尚無花費';
  }
  
  var message = '今日花費:\n';
  var totalExpense = 0;
  
  for (var i = 0; i < todayTransactions.length; i++) {
    var expense = todayTransactions[i][3];
    if (expense) {
      message += todayTransactions[i][2] + ': ' + expense + ' 元\n';
      totalExpense += expense;
    }
  }
  
  message += '總計: ' + totalExpense + ' 元';
  return message;
}

function recordTransaction(sheet, userId, item, expense, income) {
  var lastRow = sheet.getLastRow();
  var balance = lastRow > 1 ? sheet.getRange(lastRow, 6).getValue() : 0;
  
  if (expense) {
    balance -= expense;
  } else if (income) {
    balance += income;
  }
  
  sheet.appendRow([new Date(), userId, item, expense || "", income || "", balance]);
  return balance;
}
