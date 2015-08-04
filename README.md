# gs-daily-backup-to-gdrive

## What's this?

Daily Backup to GDrive. Backup to root_folder/yyyy/mm/dd

## How to

1. Edit values in getConfig function.

    ```js
        function getConfig() {
        return {
            folderId: 'YOUR_BACKUP_FOLDER_ID', // root foldr
            now: new Date(),
        }
    }```

2. Create script and paste main.gs in Google Spreadsheet.
3. Run script.
4. Set trigger.
