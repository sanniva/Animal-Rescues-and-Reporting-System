@echo off
set BACKUP_DIR=D:\animal-rescue-system\backups
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"
C:\xampp\mysql\bin\mysqldump.exe -u root animal_rescue_system > "%BACKUP_DIR%\backup_%date:~-4,0%%date:~-7,2%%date:~-10,2%.sql"
echo Backup saved to %BACKUP_DIR%
pause