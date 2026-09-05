"# 🦁 Gold Price Tracker WhatsApp Bot

A fully automated **gold price tracking bot** that fetches daily gold prices from the web, stores them in a database, and sends personalized WhatsApp messages to subscribers with daily gold price updates, trend analysis, and monthly statistics.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Why Was This Built?](#why-was-this-built)
3. [Architecture & Components](#architecture--components)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Setup & Installation](#setup--installation)
7. [How It Works](#how-it-works)
8. [Usage Guide](#usage-guide)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## 📖 Project Overview

**Gold Price Tracker** is an intelligent automation system that:

- **Scrapes** real-time gold prices (22K & 24K) for 3 Indian cities: Pondicherry, Chennai, and Bangalore
- **Stores** historical price data in SQLite for trend analysis
- **Analyzes** daily changes, monthly highs/lows, and percentage changes
- **Generates** rich, formatted messages with insights and emojis
- **Sends** personalized WhatsApp messages to subscribers on schedule
- **Manages** subscribers with commands (JOIN, CONFIRM, CHANGE, STOP, STATUS, HELP)
- **Runs 24/7** with built-in daily scheduler and automatic reconnection

**Target Users:** Family members, friends, or investors interested in tracking gold prices in India.

---

## 🤔 Why Was This Built?

1. **Personal Need**: Family wanted daily gold price updates in their favorite cities
2. **Automation**: Manual price checking was tedious and error-prone
3. **WhatsApp First**: Everyone already uses WhatsApp, so no new app needed to download
4. **Smart Insights**: Not just raw prices, but actionable trends, percentage changes, and monthly stats
5. **Scalability**: Can easily add more cities or subscribers without code changes
6. **24/7 Monitoring**: Cloud-deployed to run continuously with automatic failover

---

## 🏗️ Architecture & Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Gold Price Tracker System                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────┐      ┌──────────────────┐     ┌─────────────┐
│  Scraper        │      │  Database        │     │  WhatsApp   │
│ (fetch_gold.py) │──→   │ (SQLite)         │     │    Bot      │
│                 │      │                  │  ←──│ (whatsapp   │
│ • Cloudscraper  │      │ • Historical     │     │  _bot.js)   │
│ • BeautifulSoup │      │   prices         │     │             │
│ • Retry logic   │      │ • Stats queries  │     │ • Listener  │
│                 │      │ • Trend calcs    │     │ • Scheduler │
└─────────────────┘      └──────────────────┘     │ • Commands  │
       ↑                                           └─────────────┘
       │                                                  ↑
       └──────────────────────────────────────────────────┘
       
       ↓
┌─────────────────────────────────────────────────────────────┐
│              Systemd Service (Ubuntu)                       │
│  Runs whatsapp_bot.js in --listen mode permanently         │
└─────────────────────────────────────────────────────────────┘

       ↓
┌─────────────────────────────────────────────────────────────┐
│              Daily Scheduler (Built-in)                     │
│  • 11:01 AM IST - Fetch gold prices from website            │
│  • 11:04 AM IST - Send personalized messages to subscribers │
│  • 10:00 PM IST - Send admin summary                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Price Scraping** | Python 3 + Cloudscraper + BeautifulSoup | Bypass anti-bot measures & parse HTML |
| **Database** | SQLite3 | Store historical prices locally |
| **WhatsApp Bot** | Node.js + whatsapp-web.js | Send/receive WhatsApp messages |
| **Scheduler** | Node.js native `setInterval` | Run tasks on IST schedule |
| **Authentication** | Local WhatsApp auth (session-based) | No API key needed, uses WhatsApp Web |
| **Deployment** | Systemd service (Ubuntu 22.04 LTS) | Run as background service |
| **Cloud** | Oracle Cloud (VM) | 24/7 uptime |

---

## 📁 Project Structure

```
gold-price-tracker/
├── fetch_gold.py               # Python script to scrape prices & store in DB
├── whatsapp_bot.js             # Node.js WhatsApp bot (listener + sender)
├── package.json                # Node.js dependencies
├── gold-price-tracker.service  # Systemd service file
├── setup-server.sh             # Server setup automation script
├── run_daily.sh                # Fallback cron script (optional)
├── DEPLOY_TO_SERVER.md         # Manual deployment guide
├── DEPLOY_WITH_GIT.md          # Git-based deployment guide
├── README.md                   # This file
└── safe/                       # Sensitive files (not in git)
    ├── ssh-key-2026-04-09.key  # SSH private key (restricted permissions)
    ├── ssh-key-2026-04-09.key.pub
    └── oci-public-ip.txt       # Server IP address
```

---

## 🚀 Setup & Installation

### Local Development Setup (Windows/Mac/Linux)

#### 1. Clone Repository
```bash
git clone https://github.com/balaji16s/gold-price-tracker.git
cd gold-price-tracker
```

#### 2. Python Environment
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install Python dependencies
pip install cloudscraper beautifulsoup4
```

#### 3. Node.js Setup
```bash
# Install Node.js (v18+) from nodejs.org or use nvm

# Install dependencies
npm install

# Verify
node --version
npm list
```

#### 4. Test Locally
```bash
# Test price scraping
python fetch_gold.py

# Test WhatsApp bot (requires authentication)
node whatsapp_bot.js --send
```

### Server Deployment (Ubuntu 22.04 LTS)

See detailed guides in:
- **[DEPLOY_TO_SERVER.md](DEPLOY_TO_SERVER.md)** - Manual SCP upload
- **[DEPLOY_WITH_GIT.md](DEPLOY_WITH_GIT.md)** - Git clone approach

Quick setup:
```bash
# SSH into server
ssh -i safe/ssh-key-2026-04-09.key ubuntu@140.245.198.215

# Run setup script
bash setup-server.sh

# Verify service
sudo systemctl status gold-price-tracker
```

---

## 🔍 How It Works

### 1. **Price Scraping** (`fetch_gold.py`)

**What it does:**
- Fetches current gold prices (22K & 24K per gram) from goodreturns.in
- Uses Cloudscraper to bypass anti-bot detection
- Stores prices in SQLite database with date & city
- Calculates daily change, percentage change, and monthly statistics
- Generates formatted WhatsApp messages with insights

**Process Flow:**
```
1. Initialize SQLite database (if not exists)
2. Loop through 3 cities: Pondicherry, Chennai, Bangalore
3. For each city:
   - Fetch HTML from goodreturns.in/gold-rates/{city}.html
   - Parse price elements (24K and 22K)
   - Store in DB: INSERT (date, city, price_22k, price_24k)
   - Retrieve yesterday's price for comparison
   - Calculate change % and trend insight
   - Fetch monthly high/low stats
   - Generate formatted message
   - Save message to gold_message_{city}.txt
4. Log all activities with timestamps
```

**Example Output:**
```
📍 *Chennai* (24 Apr 2026)

💰 *Today's Price*
• 24K: ₹7,250.00/g
• 22K: ₹6,650.00/g

📉/📈 *What changed (22K)?*
• Prev Rate: ₹6,620.00/g
Up by ₹30.00 (+0.45%) — creeping up. 📈

📅 *This month (22K)*
🔺 High: ₹6,800.00 (18 Apr 2026)
🔻 Low:  ₹6,500.00 (10 Apr 2026)

💡 Gold is heating up lately. 📈

_Reply *STOP* to unsubscribe_
```

**Special Case - Sundays:**
- On Sundays, markets are closed
- Bot reports Saturday's price instead of scraping
- Message: "No change today, gold is sleeping! 😌💤"

**Database Schema:**
```sql
CREATE TABLE gold_prices (
    date          TEXT,       -- ISO format: YYYY-MM-DD
    city          TEXT,       -- pondicherry, chennai, bangalore
    price_22k     REAL,       -- Price per gram
    price_24k     REAL,       -- Price per gram
    PRIMARY KEY (date, city)
);
```

---

### 2. **WhatsApp Bot** (`whatsapp_bot.js`)

**Two Operating Modes:**

#### A. **Listen Mode** (--listen) - Primary
Runs 24/7 as a service, listening for commands and sending scheduled messages.

**Features:**
- Responds to user commands (START, CONFIRM, CHANGE, STOP, STATUS, HELP)
- Built-in daily scheduler (no cron needed)
- Automatic price fetch & send on schedule
- Subscriber management (in-memory + persistent JSON)
- Reconnection logic on disconnection
- Graceful shutdown handling

**Subscriber Lifecycle:**
```
User sends "START"
    ↓
Bot asks for name (state: asking_name)
    ↓
User enters name
    ↓
Bot asks to select city (state: selecting_cities)
    ↓
User enters 1/2/3 (for city)
    ↓
Bot asks to CONFIRM (state: confirm_cities)
    ↓
User sends "CONFIRM"
    ↓
Subscriber active! (state: subscribed)
    ↓
Receives daily updates + can use STATUS/CHANGE/STOP
```

**Available Commands:**

| Command | State | Action |
|---------|-------|--------|
| `START` | Any | Start subscription flow (ask name) |
| `CONFIRM` | Selecting/Confirming cities | Lock in city selection & activate |
| `CHANGE` | Subscribed | Change city preference |
| `STOP` | Subscribed | Unsubscribe |
| `STATUS` | Subscribed | View current subscription |
| `HELP` | Any | Show command help |
| `RUN` | Master only | Trigger manual daily run |

**Example Conversation:**
```
User: START
Bot: Hey there! I'm Leo 🦁, your personal gold-hunting companion!
     What should I call you?

User: Balaji
Bot: Awesome to meet you, Balaji! 🤩
     Pick your city:
     1 -> Pondicherry
     2 -> Chennai
     3 -> Bangalore

User: 2
Bot: Sweet, Chennai it is! 🎯
     Hit me with a *CONFIRM* to lock it in

User: CONFIRM
Bot: Boom! You're locked in, Balaji! 🎯
     You'll get daily updates for Chennai at 11:04 AM IST
     [Then sends today's prices immediately]

User: CHANGE
Bot: Changing lanes? Pick new city:
     1 -> Pondicherry
     2 -> Chennai
     3 -> Bangalore

User: 1
User: CONFIRM
Bot: Pondicherry confirmed! 🎯

User: STATUS
Bot: Looking good, Balaji! 😎
     Your radar is locked onto Pondicherry
     *CHANGE* to modify, *STOP* to unsubscribe

User: STOP
Bot: Oh, This hurts 🥺
     You've been unsubscribed!
     Reply START to come back
```

**Daily Scheduler Details:**
```
Every 10 seconds, check if IST time matches:

• 11:01 AM IST (05:31 UTC)
  → Trigger: refreshTodayGoldMessages()
  → Runs: fetch_gold.py to scrape & update prices

• 11:04 AM IST (05:34 UTC)
  → Trigger: sendDailyMessages()
  → Sends personalized messages to all subscribers

• 22:00 IST (16:30 UTC)
  → Trigger: sendMasterSummary()
  → Admin report: new subscribers, unsubscribed users
```

**Session Persistence:**
- Subscriber data saved in `subscribers.json`
- WhatsApp auth cached in `whatsapp_auth/` directory
- Last run times tracked in `last_run.json` (prevents duplicate sends)
- Stale subscriptions auto-cleaned after 24 hours (pending state)
- Unsubscribed users auto-cleaned after 60 days

#### B. **Send Mode** (--send) - Manual One-off
Used for manual sends or fallback when listener might be restarting.

```bash
node whatsapp_bot.js --send
# Reads subscribers.json, gold_message_*.txt files
# Sends messages to all subscribed users
# Exits when done
```

---

### 3. **Systemd Service** (`gold-price-tracker.service`)

Runs the bot as a background service on Ubuntu.

**Configuration:**
```ini
[Unit]
Description=Gold Price WhatsApp Bot
After=network-online.target          # Start after network is available

[Service]
Type=simple
User=ubuntu                          # Run as ubuntu user
WorkingDirectory=/home/ubuntu/gold-price-tracker
ExecStart=/usr/bin/node whatsapp_bot.js --listen
Restart=on-failure                   # Auto-restart if it crashes
RestartSec=10                        # Wait 10 seconds before restart

[Install]
WantedBy=multi-user.target           # Start at boot
```

**Service Commands:**
```bash
# Start service
sudo systemctl start gold-price-tracker

# Stop service
sudo systemctl stop gold-price-tracker

# Restart service
sudo systemctl restart gold-price-tracker

# View logs (last 50 lines)
sudo journalctl -u gold-price-tracker -n 50

# Follow logs in real-time
sudo journalctl -u gold-price-tracker -f

# Check status
sudo systemctl status gold-price-tracker
```

---

### 4. **Cron Jobs** (Optional Fallback)

If the listener service crashes, cron jobs provide fallback:

```bash
# Fetch prices daily at 5:30 AM UTC (11:00 AM IST)
30 5 * * * cd /home/ubuntu/gold-price-tracker && python3 fetch_gold.py

# Send messages daily at 5:45 AM UTC (11:15 AM IST)
45 5 * * * cd /home/ubuntu/gold-price-tracker && node whatsapp_bot.js --send
```

---

## 📱 Usage Guide

### For End Users (WhatsApp Subscribers)

**Starting Subscription:**
```
1. Message "START" to the bot number
2. Enter your name when asked
3. Choose your city (1/2/3)
4. Send "CONFIRM"
5. Receive daily gold prices at 11:04 AM IST
```

**Managing Subscription:**
```
STATUS    → View your current subscription
CHANGE    → Switch to a different city
STOP      → Unsubscribe
HELP      → Show all commands
```

### For Administrators

**Manual Gold Fetch:**
```bash
ssh ubuntu@140.245.198.215
cd gold-price-tracker
python3 fetch_gold.py
```

**Manual Send:**
```bash
ssh ubuntu@140.245.198.215
cd gold-price-tracker
node whatsapp_bot.js --send
```

**View Bot Logs:**
```bash
# Real-time logs
sudo journalctl -u gold-price-tracker -f

# View bot.log file
tail -f ~/gold-price-tracker/bot.log
```

**Query Database:**
```bash
python3
import sqlite3
conn = sqlite3.connect('gold_prices.db')
c = conn.cursor()
c.execute("SELECT * FROM gold_prices WHERE city='chennai' ORDER BY date DESC LIMIT 5")
for row in c.fetchall():
    print(row)
```

**Add/Remove Subscribers Manually:**
```bash
# Edit subscribers.json
nano ~/gold-price-tracker/subscribers.json

# Add subscriber
{
  "919876543210@c.us": {
    "name": "John",
    "cities": ["chennai"],
    "joinedAt": "2026-04-24T10:30:00",
    "state": "subscribed"
  }
}

# Restart service to reload
sudo systemctl restart gold-price-tracker
```

---

## 🚀 Deployment

### Option 1: Manual Deployment (SCP)
See [DEPLOY_TO_SERVER.md](DEPLOY_TO_SERVER.md)
- Use SCP to upload files from Windows
- Manual environment setup

### Option 2: Git-based Deployment
See [DEPLOY_WITH_GIT.md](DEPLOY_WITH_GIT.md)
- Clone from GitHub
- Automatic dependency installation

### Quick Summary:
```bash
# 1. SSH into server
ssh -i safe/ssh-key-2026-04-09.key ubuntu@140.245.198.215

# 2. Clone or upload files
git clone https://github.com/balaji16s/gold-price-tracker.git

# 3. Run setup
cd gold-price-tracker
bash setup-server.sh

# 4. Verify
sudo systemctl status gold-price-tracker
```

### WhatsApp Authentication:
First time running on new machine:
```bash
node whatsapp_bot.js --listen
# QR code will print to terminal
# Scan with your WhatsApp phone
# Auth cached in whatsapp_auth/ for future runs
```

---

## 🔧 Troubleshooting

### Issue: "Bad permissions" on SSH key
**Solution:** Restrict SSH key permissions
```bash
# Windows PowerShell
$path = "D:\develop\gold-price-tracker\safe\ssh-key-2026-04-09.key"
$acl = New-Object System.Security.AccessControl.FileSecurity
$acl.SetAccessRuleProtection($true, $false)
$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().User
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule($currentUser, "FullControl", "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path $path -AclObject $acl
```

### Issue: WhatsApp bot not sending messages
**Troubleshoot:**
```bash
# 1. Check service status
sudo systemctl status gold-price-tracker

# 2. View recent logs
sudo journalctl -u gold-price-tracker -n 100

# 3. Verify subscribers.json exists
ls -la ~/gold-price-tracker/subscribers.json

# 4. Check if prices were fetched
ls -la ~/gold-price-tracker/gold_message_*.txt

# 5. Re-authenticate WhatsApp
rm -rf ~/gold-price-tracker/whatsapp_auth
sudo systemctl restart gold-price-tracker
# Scan QR code when it appears
```

### Issue: Prices not updating
**Troubleshoot:**
```bash
# 1. Manual fetch
python3 ~/gold-price-tracker/fetch_gold.py

# 2. Check database
sqlite3 ~/gold-price-tracker/gold_prices.db "SELECT * FROM gold_prices ORDER BY date DESC LIMIT 5;"

# 3. Check website status
curl https://www.goodreturns.in/gold-rates/chennai.html

# 4. Check venv activation
source ~/gold-price-tracker/venv/bin/activate
pip list | grep cloudscraper
```

### Issue: Service keeps restarting
**Check logs for errors:**
```bash
journalctl -u gold-price-tracker -e
# Look for specific error messages

# Common causes:
# - WhatsApp auth expired (delete whatsapp_auth/)
# - Node.js crashed (check disk space)
# - Network issues (check internet connectivity)
```

---

## 📊 Database Queries

**View all prices for a city:**
```sql
SELECT * FROM gold_prices WHERE city='chennai' ORDER BY date DESC;
```

**Find price on a specific date:**
```sql
SELECT * FROM gold_prices WHERE date='2026-04-24' AND city='pondicherry';
```

**Monthly statistics:**
```sql
SELECT 
  city,
  MAX(price_22k) as high_22k,
  MIN(price_22k) as low_22k,
  AVG(price_22k) as avg_22k
FROM gold_prices
WHERE date BETWEEN '2026-04-01' AND '2026-04-30'
GROUP BY city;
```

**Daily changes:**
```sql
SELECT 
  a.date,
  a.city,
  a.price_22k,
  b.price_22k as prev_price,
  (a.price_22k - b.price_22k) as change,
  ROUND(((a.price_22k - b.price_22k) / b.price_22k) * 100, 2) as pct_change
FROM gold_prices a
LEFT JOIN gold_prices b ON 
  a.city = b.city AND 
  b.date = date(a.date, '-1 day')
WHERE a.city='bangalore'
ORDER BY a.date DESC;
```

---

## 📝 Configuration Reference

**In `fetch_gold.py`:**
```python
CITIES = ["pondicherry", "chennai", "bangalore"]  # Add/remove cities
DB_PATH = "gold_prices.db"                        # Database location
IST = timezone(timedelta(hours=5, minutes=30))   # Time zone for logs
```

**In `whatsapp_bot.js`:**
```javascript
SCHEDULE_FETCH_HOUR = 11;     // 11 AM IST
SCHEDULE_FETCH_MINUTE = 1;    // 11:01 AM IST
SCHEDULE_SEND_HOUR = 11;      // 11 AM IST
SCHEDULE_SEND_MINUTE = 4;     // 11:04 AM IST
SUMMARY_HOUR = 22;            // 10 PM IST
SUMMARY_MINUTE = 0;           // 10:00 PM IST
MASTER_NUMBER = "918870614654@c.us";  // Admin WhatsApp number
AVAILABLE_CITIES = ["pondicherry", "chennai", "bangalore"];
```

---

## 🤝 Contributing

To add features:
1. Create a feature branch
2. Make changes locally
3. Test thoroughly
4. Push to GitHub
5. Create pull request

---

## 📄 License

This project is open source. Feel free to use and modify for your own needs.

---

## 👤 Author

**Balaji**
- GitHub: [@balaji16s](https://github.com/balaji16s)
- Email: For questions or suggestions

---

## 🎯 Future Enhancements

- [ ] Add more cities beyond India
- [ ] Support for daily/weekly/monthly frequency preferences
- [ ] Price alerts when threshold crossed
- [ ] Web dashboard to view historical data
- [ ] Multiple language support
- [ ] Integration with Telegram as alternative
- [ ] Mobile app for iOS/Android

---

**Last Updated:** April 24, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅" 
