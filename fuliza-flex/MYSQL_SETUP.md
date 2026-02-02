# MySQL Setup Guide for Windows

## Step 1: Install MySQL

### Option A: Using MySQL Installer (Recommended)

1. **Download MySQL Installer:**
   - Visit: <https://dev.mysql.com/downloads/installer/>
   - Download "mysql-installer-community" (Windows MSI Installer)

2. **Run Installer:**
   - Double-click the downloaded `.msi` file
   - Choose "Custom" installation type
   - Select:
     - MySQL Server
     - MySQL Workbench (optional, but helpful)
   - Click "Next" → "Execute" → "Next"

3. **Configure MySQL Server:**
   - Type: "Development Computer"
   - Port: `3306` (default)
   - Root Password: **Set a password** (remember this!)
   - Click "Next" → "Execute" → "Finish"

### Option B: Using Chocolatey

```powershell
choco install mysql
```

---

## Step 2: Verify Installation

Open PowerShell and run:

```powershell
mysql --version
```

You should see something like: `mysql  Ver 8.0.x`

---

## Step 3: Create Database

### Method 1: Using MySQL Command Line

1. **Login to MySQL:**

   ```powershell
   mysql -u root -p
   ```

   Enter your root password when prompted.

2. **Run the schema:**

   ```sql
   source C:/workspace/Leona/fulizaFlex/fuliza-flex/backend/schema.sql
   ```

3. **Verify database was created:**

   ```sql
   SHOW DATABASES;
   USE fuliza_flex;
   SHOW TABLES;
   ```

4. **Exit MySQL:**

   ```sql
   EXIT;
   ```

### Method 2: Using MySQL Workbench (GUI)

1. Open MySQL Workbench
2. Connect to your local MySQL instance
3. Click "File" → "Open SQL Script"
4. Navigate to: `C:\workspace\Leona\fulizaFlex\fuliza-flex\backend\schema.sql`
5. Click the lightning bolt icon to execute
6. Verify tables were created in the left sidebar

---

## Step 4: Update Backend .env

Edit `backend/.env` and set your MySQL password:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-root-password-here
DB_NAME=fuliza_flex
```

---

## Step 5: Test Connection

Start your backend:

```powershell
cd backend
npm run dev
```

You should see:

```
✅ MySQL connected successfully
Server running on port 5000
```

---

## Troubleshooting

### "mysql: command not found"

- Add MySQL to PATH:
  1. Search "Environment Variables" in Windows
  2. Edit "Path" variable
  3. Add: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
  4. Restart PowerShell

### "Access denied for user 'root'@'localhost'"

- Wrong password in `.env`
- Reset MySQL root password if forgotten

### "Can't connect to MySQL server"

- MySQL service not running
- Start it: `net start MySQL80` (or `MySQL` depending on version)

---

## Quick Reference

| Action | Command |
|--------|---------|
| Start MySQL | `net start MySQL80` |
| Stop MySQL | `net stop MySQL80` |
| Login | `mysql -u root -p` |
| Show databases | `SHOW DATABASES;` |
| Use database | `USE fuliza_flex;` |
| Show tables | `SHOW TABLES;` |

---

**All set!** Your backend is now using MySQL instead of Supabase.
