# GroupBudgetLineBot

[English version](#english-version)

# LINE Bot - 群組記帳小幫手

這是一個使用 Google Apps Script 開發的 LINE Bot，可以幫助追蹤群組開支並管理共同預算。它與 Google Sheets 整合，用於存儲和管理收支紀錄。

## 開始之前

在開始之前，請準備以下條件：
- LINE 帳號
- Google 帳號

## 設置步驟

按照以下步驟設置您的 LINE Bot：

1. **創建 Google Spreadsheet**
   - 前往 Google Sheets 並創建一個新的試算表
   - 為試算表命名（例如：Tokyo_BudgetManager）
   - 在試算表中建立一個名為 "Transactions" 的工作表
   - 將試算表分享給 LINE Bot（稍後建立）

2. **建立 Google Apps Script 專案**
   - 打開您在步驟 1 中建立的 Google Spreadsheet
   - 點擊 "擴充功能" > "Apps Script" 以打開 Google Apps Script 編輯器
   - 為專案命名（例如：LineBot_BudgetManager）
   - 複製並貼上程式碼到指令碼編輯器中
   - 保存專案

3. **設置 LINE Bot**
   - 前往 LINE Developers Console
   - 建立一個新的 Provider 或選擇一個現有的 Provider
   - 建立一個新的 Channel (Messaging API)
   - 設定機器人的基本資訊，如名稱和描述
   - 啟用 webhook 並將 webhook URL 設置為您的 Google Apps Script 的 URL（將在下一步中獲得）

4. **部署 Google Apps Script**
   - 在 Google Apps Script 編輯器中，點擊 "部署" > "新建部署"
   - 選擇 "網路應用程式" 作為部署類型
   - 將 "執行身份" 設置為您的帳號，將 "誰可以存取" 設置為 "所有人，甚至是匿名使用者"
   - 點擊 "部署"
   - 複製部署 URL
   - 返回 LINE Developers Console，將此 URL 貼到 "Messaging API" > "Webhook URL"

5. **配置 Google Apps Script 屬性**
   - 在 Google Apps Script 編輯器中，點擊 "專案設定"
   - 在 "專案屬性" 部分，點擊 "新增指令碼屬性"
   - 加入以下屬性：
     - 屬性：LINE_TOKEN，值：LINE Channel access token（可從 LINE "Messaging API" 頁面取得）
     - 屬性：SPREADSHEET_URL，值：在步驟 1 中建立的 Google Spreadsheet 的 URL
   - 保存更改

6. **將 LINE Bot 加為好友**
   - 在 LINE Developers Console 中，進入 "Messaging API" 頁面
   - 使用 LINE app 掃描 QR code 將 LINE Bot 加為好友

## 使用方法

設置完成後，按照以下步驟開始使用：

1. **建立群組**
   - 在 LINE 中邀請您的朋友和 LINE Bot 加入同一個群組
   - 確保 LINE Bot 已被授予群組的訊息權限

2. **開始記錄開支**
   - 記錄開支：傳送 "項目-金額"（例如，"午餐-1000"）
   - 加入公積金：傳送 "項目+金額"（例如，"儲值+5000"）
   - 查詢目前餘額：傳送 "餘額"
   - 查詢今天的支出：傳送 "今日花費"

---

# English version

# GroupBudgetLineBot - LINE Bot for Group Expense Tracking

This is a LINE Bot developed using Google Apps Script, designed to help track group expenses and manage shared budgets. It integrates with Google Sheets for storing and managing financial records.

## Prerequisites

Before you begin, make sure you have:
- A LINE account
- A Google account

## Setup Steps

Follow these steps to set up your LINE Bot:

1. **Create a Google Spreadsheet**
   - Go to Google Sheets and create a new spreadsheet
   - Name the spreadsheet (e.g., Tokyo_BudgetManager)
   - Create a sheet named "Transactions" in the spreadsheet
   - Share the spreadsheet with the LINE Bot (to be created later)

2. **Create a Google Apps Script Project**
   - Open the Google Spreadsheet you created in step 1
   - Click on "Extensions" > "Apps Script" to open the Google Apps Script editor
   - Name your project (e.g., LineBot_BudgetManager)
   - Copy and paste the code into the script editor
   - Save the project

3. **Set Up the LINE Bot**
   - Go to the LINE Developers Console
   - Create a new Provider or select an existing one
   - Create a new Channel (Messaging API)
   - Set up basic information for the bot, such as name and description
   - Enable webhook and set the webhook URL to your Google Apps Script URL (obtained in the next step)

4. **Deploy the Google Apps Script**
   - In the Google Apps Script editor, click "Deploy" > "New deployment"
   - Select "Web app" as the deployment type
   - Set "Execute as" to your account and "Who has access" to "Anyone, even anonymous"
   - Click "Deploy"
   - Copy the deployment URL
   - Go back to the LINE Developers Console and paste this URL into "Messaging API" > "Webhook URL"

5. **Configure Google Apps Script Properties**
   - In the Google Apps Script editor, click on "Project Settings"
   - In the "Script Properties" section, click "Add script property"
   - Add the following properties:
     - Property: LINE_TOKEN, Value: LINE Channel access token (obtained from the LINE "Messaging API" page)
     - Property: SPREADSHEET_URL, Value: URL of the Google Spreadsheet created in step 1
   - Save the changes

6. **Add the LINE Bot as a Friend**
   - In the LINE Developers Console, go to the "Messaging API" page
   - Use the LINE app to scan the QR code and add the LINE Bot as a friend

## Usage

Once set up, follow these steps to start using the bot:

1. **Create a Group**
   - In LINE, invite your friends and the LINE Bot to join the same group
   - Ensure that the LINE Bot has been granted messaging permissions in the group

2. **Start Recording Expenses**
   - Record an expense: Send "item-amount" (e.g., "lunch-1000")
   - Add to the common fund: Send "item+amount" (e.g., "deposit+5000")
   - Check current balance: Send "balance"
   - Check today's expenses: Send "today's expenses"
